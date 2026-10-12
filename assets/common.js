/* Shared helpers: escaping, image paths, lightbox, long-read rendering. */
(function () {
  const esc = s => (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const src = rec => 'img/' + rec[0];
  const capText = rec => (rec[4] || '').trim();

  /* ---------- lightbox ---------- */
  let lb, list = [], idx = 0;
  function ensureLb() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'overlay'; lb.hidden = true;
    lb.innerHTML = '<img alt=""><div class="cap"></div><div class="ctl"><button data-a="prev" aria-label="Poprzednie">←</button><span class="n"></span><button data-a="next" aria-label="Następne">→</button><button data-a="close">Zamknij</button></div>';
    document.body.appendChild(lb);
    lb.addEventListener('click', e => {
      const a = e.target.dataset.a;
      if (a === 'prev') step(-1); else if (a === 'next') step(1); else if (a === 'close' || e.target === lb) close();
    });
    addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1);
    });
  }
  function show() {
    const r = list[idx];
    lb.querySelector('img').src = src(r);
    lb.querySelector('img').alt = capText(r) || `Zdjęcie ze str. ${r[3]}`;
    lb.querySelector('.cap').textContent = capText(r);
    lb.querySelector('.n').textContent = `${idx + 1} z ${list.length} · str. ${r[3]}${r[0].startsWith('k/') ? ' Księgi' : ' opracowania'}`;
  }
  function step(d) { idx = (idx + d + list.length) % list.length; show(); }
  function close() { lb.hidden = true; }
  function open(l, i) { ensureLb(); list = l; idx = i; show(); lb.hidden = false; lb.querySelector('[data-a=close]').focus(); }

  /* ---------- gallery with captions ---------- */
  function gallery(imgs) {
    return `<div class="gallery">${imgs.map((r, i) => `<figure><button data-g="${i}" aria-label="Powiększ: ${esc(capText(r) || 'zdjęcie ze str. ' + r[3])}"><img loading="lazy" src="${src(r)}" alt="${esc(capText(r))}"></button>${capText(r) ? `<figcaption>${esc(capText(r))}</figcaption>` : ''}</figure>`).join('')}</div>`;
  }
  function bindGallery(root, imgs) {
    root.querySelectorAll('[data-g]').forEach(b => b.onclick = () => open(imgs, +b.dataset.g));
  }

  /* ---------- long read: paragraphs + inline figures + page markers ---------- */
  function figure(r, i) {
    const c = capText(r);
    return `<figure><button data-f="${i}" aria-label="Powiększ zdjęcie"><img loading="lazy" src="${src(r)}" width="${r[1]}" height="${r[2]}" alt="${esc(c || 'Zdjęcie ze str. ' + r[3])}"></button>${c ? `<figcaption>${esc(c)}</figcaption>` : ''}</figure>`;
  }
  function renderBlocks(blocks, pageLabel) {
    const imgs = [];
    let html = '', lastPg = null, run = [];
    const flush = () => {
      if (!run.length) return;
      html += run.length > 1 ? `<div class="figrow">${run.join('')}</div>` : run[0];
      run = [];
    };
    for (const b of blocks) {
      if (b.img) {
        const pg = b.img[3];
        if (pg !== lastPg && !run.length) { html += `<span class="pg">${pageLabel} ${pg}</span>`; lastPg = pg; }
        run.push(figure(b.img, imgs.length)); imgs.push(b.img);
        continue;
      }
      flush();
      if (b.pg !== lastPg) { html += `<span class="pg">${pageLabel} ${b.pg}</span>`; lastPg = b.pg; }
      html += `<p>${esc(b.p)}</p>`;
    }
    flush();
    return { html, imgs };
  }
  function bindFlow(root, imgs) {
    root.querySelectorAll('[data-f]').forEach(b => b.onclick = () => open(imgs, +b.dataset.f));
  }

  window.KM = { esc, src, gallery, bindGallery, renderBlocks, bindFlow, openLightbox: open };
})();
