function tableHTML(cols, rows, st, key, sub) {
  return `<div class="tw-scroll"><table class="tw-table"><thead><tr>${cols.map((c, j) => `<th>${j && !sub ? `<button data-tw="col" data-c="${j}" aria-pressed="${st.col === j}">${c}</button>` : c}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, j) => j ? `<td class="${!sub && st.col === j ? 'hl' : ''}">${c}</td>` : `<th scope="row">${c}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function diffWords(target, typed) {
  const norm = x => x.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').trim();
  const T = target.split(/\s+/), tn = T.map(x => norm(x)), u = norm(typed).split(/\s+/).filter(Boolean);
  const n = tn.length, m = u.length, L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = tn[i] === u[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const hit = new Array(n).fill(false); let i = 0, j = 0;
  while (i < n && j < m) { if (tn[i] === u[j]) { hit[i] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
  return { html: T.map((x, k) => `<span class="${hit[k] ? 'dw-ok' : 'dw-no'}">${esc(x)}</span>`).join(' '), ok: hit.filter(Boolean).length, n };
}
function wHTML(key, w) {
  const st = tws[key] = tws[key] || {};
  switch (w.type) {
    case 'sort': {
      st.ans = st.ans || {}; const n = w.items.length, done = Object.keys(st.ans).length, ok = w.items.filter((it, i) => st.ans[i] === it[1]).length;
      return `<div class="tw-head"><span>${esc(w.tip || '把每一項分到正確的類別')}</span><span class="tw-score">${done}/${n} 已作答・答對 ${ok}</span></div>
      <ul class="srt">${w.items.map((it, i) => { const a = st.ans[i]; const res = a == null ? '' : a === it[1] ? 'ok' : 'no';
        return `<li class="${res}"><div class="srt-t en">${esc(it[0])}</div><div class="srt-b">${w.buckets.map((b, j) => `<button data-tw="sort" data-i="${i}" data-b="${j}" class="${a == null ? '' : j === it[1] ? 'right' : j === a ? 'wrong' : ''}" ${a != null ? 'disabled' : ''}>${esc(b)}</button>`).join('')}</div>${a != null ? `<div class="srt-why">${res === 'ok' ? '✓ 正確' : `✗ 正解是「${esc(w.buckets[it[1]])}」`}${it[2] ? '：' + esc(it[2]) : ''}</div>` : ''}</li>`; }).join('')}</ul>
      ${done === n ? `<div class="tw-done">${ok === n ? '全部答對！' : `答對 ${ok} / ${n}，看一下錯的說明再試一次。`} <button class="btn sm" data-tw="reset">重新作答</button></div>` : ''}`;
    }
    case 'fill': {
      st.ans = st.ans || {}; const n = w.items.length, done = Object.keys(st.ans).length, ok = w.items.filter((it, i) => st.ans[i] === it[2]).length;
      return `<div class="tw-head"><span>${esc(w.tip || '選出最適合的答案')}</span><span class="tw-score">${done}/${n}・答對 ${ok}</span></div>
      <ul class="srt">${w.items.map((it, i) => { const a = st.ans[i]; const res = a == null ? '' : a === it[2] ? 'ok' : 'no';
        return `<li class="${res}"><div class="srt-t en">${it[0]}</div><div class="srt-b">${it[1].map((o, j) => `<button data-tw="fill" data-i="${i}" data-j="${j}" class="${a == null ? '' : j === it[2] ? 'right' : j === a ? 'wrong' : ''}" ${a != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>${a != null ? `<div class="srt-why">${res === 'ok' ? '✓ ' : '✗ 正解是「' + esc(it[1][it[2]]) + '」：'}${esc(it[3])}</div>` : ''}</li>`; }).join('')}</ul>
      ${done === n ? `<div class="tw-done">${ok === n ? '全部答對！' : `答對 ${ok} / ${n}`} <button class="btn sm" data-tw="reset">重新作答</button></div>` : ''}`;
    }
    case 'grid': {
      if (st.col == null) st.col = -1;
      return `<div class="tw-head"><span>點表頭可以標亮那一欄</span></div>${tableHTML(w.cols, w.rows, st, key)}`;
    }
    case 'cards': {
      st.open = st.open || [];
      return `<div class="tw-head"><span>點卡片翻面</span><button class="btn sm" data-tw="flipall">${st.open.length === w.items.length ? '全部蓋回' : '全部翻開'}</button></div><div class="fcards">${w.items.map((c, i) => `<button class="fcard ${st.open.includes(i) ? 'open' : ''}" data-tw="card" data-i="${i}" aria-pressed="${st.open.includes(i)}"><span class="fc-f">${c[0]}</span><span class="fc-b">${c[1]}</span></button>`).join('')}</div>`;
    }
    case 'steps': {
      st.mode = st.mode || 'learn'; if (st.shown == null) st.shown = 1;
      if (st.mode === 'game') {
        const picked = st.picked || []; const fin = picked.length === w.items.length;
        return `<div class="tw-head"><span>${fin ? '排序完成！' : `依正確順序點選，下一個是第 ${picked.length + 1} 步`}</span><button class="btn sm" data-tw="learn">回到說明</button></div>
        <ol class="stp done-list">${picked.map(i => `<li><b>${esc(w.items[i][0])}</b></li>`).join('')}</ol>
        ${fin ? `<div class="tw-done">順序全對！<button class="btn sm" data-tw="game">再玩一次</button></div>` : `<div class="pool">${st.pool.filter(i => !picked.includes(i)).map(i => `<button class="${st.wrong === i ? 'shake' : ''}" data-tw="pick" data-i="${i}">${esc(w.items[i][0])}</button>`).join('')}</div>`}`;
      }
      const n = w.items.length;
      return `<div class="tw-head"><span>${w.order ? '依序閱讀，再挑戰排序' : '一項一項看'}</span>${w.order ? '<button class="btn sm" data-tw="game">排序挑戰</button>' : ''}</div>
      <ol class="stp">${w.items.slice(0, st.shown).map(s => `<li><b>${esc(s[0])}</b><span>${esc(s[1])}</span></li>`).join('')}</ol>
      ${st.shown < n ? `<div class="row"><button class="btn sm pri" data-tw="next">下一步（${st.shown}/${n}）</button><button class="btn sm" data-tw="all">全部顯示</button></div>` : ''}`;
    }
    case 'layers': {
      st.open = st.open || [];
      return `<div class="tw-head"><span>點每一層展開說明</span><button class="btn sm" data-tw="openall">${st.open.length === w.items.length ? '全部收合' : '全部展開'}</button></div><div class="lyr">${w.items.map((it, i) => `<div class="lyr-row ${st.open.includes(i) ? 'open' : ''}" style="--i:${i}"><button data-tw="layer" data-i="${i}" aria-expanded="${st.open.includes(i)}"><span class="lyr-h">${it.h}</span><span class="lyr-s">${it.s}</span>${it.tag ? `<span class="lyr-tag">${it.tag}</span>` : ''}</button>${st.open.includes(i) ? `<div class="lyr-d">${it.d}</div>` : ''}</div>`).join('')}</div>`;
    }
    case 'listen': {
      st.open = st.open || [];
      return `<div class="tw-head"><span>${esc(w.tip || '點 ▶ 聽句子，再點句子看原文')}</span><button class="btn sm" data-tw="lsall">${st.open.length === w.items.length ? '全部隱藏' : '全部顯示'}</button></div>
      <ul class="lsn">${w.items.map((it, i) => `<li><button class="btn sm" data-say="${esc(it[0])}" ${w.accent ? `data-vi="${i}"` : ''} aria-label="播放第 ${i + 1} 句">▶</button><button class="lsn-t ${st.open.includes(i) ? 'open' : ''}" data-tw="lsn" data-i="${i}">${st.open.includes(i) ? `<b>${esc(it[0])}</b><small>${esc(it[1])}</small>` : `<span class="hidden-txt">第 ${i + 1} 句：先聽，再點這裡看原文</span>`}</button></li>`).join('')}</ul>
      ${w.accent ? '<div class="tw-note">每一句會換一個不同口音或性別的聲音（依你的電腦與瀏覽器有哪些聲音而定）。</div>' : ''}`;
    }
    case 'pairs': {
      st.score = st.score || 0; st.n = st.n || 0; const cur = st.cur;
      let h = `<div class="tw-head"><span>${esc(w.tip || '聽一個單字，選出你聽到的是哪一個')}</span><span class="tw-score">答對 ${st.score}/${st.n}</span></div><div class="pairs-box"><button class="btn pri" data-tw="pplay">${cur && cur.ans == null ? '🔁 再聽一次' : '▶ 播放新題目'}</button>`;
      if (cur) {
        const pair = w.items[cur.i];
        h += `<div class="row" style="justify-content:center;margin-top:12px">${pair.map((x, j) => `<button class="btn ${cur.ans == null ? '' : j === cur.s ? 'pri' : j === cur.ans ? 'bad' : ''}" data-tw="pans" data-j="${j}" ${cur.ans != null ? 'disabled' : ''}>${esc(x)}</button>`).join('')}</div>`;
        if (cur.ans != null) h += `<div class="tw-out">${cur.ans === cur.s ? '✓ 正確！' : `✗ 剛剛念的是「${esc(pair[cur.s])}」`}　兩個都聽聽看：<button class="btn sm" data-say="${esc(pair[0])}">▶ ${esc(pair[0])}</button> <button class="btn sm" data-say="${esc(pair[1])}">▶ ${esc(pair[1])}</button></div>`;
      }
      return h + '</div>';
    }
    case 'dict': {
      st.i = st.i || 0; const it = w.items[st.i];
      return `<div class="tw-head"><span>聽寫第 ${st.i + 1} / ${w.items.length} 句</span><span class="tw-score">${st.best ? `本句最佳 ${st.best}%` : ''}</span></div>
      <div class="row"><button class="btn sm pri" data-tw="dplay">▶ 播放</button><button class="btn sm" data-tw="dslow">🐢 慢速播放</button></div>
      <label class="tw-in" style="margin-top:8px">打出你聽到的英文句子（按 Enter 對答案）<input class="en" data-twin="dict" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(st.txt || '')}"></label>
      <div class="row" style="margin-top:8px"><button class="btn sm" data-tw="dcheck">對答案</button><button class="btn sm" data-tw="dshow">直接看答案</button>${st.i > 0 ? '<button class="btn sm" data-tw="dprev">上一句</button>' : ''}${st.i < w.items.length - 1 ? '<button class="btn sm" data-tw="dnext">下一句</button>' : ''}</div>
      ${st.res ? `<div class="tw-out">${st.res}<div style="color:var(--ink-2);font-size:12.5px;margin-top:4px">${esc(it[1])}</div></div>` : ''}`;
    }
  }
  return '';
}
