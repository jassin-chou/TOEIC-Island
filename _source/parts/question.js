let peek = false;       // practice mode: show the hidden Part 1–2 text before answering
let lastAuto = null;    // audio key that was auto-played last
const strictLeft = q => exam && exam.strict && !exam.done ? Math.max(0, 1 - (exam.plays[audioKey(q)] || 0)) : null;
function audioBar(q) {
  const key = audioKey(q), on = tts.playing && tts.quiz && tts.key === key, left = strictLeft(q);
  const lab = q.pt === 1 ? '四個描述' : q.pt === 2 ? '題目與三個回應' : q.pt === 3 ? '對話錄音' : '獨白錄音';
  return `<div class="au-bar ${on ? 'playing' : ''}"><button class="btn sm pri au-play" data-act="play" ${left === 0 && !on ? 'disabled' : ''}>${on ? '■ 停止' : '▶ 播放'}</button><span>${lab}</span><span class="au-st">${left != null ? `考場模式・剩 ${left} 次・` : ''}${store.voice.rate}×・<button class="linkbtn" data-act="voice">聲音設定</button></span></div>`;
}
function mediaHTML(q) {
  let h = ''; const s = q.p ? SETS[q.p] : null;
  if (s && s.docs) {
    const bn = q.pt === 6 ? q.id.split('-').pop() : null;
    h += `<div class="passage">${s.docs.map(([t, x]) => `<div class="doc"><div class="doc-h">${esc(t)}</div>${bn ? x.replace(`<span class="blank">(${bn})</span>`, `<span class="blank cur">(${bn})</span>`) : x}</div>`).join('')}</div>`;
  }
  if (s && s.g) h += `<div class="fig">${s.g}</div>`;
  if (q.pt === 1) h += `<div class="ph"><div class="ph-e" aria-hidden="true">${q.ph.e}</div><div class="ph-d"><b>照片（以文字描述畫面）</b>${esc(q.ph.d)}</div></div>`;
  if (isListen(q)) h += audioBar(q);
  return h;
}
const SPK = { W: '女', W2: '女 2', M: '男', M2: '男 2', N: '🎙' };
function transcriptHTML(q) {
  if (q.pt === 1) return '';
  if (q.pt === 2) return `<div class="trans"><div class="ln"><b>題目</b>${esc(q.q)}</div>${q.o.map((o, k) => `<div class="ln"><b>(${LETTERS[k]})</b>${esc(o)}</div>`).join('')}</div>`;
  const s = SETS[q.p]; if (!s || !s.au) return '';
  return `<details class="trans"><summary>聽力原文與中譯</summary>${s.au.map(([r, t]) => `<div class="ln"><b>${s.k === 'talk' ? '🎙' : SPK[r] || r}</b>${esc(t)}</div>`).join('')}<div class="zh">${esc(s.zh)}</div></details>`;
}
function questionHTML(q, pick, n, total, ctxLabel, instant = true) {
  const answered = pick != null, reveal = answered && instant;
  const prev = lastMap().get(q.id);
  const show = !hideText(q) || reveal || (peek && !exam);
  let h = `<div class="qtop"><span class="chip ${isListen(q) ? '' : 'e'}">${srcLabel(q)}</span>${ctxLabel ? `<span class="chip">${esc(ctxLabel)}</span>` : ''}<span class="qprog">${n} / ${total}</span><button class="star" data-act="mark" aria-pressed="${store.marks.has(q.id)}" aria-label="收藏這題" title="收藏">★</button></div>`;
  h += `<div class="bar"><i style="width:${(n - (answered ? 0 : 1)) / total * 100}%"></i></div>`;
  h += mediaHTML(q);
  if (q.pt === 1) h += `<p class="qstem">聽四個描述，選出最符合照片的一句。</p>`;
  else if (q.pt === 2) h += `<p class="qstem ${show ? 'en' : ''}">${show ? esc(q.q) : '<span class="hidden-txt">（題目和回應都只用聽的，選出最適當的回應）</span>'}</p>`;
  else h += `<p class="qstem en">${esc(q.q).replace(/\n/g, '<br>')}</p>`;
  if (hideText(q) && !answered && !exam) h += `<div class="peek"><button class="btn sm" data-act="peek">${peek ? '隱藏原文' : '👀 偷看原文'}</button></div>`;
  if (!answered && prev && prev.t < (quiz && quiz.started || exam && exam.start || 0)) h += `<p class="prev">這題之前作答過：${prev.ok ? '答對' : '答錯'}（選 ${LETTERS[prev.p]}）</p>`;
  h += `<ol class="opts">` + q.o.map((o, k) => {
    let cls = '', tag = '';
    if (reveal) { if (k === q.a) { cls = 'right'; tag = k === pick ? '你答對了' : '正確答案'; } else if (k === pick) { cls = 'wrong'; tag = '你的選擇'; } else cls = 'dim'; }
    else if (answered && k === pick) { tag = '已選'; }
    return `<li><button class="opt ${cls}" data-act="pick" data-k="${k}" ${answered ? 'disabled' : ''}><span class="k">${LETTERS[k]}</span><span class="en">${show ? esc(o) : `<span class="hidden-txt">(${LETTERS[k]}) 聽錄音作答</span>`}</span>${tag ? `<span class="tag">${tag}</span>` : ''}</button></li>`;
  }).join('') + `</ol>`;
  if (reveal) {
    const ok = pick === q.a;
    h += `<div class="fb ${ok ? 'ok' : 'no'}"><div class="v">${ok ? '答對了！' : '答錯了'}</div><div class="ans">正確答案：(${LETTERS[q.a]}) ${esc(q.o[q.a])}</div><p class="exp"><b>解析：</b>${esc(q.e)}</p>${isListen(q) ? transcriptHTML(q) : ''}<div class="src">${srcLong(q)}</div></div>`;
  }
  return h;
}
function currentQ() {
  if (fishingMode) return null;
  if (exam && !exam.done) return QMAP.get(exam.list[exam.idx]);
  if (quiz && tab === 'quiz' && quiz.idx < quiz.list.length) return QMAP.get(quiz.list[quiz.idx]);
  return null;
}
function playCurrent() {
  const q = currentQ(); if (!q || !isListen(q)) return;
  const key = audioKey(q);
  if (tts.playing && tts.quiz && tts.key === key) { stopSpeech(); return; }
  if (exam && exam.strict) { const used = exam.plays[key] || 0; if (used >= 1) { toast('考場模式：每段錄音只播放一次'); return; } exam.plays[key] = used + 1; }
  const ok = speakLines(scriptFor(q), key, { quiz: true });
  if (!ok && hideText(q) && !exam) { peek = true; }
  if (exam) renderExam(); else if (!ok) renderPanel();
}
function maybeAutoplay() {
  const q = currentQ();
  if (!q || !isListen(q)) { if (tts.playing && tts.quiz) stopSpeech(); if (!q) lastAuto = null; return; }
  const key = audioKey(q);
  if (tts.playing && tts.quiz && tts.key !== key) stopSpeech();
  const answered = exam ? exam.picks.has(q.id) : quiz.picks.has(q.id);
  if (key === lastAuto || answered || !store.voice.auto || !tts.ok) return;
  if (exam && exam.strict && (exam.plays[key] || 0) >= 1) return;
  lastAuto = key;
  setTimeout(() => { if (currentQ() === q && !(tts.playing && tts.key === key)) playCurrent(); }, 380);
}
