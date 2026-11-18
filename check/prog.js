const { chromium, devices } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ ...devices['iPhone 13'] })).newPage();
  const errs = [];
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  p.on('console', m => { if (m.type()==='error' && !/Failed to load resource/.test(m.text())) errs.push('console: '+m.text()); });
  await p.addInitScript(() => {
    window.__long = []; try { new PerformanceObserver(l => l.getEntries().forEach(e => window.__long.push(Math.round(e.duration)))).observe({ entryTypes: ['longtask'] }); } catch (e) {}
    const delay = ms => new Promise(r => setTimeout(r, ms)); let n = 0;
    const s = async () => ({ text: 'ok' });
    s.json = async (inp, o) => { await delay(200);
      if (Array.isArray(inp)) { n++; if (n === 3) return { correction: { ok: false, better_it: 'Sono Lauti.', better_es: 'Soy Lauti.', why_es: 'x', clue_es: 'x', tag: 'x' }, reply_it: 'Ah, e poi?', reply_es: 'x', hint: 'nope', words: { it: 'x' }, used_targets: 'no', end: false };
        return { correction: n > 1 ? { ok: true, better_it: 'x', better_es: 'x', why_es: 'bien', clue_es: '', tag: '' } : null, reply_it: 'Benissimo! E poi?', reply_es: '¡Muy bien!', hint: {}, words: [], used_targets: [0], end: false }; }
      if (/grammar exercises/.test(inp)) return { items: [{ type: 'g', q: 'Io ___ stanco.', opts: ['sono', 'ho', 'sto'], a: 0, why_es: 'Estados con essere.' }, { type: 'e', q: 'Io ho freddo molto.', opts: ['Ho molto freddo.', 'Sono molto freddo.', 'Ho freddo molta.'], a: 0, why_es: 'molto antes' }] };
      if (/pick 4-6/.test(inp)) return { praise_es: 'ok', focus_es: 'x', cards: [], topic: 't', facts: [] };
      return {}; };
    window.claude = { use: async name => name === 'sample' ? s : null };
  });
  const url = 'file:///home/claude/italiano/index.html';
  const t = async (sel, wait = 120) => { try { await p.tap(sel, { timeout: 4000 }); } catch (e) { throw new Error('tap ' + sel + ' @ ' + (await p.evaluate(() => (document.querySelector('#lezHead')||{}).textContent + ' | ' + location.hash)).slice(0, 120)); } await p.waitForTimeout(wait); };
  const step = async (name, fn) => { try { await fn(); console.log('OK  ', name); } catch (e) { console.log('FAIL', name, '-', e.message.split('\n')[0]); errs.push(name); } };
  /* answers every exercise type generically; correct when it can */
  const solve = async (maxIt = 80, wrongEvery = 0) => { let k = 0;
    for (; k < maxIt; k++) {
      if (await p.$('#lezBody .exopts button:not([disabled])')) { const it = await p.evaluate(() => null); const btns = await p.$$('#lezBody .exopts button'); await btns[Math.floor(Math.random()*btns.length)].tap(); await p.waitForTimeout(80); await t('#exFb [data-next]', 60); continue; }
      if (await p.$('#exIn')) { await p.fill('#exIn', 'sono stanco'); await t('#exForm button', 60); await t('#exFb [data-next]', 60); continue; }
      if (await p.$('#lezBody [data-p]')) { while (await p.$('#lezBody [data-p]')) await t('#lezBody [data-p]', 30); await t('#exFb [data-next]', 60); continue; }
      if (await p.$('#spShow')) { await t('#spShow', 60); await t('#lezBody [data-r="1"]', 60); continue; }
      if (await p.$('#lezBody [data-l]')) { for (let i = 0; i < 4; i++) { await t(`#lezBody [data-l="${i}"]`, 30); await t(`#lezBody [data-r="${i}"]`, 30); } await t('#exFb [data-next]', 60); continue; }
      break; }
    return k; };
  await p.goto(url + '#home'); await p.waitForTimeout(700); await p.evaluate(() => { S.aiMode = 'full'; save(); });
  await step('home: placement CTA', async () => { await p.waitForSelector('#plStart'); });
  await p.screenshot({ path: 'check/p_home0.png' });
  await step('placement test → start unit', async () => { await t('#plStart', 300); await t('#plGo', 200); const k = await solve(30); const st = await p.evaluate(() => JSON.stringify({ u: S.route.u, placed: S.route.placed, lvl: S.level })); console.log('   answered', k, st); await t('#lezBody [data-next]', 300); await p.waitForSelector('#prog [data-sess]'); });
  await step('force unit 1 for full flow', async () => { await p.evaluate(() => { S.route.u = 0; S.route.d = 1; S.route.s = 'm'; save(); renderHome(); }); });
  await p.screenshot({ path: 'check/p_home1.png' });
  await step('morning session day 1 runs end-to-end', async () => {
    await t('#prog [data-sess]', 300);
    for (let guard = 0; guard < 40; guard++) {
      if (await p.$('#fsNight') || await p.$('#lezBody [data-nav="home"]')) break;
      if (await p.$('#rvShow')) { await t('#rvShow', 60); await t('.grades [data-g="3"]', 60); continue; }
      if (await p.$('#nwGo')) { await t('#nwGo', 60); continue; }
      if (await p.$('#ruShow')) { await t('#ruShow', 60); await t('#ruShow', 60); continue; }
      if (await p.$('#dgPlay')) { if (await p.$('#lezBody [data-rv]')) await t('#lezBody [data-rv]', 60); await t('#lezBody [data-next]', 150); continue; }
      const k = await solve(40); if (k) continue;
      if (await p.$('#lezBody [data-next]')) { await t('#lezBody [data-next]', 150); continue; }
      throw new Error('stuck: ' + (await p.textContent('#lezHead')).slice(0, 80));
    }
    const r = await p.evaluate(() => JSON.stringify({ d: S.route.d, s: S.route.s, cards: Object.values(S.custom).filter(c => c.u === 'u1').length }));
    console.log('   ', r); if (!/"s":"n"/.test(r)) throw new Error('not advanced');
  });
  await p.screenshot({ path: 'check/p_done.png' });
  await step('night session with talk + mission', async () => {
    await t('#fsNight', 300);
    for (let guard = 0; guard < 40; guard++) {
      if (await p.$('#lezBody [data-nav="home"]')) break;
      if (await p.$('#tmF')) { await t('#tmF', 200); continue; }
      if (await p.$('#tkGo')) { await t('#tkGo', 500); for (let i = 0; i < 6; i++) { await p.fill('#chatIn', 'Piacere, sono Lauti ' + i); await t('#sendBtn', 450); } await p.waitForSelector('#msgs [data-go]'); await t('#msgs [data-go]', 400); continue; }
      if (await p.$('#sdGo')) { await t('#sdGo', 100); for (let i = 0; i < 8; i++) { if (!await p.$('#sdNext')) break; await t('#sdNext', 40); } continue; }
      const k = await solve(40); if (k) continue;
      if (await p.$('#lezBody [data-next]')) { await t('#lezBody [data-next]', 150); continue; }
      throw new Error('stuck: ' + (await p.textContent('#lezHead')).slice(0, 80));
    }
    const r = await p.evaluate(() => JSON.stringify({ d: S.route.d, s: S.route.s, talk: (S.sessions||[]).slice(-1)[0] }));
    console.log('   ', r); if (!/"d":2/.test(r)) throw new Error('night not advanced');
  });
  await step('day 3 grammar includes AI extras', async () => { await p.evaluate(() => { S.route.d = 3; S.route.s = 'm'; save(); startSession(0, 3, 'm'); }); await p.waitForTimeout(500);
    const has = await p.evaluate(() => LZ.aiP.then(x => x.length)); if (has < 2) throw new Error('ai ' + has); });
  await step('exam from Ruta passes → unit 2', async () => {
    await p.evaluate(() => { LZ = null; }); await p.goto(url + '#ruta'); await p.waitForTimeout(400); await t('#rutaCol [data-u="0"]', 300); await t('#sheet [data-ds="7x"]', 400);
    for (let g = 0; g < 10; g++) { if (await p.$('#rvShow')) { await t('#rvShow', 40); await t('.grades [data-g="3"]', 40); continue; } break; }
    if (await p.$('#lezBody [data-next]') && !(await p.$('#exGo'))) await t('#lezBody [data-next]', 200);
    await t('#exGo', 200);
    await p.evaluate(() => { /* answer all correctly */ });
    for (let k = 0; k < 20; k++) {
      const act = await p.evaluate(() => { const st = LZ.steps[LZ.i]; const box = document.querySelector('#lezBody .exbox'); if (!box) return null;
        const html = box.textContent; const tx = h => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent; }; const it = st.items.find(x => !x.say && x.prompt && html.includes(tx(x.prompt))) || st.items.find(x => x.say && html.includes('Escuch'));
        if (!it) return { miss: html.slice(0, 80) };
        if (it.k === 'type') return { type: it.answers[0] };
        const want = it.say ? null : it.opts[it.a]; return { choice: want, say: it.say || null }; });
      if (!act) break; if (act.miss) throw new Error('no item for ' + act.miss);
      if (act.type) { await p.fill('#exIn', act.type); await t('#exForm button', 60); }
      else { let idx = 0; const texts = await p.$$eval('#lezBody .exopts button', bs => bs.map(b => b.textContent));
        if (act.choice) idx = texts.indexOf(act.choice); else { const es = await p.evaluate(() => { const st = LZ.steps[LZ.i]; return st.items.filter(x => x.say).map(x => x.opts[x.a]); }); idx = texts.findIndex(x => es.includes(x)); }
        await (await p.$$('#lezBody .exopts button'))[Math.max(0, idx)].tap(); await p.waitForTimeout(60); }
      await t('#exFb [data-next]', 60); }
    const txt = await p.textContent('#lezBody'); if (!/Aprobado/.test(txt)) throw new Error(txt.slice(0, 120));
    await t('#lezBody [data-next]', 200); await t('#moGo', 100); await p.evaluate(() => { clearInterval(LZ.tm); LZ.i++; renderLez(); }); await p.waitForTimeout(200);
    const r = await p.evaluate(() => JSON.stringify({ u: S.route.u, d: S.route.d, exam: S.route.exam })); console.log('   ', r); if (!/"u":1/.test(r)) throw new Error('not advanced');
  });
  await step('Ruta + unit sheet + Más + dock', async () => { await p.goto(url + '#ruta'); await p.waitForTimeout(300); await t('#rutaCol [data-u="1"]', 300); await t('#unX'); console.log('   dbg', await p.evaluate(() => { const e = document.querySelector('#rutaCol [data-u="2"]'); if(!e) return 'none ' + location.hash + ' ' + document.querySelector('#v-ruta').className; const r = e.getBoundingClientRect(); const top = document.elementFromPoint(r.x + 30, Math.min(innerHeight-5, r.y + 20)); return JSON.stringify({ r: [r.y, r.height], vis: document.querySelector('#v-ruta').className, top: top && top.outerHTML.slice(0, 100), modal: document.querySelector('#modal').className }); })); await p.$eval('#rutaCol [data-u="2"]', e => e.click()); await p.waitForTimeout(200); await p.screenshot({ path: 'check/p_ruta.png' });
    for (const v of ['home', 'ruta', 'parla', 'carte', 'mas', 'home']) await t(`nav.dock a[data-v="${v}"]`, 200);
    await t('nav.dock a[data-v="mas"]', 200); await t('#masCol [data-nav="parole"]', 300); const cur = await p.getAttribute('nav.dock a[data-v="mas"]', 'aria-current'); if (cur !== 'page') throw new Error('dock mapping'); });
  await step('lesson exit sheet', async () => { await p.goto(url + '#home'); await p.waitForTimeout(300); await t('#prog [data-sess]', 300); await t('#lzX', 200); await t('#lzLeave', 300); if (!(await p.$('#prog'))) throw new Error('no home'); });
  await step('resume after reload', async () => { await p.goto(url + '#home'); await p.waitForTimeout(400); await p.evaluate(() => { const c = curSess(); startSession(c.u, c.d, c.s); LZ.i = 3; renderLez(); }); await p.waitForTimeout(300);
    await p.reload(); await p.waitForTimeout(900); await p.goto(url + '#home'); await p.waitForTimeout(400); const tx = await p.textContent('#prog'); if (!/donde quedaste · paso 4/.test(tx)) throw new Error(tx.slice(0, 200));
    await t('#prog [data-sess]', 300); const i = await p.evaluate(() => LZ.i); if (i !== 3) throw new Error('i=' + i); });
  await step('send while busy keeps text + toast', async () => { await p.goto(url + '#parla'); await p.waitForTimeout(300); await p.evaluate(() => openChat(sceneById('anag'))); await p.waitForTimeout(300); await p.fill('#chatIn', 'Buongiorno'); await t('#sendBtn', 50); await p.fill('#chatIn', 'Ancora'); await p.evaluate(() => send()); const v = await p.inputValue('#chatIn'); if (v !== 'Ancora') throw new Error('lost text'); await p.waitForTimeout(800); await t('#chatBack', 200); });
  await p.goto(url + '#home'); await p.waitForTimeout(500); await p.screenshot({ path: 'check/p_home2.png', fullPage: true });
  const long = await p.evaluate(() => window.__long); console.log('long tasks >50ms:', long.length, 'max', Math.max(0, ...long));
  console.log('overflow:', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no errors');
  await b.close();
})();
