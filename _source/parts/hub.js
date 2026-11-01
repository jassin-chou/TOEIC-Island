// estimated scaled score from % correct (rough; real conversion differs every test)
const LT = [[0, 5], [10, 35], [20, 85], [30, 135], [40, 190], [50, 245], [60, 300], [70, 355], [80, 410], [90, 460], [95, 485], [100, 495]];
const RT = [[0, 5], [10, 25], [20, 65], [30, 110], [40, 160], [50, 210], [60, 265], [70, 320], [80, 375], [90, 430], [95, 465], [100, 495]];
function interp(T, p) { p *= 100; for (let k = 1; k < T.length; k++) if (p <= T[k][0]) { const [x0, y0] = T[k - 1], [x1, y1] = T[k]; return Math.max(5, Math.round((y0 + (y1 - y0) * (p - x0) / (x1 - x0)) / 5) * 5); } return 495; }
const CERT = [[860, '金色', 'gold'], [730, '藍色', 'blue'], [470, '綠色', 'green'], [220, '棕色', 'brown'], [0, '橘色', 'orange']];
const certOf = s => CERT.find(c => s >= c[0]);
const certTag = s => { const c = certOf(s); return `<span class="cert c-${c[2]}">${c[1]}證書</span>`; };
function hubInfo() {
  const L = subjStats(1), R = subjStats(2), all = islandStats('hub');
  const weak = islands.map(i => ({ i, st: islandStats(i.id) })).filter(x => x.st.answered >= 3).sort((a, b) => a.st.acc - b.st.acc).slice(0, 3);
  const est = L.answered >= 10 && R.answered >= 10 ? { l: interp(LT, L.acc), r: interp(RT, R.acc) } : null;
  const learned = Object.values(store.words).filter(w => w.ok).length;
  return `<div class="kv"><div><b>${all.answered}/${all.total}</b><span>題庫覆蓋</span></div><div><b>${pct(L.acc)}</b><span>聽力正確率</span></div><div><b>${pct(R.acc)}</b><span>閱讀正確率</span></div></div>
  ${est ? `<div class="estbox">依目前正確率粗估：約 <b>${est.l + est.r}</b> 分 ${certTag(est.l + est.r)}<small>聽力約 ${est.l}・閱讀約 ${est.r}。正式考試每回換算表不同，這裡只是方向參考。</small></div>` : `<div class="estbox" style="font-size:12.5px;color:var(--ink-2)">聽力、閱讀各作答 10 題以上，這裡會顯示粗估分數與證書顏色。</div>`}
  <h3>歡迎來到多益群島</h3><p style="margin:0;font-size:13.5px">7 座島對應多益 TOEIC Listening & Reading 的七個 Part。西邊暖色島是<b>聽力 Part 1–4</b>，東邊冷色島是<b>閱讀 Part 5–7</b>。共 ${questions.length} 題原創練習題，每題附中文解析；聽力題用瀏覽器語音朗讀，作答後看原文與翻譯。先到上方「教學」分頁看考試架構、分數與時間分配。</p>
  ${weak.length ? `<h3>建議先補強</h3><div class="heat">${weak.map(x => `<button data-isl-go="${x.i.id}"><b>${x.i.emoji} ${esc(x.i.nick)}</b><span>${x.st.correct}/${x.st.answered} · ${pct(x.st.acc)}</span></button>`).join('')}</div>` : ''}
  <h3>模擬考</h3><p style="margin:0 0 8px;font-size:13.5px">依正式考試各 Part 的比例抽題，交卷後估算聽力、閱讀分數與證書顏色。可選「聽力只播一次」的考場模式。</p><button class="btn pri" data-act="exam-open">設定模擬考</button>
  <h3>互動教學進度</h3><div class="heat">${ALL.filter(i => TUT[i.id]).map(i => `<button data-isl-learn="${i.id}" style="border-color:${tutDone(i.id) === tutTotal(i.id) && tutTotal(i.id) ? 'var(--good)' : 'var(--line)'}"><b>${i.emoji} ${esc(i.nick)}</b><span>教學 ${tutDone(i.id)}/${tutTotal(i.id)}</span></button>`).join('')}</div>
  <h3>單字釣魚碼頭</h3><p style="margin:0 0 8px;font-size:13.5px">到對話廣播站旁的碼頭釣魚，每條魚帶來一個多益高頻單字（含發音與例句）。已學會 ${learned}/${VOCAB.words.length} 個。</p><button class="btn" data-act="fish">去釣魚</button>
  <h3>全範圍練習</h3>${setupBlock(current)}`;
}
