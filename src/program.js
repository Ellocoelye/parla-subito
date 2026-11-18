/* ============================== PROGRAM: «Ruta» ==============================
   12 weekly units. Each day = Mañana (input, rule, controlled practice) + Noche (retrieval, ear,
   conversation, fluency). Day 7 = exam (≥70% unlocks the next unit). A placement test sets the start. */
function parseGx(s){const p=String(s).split("|");
  if(p[0]==="t")return{k:"type",prompt:`<div class="exq">${esc(p[1])}</div>`,answers:p[2].split("~"),why:p[3]||""};
  const opts=p[2].split("/").map(x=>x.trim());const a=+p[3]||0;
  if(p[0]==="e")return{k:"choice",prompt:`<span class="cap" style="color:var(--coral)">Encontrá el error</span><div class="exq" style="text-decoration:line-through;text-decoration-color:var(--coral);text-decoration-thickness:2px">${esc(p[1])}</div><div class="small muted">¿Cuál es la forma correcta?</div>`,opts,a,why:p[4]||"",full:opts[a]};
  return{k:"choice",prompt:`<div class="exq">${esc(p[1]).replace("___",'<span class="gap">___</span>')}</div>`,opts,a,why:p[4]||"",full:p[1].replace(/\s*\([^)]*\)\s*(?=[.!?]?$)/,"").replace("___",opts[a])};}
const UNITS=UNITS_RAW.map((u,i)=>Object.assign({},u,{n:i+1,
  chunks:u.ch.trim().split("\n").map(l=>{const [it,es]=l.split("|");return{it:it.trim(),es:(es||"").trim()};}),
  items:u.gx.map(parseGx),
  lines:u.dlg.trim().split("\n").map(l=>{const m=l.match(/^([AT]): (.+?) \| (.+)$/);return{who:m[1],it:m[2],es:m[3]};}),
  speed:u.sp.trim().split("\n").map(l=>{const [q,a]=l.split("|");return{q_it:q,a_it:a};}),
  place:u.pl.map(parseGx)}));
const SESS={m:"Mañana",n:"Noche",x:"Examen",p:"Prueba de nivel"};
const TOTAL_SESS=UNITS.length*13;
function R(){if(!S.route||typeof S.route!=="object")S.route={};const r=S.route;
  r.u=r.u||0;r.d=r.d||1;r.s=r.s||"m";r.done=r.done||{};r.exam=r.exam||{};r.log=r.log||[];r.mis=r.mis||{};return r;}
const sessKey=(u,d,s)=>UNITS[u].id+"d"+d+s;
function curSess(){const r=R();return{u:r.u,d:r.d,s:r.d>=7?"x":r.s};}
function routePct(){return Math.min(1,Object.keys(R().done).filter(k=>/^u\d+d\d[mnx]$/.test(k)).length/TOTAL_SESS);}
function unitState(i){const r=R();if(r.exam[UNITS[i].id]!=null)return "done";if(i<r.u)return "done";if(i===r.u)return "cur";return "lock";}
function advance(u,d,s,score){const r=R();r.done[sessKey(u,d,s)]=Date.now();r.log=[...r.log,{k:sessKey(u,d,s),day:dayKey(),score:Math.round((score||0)*100)}].slice(-300);
  if(u===r.u){if(s==="x"){if(score>=.7){r.exam[UNITS[u].id]=Math.max(r.exam[UNITS[u].id]||0,Math.round(score*100));if(r.u<UNITS.length-1){r.u++;r.d=1;r.s="m";}else r.finished=1;}}
    else if(d===r.d&&s===r.s){if(s==="m")r.s="n";else{r.d++;r.s="m";}}}
  else if(s==="x"&&score>=.7)r.exam[UNITS[u].id]=Math.max(r.exam[UNITS[u].id]||0,Math.round(score*100));
  delete r.cur;const t=today();t.lz=(t.lz||0)+1;saveNow();}
function levelForUnit(u){return u<=2?"A1":u<=6?"A2":"B1";}

/* ---------- item generators ---------- */
const plain=s=>String(s).replace(/[.,!?¿¡…:;]/g,"").replace(/\s+/g," ").trim();
function nrm(s){return stripAcc(String(s).toLowerCase().replace(/[’‘`´]/g,"'")).replace(/[^a-z0-9' ]/g," ").replace(/\s+/g," ").trim();}
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,j)=>j);
  for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}return p[n];}
function checkTyped(v,answers){const a=nrm(v);let best=99,ans=answers[0];for(const x of answers){const d=lev(a,nrm(x));if(d<best){best=d;ans=x;}}
  if(best===0)return{ok:true,exact:true,ans};if(best<=Math.max(1,Math.floor(nrm(ans).length/12)))return{ok:true,exact:false,ans};return{ok:false,ans};}
function gramItems(U,d){const it=U.items;if(d===1)return it.slice(0,7);if(d===2)return it.slice(6);return shuffle(it).slice(0,8);}
function orderItem(c){return{k:"order",es:c.es,it:c.it};}
function speakItem(c){return{k:"speak",es:c.es,it:c.it};}
function clozeItem(c,pool){const words=plain(c.it).split(" ");const cand=words.map((w,i)=>[w,i]).filter(([w])=>w.replace(/'/g,"").length>=4);if(!cand.length)return speakItem(c);
  const [w,idx]=cand[Math.random()*cand.length|0];const others=shuffle([...new Set(pool.flatMap(x=>plain(x.it).split(" ")).filter(x=>x.length>=4&&nrm(x)!==nrm(w)))]).slice(0,2);
  if(others.length<2)return speakItem(c);const shown=plain(c.it).split(" ").map((x,i)=>i===idx?"___":x).join(" ");
  return{k:"choice",prompt:`<div class="small muted">${esc(c.es)}</div><div class="exq">${esc(shown).replace("___",'<span class="gap">___</span>')}</div>`,opts:[w,...others],a:0,full:c.it,why:""};}
function meaningItem(c,pool){const others=shuffle(pool.filter(x=>x.es!==c.es)).slice(0,3).map(x=>x.es);
  return{k:"choice",say:c.it,prompt:`<div class="exq" style="font-size:22px">Escuchá: ¿qué significa?</div>`,opts:[c.es,...others],a:0,full:c.it,why:"",reveal:c.it};}
function toItItem(c,pool){const others=shuffle(pool.filter(x=>x.it!==c.it)).slice(0,2).map(x=>x.it);
  return{k:"choice",prompt:`<div class="small muted">¿Cómo se dice?</div><div class="exq">${esc(c.es)}</div>`,opts:[c.it,...others],a:0,full:c.it,why:""};}
function dictItem(c){return{k:"type",say:c.it,prompt:`<div class="exq" style="font-size:22px">Escuchá y escribí</div>`,answers:[c.it],why:c.es,dict:true};}
function prodItems(known){const k=shuffle(known);const ord=k.filter(c=>{const n=plain(c.it).split(" ").length;return n>=3&&n<=8;});
  return shuffle([...ord.slice(0,2).map(orderItem),...k.slice(0,2).map(speakItem),...k.slice(2,4).map(c=>clozeItem(c,known))]);}
function recallItems(list,known){const it=list.map(speakItem);if(known.length>=4)it.push({k:"match",pairs:shuffle(known).slice(0,4)});return it;}
function earItems(known){const short=[...known].sort((a,b)=>a.it.length-b.it.length).slice(0,8);return [...shuffle(short).slice(0,2).map(dictItem),...shuffle(known).slice(0,3).map(c=>meaningItem(c,known))];}
function examItems(U){const k=U.chunks;return [...shuffle(U.items).slice(0,8),...shuffle(k).slice(0,4).map(c=>toItItem(c,k)),...shuffle(k).slice(0,3).map(c=>meaningItem(c,k))];}
async function aiExtras(U){if(!sample)return[];const errs=Object.entries((S.mem||{}).errs||{}).sort((a,b)=>b[1]-a[1]).slice(0,4).map(e=>e[0]);
  try{const r=await ai(`Create 5 NEW Italian grammar exercises for an Argentine (rioplatense Spanish) learner. Grammar of the unit: "${U.g}". Context: "${U.sit}" in Calabria. Level ${levelForUnit(UNITS.indexOf(U))}.${errs.length?` He often fails: ${errs.join(", ")}.`:""}
Types: "g" = short sentence containing ___ plus 3 options where exactly ONE is correct; "e" = a short sentence with ONE typical Spanish-speaker mistake plus 3 candidate corrections where exactly ONE is correct.
Natural, everyday, short. Do not reuse these: ${U.items.slice(0,6).map(x=>x.full||"").join(" | ")}.
Reply only with JSON {"items":[{"type":"g" or "e","q": string,"opts":[3 strings],"a": index of the correct option,"why_es": rule in rioplatense Spanish with voseo, max 14 words}]}`,{modelTier:"default"});
    let items=(r.items||[]).filter(x=>x&&(x.type==="g"||x.type==="e")&&Array.isArray(x.opts)&&x.opts.length===3&&x.q&&(x.type==="e"||x.q.includes("___"))&&+x.a>=0&&+x.a<3)
      .slice(0,5);
    /* Second opinion: keep only items a careful native-speaker check approves. */
    try{const v=await ai(`You are a strict native Italian teacher. Check these exercises for an Argentine learner. Approve an item only if: the Italian is 100% correct and natural, exactly ONE option is correct, the marked answer (index "a") is that option, and the Spanish explanation is right.
${JSON.stringify(items)}
Reply only with JSON {"approved":[indexes of approved items]}`,{modelTier:"default",noQ:true});
      if(v&&Array.isArray(v.approved))items=items.filter((_,i)=>v.approved.map(Number).includes(i));}catch(e){}
    return items.map(x=>Object.assign(parseGx([x.type,x.q,x.opts.map(o=>String(o).replace(/[\/|]/g," ")).join("/"),x.a,x.why_es||""].map(v=>String(v).replace(/\|/g," ")).join("|")),{ai:1}));}
  catch(e){return[];}}

/* ---------- session plan ---------- */
function buildSession(u,d,s){const U=UNITS[u];const newCh=d<=5?U.chunks.slice((d-1)*4,d*4):[];const known=U.chunks.slice(0,Math.min(5,d)*4);const steps=[];
  if(s==="m"){steps.push({k:"review",t:"Repaso",min:5});
    if(newCh.length)steps.push({k:"new",t:"Frases nuevas",min:4,chunks:newCh});
    steps.push({k:"rule",t:d===1?"La regla":"Recordá la regla",min:d===1?5:3,full:d===1});
    steps.push({k:"ex",t:"Gramática",min:6,items:gramItems(U,d),ai:d>=3,tag:U.tag});
    steps.push({k:"ex",t:"Producción",min:5,items:prodItems(known)});
    steps.push({k:"dlg",t:"Diálogo",min:4,mode:d%2?"shadow":"role"});}
  else if(s==="n"){const today4=newCh.length?newCh:shuffle(known).slice(0,4);
    steps.push({k:"ex",t:"Recordar",min:4,items:recallItems(today4,known),grade:true});
    steps.push({k:"ex",t:"Oído",min:5,items:earItems(known)});
    steps.push({k:"talk",t:"Conversación",min:8,targets:[...today4,...shuffle(known.filter(c=>!today4.includes(c))).slice(0,1)]});
    steps.push({k:"speed",t:"Ronda rápida",min:2});
    if(d===6)steps.push({k:"story",t:"Historia loca",min:4,words:shuffle(known).slice(0,8)});
    else if(d%2===0)steps.push({k:"pron",t:"Pronuncia",min:3});
    steps.push({k:"mission",t:"Misión",min:1});}
  else if(s==="x"){steps.push({k:"review",t:"Repaso",min:5});steps.push({k:"exam",t:"Examen",min:10,items:examItems(U)});steps.push({k:"mono",t:"Monólogo",min:3});}
  else if(s==="p"){steps.push({k:"place",t:"Prueba de nivel",min:6});}
  return steps;}
const sessMin=(u,d,s)=>buildSession(u,d,s).reduce((a,x)=>a+x.min,0);

/* ---------- lesson runner ---------- */
let LZ=null;
function startSession(u,d,s){unlockAudio();const r=R();
  const replay=s!=="p"&&!(u===r.u&&(s==="x"||(d===r.d&&s===(r.d>=7?"x":r.s))));
  LZ={u,d,s,steps:buildSession(u,d,s),i:0,res:[],t0:Date.now(),replay};
  /* Resume where you left off (the phone may close or reload the app mid-session). */
  const cu=r.cur;if(s!=="p"&&cu&&cu.u===u&&cu.d===d&&cu.s===s&&Date.now()-(cu.at||0)<20*3600e3&&cu.i>0){LZ.i=Math.min(cu.i,LZ.steps.length-1);if(cu.talk)LZ.talkDone={said:cu.talk,used:0};}
  if(s!=="p"&&LZ.steps.some(x=>x.ai)&&sample)LZ.aiP=aiExtras(UNITS[u]).then(x=>{if(LZ)LZ.aiItems=x;return x;});
  if(location.hash!=="#lez")location.hash="#lez";else renderLez();}
function lezTitle(){if(LZ.s==="p")return "Prueba de nivel";const U=UNITS[LZ.u];return `Semana ${U.n} · ${LZ.s==="x"?"Examen":"Día "+LZ.d+" · "+SESS[LZ.s]}`;}
function renderLez(){if(!LZ){location.hash="#home";return;}clearInterval(LZ.tm);stopSpeak();
  const head=$("#lezHead"),body=$("#lezBody");
  const st=LZ.steps[LZ.i];
  head.innerHTML=`<div class="spread"><button class="round" id="lzX" aria-label="Salir de la lección">✕</button><div class="small muted" style="flex:1;text-align:center">${esc(lezTitle())}</div><span class="meta dk">${Math.min(LZ.i+1,LZ.steps.length)}/${LZ.steps.length}</span></div>
   <div class="phases">${LZ.steps.map((x,i)=>`<span class="${i<LZ.i?"done":i===LZ.i?"on":""}"></span>`).join("")}</div>
   ${st?`<div class="spread"><span class="cap">${esc(st.t)}</span><span class="tiny muted">~${st.min} min</span></div>`:""}`;
  $("#lzX").onclick=()=>openSheet(`<h2 class="mid">¿Salir de la lección?</h2><p class="muted" style="margin:10px 0">Las frases y tarjetas que ya hiciste quedan guardadas. La sesión se marca como hecha cuando llegás al final.</p><div class="row"><button class="pill solid" id="lzStay">Seguir</button><button class="pill" id="lzLeave">Salir</button></div>`,()=>{$("#lzStay").onclick=closeSheet;$("#lzLeave").onclick=()=>{closeSheet();LZ=null;location.hash="#home";};});
  if(!st){finishSession(body);return;}
  if(LZ.s!=="p"){R().cur={u:LZ.u,d:LZ.d,s:LZ.s,i:LZ.i,talk:LZ.talkDone?(LZ.talkDone.said||1):0,at:Date.now()};save();}
  const fn={review:stReview,new:stNew,rule:stRule,ex:stEx,dlg:stDlg,talk:stTalk,speed:stSpeed,story:stStory,pron:stPron,mission:stMission,exam:stExam,mono:stMono,place:stPlace}[st.k];
  body.innerHTML="";fn(body,st);window.scrollTo(0,0);}
function nextStep(res){if(!LZ)return;if(res)LZ.res.push(Object.assign({t:LZ.steps[LZ.i].t},res));LZ.i++;renderLez();}
const nextBtn=(label="Seguir")=>`<button class="go" data-next style="background:var(--yellow);color:var(--ink)"><span>${label}</span><span class="play">${ICON_PLAY}</span></button>`;
function bindNext(host,res){const b=host.querySelector("[data-next]");b&&(b.onclick=()=>nextStep(typeof res==="function"?res():res));}

/* step: spaced review (FSRS) */
function stReview(host){const ids=[...learnIds(),...dueIds()].filter((id,i,a)=>a.indexOf(id)===i&&DECK_BY[id]&&DECK_BY[id].g!=="rule").slice(0,15);
  if(!ids.length){host.innerHTML=`<div class="blk c-green"><div class="t">Nada para repasar</div><div class="s">Tus tarjetas están al día. Vamos directo a lo nuevo.</div>${nextBtn()}</div>`;bindNext(host);return;}
  const q=ids.map(id=>({id}));let i=0,ok=0;const again={};
  const show=()=>{if(i>=q.length){host.innerHTML=`<div class="blk c-green"><div class="t">Repaso hecho</div><div class="s">${q.length} tarjetas · ${ok} bien</div>${nextBtn()}</div>`;bindNext(host,{ok,n:q.length});return;}
    const c=DECK_BY[q[i].id];const noEs=!c.es;
    host.innerHTML=`<div class="small muted">${i+1} de ${q.length} · decila en voz alta antes de ver</div>
     <div class="fc c-${COLORS[i%6]}" style="min-height:260px"><span class="mode">${noEs?"Escuchá y repetí":"En italiano"}</span><div class="q">${noEs?"🔊":esc(c.es)}</div>
      <div id="rvA"></div><div style="flex:1"></div><button class="go" id="rvShow"><span>Ya lo dije · ver</span><span class="play">${ICON_PLAY}</span></button></div>`;
    if(noEs)speak(c.it);
    $("#rvShow").onclick=()=>{$("#rvA").innerHTML=`<div class="a" style="font-size:26px;font-weight:600">${wz(c.it)}</div>`;speak(c.it);
      $("#rvShow").outerHTML=`<div class="grades" style="grid-template-columns:repeat(3,1fr)"><button data-g="1">Otra vez</button><button data-g="3">Bien</button><button data-g="4">Fácil</button></div>`;
      $$(".grades [data-g]",host).forEach(b=>b.onclick=()=>{const g=+b.dataset.g;grade(q[i].id,g);if(g>1)ok++;else if(!again[q[i].id]){again[q[i].id]=1;q.splice(Math.min(q.length,i+3),0,{id:q[i].id});}save();i++;show();});};};
  show();}
/* step: new chunks (input + immediate production) */
function stNew(host,st){const U=UNITS[LZ.u];let i=0;
  const show=()=>{if(i>=st.chunks.length){st.chunks.forEach(c=>addCustom(c.it,c.es,`Semana ${U.n}: ${U.t}`,"conv",{u:U.id}));updateBadge();
      host.innerHTML=`<div class="blk c-green"><div class="t">${st.chunks.length} frases nuevas</div><div class="s">Ya están en tus tarjetas. Esta noche las recuperás de memoria: eso es lo que las fija.</div></div>
      <div class="panel">${st.chunks.map(c=>`<div class="word"><div class="w"><b>${wz(c.it)}</b><span>${esc(c.es)}</span></div><button class="round" data-say="${esc(c.it)}" aria-label="Escuchar">${ICON_SPK}</button></div>`).join("")}</div>${nextBtn()}`;bindNext(host);return;}
    const c=st.chunks[i];
    host.innerHTML=`<div class="small muted">${i+1} de ${st.chunks.length} · escuchá, repetí dos veces en voz alta copiando la melodía</div>
     <div class="blk c-${U.c}"><div class="big-it">${wz(c.it)}</div><div class="s" style="margin-top:8px">${esc(c.es)}</div>
      <div class="row" style="margin-top:14px"><button class="round ink" data-say="${esc(c.it)}" aria-label="Escuchar">${ICON_SPK}</button><button class="pill dark" id="nwSlow">${ICON_SLOW} Lento</button></div>
      <button class="go" id="nwGo"><span>La repetí · siguiente</span><span class="play">${ICON_PLAY}</span></button></div>`;
    speak(c.it);$("#nwSlow").onclick=()=>speak(c.it,{rate:.7});$("#nwGo").onclick=()=>{i++;show();};};
  show();}
/* step: grammar rule (full on day 1, retrieval of rule cards later) */
function ruleHTML(U){let h=U.rx?`<div class="panel expl">${U.rx}</div>`:"";
  U.les.forEach(id=>{const X=LESSON_X[id];if(!X)return;h+=`<div class="panel" style="border:1.5px solid var(--yellow)"><div class="cap" style="color:var(--yellow)">La regla</div><p style="margin-top:6px">${esc(X.rule)}</p>
    ${X.memo?`<div class="cap" style="margin-top:12px">Para acordarte</div><p style="margin-top:4px">${esc(X.memo)}</p>`:""}
    ${(X.ex||[]).length?`<div class="col" style="gap:6px;margin-top:10px">${X.ex.slice(0,4).map(e=>`<div class="word"><div class="w"><b>${wz(e[0])}</b><span>${esc(e[1])}</span></div><button class="round" data-say="${esc(e[0])}" aria-label="Escuchar">${ICON_SPK}</button></div>`).join("")}</div>`:""}
    ${(X.traps||[]).length?`<div class="cap" style="margin-top:12px;color:var(--coral)">Trampas</div>${X.traps.slice(0,3).map(t=>`<p class="small" style="margin-top:4px">✗ ${esc(t[0])} → ✓ <b>${esc(t[1])}</b> · ${esc(t[2])}</p>`).join("")}`:""}
    <button class="pill" data-full="${id}" style="margin-top:12px">Ver la explicación completa</button></div>`;});return h;}
function stRule(host,st){const U=UNITS[LZ.u];const rcs=U.les.flatMap(id=>(LESSON_X[id]&&LESSON_X[id].rc)||[]);
  const bindFull=()=>$$("[data-full]",host).forEach(b=>b.onclick=()=>{const L=LESSONS.find(l=>l.id===b.dataset.full);if(!L)return;openSheet(`<div class="spread"><h2 class="mid">${esc(L.t)}</h2><button class="round" id="lfX" aria-label="Cerrar">✕</button></div><div class="expl" style="margin-top:10px">${L.html}</div>`,()=>{$("#lfX").onclick=closeSheet;wordifyDom($("#sheet"));});});
  if(st.full||!rcs.length){host.innerHTML=`<div class="blk c-${U.c}"><div class="t" style="font-size:22px">${esc(U.g)}</div><div class="s">${esc(U.can[2]||"")}</div></div>${ruleHTML(U)}${nextBtn("Entendido: a practicar")}`;
    wordifyDom(host);bindFull();bindNext(host);return;}
  const qs=shuffle(rcs).slice(0,3);let i=0;
  const show=()=>{if(i>=qs.length){host.innerHTML=`<div class="blk c-${U.c}"><div class="t">Regla repasada</div><div class="s">Recordarla antes de verla la fija más que releerla.</div><button class="pill dark" id="ruSee" style="margin-top:10px">Ver la regla completa</button></div>${nextBtn()}`;
      $("#ruSee").onclick=()=>{host.querySelector("#ruSee").remove();host.insertAdjacentHTML("beforeend",ruleHTML(U));wordifyDom(host);bindFull();};bindNext(host);return;}
    const q=qs[i];host.innerHTML=`<div class="small muted">${i+1} de ${qs.length} · respondé en voz alta antes de ver</div>
     <div class="fc c-lime" style="min-height:220px"><span class="mode">Regla</span><div class="q" style="font-size:24px">${esc(q[0])}</div><div id="ruA"></div><div style="flex:1"></div><button class="go" id="ruShow"><span>Ver respuesta</span><span class="play">${ICON_PLAY}</span></button></div>`;
    $("#ruShow").onclick=()=>{$("#ruA").innerHTML=`<p style="font-size:18px;font-weight:600">${esc(q[1])}</p>${q[2]?`<p style="margin-top:6px">${wz(q[2])}</p>`:""}`;if(q[2])speak(q[2]);
      $("#ruShow").querySelector("span").textContent="Siguiente";$("#ruShow").onclick=()=>{i++;show();};};};
  show();}
/* step: exercise set */
function stEx(host,st){let items=st.items;
  const go=()=>runEx(host,items,{requeue:true,tag:st.tag,grade:st.grade,onDone:res=>{
    host.innerHTML=`<div class="blk c-${res.ok/Math.max(1,res.n)>=.7?"green":"salmon"}"><div class="t">${esc(st.t)}: ${res.ok}/${res.n}</div><div class="s">${res.ok/Math.max(1,res.n)>=.8?"¡Muy bien!":res.ok/Math.max(1,res.n)>=.6?"Bien. Lo que fallaste vuelve en el repaso.":"Esto todavía cuesta: lo vas a ver de nuevo."}</div></div>
     ${res.wrong.length?`<div class="panel"><div class="cap">Para revisar</div>${res.wrong.map(w=>`<div class="word"><div class="w"><b>${wz(w.full||w.it||(w.answers&&w.answers[0])||"")}</b>${w.why?`<span>${esc(w.why)}</span>`:""}</div>${(w.full||w.it)?`<button class="round" data-say="${esc(w.full||w.it)}" aria-label="Escuchar">${ICON_SPK}</button>`:""}</div>`).join("")}</div>`:""}${nextBtn()}`;bindNext(host,res);}});
  if(st.ai&&LZ.aiP&&!LZ.aiItems){host.innerHTML=`<div class="panel small muted">Claude está armando ejercicios extra según lo que te cuesta…</div>`;
    const to=new Promise(r=>setTimeout(()=>r(null),6000));Promise.race([LZ.aiP,to]).then(()=>{if(!LZ||LZ.steps[LZ.i]!==st)return;if(LZ.aiItems)items=[...items,...LZ.aiItems];go();});return;}
  if(st.ai&&LZ.aiItems&&!st.merged){st.merged=1;items=[...items,...LZ.aiItems];}
  go();}
function bumpErr(tag){if(!tag)return;S.mem=S.mem||{topics:[],facts:[],errs:{},errEx:{}};S.mem.errs[tag]=(S.mem.errs[tag]||0)+1;}
function runEx(host,items,opt){const q=items.map(x=>Object.assign({},x));let i=0,ok=0,n=0;const wrong=[];const total=q.length;
  const counter=()=>`<div class="spread"><span class="small muted">${Math.min(i+1,q.length)} de ${q.length}</span><span class="small muted">${ok} bien</span></div><div class="bar"><i style="width:${Math.round(i/q.length*100)}%"></i></div>`;
  const done=(it,correct)=>{if(!it.re){n++;if(correct)ok++;else{wrong.push(it);bumpErr(opt.tag);}}
    if(opt.onAnswer)opt.onAnswer(it,correct);
    if(opt.grade&&it.k==="speak"){const id=addCustom(it.it,it.es,"","conv");id&&grade(id,correct?3:1);}
    if(!correct&&opt.requeue&&!it.re&&it.k!=="match")q.splice(Math.min(q.length,i+3),0,Object.assign({},it,{re:1,perm:null,ans:null,done:0}));};
  const fb=(correct,it,extra="")=>{const el=host.querySelector("#exFb");const full=it.full||it.it||"";
    el.innerHTML=`<div class="panel" style="border:1.5px solid var(--${correct?"green":"coral"});animation:pop .35s var(--spring) both"><b style="color:var(--${correct?"green":"coral"})">${correct?"¡Bien!":"Así es:"}</b> ${extra}
     ${full?`<div class="row" style="margin-top:6px"><span style="font-size:19px;font-weight:600;flex:1">${wz(full)}</span><button class="round" data-say="${esc(full)}" aria-label="Escuchar">${ICON_SPK}</button></div>`:""}
     ${it.why?`<p class="small muted" style="margin-top:6px">${esc(it.why)}</p>`:""}</div>${nextBtn("Siguiente")}`;
    if(full)speak(full);el.querySelector("[data-next]").onclick=()=>{i++;show();};el.scrollIntoView({block:"nearest"});};
  const show=()=>{if(opt.stop&&opt.stop()){opt.onDone({ok,n,wrong,stopped:true});return;}
    if(i>=q.length){opt.onDone({ok,n:Math.max(n,total),wrong});return;}
    const it=q[i];const sayBtn=it.say?`<button class="round ink" id="exPlay" aria-label="Escuchar" style="width:64px;height:64px">${ICON_SPK}</button><button class="pill dark" id="exSlow">${ICON_SLOW} Lento</button>`:"";
    if(it.k==="choice"){it.perm=it.perm||shuffle(it.opts.map((_,k)=>k));
      host.innerHTML=`${counter()}<div class="blk c-stone exbox">${it.say?`<div class="row" style="margin-bottom:10px">${sayBtn}</div>`:""}${it.prompt}</div>
       <div class="exopts">${it.perm.map(k=>`<button data-k="${k}">${esc(it.opts[k])}</button>`).join("")}</div><div id="exFb"></div>`;
      $$(".exopts button",host).forEach(b=>b.onclick=()=>{if(it.ans!=null)return;it.ans=+b.dataset.k;const c=it.ans===it.a;
        $$(".exopts button",host).forEach(x=>{const k=+x.dataset.k;x.disabled=true;if(k===it.a)x.classList.add("ok");else if(k===it.ans)x.classList.add("bad");});
        done(it,c);fb(c,it);});}
    else if(it.k==="type"){host.innerHTML=`${counter()}<div class="blk c-stone exbox">${it.say?`<div class="row" style="margin-bottom:10px">${sayBtn}</div>`:""}${it.prompt}</div>
       <form id="exForm" class="search"><input id="exIn" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escribí en italiano…" aria-label="Respuesta"><button class="round on" aria-label="Comprobar">${ICON_CHECK}</button></form><div id="exFb"></div>`;
      setTimeout(()=>{const x=$("#exIn");x&&!it.say&&x.focus();},100);
      $("#exForm").onsubmit=e=>{e.preventDefault();if(it.done)return;const v=$("#exIn").value.trim();if(!v)return;it.done=1;$("#exIn").blur();const r=checkTyped(v,it.answers);
        done(it,r.ok);it.full=it.full||r.ans;fb(r.ok,it,r.ok&&!r.exact?`Casi perfecto. Mirá la forma exacta:`:r.ok?"":`Escribiste «${esc(v)}».`);};}
    else if(it.k==="order"){const toks=plain(it.it).split(" ");const pool=shuffle(toks.map((w,k)=>({w,k})));const picked=[];
      const draw=()=>{host.innerHTML=`${counter()}<div class="blk c-stone exbox"><span class="cap">Ordená la frase</span><div class="exq" style="font-size:22px;margin-top:6px">${esc(it.es)}</div></div>
         <div class="ansline">${picked.map((p,j)=>`<button class="tile on" data-u="${j}">${esc(p.w)}</button>`).join("")||`<span class="small muted">Tocá las palabras en orden</span>`}</div>
         <div class="tiles">${pool.map((p,j)=>picked.includes(p)?"":`<button class="tile" data-p="${j}">${esc(p.w)}</button>`).join("")}</div><div id="exFb"></div>`;
        $$("[data-p]",host).forEach(b=>b.onclick=()=>{picked.push(pool[+b.dataset.p]);if(picked.length===toks.length){const c=nrm(picked.map(p=>p.w).join(" "))===nrm(toks.join(" "));draw();$$(".tile",host).forEach(x=>x.disabled=true);done(it,c);fb(c,it);}else draw();});
        $$("[data-u]",host).forEach(b=>b.onclick=()=>{picked.splice(+b.dataset.u,1);draw();});};draw();}
    else if(it.k==="speak"){host.innerHTML=`${counter()}<div class="fc c-yellow" style="min-height:230px"><span class="mode">Decilo en italiano, en voz alta</span><div class="q">${esc(it.es)}</div><div id="spA"></div><div style="flex:1"></div><button class="go" id="spShow"><span>Ya lo dije · ver</span><span class="play">${ICON_PLAY}</span></button></div><div id="exFb"></div>`;
      $("#spShow").onclick=()=>{$("#spA").innerHTML=`<div style="font-size:24px;font-weight:600">${wz(it.it)}</div>`;speak(it.it);
        $("#spShow").outerHTML=`<div class="grades" style="grid-template-columns:1fr 1fr"><button data-r="0" style="color:var(--coral)">No me salió</button><button data-r="1" style="color:var(--green)">Me salió</button></div>`;
        $$("[data-r]",host).forEach(b=>b.onclick=()=>{done(it,b.dataset.r==="1");i++;show();});};}
    else if(it.k==="match"){const L=it.pairs.map((p,k)=>({k,t:p.it})),Rr=shuffle(it.pairs.map((p,k)=>({k,t:p.es})));let sel=null,miss=0;const got=new Set();
      host.innerHTML=`${counter()}<div class="blk c-stone exbox"><span class="cap">Uní cada frase con su significado</span></div><div class="match"><div class="col" style="gap:8px">${L.map(x=>`<button class="tile" data-l="${x.k}">${esc(x.t)}</button>`).join("")}</div><div class="col" style="gap:8px">${Rr.map(x=>`<button class="tile" data-r="${x.k}">${esc(x.t)}</button>`).join("")}</div></div><div id="exFb"></div>`;
      $$("[data-l]",host).forEach(b=>b.onclick=()=>{if(got.has(+b.dataset.l))return;$$("[data-l]",host).forEach(x=>x.classList.remove("sel"));b.classList.add("sel");sel=+b.dataset.l;speak(it.pairs[sel].it);});
      $$("[data-r]",host).forEach(b=>b.onclick=()=>{if(sel==null||got.has(+b.dataset.r))return;const k=+b.dataset.r;
        if(k===sel){got.add(k);host.querySelector(`[data-l="${k}"]`).className="tile ok";b.className="tile ok";host.querySelector(`[data-l="${k}"]`).disabled=true;b.disabled=true;sel=null;
          if(got.size===it.pairs.length){done(it,miss<=1);const el=host.querySelector("#exFb");el.innerHTML=`<div class="panel" style="border:1.5px solid var(--green)"><b style="color:var(--green)">${miss?`Listo (${miss} error${miss>1?"es":""})`:"¡Perfecto!"}</b></div>${nextBtn("Siguiente")}`;el.querySelector("[data-next]").onclick=()=>{i++;show();};}}
        else{miss++;b.classList.add("bad");setTimeout(()=>b.classList.remove("bad"),500);}});}
    if(it.say){const p=$("#exPlay");p&&(p.onclick=()=>speak(it.say));const sl=$("#exSlow");sl&&(sl.onclick=()=>speak(it.say,{rate:.7}));setTimeout(()=>speak(it.say),250);}
    window.scrollTo(0,0);};
  show();}
/* step: dialog (listen + shadowing, or play your part) */
function stDlg(host,st){const U=UNITS[LZ.u];let showEs=false,playing=false;const role=st.mode==="role";const rev={};
  const draw=()=>{host.innerHTML=`<p class="small muted">${role?"Tu papel: el otro habla solo. En tus líneas ves el español: decilo en italiano y después tocá para ver y escuchar.":"Primero escuchá todo sin mirar. Después repetí cada línea en voz alta copiando el ritmo (shadowing)."}</p>
    <div class="row"><button class="pill solid" id="dgPlay">${playing?"Detener":ICON_PLAY+" Escuchar todo"}</button><button class="pill ghost" id="dgEs">${showEs?"Ocultar":"Ver"} español</button></div>
    <div class="panel">${U.lines.map((l,i)=>{const mine=l.who==="T";const hide=role&&mine&&!rev[i];return `<div class="stl" data-l="${i}"><div class="row" style="align-items:flex-start"><span class="meta ${mine?"":"dk"}" style="flex:none">${mine?"Vos":"↔"}</span>
      <div class="itx" style="flex:1;font-size:17px">${hide?`<span class="muted">${esc(l.es)}</span>`:wz(l.it)}</div>${hide?`<button class="pill dark" data-rv="${i}">Ver</button>`:`<button class="round" data-say="${esc(l.it)}" aria-label="Escuchar">${ICON_SPK}</button>`}</div>${showEs&&!hide?`<div class="es">${esc(l.es)}</div>`:""}</div>`;}).join("")}</div>${nextBtn()}`;
    $("#dgEs").onclick=()=>{showEs=!showEs;draw();};
    $$("[data-rv]",host).forEach(b=>b.onclick=()=>{const i=+b.dataset.rv;rev[i]=1;draw();speak(U.lines[i].it);});
    $("#dgPlay").onclick=async()=>{if(playing){playing=false;stopSpeak();draw();return;}playing=true;draw();const tok=LZ;
      for(let i=0;i<U.lines.length;i++){if(!playing||LZ!==tok)break;const l=U.lines[i];if(role&&l.who==="T"&&!rev[i]){await new Promise(r=>setTimeout(r,Math.max(2500,l.it.length*90)));rev[i]=1;}
        $$(".stl.on",host).forEach(x=>x.classList.remove("on"));const el=host.querySelector(`[data-l="${i}"]`);el&&el.classList.add("on");
        await speak(l.it,{alt:l.who==="A"});await new Promise(r=>setTimeout(r,st.mode==="shadow"&&l.who==="T"?Math.max(1500,l.it.length*70):300));}
      if(LZ===tok){playing=false;if(LZ.steps[LZ.i]===st)draw();}};
    bindNext(host,()=>{playing=false;stopSpeak();S.dialogs=S.dialogs||{};today().sh=1;save();return null;});};
  draw();}
/* step: conversation with targets (reuses Giulia's chat) */
function stTalk(host,st){const U=UNITS[LZ.u];
  if(!sample){host.innerHTML=`<div class="panel small muted">La conversación con Claude funciona cuando abrís la app dentro de Claude. Por ahora hacé tu papel en el diálogo.</div>`;const d=document.createElement("div");host.appendChild(d);stDlg(d,{mode:"role"});return;}
  if(LZ.talkDone){host.innerHTML=`<div class="blk c-green"><div class="t">Conversación hecha</div><div class="s">${LZ.talkDone.said} intervenciones · ${LZ.talkDone.used||0}/${st.targets.length} objetivos</div>${nextBtn()}</div>`;bindNext(host,{ok:LZ.talkDone.used||0,n:st.targets.length});return;}
  host.innerHTML=`<div class="blk c-${U.c}"><div class="t">${esc(U.sit)}</div><div class="s">Sos: ${esc(U.me)}. Usá estas frases: se ponen en verde cuando las decís. Después de 6 intervenciones podés seguir.</div>
   <div class="row" style="gap:6px;margin-top:10px">${st.targets.map(t=>`<span class="meta">${esc(t.it)}</span>`).join("")}</div>
   <button class="go" id="tkGo"><span>Empezar a hablar</span><span class="play">${ICON_PLAY}</span></button></div>`;
  $("#tkGo").onclick=()=>{const sc={id:"lez-"+U.id,reg:U.reg||"tu",t:U.t,c:U.c,tier:levelForUnit(LZ.u),role:U.role,me:U.me,open:`Situation: ${U.sit}. Practise the grammar: ${U.g}.`,goal:"Usá las frases objetivo.",
      targets:st.targets,opener:U.open,ctaAt:6,onExit:info=>{if(!LZ)return;LZ.talkDone=info;R().cur=Object.assign(R().cur||{},{talk:info.said||1,at:Date.now()});saveNow();location.hash="#lez";}};
    location.hash="#parla";setTimeout(()=>openChat(sc),0);};}
/* step: 60-second fluency round */
function stSpeed(host){const U=UNITS[LZ.u];const items=shuffle(U.speed);let k=0,n=0,left=60,show=false,started=false;
  const end=()=>{clearInterval(LZ.tm);host.innerHTML=`<div class="blk c-yellow"><div class="t">${n} respuestas en 60 s</div><div class="s">La velocidad llega repitiendo. Mañana intentá superar este número.</div>${nextBtn()}</div>`;bindNext(host,{ok:n,n:items.length});};
  const draw=()=>{if(!started){host.innerHTML=`<div class="blk c-yellow"><div class="t">Ronda rápida</div><div class="s">60 segundos. Escuchás una pregunta y respondés en voz alta enseguida, aunque sea corto. Lo importante es no frenar.</div><button class="go" id="sdGo"><span>Empezar</span><span class="play">${ICON_PLAY}</span></button></div>`;
      $("#sdGo").onclick=()=>{started=true;LZ.tm=setInterval(()=>{left--;const el=$("#sdT");el&&(el.textContent=left+" s");if(left<=0)end();},1000);draw();};return;}
    if(k>=items.length){end();return;}const q=items[k];
    host.innerHTML=`<div class="spread"><span class="big-it" id="sdT">${left} s</span><span class="meta dk">${n} respondidas</span></div>
     <div class="blk c-${COLORS[k%6]}"><div class="big-it">${wz(q.q_it)}</div><div class="row" style="margin-top:12px"><button class="round ink" data-say="${esc(q.q_it)}" aria-label="Escuchar">${ICON_SPK}</button>${show?`<span class="small">Ej.: <b>${esc(q.a_it)}</b></span>`:`<button class="pill dark" id="sdHint">Ver un ejemplo</button>`}</div>
     <button class="go" id="sdNext"><span>Respondí · siguiente</span><span class="play">${ICON_PLAY}</span></button></div>`;
    if(!show)speak(q.q_it);$("#sdHint")&&($("#sdHint").onclick=()=>{show=true;draw();});$("#sdNext").onclick=()=>{n++;k++;show=false;draw();};};
  draw();}
/* step: crazy story with the week's phrases */
function stStory(host,st){const U=UNITS[LZ.u];host.innerHTML=`<div class="blk c-salmon"><div class="t">Historia loca</div><div class="s">Claude escribe una escena absurda en Varapodio con tus frases de la semana. Lo que te hace reír se recuerda mejor.</div>
  <button class="go" id="syGo"><span>Abrir la historia</span><span class="play">${ICON_PLAY}</span></button></div>${LZ.storyOpened?nextBtn("Ya la leí: seguir"):`<button class="pill ghost" data-next>Saltar</button>`}`;
  $("#syGo").onclick=()=>{LZ.storyOpened=1;openStory(st.words.map(c=>({it:c.it,es:c.es})),U.t);};bindNext(host);}
/* step: pronunciation focus of the week */
function stPron(host){const U=UNITS[LZ.u];const P=PRON.find(p=>p.id===U.pron)||PRON[0];
  const items=shuffle(P.quiz).slice(0,4).map(q=>({k:"choice",say:q[0],prompt:`<div class="exq" style="font-size:22px">Escuchá y elegí</div>`,opts:q[1],a:q[2],full:q[0],why:""}));
  host.innerHTML=`<div class="panel" style="border:1.5px solid var(--lime)"><div class="cap">Pronuncia: ${esc(P.t)}</div><p style="margin-top:6px">${P.tip}</p></div><div id="prBox"></div>`;
  const box=$("#prBox");
  if(!items.length){box.innerHTML=`<div class="blk c-stone"><div class="cap" style="color:var(--ink)">Trabalenguas</div><div class="big-it" style="font-size:22px;margin-top:8px">${wz(P.tw)}</div><div class="row" style="margin-top:10px">${[[.65,"Lento"],[1,"Normal"],[1.25,"Rápido"]].map(([r,l])=>`<button class="pill dark" data-tw="${r}">${l}</button>`).join("")}</div></div>${nextBtn()}`;
    $$("[data-tw]",box).forEach(b=>b.onclick=()=>speak(P.tw,{rate:+b.dataset.tw}));bindNext(box);return;}
  runEx(box,items,{onDone:res=>{box.innerHTML=`<div class="blk c-lime"><div class="t">Oído: ${res.ok}/${res.n}</div><div class="s">Ahora el trabalenguas, lento y después rápido:</div><div class="big-it" style="font-size:22px;margin-top:8px">${wz(P.tw)}</div>
    <div class="row" style="margin-top:10px">${[[.65,"Lento"],[1,"Normal"],[1.25,"Rápido"]].map(([r,l])=>`<button class="pill dark" data-tw="${r}">${l}</button>`).join("")}</div></div>${nextBtn()}`;
    $$("[data-tw]",box).forEach(b=>b.onclick=()=>speak(P.tw,{rate:+b.dataset.tw}));bindNext(box,res);}});}
/* step: real-world mission */
function stMission(host){const U=UNITS[LZ.u];const m=U.mis[(LZ.d-1)%U.mis.length];
  host.innerHTML=`<div class="mission"><div class="cap">Misión para mañana, en la calle</div><p style="margin:8px 0 10px">${esc(m[0])}</p><div class="spread"><div style="font-size:20px;font-weight:500;color:var(--yellow)">${wz(m[1])}</div><button class="round" data-say="${esc(m[1])}" aria-label="Escuchar">${ICON_SPK}</button></div></div>
   <p class="small muted">Usar el idioma de verdad, con una persona real, es lo que más acelera. Te la recuerdo en Hoy.</p>${nextBtn("Terminar la sesión")}`;
  bindNext(host,()=>{R().mis[UNITS[LZ.u].id+"d"+LZ.d]=0;save();return null;});}
/* step: exam */
function stExam(host,st){const U=UNITS[LZ.u];
  if(!st.started){host.innerHTML=`<div class="blk c-${U.c}"><div class="t">Examen · Semana ${U.n}</div><div class="s">${st.items.length} preguntas de gramática, frases y oído. Con 70% o más se abre la semana siguiente.</div><button class="go" id="exGo"><span>Empezar</span><span class="play">${ICON_PLAY}</span></button></div>
    <div class="panel"><div class="cap">Lo que tenés que poder hacer</div>${U.can.map(c=>`<p class="small" style="margin-top:6px">✓ ${esc(c)}</p>`).join("")}</div>`;
    $("#exGo").onclick=()=>{st.started=1;stExam(host,st);};return;}
  runEx(host,st.items,{tag:U.tag,onDone:res=>{const sc=res.ok/Math.max(1,res.n);LZ.exam=sc;const pass=sc>=.7;
    if(pass){confetti();R().exam[U.id]=Math.max(R().exam[U.id]||0,Math.round(sc*100));save();}
    host.innerHTML=`<div class="blk c-${pass?"green":"salmon"}"><div class="t">${Math.round(sc*100)}% · ${pass?"¡Aprobado!":"Casi"}</div><div class="s">${pass?(LZ.u<UNITS.length-1?`Se abre la Semana ${U.n+1}: ${esc(UNITS[LZ.u+1].t)}.`:"¡Terminaste la ruta!"):"Necesitás 70%. Repasá lo de abajo y volvé a intentarlo: el examen cambia cada vez."}</div></div>
     ${res.wrong.length?`<div class="panel"><div class="cap">Para revisar</div>${res.wrong.map(w=>`<div class="word"><div class="w"><b>${wz(w.full||"")}</b>${w.why?`<span>${esc(w.why)}</span>`:""}</div>${w.full?`<button class="round" data-say="${esc(w.full)}" aria-label="Escuchar">${ICON_SPK}</button>`:""}</div>`).join("")}</div>`:""}
     ${pass?nextBtn():`<div class="row"><button class="pill solid" id="exRe">Intentar de nuevo</button><button class="pill" data-next>Seguir igual</button></div>`}`;
    $("#exRe")&&($("#exRe").onclick=()=>{st.items=examItems(U);st.started=1;stExam(host,st);});bindNext(host,{ok:res.ok,n:res.n});}});}
/* step: 1-minute monologue */
function stMono(host){const U=UNITS[LZ.u];const t=shuffle(U.chunks).slice(0,5);let left=60;
  host.innerHTML=`<div class="blk c-stone"><div class="t">Hablá 1 minuto sin parar</div><div class="s">Tema: ${esc(U.sit)}. No importa equivocarte: importa no frenar. Usá estas frases:</div>
   <div class="row" style="gap:6px;margin-top:10px">${t.map(c=>`<button class="meta dk" data-say="${esc(c.it)}">${esc(c.it)}</button>`).join("")}</div>
   <button class="go" id="moGo"><span>Empezar · 60 s</span><span class="play">${ICON_PLAY}</span></button></div><div id="moT"></div>`;
  $("#moGo").onclick=()=>{$("#moGo").remove();$("#moT").innerHTML=`<div class="big-it" id="moS" style="text-align:center;font-size:56px">60</div>`;LZ.tm=setInterval(()=>{left--;const el=$("#moS");el&&(el.textContent=left);if(left<=0){clearInterval(LZ.tm);$("#moT").innerHTML=`<div class="panel">¡Bien! Hablar seguido, aunque sea imperfecto, es lo que entrena la fluidez.</div>${nextBtn()}`;bindNext(host);}},1000);};}
/* step: placement test (2 questions per unit, stops when it gets too hard) */
function stPlace(host){const items=UNITS.flatMap((U,ui)=>U.place.map(x=>Object.assign({},x,{ui,why:""})));const per=UNITS.map(()=>0),cnt=UNITS.map(()=>0);
  host.innerHTML=`<div class="blk c-green"><div class="t">Prueba de nivel</div><div class="s">Hasta ${items.length} preguntas que se vuelven más difíciles. Termina sola cuando llega a tu límite. No adivines: si no sabés, elegí lo que te parezca y seguí.</div><button class="go" id="plGo"><span>Empezar</span><span class="play">${ICON_PLAY}</span></button></div>`;
  $("#plGo").onclick=()=>runEx(host,items,{onAnswer:(it,c)=>{cnt[it.ui]++;if(c)per[it.ui]++;},
    stop:()=>{for(let u=1;u<UNITS.length;u++)if(cnt[u]===2&&cnt[u-1]===2&&per[u]<2&&per[u-1]<2)return true;return false;},
    onDone:()=>{let start=per.findIndex(x=>x<2);if(start<0)start=UNITS.length-1;const r=R();r.placed=1;r.u=start;r.d=1;r.s="m";r.placedAt=start;
      for(let k=0;k<start;k++)r.exam[UNITS[k].id]=r.exam[UNITS[k].id]||"prueba";S.level=levelForUnit(start);save();confetti();
      const U=UNITS[start];
      host.innerHTML=`<div class="blk c-${U.c}"><div class="cap" style="color:var(--ink)">Tu punto de partida</div><div class="t" style="margin-top:6px">Semana ${U.n}: ${esc(U.t)}</div><div class="s">${esc(U.g)} · nivel ${levelForUnit(start)}</div></div>
       <div class="panel"><p>${start?`Las semanas 1 a ${start} quedan aprobadas por la prueba. Sus frases siguen disponibles en la Ruta para repasar.`:"Empezás desde el principio: así no queda ningún hueco."}</p><p class="small muted" style="margin-top:8px">Cada día tiene una lección de mañana (~25 min) y una de noche (~25 min). El día 7 hay examen.</p></div>
       ${nextBtn("Listo")}`;bindNext(host);}});}
function finishSession(body){const sc=LZ.res.filter(r=>r&&r.n).reduce((a,r)=>[a[0]+r.ok,a[1]+r.n],[0,0]);const score=LZ.s==="x"?(LZ.exam||0):sc[1]?sc[0]/sc[1]:1;
  if(LZ.s==="p"){LZ=null;location.hash="#home";return;}
  if(!LZ.saved){LZ.saved=1;advance(LZ.u,LZ.d,LZ.s,score);if(LZ.s!=="x")confetti();}
  const mins=Math.max(1,Math.round((Date.now()-LZ.t0)/60000));const r=R();const nextIsNight=LZ.s==="m"&&r.u===LZ.u&&r.d===LZ.d&&r.s==="n";
  $("#lezHead").innerHTML=`<div class="spread"><span></span><div class="small muted">${esc(lezTitle())}</div><span></span></div>`;
  body.innerHTML=`<div class="blk c-green"><div class="t">¡Sesión completa!</div><div class="s">${mins} min${sc[1]?` · ${Math.round(sc[0]/sc[1]*100)}% de aciertos`:""}</div></div>
   <div class="goals" style="grid-template-columns:repeat(2,1fr)">${LZ.res.filter(r=>r&&r.n).slice(0,4).map(x=>`<div class="goal"><b style="font-size:24px">${x.ok}/${x.n}</b><span>${esc(x.t)}</span></div>`).join("")}</div>
   <div class="row">${nextIsNight?`<button class="pill solid" id="fsNight">Seguir con la noche</button>`:""}<button class="pill ${nextIsNight?"":"solid"}" data-nav="home">Volver a Hoy</button></div>`;
  $("#fsNight")&&($("#fsNight").onclick=()=>{const c=curSess();startSession(c.u,c.d,c.s);});
  LZ.over=1;}

/* ---------- Hoy (home) program card ---------- */
function renderProgram(){const box=$("#prog");const r=R();
  if(!r.placed){box.innerHTML=`<div class="blk c-green"><div class="spread"><div class="t">Tu ruta de 12 semanas</div><span class="meta">A1 → B1</span></div>
     <div class="s">Primero una prueba de nivel corta (5 min) para saber desde qué semana empezás. Después, cada día: lección de mañana y de noche.</div>
     <button class="go" id="plStart"><span>Hacer la prueba de nivel</span><span class="play">${ICON_PLAY}</span></button></div>
     <button class="pill ghost" id="plSkip" style="align-self:flex-start">Empezar desde la semana 1</button>`;
    $("#plStart").onclick=()=>startSession(0,1,"p");$("#plSkip").onclick=()=>{r.placed=1;r.u=0;r.d=1;r.s="m";save();renderHome();};return;}
  if(r.finished){box.innerHTML=`<div class="blk c-green"><div class="t">¡Terminaste la ruta!</div><div class="s">Seguí con el Sprint diario y charlas libres. Podés repetir cualquier semana desde Ruta.</div><button class="go" data-nav="ruta"><span>Ver la ruta</span><span class="play">${ICON_PLAY}</span></button></div>`;return;}
  const c=curSess(),U=UNITS[c.u];const cu=r.cur&&r.cur.u===c.u&&r.cur.d===c.d&&r.cur.s===c.s&&r.cur.i>0&&Date.now()-(r.cur.at||0)<20*3600e3?r.cur:null;const pct=routePct();const doneToday=(S.route.log||[]).filter(x=>x.day===dayKey()).length;
  const sess=c.s==="x"?[["x","Examen y repaso","Repaso, examen de la semana y 1 minuto hablando"]]:[["m","Mañana","Repaso · frases nuevas · regla · ejercicios · diálogo"],["n","Noche","Recordar · oído · conversación · ronda rápida · misión"]];
  box.innerHTML=`<div class="panel"><div class="spread"><span class="cap">Semana ${U.n} de ${UNITS.length} · ${c.s==="x"?"Día 7":"Día "+c.d}</span><span class="tiny muted">${Math.round(pct*100)}% de la ruta</span></div>
     <div class="t" style="font-size:24px;font-weight:600;margin-top:6px">${esc(U.t)}</div><div class="small muted">${esc(U.g)}</div><div class="bar" style="margin-top:10px"><i style="width:${Math.max(2,Math.round(pct*100))}%"></i></div></div>
   ${sess.map(([k,l,s])=>{const isCur=c.s===k;const done=!isCur&&k==="m"&&c.s==="n";return `<div class="blk c-${isCur?U.c:"stone"}" style="${done?"opacity:.6":""}"><div class="spread"><div class="t">${l}</div><span class="meta">${done?"✓ hecha":"~"+sessMin(c.u,c.d,k)+" min"}</span></div><div class="s">${s}</div>
     ${isCur?`<button class="go" data-sess="${k}"><span>${cu?`Seguir donde quedaste · paso ${cu.i+1}`:"Empezar"}</span><span class="play">${ICON_PLAY}</span></button>`:""}</div>`;}).join("")}
   ${doneToday>=2?`<p class="small muted">Hoy ya hiciste ${doneToday} sesiones. Si querés ir más rápido, podés seguir con la próxima.</p>`:""}`;
  $$("[data-sess]",box).forEach(b=>b.onclick=()=>startSession(c.u,c.d,c.s));}

/* ---------- Ruta view ---------- */
function renderRuta(){const host=$("#rutaCol");const r=R();
  host.innerHTML=`<h1 class="big">Ruta</h1><p class="muted">12 semanas, de A1 a B1. Cada semana: 6 días con lección de mañana y de noche, y un examen el día 7.</p>
   <div class="panel"><div class="spread"><span class="cap">Avance</span><span class="small muted">${Math.round(routePct()*100)}%</span></div><div class="bar" style="margin-top:8px"><i style="width:${Math.max(2,Math.round(routePct()*100))}%"></i></div>
   ${r.placed?"":`<button class="pill solid" id="ruPlace" style="margin-top:12px">Hacer la prueba de nivel</button>`}</div>
   ${UNITS.map((U,i)=>{const s=unitState(i);const ex=r.exam[U.id];return `<button data-u="${i}" ${s==="lock"?'aria-disabled="true"':""} class="lesson${s==="lock"?" locked":""}"><span class="num c-${s==="lock"?"stone":U.c}">${s==="done"?"✓":s==="lock"?"🔒":U.n}</span>
     <span><b>${esc(U.t)}</b><span class="s">${esc(U.g)}${s==="cur"?` · día ${Math.min(r.d,7)}`:""}${ex!=null?` · ${ex==="prueba"?"aprobada por prueba":"examen "+ex+"%"}`:""}</span></span></button>`;}).join("")}
   <button class="pill ghost" id="ruRe" style="align-self:flex-start">${r.placed?"Repetir la prueba de nivel":""}</button>`;
  $("#ruPlace")&&($("#ruPlace").onclick=()=>startSession(0,1,"p"));
  $("#ruRe").hidden=!r.placed;$("#ruRe").onclick=()=>openSheet(`<h2 class="mid">¿Repetir la prueba?</h2><p class="muted" style="margin:10px 0">Te puede mover a otra semana. Tus tarjetas y frases se mantienen.</p><div class="row"><button class="pill solid" id="rpGo">Hacerla</button><button class="pill" id="rpNo">Cancelar</button></div>`,()=>{$("#rpNo").onclick=closeSheet;$("#rpGo").onclick=()=>{closeSheet();startSession(0,1,"p");};});
  $$("[data-u]",host).forEach(b=>b.onclick=()=>{const i=+b.dataset.u;if(unitState(i)==="lock"){toast("Se abre al aprobar el examen de la semana anterior.");return;}openUnit(i);});
  stagger(host);}
function openUnit(i){const U=UNITS[i];const r=R();const cur=i===r.u;
  const cell=(d,s)=>{const k=sessKey(i,d,s);const done=!!r.done[k];const isCur=cur&&d===Math.min(r.d,7)&&(d===7||s===r.s);const avail=done||isCur||i<r.u||(cur&&(d<r.d||(d===r.d&&s==="m"&&r.s==="n")));
    return `<button class="pill ${isCur?"solid":done?"":"ghost"}" data-ds="${d}${s}" ${avail?"":'disabled style="opacity:.35"'}>${d===7?"Examen":"D"+d+" "+(s==="m"?"☀":"☾")}${done?" ✓":""}</button>`;};
  openSheet(`<div class="spread"><h2 class="mid">Semana ${U.n}: ${esc(U.t)}</h2><button class="round" id="unX" aria-label="Cerrar">✕</button></div>
   <p class="small muted" style="margin-top:4px">${esc(U.sit)} · ${esc(U.g)}</p>
   <div class="cap" style="margin-top:14px">Al terminar vas a poder</div>${U.can.map(c=>`<p class="small" style="margin-top:4px">✓ ${esc(c)}</p>`).join("")}
   <div class="cap" style="margin-top:14px">Sesiones</div><div class="row" style="gap:6px;margin-top:8px">${[1,2,3,4,5,6].map(d=>cell(d,"m")+cell(d,"n")).join("")}${cell(7,"x")}</div>
   ${cur||i<r.u?`<p class="tiny muted" style="margin-top:8px">¿Ya lo sabés? Podés rendir el examen cuando quieras: si aprobás, pasás a la semana siguiente.</p>`:""}
   <div class="cap" style="margin-top:14px">Frases de la semana</div><div class="col" style="gap:4px;margin-top:6px">${U.chunks.map(c=>`<div class="word"><div class="w"><b>${wz(c.it)}</b><span>${esc(c.es)}</span></div><button class="round" data-say="${esc(c.it)}" aria-label="Escuchar">${ICON_SPK}</button></div>`).join("")}</div>`,
   ()=>{$("#unX").onclick=closeSheet;$$("[data-ds]",$("#sheet")).forEach(b=>b.onclick=()=>{const d=+b.dataset.ds[0],s=b.dataset.ds.slice(1);closeSheet();startSession(i,d,s);});});
  const ex=$("#sheet").querySelector('[data-ds="7x"]');if(ex&&(cur||i<r.u)){ex.disabled=false;ex.style.opacity="";ex.onclick=()=>{closeSheet();startSession(i,7,"x");};}}

/* ---------- Más (tools hub) ---------- */
function renderMas(){const host=$("#masCol");
  host.innerHTML=`<h1 class="big">Más</h1><p class="muted">Herramientas para practicar fuera de la lección del día.</p>
   <div class="tgrid">
    <button class="c-green" id="maSprint">Sprint de 15 min<span>Claude lo arma según lo que te cuesta</span></button>
    <button class="c-salmon" data-nav="parla">Escenas y charla<span>Hablar con Giulia sobre cualquier tema</span></button>
    <button class="c-yellow" data-nav="parole">Vocabulario<span>Buscador, temas y mapas mentales</span></button>
    <button class="c-lime" data-nav="ascolta">Escuchar<span>Diálogos, pronunciación e historia loca</span></button>
    <button class="c-coral" data-nav="studio">Gramática y quiz<span>Todas las reglas, dudas y test de nivel</span></button>
    <button class="c-stone" id="maSet">Ajustes<span>Voz, velocidad y correcciones</span></button></div>`;
  $("#maSprint").onclick=()=>startSprint();$("#maSet").onclick=()=>$("#openSettings").click();stagger(host);}
