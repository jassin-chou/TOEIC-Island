"""Adapt the Shield Isles engine into the TOEIC Isles. Every replacement asserts it matched."""
import os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1]
src = open(SRC, encoding='utf-8').read()
lines = src.split('\n')
# swap the two big data lines
data_js = open(os.path.join(HERE, 'out_data.js'), encoding='utf-8').read()
i_data = next(i for i, l in enumerate(lines) if l.startswith('<script>window.DATA='))
assert lines[i_data + 1].startswith('<script>window.TUT=')
lines[i_data:i_data + 2] = [data_js]
s = '\n'.join(lines)

def rep(old, new, count=1):
    global s
    n = s.count(old)
    assert n == count, (n, old[:120])
    s = s.replace(old, new)

def region(start, end, new, keep_end=True):
    """replace text from start marker up to (not incl.) end marker"""
    global s
    a = s.index(start); b = s.index(end, a + len(start))
    assert s.count(start) == 1, start[:80]
    s = s[:a] + new + (s[b:] if keep_end else s[b + len(end):])

P = lambda n: open(os.path.join(HERE, 'parts', n), encoding='utf-8').read()

# ---------------- head / css ----------------
rep('<meta name="description" content="iPAS 資訊安全工程師（初級）3D 互動答題城市">', '<meta name="description" content="多益 TOEIC 聽力與閱讀 3D 互動練習城：題庫、互動教學、語音聽力、單字釣魚、模擬考">')
rep('<title>守盾群島</title>', '<title>多益群島 TOEIC Isles</title>')
rep('@media (max-width: 900px){', P('extra.css') + '\n@media (max-width: 900px){')

# ---------------- body html ----------------
rep('aria-label="守盾群島 3D 地圖：點選島嶼開始答題"', 'aria-label="多益群島 3D 地圖：點選島嶼開始練習"')
region('<svg class="logo"', '</svg>', '<svg class="logo" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 10h32a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H22l-9 8v-8H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" fill="var(--accent)" stroke="var(--accent-2)" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 22c2-4 4 4 6 0s4 4 6 0 4 4 6 0" fill="none" stroke="var(--accent-ink)" stroke-width="3" stroke-linecap="round"/><circle cx="38" cy="13" r="3" fill="var(--sun)"/>', keep_end=True)
rep('<div><h1>守盾群島</h1><p>iPAS 資訊安全工程師（初級）即時答題城市</p></div>', '<div><h1>多益群島</h1><p>TOEIC 聽力與閱讀・3D 互動練習城</p></div>')
rep('<b id="st-cov">0/300</b>', '<b id="st-cov">0/0</b>')
rep('placeholder="搜尋 300 題關鍵字，例：RPO"', 'placeholder="搜尋題目、單字，例：deadline"')
rep('<button class="btn" data-act="fish">釣魚</button>', '<button class="btn" data-act="fish">單字釣魚</button>')
rep('<button class="btn" data-act="history">作答紀錄', '<button class="btn" data-act="voice" id="btn-voice">聲音</button>\n    <button class="btn" data-act="history">作答紀錄')

# ---------------- data section ----------------
region('const { islands, questions } = window.DATA;', '/* =========================================================\n   Session store', P('data.js'))
region("const KEY = 'aegis-isles-v1';", 'function lastMap()', P('store.js'))
region('/* ---------- original Celtic / mystic background score', 'function musicStart() {', P('music.js'))
# TTS after beep()
rep("/* =========================================================\n   Three.js scene", P('tts.js') + "\n/* =========================================================\n   Three.js scene")

# ---------------- 3D ----------------
region('const LM = { m1:', 'function house(', "const LM = { p1:'camera', p2:'harbor', p34:'antenna', p5g:'factory', p5v:'market', p6:'post', p7:'library', hub:'fountain' };\n\n")
rep("    case 'fountain': {", P('landmarks.js') + "    case 'fountain': {")
region("const NAMES = [", "const SHIRTS", "const NAMES = ['時態阿嬤','介系詞小哥','被動語態阿明','分詞妹妹','同義字姊姊','聽力伯伯','Part 2 阿凱','插入句寶寶','雙篇隊長','單字大叔','連接詞小美','關代小弟','冠詞阿莉','主謂一致教練','990 學霸','藍證學長','金證學姊','英國腔 Ben','澳洲腔 Kylie','加拿大 Liam','美式 Amy','速讀小芸','錯題本阿芬','模考夜貓','搭配詞阿寶','圖表題博士'];\n")
rep("const hero = makeNPC('小盾（你）', true, 4242);", "const hero = makeNPC('小益（你）', true, 4242);")

# ---------------- fishing ----------------
region('const FISH = {', 'const RARITY', P('fish_species.js'))
rep("const RARITY = { c:{ t:'普通', col:'var(--ink-2)', min:12, max:35 }, r:{ t:'稀有', col:'var(--accent)', min:35, max:70 }, l:{ t:'傳說', col:'var(--warn)', min:70, max:150 } };",
    "const RARITY = { c:{ t:'普通', col:'var(--ink-2)', min:12, max:35 }, r:{ t:'稀有', col:'var(--accent)', min:35, max:70 }, l:{ t:'傳說', col:'var(--warn)', min:70, max:150 } };")
rep("// pier geometry off the outer face of 備援避風港 (m9)\nconst PIER = (() => {\n  const isl = IMAP.get('m9');", "// pier geometry off the outer face of 對話廣播站 (p34)\nconst PIER = (() => {\n  const isl = IMAP.get('p34');")
rep('<span class="il-txt"><b>釣魚碼頭</b><small>釣魚抽觀念與考題</small></span>', '<span class="il-txt"><b>單字釣魚碼頭</b><small>每條魚帶來一個多益單字</small></span>')
rep("  quiz = null; current = null; fishingMode = true; fishTab = 'rod';", "  stopSpeech(); quiz = null; current = null; fishingMode = true; fishTab = 'rod';")
rep("  sendTo(hero, 'm9', .3);", "  sendTo(hero, 'p34', .3);")
rep("hero.wps = [{ p: PIER.start.clone(), node: 'm9' }, { p: PIER.end.clone(), node: 'm9' }];", "hero.wps = [{ p: PIER.start.clone(), node: 'p34' }, { p: PIER.end.clone(), node: 'p34' }];")
region('function pull() {', 'function reel()', P('fish_pull.js'))
region('function fishPick(k) {', 'function fishTick(', P('fish_pick.js'))
region('function renderFishing() {', 'function updateNPC(', P('fish_view.js'))

# ---------------- talk / tips ----------------
region("const HUB_TIPS = [", "function talk(n) {", "const HUB_TIPS = ['旗子顏色就是熟練度：白色是還沒作答，紅色低於 60%，黃色低於 80%，綠色 80% 以上。','中央廣場的「教學」分頁有多益考試架構、分數與備考計畫。','聽力題會自動用語音朗讀，可以在下方「聲音」調整語速和口音。','答題時可以按 A–D 或 1–4 作答，R 重播錄音，Enter 下一題。','西邊暖色島是聽力 Part 1–4，東邊冷色島是閱讀 Part 5–7。','到單字釣魚碼頭可以用遊戲方式複習 160 個多益高頻單字。','多益答錯不倒扣，考試時每一題都要作答。'];\n")
rep("say(n, `<b>小盾</b>：目前作答", "say(n, `<b>小益</b>：目前作答")

# ---------------- guide ----------------
region('function renderGuide() {', "$('#guide').addEventListener('click'", P('guide.js'))
rep("const hits = questions.filter(q => (q.q + ' ' + q.o.join(' ') + ' ' + q.e).toLowerCase().includes(low)).slice(0, 40);",
    "const hits = questions.filter(q => searchText(q).includes(low)).slice(0, 40);")
rep("return `<button class=\"res\" data-q=\"${q.id}\">${mark(q.q.length > 70 ? q.q.slice(0, 70) + '…' : q.q)}", "const st = stemText(q); return `<button class=\"res\" data-q=\"${q.id}\">${mark(st.length > 70 ? st.slice(0, 70) + '…' : st)}")

rep("$('#guide').addEventListener('click', e => {\n  const b = e.target.closest('[data-isl]');", "$('#guide').addEventListener('click', e => {\n  const fb = e.target.closest('[data-act=\"fish\"]'); if (fb) { goFishing(); if (innerWidth <= 760) $('#guide').classList.remove('open'); return; }\n  const b = e.target.closest('[data-isl]');")
# ---------------- panel ----------------
rep("  if (fishingMode) stopFishing();\n  if (exam && exam.done) exam = null;", "  if (fishingMode) stopFishing();\n  if (exam && exam.done) exam = null;\n  if (!current || current.id !== id) stopSpeech();")
rep("function closePanel() {\n  stopFishing();", "function closePanel() {\n  stopFishing(); stopSpeech(); lastAuto = null;")
rep("<div class=\"sub\">${esc(isl.id === 'hub' ? '中央港口廣場' : isl.sec.split(' ')[0] + '　' + isl.name)}</div>", "<div class=\"sub\">${esc(isl.id === 'hub' ? '總覽・考試介紹・模擬考' : isl.name)}</div>")
rep("  panel.innerHTML = h;\n  requestAnimationFrame(computeOffsets);\n}\nfunction setupBlock", "  panel.innerHTML = h;\n  requestAnimationFrame(computeOffsets);\n  maybeAutoplay();\n}\nfunction setupBlock")
region('function setupBlock(isl) {', 'function islandInfo(isl) {', P('setup.js'))
region('function hubInfo() {', 'function subjStats(s)', P('hub.js'))
region('function buildList(iid) {', 'function startQuiz(', P('buildlist.js'))
region('function figHTML(f) {', 'function quizView() {', P('question.js'))
rep("let h = questionHTML(q, pick, quiz.idx + 1, quiz.list.length, other ? `${other.emoji} ${other.nick}` : quiz.label);", "let h = questionHTML(q, pick, quiz.idx + 1, quiz.list.length, other ? `${other.emoji} ${other.nick}` : quiz.label);")
rep("h += `<div class=\"hint\">按 <kbd>A</kbd>–<kbd>D</kbd> 或 <kbd>1</kbd>–<kbd>4</kbd> 作答，<kbd>Enter</kbd> 下一題</div>`;", "h += `<div class=\"hint\">按 <kbd>A</kbd>–<kbd>D</kbd> 或 <kbd>1</kbd>–<kbd>4</kbd> 作答，${isListen(q) ? '<kbd>R</kbd> 重播，' : ''}<kbd>Enter</kbd> 下一題</div>`;")
region('function reviewItem(q, pick) {', 'function logView(iid) {', P('review.js'))
rep("return `<li><span class=\"r ${a.ok ? 'ok' : 'no'}\">${a.ok ? '✓' : '✗'}</span><span class=\"m\"><span class=\"qt\">${esc(q.q)}</span>", "return `<li><span class=\"r ${a.ok ? 'ok' : 'no'}\">${a.ok ? '✓' : '✗'}</span><span class=\"m\"><span class=\"qt\">${esc(stemText(q))}</span>")
rep("  const q = QMAP.get(quiz.list[quiz.idx]); if (quiz.picks.has(q.id)) return;", "  const q = QMAP.get(quiz.list[quiz.idx]); if (quiz.picks.has(q.id) || k >= q.o.length) return;")
# panel click additions
rep("  const t = e.target.closest('button'); if (!t) return;\n  if (t.dataset.tw) { handleTw(t); return; }",
    "  const t = e.target.closest('button'); if (!t) return;\n  if (t.dataset.say != null) { sayBtn(t); return; }\n  if (t.dataset.tw) { handleTw(t); return; }")
rep("  else if (act === 'next') { if (exam) examNext(); else { quiz.idx++; renderPanel(); $('#pbody').scrollTop = 0; } }",
    "  else if (act === 'next') { peek = false; if (exam) examNext(); else { quiz.idx++; renderPanel(); $('#pbody').scrollTop = 0; } }")
rep("  else if (act === 'prev') { if (exam) {", "  else if (act === 'prev') { peek = false; if (exam) {")
rep("  else if (act === 'exam1' || act === 'exam2') openExamSetup(act === 'exam1' ? 1 : 2);",
    "  else if (act === 'exam-open') openExamSetup();\n  else if (act === 'exam-again') startExam(exam.cfg);\n  else if (act === 'play') playCurrent();\n  else if (act === 'peek') { peek = !peek; renderPanel(); }\n  else if (act === 'voice') openVoice();")
rep("  else if (act === 'start' || act === 'again') { startQuiz(current.id, buildList(current.id)); quiz.started = Date.now(); tab = 'quiz'; renderPanel(); }",
    "  else if (act === 'start' || act === 'again') { startQuiz(current.id, buildList(current.id)); quiz.started = Date.now(); tab = 'quiz'; lastAuto = null; peek = false; renderPanel(); }")

# ---------------- tutorials ----------------
region('// --- tiny SHA-256 (UTF-8)', 'function tqHTML(key, q) {', P('widgets.js'))
region('function curLesson() {', '/* =========================================================\n   Mock exam', P('widgets_handle.js'))

# ---------------- exam ----------------
region('let exam = null;', '/* =========================================================\n   History modal', P('exam.js'))

# ---------------- history / hud / keys ----------------
rep('<div class="p-crumb">只保存在這次瀏覽，關閉分頁後清空</div>', '<div class="p-crumb">保存在這台電腦的瀏覽器裡</div>')
rep("function markRow(id) { const q = QMAP.get(id); const isl = IMAP.get(q.i); return `<li><span class=\"r\" style=\"color:var(--sun)\">★</span><span class=\"m\"><span class=\"qt\">${esc(q.q)}</span>",
    "function markRow(id) { const q = QMAP.get(id); const isl = IMAP.get(q.i); return `<li><span class=\"r\" style=\"color:var(--sun)\">★</span><span class=\"m\"><span class=\"qt\">${esc(stemText(q))}</span>")
rep("  else if (a === 'exam') openExamSetup(1);", "  else if (a === 'exam') openExamSetup();\n  else if (a === 'voice') openVoice();")
rep("    const fm = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 }[e.key.toLowerCase()];", "    const fm = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 }[e.key.toLowerCase()];")
rep("  if (k != null) { e.preventDefault(); doPick(k); }", "  if (k != null) { e.preventDefault(); doPick(k); }\n  else if (e.key.toLowerCase() === 'r') { const pb = panel.querySelector('[data-act=\"play\"]'); if (pb && !pb.disabled) { e.preventDefault(); pb.click(); } }")
region('function showIntro() {', '/* =========================================================\n   Loop', P('intro.js'))
rep("window.__aegis = { fish, goFishing, selectIsland, store, doPick, questions, openHistory, startExam };", "window.__toeic = { fish, goFishing, selectIsland, store, doPick, questions, openHistory, startExam, tts, SETS };")
rep("say(npcs[0], `<b>${npcs[0].name}</b>：歡迎！點我們聊天也能學考點喔。`, '', 4000);", "say(npcs[0], `<b>${npcs[0].name}</b>：Welcome！點我們聊天也能學考點喔。`, '', 4000);")

# leftover references check
for bad in ['CHAP_COLOR', "'m9'", 'sha256', 'ENC[', '小盾', '守盾', 'aegis', 'subj === 1 ? \'--m\'']:
    if bad in s: print('WARNING leftover:', bad, s.count(bad))
open(sys.argv[2], 'w', encoding='utf-8').write(s)
print('wrote', sys.argv[2], len(s))
