const { islands, questions, sets: SETS, vocab: VOCAB } = window.DATA;
const QMAP = new Map(questions.map(q => [q.id, q]));
const HUB = { id:'hub', subj:0, name:'中央港口廣場', nick:'多益廣場', emoji:'⛲', q:0, r:0, chap:'群島總覽', sec:'', kp:[] };
const ALL = [HUB, ...islands];
const IMAP = new Map(ALL.map(i => [i.id, i]));
const QBY = {}; islands.forEach(i => QBY[i.id] = []); questions.forEach(q => QBY[q.i].push(q));
const SUBJ = { 1:'聽力 Listening', 2:'閱讀 Reading' };
const SUBJ_SHORT = { 0:'群島總覽', 1:'聽力', 2:'閱讀' };
const ISL_COLOR = { p1:'#f5c376', p2:'#f3a28a', p34:'#eaa6c4', p5g:'#8fd3c1', p5v:'#93c4ee', p6:'#acd98b', p7:'#9fb0f2' };
const PART_ISL = { 1:'p1', 2:'p2', 3:'p34', 4:'p34', 5:'p5g', 6:'p6', 7:'p7' };
const PART_NAME = { 1:'照片描述', 2:'應答問題', 3:'簡短對話', 4:'簡短獨白', 5:'句子填空', 6:'段落填空', 7:'閱讀測驗' };
const islandColor = i => i.id === 'hub' ? '#f1e2c6' : ISL_COLOR[i.id];
const LETTERS = 'ABCD';
const isListen = q => q.pt <= 4;
const hideText = q => q.pt <= 2;            // Part 1–2: stem and options are only heard
const srcLabel = q => `Part ${q.pt}・${q.t}`;
const srcLong = q => `本站依多益（TOEIC L&R）官方題型原創的練習題，不是 ETS 官方試題。${isListen(q) ? '語音由你的瀏覽器即時朗讀。' : ''}`;
const stemText = q => q.pt === 1 ? `【照片】${q.ph.d}` : q.p && q.pt >= 6 ? `${SETS[q.p].t}｜${q.q}` : q.q;
const stripTags = h => String(h || '').replace(/<[^>]+>/g, ' ');
const searchText = q => q._s || (q._s = [stemText(q), q.o.join(' '), q.e, q.t, q.p ? (SETS[q.p].au ? SETS[q.p].au.map(x => x[1]).join(' ') + SETS[q.p].zh : SETS[q.p].docs.map(d => stripTags(d[1])).join(' ')) : ''].join(' ').toLowerCase());

