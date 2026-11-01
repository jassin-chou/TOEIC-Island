function showIntro() {
  const m = $('#modal');
  m.innerHTML = `<div class="intro card" role="dialog" aria-modal="true" aria-labelledby="in-h"><h2 id="in-h">歡迎來到多益群島</h2>
  <p>7 座六角小島對應多益 TOEIC Listening & Reading 的七個 Part，加上中央的多益廣場。共 ${questions.length} 題原創練習題、${Object.values(TUT).reduce((a, b) => a + b.length, 0)} 課互動教學和 ${VOCAB.words.length} 個高頻單字。</p>
  <ul><li><span>🖱️</span><div>拖曳旋轉、滾輪縮放、右鍵平移。點一座島就能看重點、上教學、開始答題。</div></li>
  <li><span>🔊</span><div>聽力題會用瀏覽器的英文語音<b>自動朗讀</b>，Part 1、2 的文字作答後才顯示。可以在下方「聲音」調整語速和口音。</div></li>
  <li><span>🧢</span><div>戴黃帽、披紅披風的是你的分身<b>小益</b>。你選哪座島，他就走過橋去那裡。</div></li>
  <li><span>🎣</span><div>到<b>單字釣魚碼頭</b>拋竿，每條魚帶來一個多益單字，答對才收進魚簍。</div></li>
  <li><span>📝</span><div>在多益廣場開<b>模擬考</b>，交卷後估算聽力、閱讀分數和證書顏色。</div></li>
  <li><span>🚩</span><div>島上旗子顯示熟練度：白色未作答、紅色低於 60%、黃色低於 80%、綠色 80% 以上。</div></li></ul>
  <div class="legend"><span><i class="flagdot" style="background:var(--m)"></i>西側暖色島：聽力 Part 1–4</span><span><i class="flagdot" style="background:var(--t)"></i>東側冷色島：閱讀 Part 5–7</span></div>
  <label style="display:flex;align-items:center;gap:8px;margin:-4px 0 12px;font-size:13.5px"><input type="checkbox" id="intro-music" ${store.music ? 'checked' : ''}> 播放背景配樂（聽力朗讀時會自動降低音量）</label>
  <button class="btn pri wide" data-m="go">開始探索</button></div>`;
  m.hidden = false;
  m.onclick = e => { if (e.target === m || e.target.closest('[data-m="go"]')) { const cb = $('#intro-music'); store.music = !!(cb && cb.checked); if (store.music) musicStart(); m.hidden = true; store.introSeen = true; save(); if (tts.ok) loadVoices(); } };
  setTimeout(() => $('[data-m="go"]', m)?.focus(), 50);
}

