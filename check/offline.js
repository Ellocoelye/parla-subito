const { chromium, devices } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({ ...devices['iPhone 13'] })).newPage();
 const errs = []; p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push('console: ' + m.text()); });
 await p.addInitScript(() => { window.claude = { use: async () => null }; });
 const url = 'file:///home/claude/italiano/index.html';
 const t = async (sel, wait = 120) => { try { await p.tap(sel, { timeout: 4000 }); } catch (e) { throw new Error('tap ' + sel + ' @ ' + (await p.evaluate(() => location.hash + ' ' + ((document.querySelector('#lezHead') || {}).textContent || '')).catch(() => ''))); } await p.waitForTimeout(wait); };
 const step = async (n, f) => { try { await f(); console.log('OK  ', n); } catch (e) { console.log('FAIL', n, '-', e.message.split('\n')[0]); errs.push(n); } };
 /* answers a guided conversation: first turn wrong twice, the rest with the model answer */
 const playGuided = async () => { for (let k = 0; k < 40; k++) {
     if (await p.$('#gcNext')) { await t('#gcNext', 80); continue; }
     if (await p.$('#gcTa')) { const model = await p.evaluate(() => { const n = document.querySelector('#gcN').textContent.split('/')[0] - 1; const id = (window.__gcid || 0); return null; });
       const ans = await p.evaluate(() => { const box = document.querySelector('#gcN').closest('.col, #guided, #lezBody, #sprint') || document; return null; });
       const txt = await p.evaluate(() => { const all = [...document.querySelectorAll('.bub.tu .it')]; const last = all[all.length - 1].textContent; const conv = ALL_CONVS().find(c => c.turns.some(t => t[0] === last)); return conv.turns.find(t => t[0] === last)[3]; });
       await p.fill('#gcTa', k === 0 ? 'boh non lo so' : txt); await p.press('#gcTa', 'Enter'); await p.waitForTimeout(80); continue; }
     if (await p.$('#gcSave')) { await t('#gcSave', 80); return true; } break; } return !!(await p.$('#gcSave')); };
 await p.goto(url + '#parole'); await p.waitForTimeout(600);
 await step('dictionary popup offline (word + base + ✗ form)', async () => {
   const r = await p.evaluate(() => [dictLookup('vado'), dictLookup("dall'"), dictLookup('capiuto'), dictLookup('Città'), dictLookup('documenti')]);
   if (!r[0] || r[0].base !== 'andare' || !r[1] || !r[2].bad || !r[3] || r[4].base_es !== 'documento') throw new Error(JSON.stringify(r)); });
 await step('tap a word shows meaning without AI', async () => { await p.evaluate(() => { const h = document.querySelector('#paroleHome'); const d = document.createElement('div'); d.innerHTML = wz('Domani vado in Comune per i documenti'); h.prepend(d); });
   await p.evaluate(() => document.querySelector('#paroleHome .wd[data-w="documenti"]').click()); await p.waitForTimeout(300); const tx = await p.textContent('#wpop'); if (!/documentos/.test(tx)) throw new Error(tx); });
 await step('unit mind map offline', async () => { await p.evaluate(() => { closeWord(); }); await p.goto(url + '#parole'); await p.waitForTimeout(300); await t('#umaps [data-um="u1"]', 400); await p.waitForSelector('#paroleMap svg.mm'); });
 await step('local story in Ascolta', async () => { await p.goto(url + '#ascolta'); await p.waitForTimeout(300); await t('#toStory', 400); await p.waitForSelector('#ascTool .stl'); await t('#stNew', 300); await p.waitForSelector('#ascTool .stl'); });
 await step('guided conversation from Parla', async () => { await p.goto(url + '#parla'); await p.waitForTimeout(300); await t('#parlaHome [data-gv="u2g0"]', 400); if (!await playGuided()) throw new Error('not finished'); await t('#gcDone', 300); await p.waitForSelector('#sprintBtn'); const sc = await p.evaluate(() => S.guided.u2g0); if (sc == null) throw new Error('no score'); });
 await step('local sprint end-to-end', async () => { await t('#sprintBtn', 400); await p.waitForSelector('#sprint .phases');
   for (let k = 0; k < 40; k++) { if (await p.$('#bShow') || await p.$('#bNext')) break; if (await p.$('#rvNow')) await t('#rvNow', 60); if (await p.$('#sprint [data-r]')) await t('#sprint [data-r="1"]', 60); }
   for (let k = 0; k < 10; k++) { if (await p.$('#bShow')) { await t('#bShow', 60); await t('#bGo', 60); continue; } if (await p.$('#bNext')) { await t('#bNext', 300); break; } }
   if (!await playGuided()) throw new Error('guided not finished'); await t('#gcDone', 300); await t('#spdGo', 100); for (let i = 0; i < 9; i++) { if (!await p.$('#spdNext')) break; await t('#spdNext', 50); }
   await p.waitForSelector('#spAgain', { timeout: 3000 }); });
 await step('route quiz offline', async () => { await p.goto(url + '#studio'); await p.waitForTimeout(300); await t('#segStudio [data-t="quiz"]'); await t('[data-q="ai"]', 300); const q = await p.textContent('#studioRun'); if (/IA|Claude/.test(q) && !/opts/.test(q)) {} if (!await p.$('#studioRun .opts button')) throw new Error('no quiz'); });
 await step('lesson night: guided talk inside the lesson', async () => { await p.evaluate(() => { const r = R(); r.placed = 1; r.u = 1; r.d = 3; r.s = 'n'; save(); }); await p.goto(url + '#home'); await p.waitForTimeout(400); await t('#prog [data-sess]', 300);
   for (let g = 0; g < 50; g++) { if (await p.$('#lezBody [data-nav="home"]')) break;
     if (await p.$('#tmG')) { await t('#tmG', 300); if (!await playGuided()) throw new Error('guided'); await t('#gcDone', 300); continue; }
     if (await p.$('#sdGo')) { await t('#sdGo', 80); for (let i = 0; i < 9; i++) { if (!await p.$('#sdNext')) break; await t('#sdNext', 40); } continue; }
     if (await p.$('#spShow')) { await t('#spShow', 50); await t('#lezBody [data-r="1"]', 50); continue; }
     if (await p.$('#lezBody .exopts button:not([disabled])')) { await (await p.$$('#lezBody .exopts button'))[0].tap(); await p.waitForTimeout(60); await t('#exFb [data-next]', 50); continue; }
     if (await p.$('#exIn')) { await p.fill('#exIn', 'ciao'); await t('#exForm button', 50); await t('#exFb [data-next]', 50); continue; }
     if (await p.$('#lezBody [data-l]')) { for (let i = 0; i < 4; i++) { await t(`#lezBody [data-l="${i}"]`, 20); await t(`#lezBody [data-r="${i}"]`, 20); } await t('#exFb [data-next]', 50); continue; }
     if (await p.$('#lezBody [data-p]')) { while (await p.$('#lezBody [data-p]')) await t('#lezBody [data-p]', 20); await t('#exFb [data-next]', 50); continue; }
     if (await p.$('#lezBody [data-tw]')) { await t('#lezBody [data-next]', 100); continue; }
     if (await p.$('#lezBody [data-next]')) { await t('#lezBody [data-next]', 120); continue; }
     throw new Error('stuck ' + (await p.textContent('#lezHead')).slice(0, 60)); }
   const r = await p.evaluate(() => JSON.stringify({ d: S.route.d, s: S.route.s })); if (!/"d":4/.test(r)) throw new Error(r); });
 console.log(errs.length ? 'ERRORS:\n' + errs.join('\n') : 'no errors'); await b.close(); })();
