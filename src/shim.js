/* Parla Subito — standalone runtime (GitHub Pages).
   Replaces the Claude artifact runtime: AI via Google Gemini (free tier) with Groq as automatic backup,
   speech recognition via Safari/Chrome, progress stored on this device. Keys never leave this device
   except to call the provider you chose. */
(function () {
  const LS = {
    get: k => { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } },
    set: (k, v) => { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) {} }
  };
  const keys = () => ({ g: LS.get("ps.key.gemini").trim(), q: LS.get("ps.key.groq").trim() });
  const today = () => new Date().toISOString().slice(0, 10);
  try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) {}

  /* ---------- providers ---------- */
  const GEM_MODELS = {
    flash: ["gemini-flash-latest", "gemini-3.8-flash", "gemini-2.5-flash"],
    lite: ["gemini-flash-lite-latest", "gemini-3.5-flash-lite", "gemini-2.5-flash-lite"]
  };
  const GROQ_MODELS = ["openai/gpt-oss-120b", "llama-3.3-70b-versatile"];
  const err = (code, msg) => Object.assign(new Error(msg || code), { code });

  function toTurns(input) {
    const arr = typeof input === "string" ? [{ role: "user", content: input }] : input;
    const out = [];
    for (const m of arr) {
      const role = m.role === "assistant" ? "assistant" : "user";
      const text = typeof m.content === "string" ? m.content : JSON.stringify(m.content);
      if (out.length && out[out.length - 1].role === role) out[out.length - 1].content += "\n\n" + text;
      else out.push({ role, content: text });
    }
    if (out[0] && out[0].role !== "user") out.unshift({ role: "user", content: "(start)" });
    return out;
  }
  async function fetchJSON(url, init, signal) {
    let r;
    try { r = await fetch(url, Object.assign({ signal }, init)); }
    catch (e) { if (signal && signal.aborted) throw err("cancelled"); throw err("network_error"); }
    const body = await r.json().catch(() => ({}));
    if (r.ok) return body;
    const m = (body.error && (body.error.message || body.error.status)) || ("HTTP " + r.status);
    if (r.status === 429) throw err("rate_limited", m);
    if (r.status === 401 || r.status === 403) throw err("bad_key", m);
    if (r.status === 404) throw err("no_model", m);
    if (r.status >= 500) throw err("upstream_error", m);
    throw err("bad_request", m);
  }
  async function gemini(kind, turns, json, signal) {
    const k = keys().g; if (!k) throw err("no_key");
    const cached = LS.get("ps.gm." + kind);
    const list = cached ? [cached, ...GEM_MODELS[kind].filter(x => x !== cached)] : GEM_MODELS[kind];
    let last;
    for (const model of list) {
      try {
        const body = {
          contents: turns.map(t => ({ role: t.role === "assistant" ? "model" : "user", parts: [{ text: t.content }] })),
          generationConfig: Object.assign({ temperature: 0.8 }, json ? { responseMimeType: "application/json" } : {})
        };
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        const init = h => ({ method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, h), body: JSON.stringify(body) });
        let r;
        /* New "AQ." auth keys and classic "AIza" keys: header first, then ?key= if the header form is refused. */
        try { r = await fetchJSON(url, init({ "x-goog-api-key": k }), signal); }
        catch (e) { if (e.code !== "bad_key") throw e; r = await fetchJSON(url + "?key=" + encodeURIComponent(k), init({}), signal); }
        const text = (((r.candidates || [])[0] || {}).content || {}).parts?.map(p => p.text || "").join("") || "";
        if (!text) throw err("upstream_error", "empty");
        LS.set("ps.gm." + kind, model);
        return text;
      } catch (e) { last = e; if (e.code !== "no_model") throw e; }
    }
    throw last || err("no_model");
  }
  async function groq(turns, json, signal) {
    const k = keys().q; if (!k) throw err("no_key");
    let last;
    for (const model of GROQ_MODELS) {
      for (const useJson of json ? [true, false] : [false]) {
        try {
          const body = { model, messages: turns.map(t => ({ role: t.role, content: t.content })), temperature: 0.8 };
          if (useJson) body.response_format = { type: "json_object" };
          if (/gpt-oss/.test(model)) body.reasoning_effort = "low";
          const r = await fetchJSON("https://api.groq.com/openai/v1/chat/completions",
            { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + k }, body: JSON.stringify(body) }, signal);
          const text = (((r.choices || [])[0] || {}).message || {}).content || "";
          if (!text) throw err("upstream_error", "empty");
          return text;
        } catch (e) { last = e; if (e.code === "bad_request" || e.code === "no_model") continue; throw e; }
      }
    }
    throw last;
  }
  /* Route: quick tasks → Gemini Flash-Lite; demanding ones → Gemini Flash (20/day, counted here) → Flash-Lite.
     Any limit or failure → Groq. */
  async function complete(input, opts, json) {
    opts = opts || {};
    const turns = toTurns(input), signal = opts.signal, k = keys();
    if (!k.g && !k.q) throw err("no_key");
    const steps = [];
    if (k.g) {
      const usedKey = "ps.flash." + today(), used = +LS.get(usedKey) || 0;
      if (opts.modelTier === "default" && used < 18) steps.push(async () => { const t = await gemini("flash", turns, json, signal); LS.set(usedKey, String(used + 1)); return t; });
      steps.push(() => gemini("lite", turns, json, signal));
    }
    if (k.q) steps.push(() => groq(turns, json, signal));
    let last;
    for (const run of steps) {
      if (signal && signal.aborted) throw err("cancelled");
      try { return await run(); }
      catch (e) { last = e; if (e.code === "cancelled") throw e; }
    }
    throw last && last.code === "no_key" ? err("no_key") : last;
  }
  function parseJSON(text) {
    const t = String(text).trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    try { return JSON.parse(t); } catch (e) {}
    const a = t.indexOf("{"), b = t.lastIndexOf("}");
    if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch (e) {} }
    throw err("invalid_json");
  }
  const sample = async (input, opts) => {
    const text = await complete(input, opts, false);
    opts && opts.onText && opts.onText({ text, delta: text });
    return { text };
  };
  sample.json = async (input, opts) => parseJSON(await complete(input, opts, true));

  /* ---------- speech recognition (Safari / Chrome) ---------- */
  function makeDictation() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    let rec = null; const cb = {};
    return {
      onPartial: f => { cb.p = f; }, onFinal: f => { cb.f = f; }, onState: f => { cb.s = f; },
      start() {
        return new Promise((resolve, reject) => {
          try {
            rec = new SR(); rec.lang = "it-IT"; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
            rec.onstart = () => { cb.s && cb.s({ state: "listening" }); resolve(); };
            rec.onresult = e => {
              let fin = "", part = "";
              for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) fin += r[0].transcript; else part += r[0].transcript; }
              if (part && cb.p) cb.p({ text: part });
              if (fin && cb.f) cb.f({ text: fin });
            };
            rec.onerror = ev => { if (ev.error === "not-allowed" || ev.error === "service-not-allowed") reject(err("not_granted")); };
            rec.onend = () => { cb.s && cb.s({ state: "idle" }); };
            rec.start();
          } catch (e) { reject(e); }
        });
      },
      stop() { try { rec && rec.stop(); } catch (e) {} return Promise.resolve(); }
    };
  }

  /* ---------- runtime the app expects ---------- */
  window.claude = {
    use: async name => {
      if (name === "sample") { const k = keys(); return k.g || k.q ? sample : null; }
      if (name === "dictation") return makeDictation();
      return null; /* db, user, tts: progress lives on this device; voices come from the phone */
    }
  };

  /* ---------- settings section: AI keys ---------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mask = k => k ? k.slice(0, 4) + "…" + k.slice(-4) : "";
  window.EXT = {
    settingsHTML() {
      const k = keys();
      return `<div class="setrow" style="flex-direction:column;align-items:stretch;gap:8px">
        <b>Motor de IA</b>
        <span class="small muted">Gratis: Gemini (principal) y Groq (respaldo automático). Las claves quedan solo en este teléfono.</span>
        <label class="small" for="kG">Clave de Gemini · aistudio.google.com → Get API key ${k.g ? `<span style="color:var(--green)">✓ ${esc(mask(k.g))}</span>` : ""}</label>
        <input id="kG" class="field" type="password" autocomplete="off" placeholder="${k.g ? "Guardada (pegá otra para cambiarla)" : "Pegá tu clave (AQ.… o AIza…)"}">
        <label class="small" for="kQ">Clave de Groq · console.groq.com → API Keys ${k.q ? `<span style="color:var(--green)">✓ ${esc(mask(k.q))}</span>` : ""}</label>
        <input id="kQ" class="field" type="password" autocomplete="off" placeholder="${k.q ? "Guardada (pegá otra para cambiarla)" : "Pegá tu clave gsk_…"}">
        <div class="row"><button class="pill solid" id="kSave">Guardar claves</button><button class="pill" id="kTest">Probar</button>${k.g || k.q ? `<button class="pill ghost" id="kDel" style="color:var(--coral)">Borrar claves</button>` : ""}</div>
        <span class="small" id="kMsg"></span></div>`;
    },
    bind() {
      const $ = s => document.querySelector(s), msg = (t, ok) => { const m = $("#kMsg"); if (m) { m.textContent = t; m.style.color = ok ? "var(--green)" : "var(--coral)"; } };
      const save = () => { const g = $("#kG").value.trim(), q = $("#kQ").value.trim(); if (g) LS.set("ps.key.gemini", g); if (q) LS.set("ps.key.groq", q); return g || q; };
      $("#kSave") && ($("#kSave").onclick = () => { if (!save()) { msg("Pegá al menos una clave."); return; } msg("Guardadas. Reiniciando…", true); setTimeout(() => location.reload(), 600); });
      $("#kDel") && ($("#kDel").onclick = () => { LS.set("ps.key.gemini", ""); LS.set("ps.key.groq", ""); location.reload(); });
      $("#kTest") && ($("#kTest").onclick = async () => {
        save(); msg("Probando…", true); const k = keys(), res = [];
        const t = toTurns('Reply only with JSON {"ok":true,"it":"Ciao Lauti!"}');
        if (k.g) { try { await gemini("lite", t, true); res.push("Gemini ✓"); } catch (e) { res.push("Gemini ✗ (" + (e.code === "bad_key" ? "clave inválida" : e.code === "rate_limited" ? "límite alcanzado" : e.message) + ")"); } }
        if (k.q) { try { await groq(t, true); res.push("Groq ✓"); } catch (e) { res.push("Groq ✗ (" + (e.code === "bad_key" ? "clave inválida" : e.code === "rate_limited" ? "límite alcanzado" : e.message) + ")"); } }
        if (!res.length) { msg("Pegá al menos una clave."); return; }
        const ok = res.some(x => x.includes("✓")); msg(res.join(" · ") + (ok ? " — tocá Guardar." : ""), ok);
      });
    }
  };
})();
