/* ============================== OFFLINE-FIRST ==============================
   Everything works without AI: exercises, stories, maps, sprints and guided conversations come from
   the built-in bank (content4*.js) and the dictionary (dict.js). AI is used for the search box,
   words missing from the dictionary and — only if the learner chooses it — free chat with Giulia. */
const IT_TITLES={u1:"Presentarsi",u2:"Al bar e al ristorante",u3:"Fare acquisti",u4:"Muoversi",u5:"Casa e burocrazia",u6:"La mia giornata",u7:"Raccontare il giorno",u8:"Viaggi e uscite",u9:"Persone e gusti",u10:"Progetti",u11:"Salute e problemi",u12:"Opinioni"};
function aiFull(){return !!sample&&S.aiMode==="full";}
UNITS.forEach(U=>{const B=X[U.id]||{};U.extra=(B.gx||[]).map(parseGx);U.gconv=(B.gc||[]).map((c,i)=>Object.assign({id:U.id+"g"+i,u:U.id,c:U.c},c));
  U.stories=(B.st||[]).map(s=>{const [ti,te]=s.t.split("|");return{title_it:ti,title_es:te,image_es:s.img,lines:s.l.trim().split("\n").map(l=>{const [it,es]=l.split("|");return{it,es};}),questions:s.q.trim().split("\n").map(l=>{const [q,a]=l.split("|");return{q_it:q,a_it:a};})};});
  U.buildChain=(B.build||"").trim().split("\n").filter(Boolean).map(l=>{const [es,it]=l.split("|");return{es,it};});U.mapLabels=B.map||[];});
const unlockedUnits=()=>{const r=R();return UNITS.slice(0,Math.max(2,(r.placed?r.u:0)+1));};
const ALL_CONVS=()=>UNITS.flatMap(U=>U.gconv);

/* ---------- dictionary lookup ---------- */
function dictLookup(w){const k=String(w||"").toLowerCase().replace(/[’‘]/g,"'").trim();const v=DICT[k]||DICT[k.replace(/'$/,"")]||DICT[k+"'"]||DICT[stripAcc(k)];if(!v)return null;
  const [es,base]=v.split("|");const bare=(base||"").replace(/^(il|lo|la|l'|i|gli|le|un|una|un')\s*/,"");const bv=base&&DICT[bare.toLowerCase()];
  return{es,base:base||"",base_es:base&&bv?bv.split("|")[0]:"",bad:es.startsWith("✗")};}

/* ---------- guided conversation engine ---------- */
function gMatch(ans,keys){const t=" "+nrm(ans)+" ";return String(keys).split("+").every(g=>g.split("/").some(a=>{const n=nrm(a);return n&&t.includes(n);}));}
function runGuided(host,conv,opt={}){let i=0,ok=0,tries=0;const said=[];
  host.innerHTML=`<div class="spread"><div style="min-width:0"><div class="cap">${esc(conv.t)} · ${esc(conv.who)}</div><div class="small muted">Tu papel: ${esc(conv.me)} · te tratan de ${conv.reg==="lei"?"Lei (usted)":"tu"}</div></div><span class="meta dk" id="gcN">1/${conv.turns.length}</span></div>
   <div class="col" id="gcMsgs" style="gap:10px"></div><div id="gcIn" class="col" style="gap:10px"></div>`;
  const msgs=host.querySelector("#gcMsgs"),box=host.querySelector("#gcIn");
  const bub=(who,it,es)=>{const d=document.createElement("div");
    if(who==="a"){d.className="bub tu c-"+(conv.c||"green");d.innerHTML=`<div class="it">${wz(it)}</div><div class="es" hidden>${esc(es)}</div><div class="tools"><button class="mini" data-act="say">${ICON_SPK}Escuchar</button><button class="mini" data-act="slow">${ICON_SLOW}Lento</button><button class="mini" data-act="tr">Traducir</button></div>`;
      d.querySelector('[data-act="say"]').onclick=()=>speak(it,{alt:true});d.querySelector('[data-act="slow"]').onclick=()=>speak(it,{alt:true,rate:.7});
      d.querySelector('[data-act="tr"]').onclick=e=>{const x=d.querySelector(".es");x.hidden=!x.hidden;e.currentTarget.textContent=x.hidden?"Traducir":"Ocultar";};}
    else{d.className="bub me";d.innerHTML=`<div class="it">${esc(it)}</div>`;}
    msgs.appendChild(d);setTimeout(()=>d.scrollIntoView({block:"nearest"}),30);return d;};
  const turn=()=>{if(i>=conv.turns.length){finish();return;}const T=conv.turns[i];tries=0;host.querySelector("#gcN").textContent=`${i+1}/${conv.turns.length}`;
    bub("a",T[0],T[1]);if(S.autoplay)speak(T[0],{alt:true});ask();};
  const ask=()=>{const T=conv.turns[i];
    box.innerHTML=`<form class="search" id="gcForm" style="align-items:flex-end"><textarea id="gcTa" rows="1" class="field" style="flex:1;border:0;background:transparent;resize:none;min-height:44px;padding:10px 6px" placeholder="Respondé en italiano…" aria-label="Tu respuesta"></textarea>
      ${dict?`<button type="button" class="round mic" id="gcMic" aria-label="Hablar">${ICON_MIC}</button>`:""}<button class="round on" aria-label="Enviar">${ICON_PLAY}</button></form>
      <div class="row"><button class="pill ghost" id="gcHint">💡 Pista</button><button class="pill ghost" id="gcShow">Ver la respuesta</button></div><div id="gcFb"></div>`;
    const ta=box.querySelector("#gcTa");setTimeout(()=>{if(!dict)ta.focus();},150);
    box.querySelector("#gcHint").onclick=()=>{box.querySelector("#gcFb").innerHTML=`<div class="panel small">💡 ${esc(T[5])}</div>`;};
    box.querySelector("#gcShow").onclick=()=>reveal(false,null);
    const mic=box.querySelector("#gcMic");mic&&(mic.onclick=()=>micToggle(t=>{ta.value=t;},t=>{ta.value=t;if(t.trim())submit();}));
    ta.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submit();}});
    box.querySelector("#gcForm").onsubmit=e=>{e.preventDefault();submit();};
    function submit(){const v=ta.value.trim();if(!v)return;stopSpeak();bub("me",v);said.push(v);S.said=(S.said||0)+1;today().turns=(today().turns||0)+1;save();
      if(gMatch(v,T[2]))reveal(true,v);else{tries++;if(tries<2){ta.value="";box.querySelector("#gcFb").innerHTML=`<div class="panel small" style="border:1.5px solid var(--coral)"><b style="color:var(--coral)">Casi.</b> Probá otra vez · 💡 ${esc(T[5])}</div>`;}else reveal(false,v);}}};
  const reveal=(good,v)=>{const T=conv.turns[i];if(good&&tries===0)ok++;
    box.innerHTML=`<div class="panel" style="border:1.5px solid var(--${good?"green":"yellow"})"><b style="color:var(--${good?"green":"yellow"})">${good?"¡Bien! Un nativo también diría:":"Se dice así:"}</b>
      <div class="row" style="margin-top:6px"><span style="font-size:19px;font-weight:600;flex:1">${wz(T[3])}</span><button class="round" data-say="${esc(T[3])}" aria-label="Escuchar">${ICON_SPK}</button></div>
      <p class="small muted" style="margin-top:4px">${esc(T[4])}</p>${good?"":`<p class="small" style="margin-top:6px">Repetila en voz alta antes de seguir.</p>`}</div>
      <button class="go" id="gcNext" style="background:var(--yellow);color:var(--ink)"><span>${i+1<conv.turns.length?"Seguir":"Terminar"}</span><span class="play">${ICON_PLAY}</span></button>`;
    speak(T[3]);box.querySelector("#gcNext").onclick=()=>{i++;turn();};};
  const finish=()=>{const n=conv.turns.length;S.guided=Object.assign({},S.guided,{[conv.id]:Math.max((S.guided||{})[conv.id]||0,Math.round(ok/n*100))});save();if(ok/n>=.7)confetti();
    box.innerHTML=`<div class="blk c-${ok/n>=.7?"green":"salmon"}"><div class="t">${ok}/${n} a la primera</div><div class="s">${ok/n>=.8?"¡Muy bien! Ya podés tener esta charla en la vida real.":"Repetila mañana: la segunda vez sale mucho más fluida."}</div></div>
      <div class="panel"><div class="cap">Cómo lo dice un nativo</div>${conv.turns.map(T=>`<div class="word"><div class="w"><b>${wz(T[3])}</b><span>${esc(T[4])}</span></div><button class="round" data-say="${esc(T[3])}" aria-label="Escuchar">${ICON_SPK}</button></div>`).join("")}</div>
      <div class="row"><button class="pill solid" id="gcSave">${ICON_PLUS} Guardar las frases en Carte</button>${opt.onDone?`<button class="pill" id="gcDone">${esc(opt.doneLabel||"Seguir")}</button>`:""}</div>`;
    box.querySelector("#gcSave").onclick=e=>{conv.turns.forEach(T=>addCustom(T[3],T[4],"Conversación: "+conv.t,"conv"));updateBadge();e.currentTarget.innerHTML=ICON_CHECK+" Guardadas";e.currentTarget.disabled=true;};
    const dn=box.querySelector("#gcDone");dn&&(dn.onclick=()=>opt.onDone({ok,n,said:said.length}));};
  turn();}

/* ---------- local sprint plan ---------- */
function localSprintPlan(){const us=unlockedUnits();const recent=(S.sprints||[]).slice(-3).map(x=>x.theme);
  const pool=us.filter(U=>!recent.includes(U.t));const U=(Math.random()<.6?pool.slice(-3):pool)[Math.floor(Math.random()*Math.min(Math.random()<.6?3:pool.length,pool.length))]||us[us.length-1];
  const conv=U.gconv[Math.floor(Math.random()*U.gconv.length)];const X0=U.les.map(id=>LESSON_X[id]).find(Boolean);
  return{local:true,unit:U.id,theme_es:U.t,me_es:conv?conv.me:"",targets:shuffle(U.chunks).slice(0,5),build:U.buildChain,conv,
    talk:{goal_es:"Respondé cada frase en italiano: si te trabás, usá la pista."},speed:shuffle(U.speed).map(s=>({q_it:s.q_it,a_it:s.a_it,a_es:""})),tip_es:X0?X0.memo||X0.rule:U.can[2]};}

/* ---------- local story & map ---------- */
function nextLocalStory(theme){const us=unlockedUnits();const seen=S.storiesSeen||{};
  let cand=us.flatMap(U=>U.stories.map((s,k)=>({U,s,k}))).filter(x=>!theme||x.U.t===theme||x.U.id===theme);
  if(!cand.length)cand=us.flatMap(U=>U.stories.map((s,k)=>({U,s,k})));
  const fresh=cand.filter(x=>!seen[x.U.id+x.k]);const pick=(fresh.length?fresh:cand)[Math.floor(Math.random()*(fresh.length?fresh:cand).length)];
  S.storiesSeen=Object.assign({},seen,{[pick.U.id+pick.k]:1});save();return pick;}
function unitMapData(U){return{center_it:IT_TITLES[U.id]||U.t,center_es:U.t,branches:U.mapLabels.map((l,i)=>{const [it,es]=l.split("|");return{it,es,items:U.chunks.slice(i*4,i*4+4)};})};}
