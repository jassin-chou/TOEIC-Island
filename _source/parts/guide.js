function renderGuide() {
  const hub = islandStats('hub');
  let h = `<button class="g-hub ${current && current.id === 'hub' ? 'sel' : ''}" data-isl="hub"><span style="font-size:20px">⛲</span><span><b>多益廣場</b><br><small style="color:var(--ink-2)">考試介紹、隨機練習、模擬考｜已作答 ${hub.answered}/${hub.total}${TUT.hub ? `・教學 ${tutDone('hub')}/${tutTotal('hub')}` : ''}</small></span></button>`;
  for (const s of [1, 2]) {
    h += `<section class="g-subj"><h2><i style="background:var(${s === 1 ? '--m' : '--t'})"></i>${SUBJ[s]}</h2>`;
    for (const i of islands.filter(x => x.subj === s)) {
      const st = islandStats(i.id);
      h += `<button class="g-isl ${current && current.id === i.id ? 'sel' : ''}" data-isl="${i.id}"><span class="e">${i.emoji}</span><span class="n"><b>${esc(i.nick)}</b><small>${esc(i.chap)}${TUT[i.id] ? `・教學 ${tutDone(i.id)}/${tutTotal(i.id)}` : ''}</small><div class="meter"><i style="width:${st.total ? st.correct / st.total * 100 : 0}%"></i></div></span><span class="p"><span class="flagdot" style="background:${masteryColor(st)}"></span>${st.answered}/${st.total}</span></button>`;
    }
    h += `</section>`;
  }
  const learned = Object.values(store.words).filter(w => w.ok).length;
  h += `<button class="g-hub ${fishingMode ? 'sel' : ''}" data-act="fish"><span style="font-size:20px">🎣</span><span><b>單字釣魚碼頭</b><br><small style="color:var(--ink-2)">160 個高頻單字｜已學會 ${learned}</small></span></button>`;
  $('#g-tree').innerHTML = h;
}
