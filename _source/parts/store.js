const KEY = 'toeic-isles-v1';
const store = { attempts: [], marks: new Set(), sound: true, music: true, fish: {}, introSeen: false, voice: { rate: 1, accent: 'mix', auto: true }, words: {} };
const LS = (() => { try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); return localStorage; } catch (e) { try { return sessionStorage; } catch (e2) { return null; } } })();
try {
  const raw = LS && LS.getItem(KEY);
  if (raw) { const s = JSON.parse(raw); store.attempts = (s.attempts || []).filter(a => QMAP.has(a.q)); store.marks = new Set((s.marks || []).filter(id => QMAP.has(id))); store.sound = s.sound !== false; store.music = s.music !== false; store.layout = s.layout || 'side'; store.fish = s.fish || {}; store.tut = s.tut || {}; store.introSeen = !!s.introSeen; store.voice = Object.assign(store.voice, s.voice || {}); store.words = s.words || {}; store.examCfg = s.examCfg || null; }
} catch (e) {}
function save() {
  try { LS && LS.setItem(KEY, JSON.stringify({ attempts: store.attempts, marks: [...store.marks], sound: store.sound, music: store.music, fish: store.fish, tut: store.tut, layout: store.layout, introSeen: store.introSeen, voice: store.voice, words: store.words, examCfg: store.examCfg })); } catch (e) {}
}
