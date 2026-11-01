let exam = null;
const REAL = { 1: 6, 2: 25, 3: 39, 4: 30, 5: 30, 6: 16, 7: 54 };
const SCOPE = { F: '聽力＋閱讀', L: '只考聽力', R: '只考閱讀' };
function openExamSetup() {
  const m = $('#modal'); const last = store.examCfg || { scope: 'F', size: 'mini', instant: false, strict: false };
  const sizes = sc => sc === 'F' ? [['mini', '迷你 約 20 題'], ['half', '半回 約 100 題'], ['full', '全回 約 200 題']] : [['mini', '迷你 約 10 題'], ['half', '半份 約 50 題'], ['full', '整份 約 100 題']];
  const draw = cfg => `<div class="intro card" role="dialog" aria-modal="true" aria-labelledby="ex-h"><h2 id="ex-h">多益模擬考</h2><p>依正式考試各 Part 的題數比例抽題，題目依 Part 1 → Part 7 排列。交卷後估算聽力、閱讀量尺分數與證書顏色。</p>
  <div class="lbl">範圍</div><div class="seg" id="ex-scope">${Object.entries(SCOPE).map(([k, t]) => `<button data-v="${k}" aria-pressed="${cfg.scope === k}">${t}</button>`).join('')}</div>
  <div class="lbl">份量</div><div class="seg" id="ex-size">${sizes(cfg.scope).map(([k, t]) => `<button data-v="${k}" aria-pressed="${cfg.size === k}">${t}</button>`).join('')}</div>
  <div class="lbl">作答回饋</div><div class="seg" id="ex-fb"><button data-v="0" aria-pressed="${!cfg.instant}">交卷後才公布（像正式考試）</button><button data-v="1" aria-pressed="${cfg.instant}">每題立即看答案</button></div>
  ${cfg.scope !== 'R' ? `<div class="lbl">聽力</div><div class="seg" id="ex-strict"><button data-v="1" aria-pressed="${cfg.strict}">考場模式：自動播放、只播一次</button><button data-v="0" aria-pressed="${!cfg.strict}">練習模式：可以重播</button></div>` : ''}
  <p style="font-size:12.5px;color:var(--ink-2);margin:12px 0 0">題庫共 ${questions.length} 題，全回模擬會盡量依比例抽滿；Part 3 題庫較少時會略少於正式題數。</p>
  <div class="row" style="margin-top:16px;justify-content:flex-end"><button class="btn" data-m="cancel">取消</button><button class="btn pri" data-m="go">開始考試</button></div></div>`;
  const cfg = Object.assign({}, last);
  m.innerHTML = draw(cfg); m.hidden = false;
  m.onclick = e => {
    const b = e.target.closest('button'); if (e.target === m) { m.hidden = true; return; } if (!b) return;
    const seg = b.closest('.seg');
    if (seg) { const v = b.dataset.v; if (seg.id === 'ex-scope') cfg.scope = v; else if (seg.id === 'ex-size') cfg.size = v; else if (seg.id === 'ex-fb') cfg.instant = v === '1'; else cfg.strict = v === '1'; m.innerHTML = draw(cfg); return; }
    if (b.dataset.m === 'cancel') m.hidden = true;
    if (b.dataset.m === 'go') { m.hidden = true; store.examCfg = cfg; save(); startExam(cfg); }
  };
  setTimeout(() => $('[data-m="go"]', m)?.focus(), 50);
}
function examList(cfg) {
  const parts = cfg.scope === 'L' ? [1, 2, 3, 4] : cfg.scope === 'R' ? [5, 6, 7] : [1, 2, 3, 4, 5, 6, 7];
  const full = parts.reduce((a, p) => a + REAL[p], 0);
  const target = { mini: cfg.scope === 'F' ? 20 : 10, half: full / 2, full }[cfg.size];
  let list = [];
  for (const p of parts) {
    const want = Math.max(1, Math.round(REAL[p] * target / full));
    let got = [];
    for (const u of shuffle(groupUnits(questions.filter(q => q.pt === p)))) { if (got.length >= want) break; if (got.length && got.length + u.length > want + 1) continue; got = got.concat(u); }
    list = list.concat(got);
  }
  return list.map(q => q.id);
}
function startExam(cfg) {
  stopSpeech(); if (exam) clearInterval(exam.timer);
  const list = examList(cfg);
  const L = list.filter(id => QMAP.get(id).pt <= 4).length, R = list.length - L;
  exam = { cfg, list, idx: 0, picks: new Map(), start: Date.now(), instant: !!cfg.instant, strict: cfg.scope !== 'R' && !!cfg.strict, plays: {}, done: false, iid: 'hub', mins: Math.round(L * .45 + R * .75) };
  current = IMAP.get('hub'); quiz = null; lastAuto = null; peek = false; if (fishingMode) stopFishing(); openPanel();
  exam.timer = setInterval(() => { const el = $('#ex-time'); if (el) el.textContent = elapsed(); }, 1000);
  renderExam(); walkToExamQ(); goHome();
}
const elapsed = () => { const s = Math.floor((Date.now() - exam.start) / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
function walkToExamQ() { if (!exam || exam.done || exam.idx >= exam.list.length) return; const q = QMAP.get(exam.list[exam.idx]); sendTo(hero, q.i, 1); hero.onArrive = null; }
function renderExam() {
  const ex = exam; const isl = IMAP.get('hub');
  let h = `<div class="p-head"><div class="p-emo" style="background:${islandColor(isl)}">📝</div><div class="p-title"><div class="p-crumb">模擬考・${ex.instant ? '即時公布答案' : '交卷後公布'}${ex.strict ? '・考場模式' : ''}</div><h2>${SCOPE[ex.cfg.scope]}・${ex.list.length} 題</h2><div class="sub">${ex.done ? '已交卷' : `計時 <span id="ex-time" style="font-family:var(--f-num)">${elapsed()}</span>／建議 ${ex.mins} 分鐘`}・已答 ${ex.picks.size}/${ex.list.length}</div></div>${layoutBtn()}<button class="x" data-act="close" aria-label="結束模擬考">×</button></div><div class="p-body" id="pbody">`;
  if (ex.done) h += examResult();
  else {
    const q = QMAP.get(ex.list[ex.idx]); const pick = ex.picks.has(q.id) ? ex.picks.get(q.id) : null; const prevQ = ex.idx ? QMAP.get(ex.list[ex.idx - 1]) : null;
    if (!prevQ || prevQ.pt !== q.pt) h += `<div class="l-hint">Part ${q.pt}　${PART_NAME[q.pt]}${q.pt <= 4 ? '・聽力' : '・閱讀'}</div>`;
    h += questionHTML(q, pick, ex.idx + 1, ex.list.length, `${IMAP.get(q.i).emoji} ${IMAP.get(q.i).nick}`, ex.instant);
    const last = ex.idx + 1 === ex.list.length;
    h += `<div class="qnav"><button class="btn" data-act="prev" ${ex.idx === 0 ? 'disabled' : ''}>上一題</button><button class="btn ${pick != null ? 'pri' : ''}" data-act="next">${last ? '交卷' : pick != null ? '下一題' : '跳過'}</button></div>`;
    h += `<div class="row" style="justify-content:center;margin-top:10px"><button class="btn sm" data-act="exam-submit">提前交卷</button></div>`;
  }
  panel.innerHTML = h + '</div>';
  requestAnimationFrame(computeOffsets);
  maybeAutoplay();
}
function examPick(k) {
  if (exam.done) return; const q = QMAP.get(exam.list[exam.idx]); if (exam.picks.has(q.id) || k >= q.o.length) return;
  exam.picks.set(q.id, k); const ok = record(q, k, 'exam');
  if (exam.instant) reactHero(ok); else { hero.vy = 4; if (store.sound) beep(true); }
  if (!exam.instant && exam.idx + 1 < exam.list.length) { exam.idx++; peek = false; walkToExamQ(); }
  renderExam();
}
function examNext() { if (exam.done) return; if (exam.idx + 1 >= exam.list.length) { finishExam(); return; } exam.idx++; renderExam(); $('#pbody').scrollTop = 0; walkToExamQ(); }
function finishExam() {
  exam.done = true; clearInterval(exam.timer); exam.end = Date.now(); stopSpeech();
  renderExam(); sendTo(hero, 'hub', .9); hero.onArrive = () => { hero.vy = 7; };
  const r = examScores(); const good = r.acc >= .7;
  say(hero, r.total != null ? `估計 ${r.total} 分！` : `答對 ${Math.round(r.acc * 100)}%`, 'big ' + (good ? 'ok' : 'no'), 2600); beep(good);
}
function examScores() {
  const sec = { L: { n: 0, ok: 0 }, R: { n: 0, ok: 0 } };
  for (const id of exam.list) { const q = QMAP.get(id); const b = sec[q.pt <= 4 ? 'L' : 'R']; b.n++; if (exam.picks.get(id) === q.a) b.ok++; }
  const l = sec.L.n ? interp(LT, sec.L.ok / sec.L.n) : null, r = sec.R.n ? interp(RT, sec.R.ok / sec.R.n) : null;
  const n = sec.L.n + sec.R.n, ok = sec.L.ok + sec.R.ok;
  return { sec, l, r, total: l != null && r != null ? l + r : null, acc: n ? ok / n : 0, ok, n };
}
function examResult() {
  const ex = exam; const S = examScores(); const s = Math.floor(((ex.end || Date.now()) - ex.start) / 1000);
  const by = {};
  for (const id of ex.list) { const q = QMAP.get(id); const b = by[q.pt] = by[q.pt] || { n: 0, ok: 0 }; b.n++; if (ex.picks.get(id) === q.a) b.ok++; }
  const wrong = ex.list.filter(id => ex.picks.has(id) && ex.picks.get(id) !== QMAP.get(id).a);
  const skipped = ex.list.filter(id => !ex.picks.has(id));
  const box = (v, t) => `<div><b>${v == null ? '–' : v}</b><span>${t}</span></div>`;
  return `<div class="sc2">${box(S.l, `聽力（${S.sec.L.ok}/${S.sec.L.n}）`)}${box(S.r, `閱讀（${S.sec.R.ok}/${S.sec.R.n}）`)}${box(S.total, '估計總分')}</div>
  <div class="score"><b style="color:${S.acc >= .7 ? 'var(--good)' : 'var(--bad)'}">${Math.round(S.acc * 100)}<small style="font-size:18px">%</small></b><div><div style="font-family:var(--f-display);font-weight:800;font-size:17px">${S.total != null ? `粗估落在 ${certTag(S.total)}` : `答對 ${S.ok}/${S.n} 題`}</div><div style="color:var(--ink-2);font-size:13px">未作答 ${skipped.length}・用時 ${Math.floor(s / 60)} 分 ${s % 60} 秒（建議 ${ex.mins} 分）。量尺分數是依答對率粗估，正式考試每回換算不同。</div></div></div>
  <h3>各 Part 得分</h3><div class="heat">${Object.entries(by).map(([pt, b]) => `<button data-isl-go="${PART_ISL[pt]}" style="border-color:${b.ok === b.n ? 'var(--good)' : b.ok / b.n < .6 ? 'var(--bad)' : 'var(--line)'}"><b>Part ${pt} ${PART_NAME[pt]}</b><span>${b.ok}/${b.n}・${pct(b.ok / b.n)}</span></button>`).join('')}</div>
  ${wrong.length ? `<h3>錯題與解析</h3>${wrong.map(id => reviewItem(QMAP.get(id), ex.picks.get(id))).join('')}` : ''}
  <div class="qnav"><button class="btn" data-act="exam-quit">結束</button><button class="btn pri" data-act="exam-again">再考一次</button></div>`;
}

