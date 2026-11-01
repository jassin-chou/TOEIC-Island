function curLesson() { if (!current || !TUT[current.id]) return null; const i = learnPos[current.id] || 0; return { iid: current.id, i, l: TUT[current.id][i], key: current.id + ':' + i }; }
function rerenderW() { const c = curLesson(); if (!c) return; const el = $('#tw', panel); if (el) el.innerHTML = wHTML(c.key, c.l.w); }
function handleTw(t) {
  const c = curLesson(); if (!c) return false; const st = tws[c.key] = tws[c.key] || {}; const w = c.l.w; const a = t.dataset.tw; const d = t.dataset;
  if (a === 'tq') { if (tqs[c.key] != null) return true; tqs[c.key] = +d.k; beep(+d.k === c.l.q.a); markDone(c.iid, c.i); $('#tq', panel).innerHTML = tqHTML(c.key, c.l.q); const st2 = $('.lsteps', panel); if (st2) st2.outerHTML = learnView(current).match(/<div class="lsteps"[\s\S]*?<\/div>/)[0]; const tb = panel.querySelector('[data-tab="learn"]'); if (tb) tb.textContent = `教學 ${tutDone(c.iid)}/${tutTotal(c.iid)}`; return true; }
  if (a === 'sort') { st.ans = st.ans || {}; st.ans[d.i] = +d.b; beep(+d.b === w.items[d.i][1]); }
  else if (a === 'fill') { st.ans = st.ans || {}; st.ans[d.i] = +d.j; beep(+d.j === w.items[d.i][2]); }
  else if (a === 'reset') { st.ans = {}; }
  else if (a === 'col') { st.col = st.col === +d.c ? -1 : +d.c; }
  else if (a === 'card') { st.open = st.open || []; const i = +d.i; st.open = st.open.includes(i) ? st.open.filter(x => x !== i) : st.open.concat(i); }
  else if (a === 'flipall') { st.open = st.open && st.open.length === w.items.length ? [] : w.items.map((_, i) => i); }
  else if (a === 'next') st.shown = Math.min(w.items.length, (st.shown || 1) + 1);
  else if (a === 'all') st.shown = w.items.length;
  else if (a === 'game') { st.mode = 'game'; st.picked = []; st.wrong = -1; st.pool = shuffle(w.items.map((_, i) => i)); }
  else if (a === 'learn') st.mode = 'learn';
  else if (a === 'pick') { const i = +d.i; if (i === st.picked.length) { st.picked.push(i); st.wrong = -1; if (st.picked.length === w.items.length) beep(true); } else { st.wrong = i; beep(false); } }
  else if (a === 'layer' || a === 'lsn') { st.open = st.open || []; const i = +d.i; st.open = st.open.includes(i) ? st.open.filter(x => x !== i) : st.open.concat(i); }
  else if (a === 'openall' || a === 'lsall') st.open = st.open && st.open.length === w.items.length ? [] : w.items.map((_, i) => i);
  else if (a === 'pplay') {
    if (!st.cur || st.cur.ans != null) { let i; do { i = Math.floor(Math.random() * w.items.length); } while (w.items.length > 1 && st.cur && i === st.cur.i); st.cur = { i, s: Math.random() < .5 ? 0 : 1, ans: null }; }
    speakText(w.items[st.cur.i][st.cur.s], { key: 'pair' + Date.now() });
  }
  else if (a === 'pans') { if (!st.cur || st.cur.ans != null) return true; st.cur.ans = +d.j; st.n++; const ok = st.cur.ans === st.cur.s; if (ok) st.score++; beep(ok); }
  else if (a === 'dplay' || a === 'dslow') { st.i = st.i || 0; speakText(w.items[st.i][0], { rate: a === 'dslow' ? .7 : 1, key: 'dict' + c.key + st.i + a }); return true; }
  else if (a === 'dcheck' || a === 'dshow') {
    const inp = $('#tw input[data-twin="dict"]', panel); st.txt = inp ? inp.value : (st.txt || ''); const it = w.items[st.i || 0];
    if (a === 'dshow') st.res = `答案：<b class="en">${esc(it[0])}</b>`;
    else { const r = diffWords(it[0], st.txt); const p = Math.round(r.ok / r.n * 100); st.best = Math.max(st.best || 0, p); st.res = `${p === 100 ? '✓ 全對！' : `對了 ${r.ok}/${r.n} 個字（${p}%），紅色波浪線是漏掉或拼錯的字：`}<div class="en" style="margin-top:4px;font-size:14px">${r.html}</div>`; beep(p >= 80); }
  }
  else if (a === 'dnext' || a === 'dprev') { st.i = Math.max(0, Math.min(w.items.length - 1, (st.i || 0) + (a === 'dnext' ? 1 : -1))); st.txt = ''; st.res = ''; st.best = 0; rerenderW(); speakText(w.items[st.i][0], { key: 'dict' + c.key + st.i }); const inp = $('#tw input', panel); if (inp) inp.focus(); return true; }
  else return false;
  rerenderW(); return true;
}
function handleTwInput(el) {
  const c = curLesson(); if (!c) return; const st = tws[c.key] = tws[c.key] || {};
  if (el.dataset.twin === 'dict') st.txt = el.value;
}
panel.addEventListener('input', e => { const el = e.target.closest('[data-twin]'); if (el && fishingMode === false) handleTwInput(el); });
panel.addEventListener('keydown', e => { const el = e.target.closest('input[data-twin="dict"]'); if (el && e.key === 'Enter') { e.preventDefault(); const b = panel.querySelector('[data-tw="dcheck"]'); if (b) b.click(); } });

