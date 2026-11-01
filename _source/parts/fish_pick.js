function fishPick(k) {
  if (fish.phase !== 'question' || fish.pick != null) return;
  const c = fish.catch; if (k >= c.q.o.length) return;
  fish.pick = k; const ok = k === c.q.a;
  const w = store.words[c.wi] = store.words[c.wi] || { n: 0, ok: 0 }; w.n++; if (ok) w.ok++; w.last = ok; w.t = Date.now();
  reactHero(ok);
  if (ok) { const b = store.fish[c.sp] = store.fish[c.sp] || { n: 0, best: 0, gold: false }; b.n++; b.best = Math.max(b.best, c.size); if (c.gold) b.gold = true; }
  save(); fish.phase = 'done'; renderPanel();
  speakText(VOCAB.words[c.wi][0]);
  const fb = $('.fb', panel); if (fb) fb.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
}
