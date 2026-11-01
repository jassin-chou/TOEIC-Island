function pull() {
  if (fish.phase === 'wait') { fish.phase = 'miss'; fish.msg = '拉得太早，魚被嚇跑了。等浮標沉下去再拉。'; reel(); swish(400, 200, .2); renderPanel(); return; }
  if (fish.phase !== 'bite') return;
  const W = VOCAB.words; const r = Math.random(); const idx = W.map((_, i) => i);
  let rar = r < .1 ? 'l' : r < .38 ? 'r' : 'c'; let wi = null;
  if (rar === 'l') { const missed = idx.filter(i => store.words[i] && store.words[i].last === false); if (missed.length) wi = missed[Math.floor(Math.random() * missed.length)]; else rar = 'r'; }
  if (wi == null) { const fresh = idx.filter(i => !store.words[i]); const pool = fresh.length ? fresh : idx; wi = pool[Math.floor(Math.random() * pool.length)]; }
  const sp = W[wi][4];
  const R = RARITY[rar]; const size = Math.round(R.min + Math.random() * (R.max - R.min));
  fish.catch = { sp, rar, size, wi, gold: rar === 'l', q: makeWordQ(wi, rar === 'c' ? 'mean' : 'fill') }; fish.pick = null; fish.phase = 'reel'; fish.at = 0;
  const [, c1, c2] = FISH[sp]; fishBodyM.color.set(rar === 'l' ? '#f2c230' : c1); fishTailM.color.set(rar === 'l' ? '#fff1a8' : c2);
  fish3d.visible = true; fish3d.scale.setScalar(.6 + size / 90); bobber.visible = false;
  splashAt(fish.target); swish(300, 1200, .4, .08); hero.vy = 6;
  renderPanel();
}
function makeWordQ(wi, type) {
  const W = VOCAB.words, w = W[wi];
  const same = shuffle(W.map((_, i) => i).filter(i => i !== wi && W[i][4] === w[4]));
  const plain = w[3].replace(/\*/g, '');
  if (type === 'mean') {
    const others = same.filter(i => W[i][2] !== w[2]).slice(0, 3);
    const o = shuffle([wi, ...others]);
    return { kind: 'mean', q: `「${w[0]}」最接近哪一個意思？`, o: o.map(i => W[i][2]), a: o.indexOf(wi), e: `${w[0]}（${w[1]}）${w[2]}。例句：${plain}` };
  }
  const samePos = same.filter(i => W[i][1] === w[1]); const others = samePos.concat(same.filter(i => !samePos.includes(i))).slice(0, 3);
  const o = shuffle([wi, ...others]);
  return { kind: 'fill', q: w[3].replace(/\*[^*]+\*/, '_______'), o: o.map(i => W[i][0]), a: o.indexOf(wi), e: `${w[0]}（${w[1]}）${w[2]}。完整句子：${plain}` };
}
