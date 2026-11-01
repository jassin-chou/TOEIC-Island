/* ---------- original lo-fi café study groove (WebAudio, no audio files) ---------- */
const music = { on: false, timer: null, step: 0, next: 0, out: null, drone: null };
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
// 84 BPM swing in F major, 8 bars × 8 eighth-notes; written for this site.
// chords per half-bar: [bass root midi, voicing intervals]
const MAJ7 = [4, 7, 11, 14], MIN9 = [3, 7, 10, 14], DOM9 = [4, 10, 14, 16];
const CHORDS = [[41, MAJ7], [41, MAJ7], [40, MIN9], [45, DOM9], [38, MIN9], [38, MIN9], [48, MIN9], [41, DOM9],
                [46, MAJ7], [46, MAJ7], [46, MIN9], [39, DOM9], [45, MIN9], [38, DOM9], [43, MIN9], [48, DOM9]];
// melody: [step, midi, length in eighths]
const TUNE = [[0,72,2],[2,69,1],[3,72,3],[6,76,2], [8,74,3],[11,72,1],[12,73,2],[14,76,2], [16,77,3],[19,76,1],[20,74,2],[22,72,2], [24,70,2],[26,72,1],[27,75,3],[30,74,2],
              [32,74,2],[34,72,1],[35,69,3],[38,65,2], [40,68,3],[43,70,1],[44,67,2],[46,70,2], [48,72,2],[50,69,1],[51,67,1],[52,66,2],[54,69,2], [56,70,3],[59,69,1],[60,67,2],[62,64,2]];
const TUNE_AT = new Map(TUNE.map(e => [e[0], e]));
let noiseBuf = null;
function noise() { const c = actx; if (!noiseBuf) { noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; } const s = c.createBufferSource(); s.buffer = noiseBuf; return s; }
function musicOut() {
  const c = getCtx();
  if (music.out) return music.out;
  const master = c.createGain(); master.gain.value = 0;
  const tone = c.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 4200; tone.Q.value = .4;   // warm, slightly muffled "tape" tone
  const comp = c.createDynamicsCompressor(); comp.threshold.value = -20; comp.ratio.value = 3;
  const rev = c.createConvolver(); const len = Math.floor(c.sampleRate * 1.6); const ir = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5); }
  rev.buffer = ir; const wet = c.createGain(); wet.gain.value = .22; const dry = c.createGain(); dry.gain.value = .9;
  master.connect(tone); tone.connect(comp); comp.connect(dry).connect(c.destination); comp.connect(rev); rev.connect(wet).connect(c.destination);
  music.out = master; return master;
}
function voice(t, midi, dur, vol, kind) {
  const c = actx, f = mtof(midi), g = c.createGain(); g.connect(music.out);
  if (kind === 'keys') {          // electric-piano: sine body + quick bell overtone + slow tremolo
    const o = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain(), trem = c.createOscillator(), tg = c.createGain();
    o.type = 'sine'; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 3.01;
    g2.gain.setValueAtTime(vol * .5, t); g2.gain.exponentialRampToValueAtTime(.0001, t + .25);
    trem.frequency.value = 4.5; tg.gain.value = vol * .18; trem.connect(tg).connect(g.gain);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .012); g.gain.exponentialRampToValueAtTime(vol * .45, t + .35); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); o2.connect(g2).connect(g); [o, o2, trem].forEach(x => { x.start(t); x.stop(t + dur + .05); });
  } else if (kind === 'bass') {   // round upright-ish bass
    const o = c.createOscillator(), lp = c.createBiquadFilter(); o.type = 'triangle'; o.frequency.value = f; lp.type = 'lowpass'; lp.frequency.value = 520;
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(lp).connect(g); o.start(t); o.stop(t + dur + .05);
  } else if (kind === 'vibe') {   // soft vibraphone lead
    const o = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain(), trem = c.createOscillator(), tg = c.createGain();
    o.type = 'sine'; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 4; g2.gain.value = .08;
    trem.frequency.value = 5.5; tg.gain.value = vol * .3; trem.connect(tg).connect(g.gain);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + dur + .6);
    o.connect(g); o2.connect(g2).connect(g); [o, o2, trem].forEach(x => { x.start(t); x.stop(t + dur + .7); });
  } else if (kind === 'kick') {
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(42, t + .14);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + .28); o.connect(g); o.start(t); o.stop(t + .3);
  } else {                        // 'snare' (brushy) or 'hat'
    const n = noise(), fl = c.createBiquadFilter(); const hat = kind === 'hat';
    fl.type = hat ? 'highpass' : 'bandpass'; fl.frequency.value = hat ? 7000 : 1800; fl.Q.value = hat ? .7 : .8;
    const d = hat ? .05 : .18; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    n.connect(fl).connect(g); n.start(t, Math.random() * .5); n.stop(t + d + .02);
  }
}
function startDrone() {            // faint vinyl crackle underneath
  const c = actx; if (music.drone) return;
  const n = noise(); n.loop = true; const bp = c.createBiquadFilter(); bp.type = 'highpass'; bp.frequency.value = 2500;
  const g = c.createGain(); g.gain.value = 0; g.gain.setTargetAtTime(.012, c.currentTime, 2);
  n.connect(bp).connect(g).connect(music.out); n.start();
  music.drone = { g, src: n };
}
function stopDrone() {
  const d = music.drone; if (!d || !actx) return; music.drone = null;
  d.g.gain.setTargetAtTime(0, actx.currentTime, .3); setTimeout(() => { try { d.src.stop(); } catch (e) {} }, 1500);
}
function tick() {
  const c = actx; const e8 = 60 / 84 / 2, swing = e8 * .32;
  while (music.next < c.currentTime + .25) {
    const t0 = music.next, k = music.step % 64, loop = Math.floor(music.step / 64), s = k % 8;
    const t = t0 + (k % 2 ? swing : 0) + (Math.random() - .5) * .008;      // swung, slightly humanised
    const [root, iv] = CHORDS[Math.floor(k / 4)];
    if (k % 4 === 0) iv.forEach((x, j) => voice(t + j * .012, root + 24 + x - (root + 24 + x > 77 ? 12 : 0), e8 * 3.6, .045, 'keys'));
    if (k % 4 === 3 && loop % 2 === 1) iv.slice(0, 3).forEach((x, j) => voice(t + j * .01, root + 24 + x - (root + 24 + x > 77 ? 12 : 0), e8 * 1.2, .028, 'keys'));
    if (k % 4 === 0) voice(t, root, e8 * 2.6, .2, 'bass');
    if (k % 4 === 3) voice(t, root + (s === 7 ? 5 : 7), e8 * .9, .13, 'bass');
    if (s === 0 || s === 5) voice(t, 0, 0, .32, 'kick');
    if (s === 2 || s === 6) voice(t, 0, 0, .07, 'snare');
    voice(t, 0, 0, k % 2 ? .012 : .022, 'hat');
    const ev = TUNE_AT.get(k);
    if (ev && loop % 4 !== 0) voice(t, ev[1], ev[2] * e8, .05, 'vibe');   // melody enters after the first 8-bar intro
    music.next += e8; music.step++;
  }
}
