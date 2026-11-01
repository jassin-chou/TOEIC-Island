function reviewItem(q, pick) {
  const st = stemText(q);
  return `<details class="rv"><summary>${esc(st.length > 60 ? st.slice(0, 60) + '…' : st)}</summary><div style="font-size:13px;margin-top:6px">${q.pt === 1 ? '' : `<div class="en">${esc(q.q)}</div>`}<div>你的答案：(${LETTERS[pick]}) ${esc(q.o[pick])}</div><div style="color:var(--good);font-weight:700">正確答案：(${LETTERS[q.a]}) ${esc(q.o[q.a])}</div><p style="margin:4px 0 0">${esc(q.e)}</p><small style="color:var(--ink-2)">${srcLabel(q)}・${IMAP.get(q.i).nick}</small> <button class="btn sm" data-redo="${q.id}">重做</button></div></details>`;
}
