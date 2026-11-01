"""Assemble DATA / TUT JSON for the TOEIC isles from data/*.py."""
import importlib.util, json, random, re, html, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, 'data', name + '.py'))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m

def shuffled(opts, seed):
    """correct answer is opts[0] in source; shuffle deterministically unless order matters"""
    if all(o.strip().startswith('[') for o in opts):
        order = sorted(range(len(opts)), key=lambda k: opts[k])
    else:
        order = list(range(len(opts))); random.Random(seed).shuffle(order)
    new = [opts[k] for k in order]
    return new, order.index(0)

questions, sets = [], {}
def addq(qid, iid, pt, tag, stem, opts, exp, **extra):
    assert len(set(opts)) == len(opts), (qid, opts)
    o, a = shuffled(opts, qid)
    d = dict(id=qid, i=iid, pt=pt, t=tag, q=stem, o=o, a=a, e=exp); d.update(extra)
    questions.append(d)

# Part 1
for n, (tag, emo, desc, opts, exp) in enumerate(load('p1').Q, 1):
    addq(f'P1-{n:02d}', 'p1', 1, tag, '', opts, exp, ph=dict(e=emo, d=desc))
# Part 2
for n, (tag, stem, opts, exp) in enumerate(load('p2').Q, 1):
    addq(f'P2-{n:02d}', 'p2', 2, tag, stem, opts, exp)
# Part 3/4
c3 = c4 = 0
for s in load('p34').S:
    if s['k'] == 'conv': c3 += 1; sid = f'S3-{c3:02d}'; pt = 3
    else: c4 += 1; sid = f'S4-{c4:02d}'; pt = 4
    sets[sid] = dict(i='p34', k=s['k'], pt=pt, t=s['t'], au=[list(x) for x in s['au']], zh=s['zh'], g=s.get('g'))
    for j, (tag, stem, opts, exp) in enumerate(s['qs'], 1):
        addq(f'{sid}-{j}'.replace('S', 'P', 1), 'p34', pt, tag, stem, opts, exp, p=sid)
# Part 5
for n, (tag, stem, opts, exp) in enumerate(load('p5g').Q, 1):
    addq(f'P5G-{n:02d}', 'p5g', 5, tag, stem, opts, exp)
for n, (tag, stem, opts, exp) in enumerate(load('p5v').Q, 1):
    addq(f'P5V-{n:02d}', 'p5v', 5, tag, stem, opts, exp)

def para(txt):
    txt = html.escape(txt.strip('\n'), quote=False)
    txt = re.sub(r'\[\[(\d)\]\]', r'<span class="blank">(\1)</span>', txt)
    txt = re.sub(r'— \[(\d)\] —', r'<b class="ins">[\1]</b>', txt)
    return '<div class="ptext">' + txt + '</div>'
# Part 6
for n, s in enumerate(load('p6').S, 1):
    sid = f'S6-{n:02d}'
    sets[sid] = dict(i='p6', k='text', pt=6, t=s['t'], docs=[[s['t'].split('：')[0], para(s['h'])]])
    for tag, blank, opts, exp in s['qs']:
        addq(f'P6-{n:02d}-{blank}', 'p6', 6, tag, f'空格 ({blank}) 應填入？', opts, exp, p=sid)
# Part 7
for n, s in enumerate(load('p7').S, 1):
    sid = f'S7-{n:02d}'
    sets[sid] = dict(i='p7', k=s['kind'], pt=7, t=s['t'], docs=[[t, para(x)] for t, x in s['docs']])
    for j, (tag, stem, opts, exp) in enumerate(s['qs'], 1):
        addq(f'P7-{n:02d}-{j}', 'p7', 7, tag, stem, opts, exp, p=sid)

islands = load('islands').I
V = load('vocab').V
themes = list(V.keys()); words = []
seen = set()
for ti, th in enumerate(themes):
    for w, pos, zh, ex in V[th]:
        assert '*' in ex, w
        assert w.lower() not in seen, ('dup word', w); seen.add(w.lower())
        words.append([w, pos, zh, ex, ti])

DATA = dict(islands=islands, questions=questions, sets=sets, vocab=dict(themes=themes, words=words))
TUT = {}; TUT.update(load('lessons_a').T); TUT.update(load('lessons_b').T)

# ---- validation ----
ids = [q['id'] for q in questions]; assert len(ids) == len(set(ids))
iids = {i['id'] for i in islands}
for q in questions:
    assert q['i'] in iids and 0 <= q['a'] < len(q['o'])
    if q['i'] in ('p1', 'p5g', 'p5v', 'p34', 'p6', 'p7'): assert len(q['o']) == 4, q['id']
    if q['i'] == 'p2': assert len(q['o']) == 3
for k, ls in TUT.items():
    for l in ls:
        for f in 'tbawkq': assert f in l, (k, l.get('t'), f)
        assert 0 <= l['q']['a'] < len(l['q']['o'])
        w = l['w']
        if w['type'] == 'fill':
            for it in w['items']: assert 0 <= it[2] < len(it[1]), it
        if w['type'] == 'sort':
            for it in w['items']: assert 0 <= it[1] < len(w['buckets']), it
from collections import Counter
print('questions', len(questions), Counter(q['i'] for q in questions))
print('answer letters', Counter(q['a'] for q in questions if len(q['o']) == 4), Counter(q['a'] for q in questions if len(q['o']) == 3))
print('sets', len(sets), 'lessons', sum(len(v) for v in TUT.values()), {k: len(v) for k, v in TUT.items()}, 'words', len(words))
j = lambda o: json.dumps(o, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
open(os.path.join(HERE, 'out_data.js'), 'w').write('<script>window.DATA=' + j(DATA) + ';</script>\n<script>window.TUT=' + j(TUT) + ';</script>')
