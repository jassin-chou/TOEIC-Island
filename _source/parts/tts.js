/* ---------- Listening audio: browser text-to-speech (no audio files) ---------- */
const tts = { ok: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window, voices: [], token: 0, playing: false, key: null, quiz: false };
const FEM_RE = /female|zira|aria|jenny|sonia|hazel|susan|natasha|clara|samantha|karen|moira|tessa|fiona|serena|libby|emma|ava\b|michelle|catherine|linda|kate|victoria|allison|joanna|kendra|kimberly|salli|ivy|amy|olivia|nicole|elizabeth|jane|nancy|sara|maisie|freya|abbie|annette|elsa|hayley|tina|heera|veena|google us english|google uk english female/i;
const MAL_RE = /\bmale|david|mark|guy|ryan|george|william|liam|daniel|alex|fred|tom\b|christopher|eric|brian|andrew|roger|thomas|james|matthew|joey|justin|russell|oliver|arthur|aaron|gordon|duncan|darren|neil|tim\b|connor|davis|tony|jason|ravi|prabhat|google uk english male/i;
const BAD_RE = /whisper|bells|boing|bubbles|cellos|zarvox|trinoids|bad news|good news|jester|organ|superstar|wobble|albert|bahh|hysterical|junior|ralph|kathy|princess|grandma|grandpa|rocko|shelley|flo\b|eddy|reed|sandy/i;
const accentOf = l => { l = String(l).toLowerCase().replace('_', '-'); return /gb|uk/.test(l) ? 'UK' : /au/.test(l) ? 'AU' : /ca/.test(l) ? 'CA' : /us/.test(l) ? 'US' : /ie/.test(l) ? 'IE' : /nz/.test(l) ? 'NZ' : /in/.test(l) ? 'IN' : 'EN'; };
const ACC_NAME = { US: '美式', UK: '英式', AU: '澳式', CA: '加拿大', NZ: '紐西蘭', IE: '愛爾蘭', IN: '印度', EN: '英語' };
const ACC_ORDER = ['US', 'UK', 'AU', 'CA', 'NZ', 'IE', 'EN', 'IN'];
function loadVoices() {
  if (!tts.ok) return;
  const all = speechSynthesis.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang));
  tts.voices = all.filter(v => !BAD_RE.test(v.name)); if (!tts.voices.length) tts.voices = all;
  tts.voices.forEach(v => { v._g = FEM_RE.test(v.name) ? 'f' : MAL_RE.test(v.name) ? 'm' : '?'; v._acc = accentOf(v.lang); v._nat = /natural|online|neural|premium|enhanced/i.test(v.name) ? 1 : 0; });
}
if (tts.ok) { loadVoices(); try { speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) { speechSynthesis.onvoiceschanged = loadVoices; } }
function voicePool(g) {
  let vs = tts.voices.slice();
  if (store.voice.accent === 'us') { const us = vs.filter(v => v._acc === 'US'); if (us.length) vs = us; }
  else { const main = vs.filter(v => v._acc !== 'IN'); if (main.length) vs = main; }   // TOEIC uses US / UK / CA / AU speakers
  const gv = vs.filter(v => v._g === g); const pool = gv.length ? gv : vs;
  return pool.sort((a, b) => b._nat - a._nat || ACC_ORDER.indexOf(a._acc) - ACC_ORDER.indexOf(b._acc));
}
function pickVoice(pool, k, avoid) {
  if (!pool.length) return null;
  if (store.voice.accent === 'mix') {
    const accs = [...new Set(pool.map(v => v._acc))]; const acc = accs[k % accs.length];
    const sub = pool.filter(v => v._acc === acc && v !== avoid); if (sub.length) return sub[Math.floor(k / accs.length) % sub.length];
  }
  const c = pool.filter(v => v !== avoid); const arr = c.length ? c : pool; return arr[k % arr.length];
}
function castVoices(seed) {
  const r = rng(seed), k1 = Math.floor(r() * 97), k2 = k1 + 1 + Math.floor(r() * 5);
  const F = voicePool('f'), Mp = voicePool('m');
  const fA = pickVoice(F, k1), fB = pickVoice(F, k2, fA), mA = pickVoice(Mp, k2), mB = pickVoice(Mp, k1 + 2, mA);
  const fOk = fA && fA._g === 'f', mOk = mA && mA._g === 'm';
  return {
    W: { v: fA, p: fOk ? 1 : 1.2 }, W2: { v: fB || fA, p: fB && fB !== fA ? (fB._g === 'f' ? 1 : 1.25) : 1.32 },
    M: { v: mA, p: mOk ? 1 : .78 }, M2: { v: mB || mA, p: mB && mB !== mA ? (mB._g === 'm' ? 1 : .8) : .66 },
    N: r() < .5 ? { v: fA, p: fOk ? 1 : 1.12 } : { v: mA, p: mOk ? 1 : .82 }
  };
}
function diverseVoices() { const out = [], seen = new Set(); for (const v of voicePool('f').concat(voicePool('m'))) if (!seen.has(v._acc + v._g)) { seen.add(v._acc + v._g); out.push(v); } return out.length ? out : tts.voices; }
const splitSent = t => (String(t).match(/[^.!?]+[.!?]+["')]?\s*|[^.!?]+$/g) || [t]).map(x => x.trim()).filter(Boolean);
function speakLines(lines, key, o = {}) {
  if (!tts.ok) { toast('這個瀏覽器不支援語音朗讀，請按「偷看原文」或改用 Chrome／Edge'); return false; }
  if (!tts.voices.length) loadVoices();
  const busy = speechSynthesis.speaking || speechSynthesis.pending;
  stopSpeech();
  const my = ++tts.token; tts.playing = true; tts.key = key; tts.quiz = !!o.quiz; duck(true); setPlayingUI(true);
  const roles = castVoices(hashStr(String(o.seed || key)));
  const queue = []; lines.forEach(l => { const parts = splitSent(l.text); parts.forEach((t, j) => queue.push({ role: l.role, voice: l.voice, text: t, gap: j === parts.length - 1 ? (l.gap ?? 420) : 140 })); });
  let i = 0;
  const next = () => {
    if (my !== tts.token) return;
    if (i >= queue.length) { tts.playing = false; tts.key = null; duck(false); setPlayingUI(false); if (o.done) o.done(); return; }
    const it = queue[i++]; const c = it.voice ? { v: it.voice, p: 1 } : (roles[it.role] || roles.N);
    const u = new SpeechSynthesisUtterance(it.text);
    if (c.v) { u.voice = c.v; u.lang = c.v.lang; } else u.lang = 'en-US';
    u.rate = Math.max(.5, Math.min(1.6, store.voice.rate * .96 * (o.rate || 1))); u.pitch = c.p;
    let fired = false; const wd = setTimeout(() => done(), 3000 + it.text.length * 150 / (store.voice.rate * (o.rate || 1)));
    function done() { if (fired) return; fired = true; clearTimeout(wd); setTimeout(next, it.gap); }
    u.onend = done; u.onerror = done;
    speechSynthesis.speak(u);
  };
  if (busy) setTimeout(next, 150); else next();   // Chrome can drop an utterance queued right after cancel()
  return true;
}
function stopSpeech() { tts.token++; if (tts.ok) { try { speechSynthesis.cancel(); } catch (e) {} } if (tts.playing) { tts.playing = false; tts.key = null; duck(false); setPlayingUI(false); } }
function speakText(text, o = {}) { return speakLines([{ role: o.role || 'N', text, voice: o.voice }], o.key || ('say:' + text), o); }
function duck(on) { if (music.out && actx && music.on) music.out.gain.setTargetAtTime(on ? .22 : 1.1, actx.currentTime, .25); }
function setPlayingUI(on) {
  document.querySelectorAll('.au-bar').forEach(b => b.classList.toggle('playing', on && tts.quiz));
  document.querySelectorAll('[data-act="play"]').forEach(b => { b.textContent = on && tts.quiz ? '■ 停止' : '▶ 播放'; });
}
function sayBtn(t) {
  const txt = t.dataset.say; if (!txt) return;
  if (t.dataset.vi != null) { const vs = diverseVoices(); const v = vs[+t.dataset.vi % vs.length]; speakText(txt, { voice: v, key: 'vi' + t.dataset.vi + txt }); if (v) toast(`${ACC_NAME[v._acc] || v._acc}：${v.name.replace(/Microsoft |Google |\(.*?\)| Online| - .*/g, '').trim()}`); return; }
  speakText(txt, { rate: t.dataset.rate ? +t.dataset.rate : 1 });
}
function scriptFor(q) {
  if (q.pt === 1) return q.o.map((o, k) => ({ role: 'N', text: `${LETTERS[k]}. ${o}`, gap: 700 }));
  if (q.pt === 2) { const flip = rng(hashStr(q.id))() < .5; const [a, b] = flip ? ['W', 'M'] : ['M', 'W']; return [{ role: a, text: q.q, gap: 950 }, ...q.o.map((o, k) => ({ role: b, text: `${LETTERS[k]}. ${o}`, gap: 700 }))]; }
  if (q.p && SETS[q.p].au) return SETS[q.p].au.map(([r, t]) => ({ role: r, text: t, gap: 450 }));
  return null;
}
const audioKey = q => q.p || q.id;
function voiceSummary() {
  if (!tts.ok) return '這個瀏覽器不支援語音朗讀，建議改用 Chrome、Edge 或 Safari。';
  if (!tts.voices.length) return '還沒偵測到英文語音（有些瀏覽器要等幾秒才會載入）。';
  const c = {}; tts.voices.forEach(v => c[v._acc] = (c[v._acc] || 0) + 1);
  return `偵測到 ${tts.voices.length} 個英文聲音：${Object.entries(c).sort((a, b) => ACC_ORDER.indexOf(a[0]) - ACC_ORDER.indexOf(b[0])).map(([k, n]) => `${ACC_NAME[k] || k} ${n}`).join('、')}。`;
}
function openVoice() {
  const m = $('#modal'); const V = store.voice;
  const seg = (id, items, cur) => `<div class="seg" id="${id}">${items.map(([v, t]) => `<button data-v="${v}" aria-pressed="${String(cur) === String(v)}">${t}</button>`).join('')}</div>`;
  m.innerHTML = `<div class="intro card" role="dialog" aria-modal="true" aria-labelledby="v-h"><h2 id="v-h">聽力聲音設定</h2>
  <p>聽力題由你的瀏覽器內建語音即時朗讀，不同說話者會配不同聲音。${voiceSummary()}</p>
  <div class="lbl">語速</div>${seg('v-rate', [[.8, '0.8×'], [.9, '0.9×'], [1, '1.0×'], [1.1, '1.1×'], [1.25, '1.25×']], V.rate)}
  <div class="lbl">口音</div>${seg('v-acc', [['mix', '混合：美／英／澳／加（接近正式考試）'], ['us', '只用美式']], V.accent)}
  <div class="lbl">換題時</div>${seg('v-auto', [['1', '自動播放錄音'], ['0', '我自己按播放']], V.auto ? 1 : 0)}
  <p style="font-size:12.5px;margin:12px 0 0">小提醒：Edge 瀏覽器內建微軟的自然語音（例如 Aria、Guy、Sonia、Natasha），聽起來最接近真人；Windows 也可以到「設定 → 時間與語言 → 語音」加裝英國或澳洲英文語音，網站會自動使用。</p>
  <div class="row" style="margin-top:16px;justify-content:flex-end"><button class="btn" data-m="test">試聽</button><button class="btn pri" data-m="ok">完成</button></div></div>`;
  m.hidden = false;
  m.onclick = e => {
    if (e.target === m) { m.hidden = true; return; }
    const b = e.target.closest('button'); if (!b) return;
    const sg = b.closest('.seg');
    if (sg) { sg.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); const v = b.dataset.v;
      if (sg.id === 'v-rate') V.rate = +v; else if (sg.id === 'v-acc') V.accent = v; else V.auto = v === '1'; save(); if (current || exam) renderPanel(); return; }
    if (b.dataset.m === 'test') speakLines([{ role: 'W', text: 'Hi, this is how the listening section will sound.' }, { role: 'M', text: "Great. Let's move the meeting to three o'clock, then." }, { role: 'W2', text: 'That works for me, too.' }], 'test' + Date.now());
    if (b.dataset.m === 'ok') { m.hidden = true; }
  };
}
