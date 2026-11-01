const tagOf = (q, iid) => iid === 'hub' ? 'P' + q.pt : q.t;
function setupBlock(isl) {
  const pool = isl.id === 'hub' ? questions : QBY[isl.id];
  const tags = []; for (const q of pool) { const t = tagOf(q, isl.id); if (!tags.includes(t)) tags.push(t); }
  if (isl.id === 'hub') tags.sort();
  if (opts.source !== 'all' && !tags.includes(opts.source)) opts.source = 'all';
  const cnt = t => pool.filter(q => tagOf(q, isl.id) === t).length;
  const segBtn = (k, v, t) => `<button data-opt="${k}" data-v="${esc(v)}" aria-pressed="${opts[k] === v}">${esc(t)}</button>`;
  return `<div class="lbl">${isl.id === 'hub' ? '範圍' : '題型'}</div><div class="seg">${segBtn('source', 'all', `全部 ${pool.length}`)}${tags.map(t => segBtn('source', t, `${isl.id === 'hub' ? `Part ${t.slice(1)} ${PART_NAME[t.slice(1)]}` : t} ${cnt(t)}`)).join('')}</div>
  <div class="lbl">出題方式</div><div class="seg">${segBtn('order', 'seq', '依序')}${segBtn('order', 'rand', '隨機')}${segBtn('order', 'new', '未作答')}${segBtn('order', 'wrong', '錯題重練')}${segBtn('order', 'mark', '收藏')}</div>
  ${isl.subj === 1 || isl.id === 'hub' ? `<p style="font-size:12.5px;color:var(--ink-2);margin:10px 0 0">🔊 聽力題會用瀏覽器語音朗讀。<button class="linkbtn" data-act="voice">調整語速與口音</button></p>` : ''}
  <div style="margin-top:14px"><button class="btn pri wide" data-act="start">開始答題</button></div>`;
}
