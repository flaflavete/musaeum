/**
 * Musæum — Módulo de coleta de dados para pesquisa acadêmica
 * PPGArq / Museu Nacional / UFRJ
 *
 * Backend: Google Apps Script Web App (doGet) gravando em Google Sheets.
 * Para trocar o endpoint, substitua ENDPOINT abaixo.
 */
(function () {
  'use strict';

  const CONSENT_KEY = 'musaeum-research-consent'; // 'sim' | 'não' | null

  // ── Endpoint do Google Apps Script Web App ──────────────────────────────────
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxlNgQu7Mf9x1drInYq-gEYp2IpkoNRHjnPZDBVVuQdhVJ9wIVfC72FoipbBf-vEqX4Lw/exec';
  // ────────────────────────────────────────────────────────────────────────────

  // Estado da sessão atual (não persiste)
  const _s = {
    isFirstVisit:   false,
    glossaryOpened: false,
    codexOpened:    false,
    notesOpened:    false,
    totalAttempts:  0,
  };

  function _consent() {
    return localStorage.getItem(CONSENT_KEY);
  }

  function _isFirstVisit() {
    try {
      const raw = localStorage.getItem('musaeum-stories');
      if (!raw) return true;
      return Object.keys(JSON.parse(raw)).length === 0;
    } catch (_) { return true; }
  }

  function _envData(lang) {
    return {
      timestamp:      new Date().toISOString(),
      lang:           lang || localStorage.getItem('musaeum-lang') || 'pt',
      theme:          localStorage.getItem('musaeum-theme') || 'dark',
      device:         (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent))
                        ? 'mobile' : 'desktop',
      region:         navigator.language || 'desconhecido',
      is_first_visit: _s.isFirstVisit ? 'sim' : 'não',
    };
  }

  // GET com query string: sem CORS, sem redirect, sem token CSRF.
  // keepalive:true garante que o pedido sobrevive ao fechamento da página
  // (substitui sendBeacon nos browsers modernos).
  function _send(data) {
    if (_consent() !== 'sim') return;
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(data)) {
      if (v !== undefined && v !== null) params.append(k, String(v));
    }
    fetch(ENDPOINT + '?' + params.toString(), { mode: 'no-cors', keepalive: true })
      .catch(() => {});
  }

  // Alias usado no beforeunload — mesma lógica, keepalive já cobre.
  function _sendBeacon(data) { _send(data); }

  // ── CSS do modal ────────────────────────────────────────────────────────────

  function _injectStyles() {
    if (document.getElementById('research-styles')) return;
    const style = document.createElement('style');
    style.id = 'research-styles';
    style.textContent = `
#research-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 18, 30, 0.88);
  backdrop-filter: blur(5px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: opacity 0.35s ease;
}
#research-overlay.research-exit {
  opacity: 0;
  pointer-events: none;
}
.research-box {
  background: #1b2a3d;
  border: 1px solid #c9a646;
  border-radius: 12px;
  max-width: 460px;
  width: 100%;
  padding: 36px 32px 28px;
  text-align: center;
  box-shadow: 0 12px 56px rgba(0, 0, 0, 0.65);
  color: #f1e4c6;
}
.research-seal {
  font-size: 38px;
  line-height: 1;
  margin-bottom: 14px;
  color: #c9a646;
}
.research-title {
  font-family: Cinzel, 'Times New Roman', serif;
  font-size: 19px;
  font-weight: 700;
  color: #c9a646;
  letter-spacing: 0.06em;
  margin: 0 0 18px;
}
.research-body {
  font-family: 'EB Garamond', 'Noto Serif', Georgia, serif;
  font-size: 15px;
  line-height: 1.65;
  color: #c9b894;
  margin: 0 0 10px;
}
.research-body-secondary {
  font-size: 13px;
  color: #9a8b6d;
  margin-bottom: 26px;
  font-style: italic;
}
.research-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.research-btn {
  font-family: Cinzel, 'Times New Roman', serif;
  font-size: 13px;
  letter-spacing: 0.05em;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  width: 100%;
}
.research-btn:hover { opacity: 0.87; }
.research-btn:active { transform: scale(0.98); }
.research-btn:focus-visible {
  outline: 2px solid #c9a646;
  outline-offset: 3px;
}
.research-btn-accept {
  background: #c9a646;
  color: #1b2a3d;
  font-weight: 700;
}
.research-btn-decline {
  background: transparent;
  color: #9a8b6d;
  border: 1px solid #3a4a60;
}
    `;
    document.head.appendChild(style);
  }

  // ── Modal de consentimento ──────────────────────────────────────────────────

  function _removeModal() {
    const el = document.getElementById('research-overlay');
    if (!el) return;
    el.classList.add('research-exit');
    // Devolve foco ao primeiro elemento interativo da página
    setTimeout(() => {
      el.remove();
      const first = document.querySelector('button:not([disabled]), a[href], input');
      if (first) first.focus();
    }, 370);
  }

  function _showModal() {
    _injectStyles();
    const overlay = document.createElement('div');
    overlay.id = 'research-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'research-title');
    overlay.innerHTML = `
      <div class="research-box">
        <div class="research-seal" aria-hidden="true">𓂀</div>
        <h2 id="research-title" class="research-title">Pesquisa Acadêmica</h2>
        <p class="research-body">
          O Musæum integra uma pesquisa do <strong>PPGArq&thinsp;—&thinsp;Museu Nacional&thinsp;/&thinsp;UFRJ</strong>.
          Gostaríamos de registrar dados anônimos de uso (idioma, dispositivo, progresso)
          para fins exclusivamente acadêmicos. Nenhuma informação pessoal é coletada.
        </p>
        <p class="research-body research-body-secondary">
          This project is part of academic research. Participation is optional and fully anonymous.
        </p>
        <div class="research-actions">
          <button class="research-btn research-btn-accept" id="researchAccept">
            Aceito contribuir
          </button>
          <button class="research-btn research-btn-decline" id="researchDecline">
            Prefiro não participar
          </button>
        </div>
      </div>`;

    document.body.appendChild(overlay);
    setTimeout(() => document.getElementById('researchAccept').focus(), 60);

    document.getElementById('researchAccept').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'sim');
      _removeModal();
    });
    document.getElementById('researchDecline').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'não');
      _removeModal();
    });
  }

  // ── Rastreio de abandono (beforeunload) ─────────────────────────────────────
  // O handler é sempre registrado; o envio só ocorre se houver consentimento.

  let _abandonFn = null;

  function _registerAbandonment(storyId, maxScore, getState) {
    if (_abandonFn) window.removeEventListener('beforeunload', _abandonFn);

    _abandonFn = function () {
      if (_consent() !== 'sim') return;
      const s = getState();
      if (s.screen === 'final') return; // já foi registrado via trackComplete
      _sendBeacon({
        ..._envData(s.lang),
        story:             storyId,
        score:             s.score || 0,
        max_score:         maxScore,
        attempts:          _s.totalAttempts,
        completed:         'não',
        chapter_abandoned: s.chapter ?? 0,
        glossary_opened:   _s.glossaryOpened ? 'sim' : 'não',
        codex_opened:      _s.codexOpened    ? 'sim' : 'não',
        notes_opened:      _s.notesOpened    ? 'sim' : 'não',
      });
    };

    window.addEventListener('beforeunload', _abandonFn);
  }

  // ── API pública ─────────────────────────────────────────────────────────────

  window.Research = {

    /**
     * Chame em cada página logo após qualquer setup de DOM.
     * Mostra o modal de consentimento na primeira visita.
     */
    init(opts) {
      _s.isFirstVisit = _isFirstVisit();
      // Na home, o modal de boas-vindas unificado cuida do consentimento;
      // passe { suppressModal: true } para não exibir o modal próprio aqui.
      if (opts && opts.suppressModal) return;
      if (_consent() === null) _showModal();
    },

    /**
     * Registra abertura de glossário, códex ou notas arqueológicas.
     * @param {'glossary'|'codex'|'notes'} type
     */
    trackEvent(type) {
      if (type === 'glossary') _s.glossaryOpened = true;
      else if (type === 'codex')   _s.codexOpened   = true;
      else if (type === 'notes')   _s.notesOpened   = true;
    },

    /**
     * Registra uma tentativa errada num desafio.
     * Chame cada vez que o jogador escolhe uma opção incorreta.
     */
    trackAttempt() {
      _s.totalAttempts++;
    },

    /**
     * Registra conclusão da história e envia os dados.
     * Chame quando a tela final for exibida.
     * @param {{ storyId: string, score: number, maxScore: number, lang: string }} opts
     */
    trackComplete({ storyId, score, maxScore, lang }) {
      // Remove o listener de abandono — não precisamos mais dele
      if (_abandonFn) {
        window.removeEventListener('beforeunload', _abandonFn);
        _abandonFn = null;
      }
      _send({
        ..._envData(lang),
        story:             storyId,
        score:             score,
        max_score:         maxScore,
        attempts:          _s.totalAttempts,
        completed:         'sim',
        chapter_abandoned: 'N/A',
        glossary_opened:   _s.glossaryOpened ? 'sim' : 'não',
        codex_opened:      _s.codexOpened    ? 'sim' : 'não',
        notes_opened:      _s.notesOpened    ? 'sim' : 'não',
      });
    },

    /**
     * Registra o rastreio de abandono para uma história.
     * Chame após inicializar o estado do jogo.
     * @param {{ storyId: string, maxScore: number, getState: () => object }} opts
     */
    watchAbandonment({ storyId, maxScore, getState }) {
      _registerAbandonment(storyId, maxScore, getState);
    },
  };

})();
