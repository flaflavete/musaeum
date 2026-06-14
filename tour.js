/**
 * Musæum: Motor de tour guiado (coach marks)
 * PPGArq / Museu Nacional / UFRJ
 *
 * Aponta setas douradas piscando para elementos reais da página, com um
 * cartão de texto e botões avançar / voltar / pular. Reutilizável em
 * qualquer página: cada uma monta seus próprios passos já no idioma certo.
 *
 *   Tour.start([
 *     { selector: '#alvo', title: 'Título', body: 'Explicação...' },
 *     ...
 *   ], { labels: { skip, prev, next, done }, onClose });
 */
(function () {
  'use strict';

  let _steps = [];
  let _idx = 0;
  let _labels = { skip: 'Pular', prev: 'Voltar', next: 'Avançar', done: 'Concluir' };
  let _onClose = null;
  let _keyHandler = null;
  let _reposition = null;
  let _active = false;

  // ── CSS ─────────────────────────────────────────────────────────────────────
  function _injectStyles() {
    if (document.getElementById('tour-styles')) return;
    const style = document.createElement('style');
    style.id = 'tour-styles';
    style.textContent = `
#tour-root { position: fixed; inset: 0; z-index: 9000; }
.tour-catch {
  position: fixed; inset: 0;
  background: transparent;
  cursor: default;
}
.tour-spotlight {
  position: fixed;
  border-radius: 12px;
  box-shadow: 0 0 0 9999px rgba(8, 14, 24, 0.74),
              0 0 0 2px #c9a646,
              0 0 22px 4px rgba(201, 166, 70, 0.55);
  pointer-events: none;
  transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
.tour-arrow {
  position: fixed;
  width: 0; height: 0;
  pointer-events: none;
  z-index: 2;
  animation: tour-arrow-pulse 1s ease-in-out infinite;
}
.tour-arrow.down  { border-left: 13px solid transparent; border-right: 13px solid transparent; border-top: 17px solid #c9a646; }
.tour-arrow.up    { border-left: 13px solid transparent; border-right: 13px solid transparent; border-bottom: 17px solid #c9a646; }
.tour-arrow.left  { border-top: 13px solid transparent; border-bottom: 13px solid transparent; border-right: 17px solid #c9a646; }
.tour-arrow.right { border-top: 13px solid transparent; border-bottom: 13px solid transparent; border-left: 17px solid #c9a646; }
@keyframes tour-arrow-pulse {
  0%, 100% { opacity: 1;   filter: drop-shadow(0 0 3px rgba(201,166,70,0.7)); }
  50%      { opacity: 0.3; filter: drop-shadow(0 0 7px rgba(201,166,70,0.95)); }
}
.tour-card {
  position: fixed;
  z-index: 3;
  width: 320px;
  max-width: calc(100vw - 28px);
  background: linear-gradient(180deg, #1a2535 0%, #131e2e 100%);
  border: 1px solid rgba(201, 166, 70, 0.4);
  border-radius: 12px;
  padding: 20px 22px 16px;
  box-shadow: 0 14px 48px rgba(0, 0, 0, 0.6);
  color: #f1e4c6;
  transition: top 0.3s ease, left 0.3s ease;
}
.tour-step-count {
  font-family: 'Cinzel', 'Gentium Plus', serif;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c9a646;
  opacity: 0.8;
  margin-bottom: 8px;
}
.tour-card-title {
  font-family: 'Cinzel', 'Gentium Plus', serif;
  font-size: 15px;
  letter-spacing: 0.04em;
  color: #c9a646;
  margin: 0 0 8px;
  line-height: 1.3;
}
.tour-card-body {
  font-family: 'EB Garamond', 'Gentium Plus', 'Noto Serif', serif;
  font-size: 14.5px;
  line-height: 1.55;
  color: #c9b894;
  margin: 0 0 16px;
}
.tour-card-actions { display: flex; align-items: center; gap: 10px; }
.tour-btn {
  font-family: 'Cinzel', 'Gentium Plus', serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 7px;
  padding: 9px 14px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, opacity 0.2s;
}
.tour-btn-skip {
  background: none; border: none;
  color: #9a8b6d;
  text-decoration: underline;
  padding: 9px 4px;
  margin-right: auto;
}
.tour-btn-skip:hover { color: #c9b894; }
.tour-btn-prev {
  background: none;
  border: 1px solid rgba(201, 166, 70, 0.35);
  color: #c9b894;
}
.tour-btn-prev:hover { border-color: #c9a646; }
.tour-btn-next {
  background: rgba(201, 166, 70, 0.16);
  border: 1.5px solid rgba(201, 166, 70, 0.5);
  color: #c9a646;
  font-weight: 700;
}
.tour-btn-next:hover { background: rgba(201, 166, 70, 0.28); border-color: #c9a646; }
.tour-btn:focus-visible { outline: 2px solid #c9a646; outline-offset: 2px; }
/* Tema claro: o card do tour acompanha a escolha de tema. As setas e o
   holofote seguem dourados, pois ficam sobre o escurecedor da página. */
html[data-theme="light"] .tour-card {
  background: linear-gradient(180deg, #f5edd8 0%, #ede3c8 100%);
  border-color: rgba(160, 128, 30, 0.45);
  color: #271e11;
  box-shadow: 0 14px 48px rgba(29, 53, 87, 0.25);
}
html[data-theme="light"] .tour-step-count,
html[data-theme="light"] .tour-card-title { color: #5c480e; }
html[data-theme="light"] .tour-card-body { color: #3d2e1e; }
html[data-theme="light"] .tour-btn-skip { color: #3d2e1e; }
html[data-theme="light"] .tour-btn-skip:hover { color: #5c480e; }
html[data-theme="light"] .tour-btn-prev { border-color: rgba(92, 72, 14, 0.4); color: #5c480e; }
html[data-theme="light"] .tour-btn-prev:hover { border-color: #5c480e; }
html[data-theme="light"] .tour-btn-next {
  background: rgba(92, 72, 14, 0.14);
  border-color: rgba(92, 72, 14, 0.5);
  color: #5c480e;
}
html[data-theme="light"] .tour-btn-next:hover { background: rgba(92, 72, 14, 0.22); border-color: #5c480e; }
html[data-theme="light"] .tour-btn:focus-visible { outline-color: #5c480e; }
@media (prefers-reduced-motion: reduce) {
  .tour-arrow { animation: none; opacity: 1; }
  .tour-spotlight, .tour-card { transition: none; }
}
    `;
    document.head.appendChild(style);
  }

  // ── Render de um passo ────────────────────────────────────────────────────
  function _render() {
    const step = _steps[_idx];
    const target = document.querySelector(step.selector);
    const root = document.getElementById('tour-root');
    if (!target || !root) { _finish(); return; }

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Espera o scroll assentar antes de medir
    setTimeout(() => _place(target, step), 320);
  }

  function _place(target, step) {
    const root = document.getElementById('tour-root');
    if (!root || !_active) return;
    const r = target.getBoundingClientRect();
    const pad = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const spot = root.querySelector('.tour-spotlight');
    spot.style.top    = (r.top - pad) + 'px';
    spot.style.left   = (r.left - pad) + 'px';
    spot.style.width  = (r.width + pad * 2) + 'px';
    spot.style.height = (r.height + pad * 2) + 'px';

    const card  = root.querySelector('.tour-card');
    const arrow = root.querySelector('.tour-arrow');

    // Conteúdo do cartão
    const isLast  = _idx === _steps.length - 1;
    const isFirst = _idx === 0;
    card.querySelector('.tour-step-count').textContent = `${_idx + 1} / ${_steps.length}`;
    card.querySelector('.tour-card-title').textContent = step.title;
    card.querySelector('.tour-card-body').innerHTML     = step.body;
    card.querySelector('.tour-btn-prev').style.display  = isFirst ? 'none' : '';
    card.querySelector('.tour-btn-next').textContent    = isLast ? _labels.done : _labels.next;

    // Mede o cartão para posicionar
    card.style.visibility = 'hidden';
    card.style.top = '0px'; card.style.left = '0px';
    const cw = card.offsetWidth;
    const ch = card.offsetHeight;
    const gap = 22; // espaço para a seta
    const margin = 14;

    let placement, cardTop, cardLeft;
    if (r.bottom + gap + ch + margin <= vh) {
      placement = 'below';
      cardTop = r.bottom + gap;
    } else if (r.top - gap - ch - margin >= 0) {
      placement = 'above';
      cardTop = r.top - gap - ch;
    } else {
      // Sem espaço acima/abaixo: ancora ao lado mais folgado
      placement = (r.left + r.width / 2 > vw / 2) ? 'left' : 'right';
    }

    if (placement === 'below' || placement === 'above') {
      cardLeft = Math.min(Math.max(r.left + r.width / 2 - cw / 2, margin), vw - cw - margin);
      card.style.top = cardTop + 'px';
      card.style.left = cardLeft + 'px';
      const arrowX = Math.min(Math.max(r.left + r.width / 2, cardLeft + 18), cardLeft + cw - 18);
      arrow.className = 'tour-arrow ' + (placement === 'below' ? 'up' : 'down');
      arrow.style.left = (arrowX - 13) + 'px';
      arrow.style.top  = (placement === 'below' ? (r.bottom + pad + 2) : (r.top - pad - 19)) + 'px';
    } else {
      cardTop = Math.min(Math.max(r.top + r.height / 2 - ch / 2, margin), vh - ch - margin);
      if (placement === 'right') {
        cardLeft = Math.min(r.right + gap, vw - cw - margin);
        arrow.className = 'tour-arrow left';
        arrow.style.left = (r.right + pad + 2) + 'px';
      } else {
        cardLeft = Math.max(r.left - gap - cw, margin);
        arrow.className = 'tour-arrow right';
        arrow.style.left = (r.left - pad - 19) + 'px';
      }
      card.style.top = cardTop + 'px';
      card.style.left = cardLeft + 'px';
      arrow.style.top = (r.top + r.height / 2 - 13) + 'px';
    }
    card.style.visibility = 'visible';
    _reposition = () => _place(target, step);
  }

  function _go(delta) {
    const n = _idx + delta;
    if (n < 0) return;
    if (n >= _steps.length) { _finish(); return; }
    _idx = n;
    _render();
  }

  function _finish() {
    if (!_active) return;
    _active = false;
    document.removeEventListener('keydown', _keyHandler);
    window.removeEventListener('resize', _onWinChange);
    window.removeEventListener('scroll', _onWinChange, true);
    const root = document.getElementById('tour-root');
    if (root) root.remove();
    _reposition = null;
    if (typeof _onClose === 'function') _onClose();
  }

  function _onWinChange() { if (_reposition) _reposition(); }

  // ── API pública ─────────────────────────────────────────────────────────────
  window.Tour = {
    isActive() { return _active; },

    start(steps, opts) {
      if (_active || !Array.isArray(steps) || !steps.length) return;
      opts = opts || {};
      _steps = steps;
      _idx = 0;
      _onClose = opts.onClose || null;
      if (opts.labels) _labels = Object.assign({}, _labels, opts.labels);
      _injectStyles();

      const root = document.createElement('div');
      root.id = 'tour-root';
      root.setAttribute('role', 'dialog');
      root.setAttribute('aria-modal', 'true');
      root.innerHTML = `
        <div class="tour-catch"></div>
        <div class="tour-spotlight"></div>
        <div class="tour-arrow up"></div>
        <div class="tour-card">
          <div class="tour-step-count"></div>
          <h3 class="tour-card-title"></h3>
          <p class="tour-card-body"></p>
          <div class="tour-card-actions">
            <button class="tour-btn tour-btn-skip" type="button">${_labels.skip}</button>
            <button class="tour-btn tour-btn-prev" type="button">${_labels.prev}</button>
            <button class="tour-btn tour-btn-next" type="button">${_labels.next}</button>
          </div>
        </div>`;
      document.body.appendChild(root);

      root.querySelector('.tour-btn-skip').addEventListener('click', _finish);
      root.querySelector('.tour-btn-prev').addEventListener('click', () => _go(-1));
      root.querySelector('.tour-btn-next').addEventListener('click', () => _go(1));

      _keyHandler = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); _finish(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); _go(1); }
        else if (e.key === 'ArrowLeft')  { e.preventDefault(); _go(-1); }
      };
      document.addEventListener('keydown', _keyHandler);
      window.addEventListener('resize', _onWinChange);
      window.addEventListener('scroll', _onWinChange, true);

      _active = true;
      _render();
      setTimeout(() => {
        const nb = root.querySelector('.tour-btn-next');
        if (nb) nb.focus();
      }, 360);
    },

    close() { _finish(); }
  };
})();
