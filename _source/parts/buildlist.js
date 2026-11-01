function groupUnits(pool) { const units = [], by = new Map(); for (const q of pool) { const k = q.p || q.id; if (!by.has(k)) { by.set(k, []); units.push(by.get(k)); } by.get(k).push(q); } return units; }
function buildList(iid) {
  let pool = iid === 'hub' ? questions.slice() : QBY[iid].slice();
  if (opts.source !== 'all') pool = pool.filter(q => tagOf(q, iid) === opts.source);
  const lm = lastMap();
  if (opts.order === 'new') pool = pool.filter(q => !lm.has(q.id));
  if (opts.order === 'wrong') pool = pool.filter(q => lm.has(q.id) && !lm.get(q.id).ok);
  if (opts.order === 'mark') pool = pool.filter(q => store.marks.has(q.id));
  if (opts.order !== 'seq') {
    // shuffle by unit so the questions of one conversation / passage stay together and in order
    let units = shuffle(groupUnits(pool));
    if (iid === 'hub') { const out = []; let n = 0; for (const u of units) { if (n >= 20) break; out.push(u); n += u.length; } units = out; }
    pool = units.flat();
  }
  return pool.map(q => q.id);
}
