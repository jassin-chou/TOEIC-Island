function renderFishing() {
  const caught = Object.keys(store.fish).length; const learned = Object.values(store.words).filter(w => w.ok).length;
  let h = `<div class="p-head"><div class="p-emo" style="background:var(--water)">🎣</div><div class="p-title"><div class="p-crumb">對話廣播站旁的木棧道</div><h2>單字釣魚碼頭</h2><div class="sub">每條魚帶來一個多益高頻單字，答對才收進魚簍</div></div>${layoutBtn()}<button class="x" data-act="close" aria-label="關閉">×</button></div>
  <div class="tabs" role="tablist"><button class="tab" role="tab" data-ftab="rod" aria-selected="${fishTab === 'rod'}">釣魚</button><button class="tab" role="tab" data-ftab="book" aria-selected="${fishTab === 'book'}">魚圖鑑 ${caught}/${FISH.length}</button><button class="tab" role="tab" data-ftab="words" aria-selected="${fishTab === 'words'}">單字本 ${learned}/${VOCAB.words.length}</button></div><div class="p-body" id="pbody">`;
  if (fishTab === 'book') h += fishBook();
  else if (fishTab === 'words') h += wordBook();
  else {
    const P = fish.phase;
    if (P === 'walk') h += `<div class="fishstage"><div class="fs-big">小益正走向碼頭…</div><p>到了就可以拋竿。</p></div><button class="btn wide" disabled>拋竿</button>`;
    else if (P === 'idle' || P === 'miss') h += `<div class="fishstage">${P === 'miss' ? `<div class="fs-big" style="color:var(--bad)">魚跑掉了</div><p>${esc(fish.msg)}</p>` : `<div class="fs-big">拋竿吧！</div><p>浮標沉下去、小益頭上冒出「！」時，馬上按「拉竿」。</p>`}</div><button class="btn pri wide" data-act="fish-cast">${P === 'miss' ? '再拋一竿' : '拋竿'}</button>${fishOdds()}`;
    else if (P === 'cast' || P === 'wait') h += `<div class="fishstage"><div class="fs-big">等魚上鉤…</div><p>浮標輕輕晃動中，別太早拉喔。</p></div><button class="btn wide" data-act="fish-pull">拉竿</button>`;
    else if (P === 'bite') h += `<div class="fishstage bite"><div class="fs-big">魚上鉤了！快拉竿！</div></div><button class="btn pri wide pulse" data-act="fish-pull">拉竿！</button>`;
    else if (P === 'reel') h += `<div class="fishstage"><div class="fs-big">拉上來了！</div><p>看看是什麼魚…</p></div>`;
    else h += catchView();
    if (P !== 'question' && P !== 'done' && P !== 'reel') h += `<div class="hint">按 <kbd>空白鍵</kbd> 拋竿／拉竿</div>`;
  }
  panel.innerHTML = h + '</div>';
  requestAnimationFrame(computeOffsets);
}
function fishOdds() { return `<div class="lbl" style="margin-top:14px">魚的稀有度</div><div class="odds"><span><b style="color:${RARITY.c.col}">普通</b>新單字：選中文意思</span><span><b style="color:${RARITY.r.col}">稀有</b>例句填空</span><span><b style="color:${RARITY.l.col}">傳說・黃金魚</b>你答錯過的單字</span></div>
  <div class="lbl">八大主題</div><div class="odds">${VOCAB.themes.map((t, i) => `<span><b>${esc(FISH[i][0])}</b>${esc(t)}</span>`).join('')}</div>`; }
function catchView() {
  const c = fish.catch, q = c.q, w = VOCAB.words[c.wi], R = RARITY[c.rar], name = (c.gold ? '黃金' : '') + FISH[c.sp][0];
  const answered = fish.pick != null;
  let h = `<div class="fishcard"><div class="fc-pic">${fishSVG(c.sp, 132, false, c.gold)}</div><div><span class="chip" style="color:${R.col};border-color:currentColor">${R.t}</span><div class="fc-name">${esc(name)}</div><div class="fc-meta">${c.size} 公分・主題：${esc(VOCAB.themes[c.sp])}</div></div></div>`;
  h += `<div class="qtop"><span class="chip">${q.kind === 'mean' ? '單字意思' : '例句填空'}</span>${q.kind === 'mean' ? `<button class="btn sm" data-say="${esc(w[0])}">🔊 聽發音</button>` : ''}</div>`;
  h += `<p class="qstem ${q.kind === 'fill' ? 'en' : ''}">${esc(q.q)}</p>${q.kind === 'fill' ? '<p class="prev">選出最適合的單字（例句裡可能是變化形，例如過去式或複數）。</p>' : ''}`;
  h += `<ol class="opts">` + q.o.map((o, k) => { let cls = '', tag = ''; if (answered) { if (k === q.a) { cls = 'right'; tag = k === fish.pick ? '你答對了' : '正確答案'; } else if (k === fish.pick) { cls = 'wrong'; tag = '你的選擇'; } else cls = 'dim'; }
    return `<li><button class="opt ${cls}" data-act="pick" data-k="${k}" ${answered ? 'disabled' : ''}><span class="k">${LETTERS[k]}</span><span class="${q.kind === 'fill' ? 'en' : ''}">${esc(o)}</span>${tag ? `<span class="tag">${tag}</span>` : ''}</button></li>`; }).join('') + `</ol>`;
  if (fish.phase === 'done') {
    const ok = fish.pick === q.a; const st = store.words[c.wi];
    h += `<div class="fb ${ok ? 'ok' : 'no'}"><div class="v">${ok ? '答對了！' : '答錯了'}</div>
    <div class="vcard"><span class="vw">${esc(w[0])}</span><span class="vp">${esc(w[1])}</span><button class="btn sm" data-say="${esc(w[0])}">🔊</button><div class="vz">${esc(w[2])}</div><div class="vx">${esc(w[3]).replace(/\*([^*]+)\*/, '<b>$1</b>')} <button class="btn sm" data-say="${esc(w[3].replace(/\*/g, ''))}">🔊 例句</button></div></div>
    <div class="src">這個字你答過 ${st.n} 次、答對 ${st.ok} 次。${ok ? '' : '答錯的字之後會變成黃金魚再出現。'}</div></div>
    <p class="prev" style="margin:10px 0 0">${ok ? `${esc(name)} 收進魚簍！` : `${esc(name)} 溜回海裡了，記住這個字再來挑戰。`}</p>
    <div class="qnav"><button class="btn" data-ftab="words">看單字本</button><button class="btn pri" data-act="fish-cast">再拋一竿</button></div>`;
  }
  return h;
}
function fishBook() {
  const total = Object.values(store.fish).reduce((a, b) => a + b.n, 0);
  return `<p style="margin:0 0 10px;font-size:13px;color:var(--ink-2)">答對單字題才能把魚收進魚簍。已收集 ${Object.keys(store.fish).length}/${FISH.length} 種，共 ${total} 條。每種魚代表一個多益單字主題。</p><div class="book">${FISH.map((f, i) => {
    const b = store.fish[i];
    return `<div class="bk ${b ? '' : 'no'}">${fishSVG(i, 70, !b, b && b.gold)}<b>${b ? esc(f[0]) : '？？？'}</b><small>${esc(VOCAB.themes[i])}${b ? `<br>${b.n} 條・最大 ${b.best} 公分${b.gold ? '・黃金' : ''}` : ''}</small></div>`; }).join('')}</div>`;
}
function wordBook() {
  const W = VOCAB.words;
  let h = `<p style="margin:0 0 10px;font-size:13px;color:var(--ink-2)">八大主題、${W.length} 個多益高頻單字。✓ 答對過、✗ 最近一次答錯、– 還沒釣到。點 🔊 聽發音。</p>`;
  VOCAB.themes.forEach((th, ti) => {
    const list = W.map((w, i) => [w, i]).filter(([w]) => w[4] === ti);
    const ok = list.filter(([, i]) => store.words[i] && store.words[i].ok).length;
    h += `<h3>${esc(th)} <small style="color:var(--ink-2);font-weight:400">${ok}/${list.length}</small></h3><ul class="wl">${list.map(([w, i]) => { const s = store.words[i]; const mk = !s ? '–' : s.last === false ? '✗' : '✓';
      return `<li><button class="say" data-say="${esc(w[0])}" aria-label="播放 ${esc(w[0])}">🔊</button><span><b>${esc(w[0])}</b><small>${esc(w[1])} ${esc(w[2])}</small></span><span class="wst" style="color:${mk === '✓' ? 'var(--good)' : mk === '✗' ? 'var(--bad)' : 'var(--ink-2)'}">${mk}</span></li>`; }).join('')}</ul>`;
  });
  return h;
}
