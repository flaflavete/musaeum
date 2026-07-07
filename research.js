/**
 * Musæum: Módulo de coleta de dados para pesquisa acadêmica
 * PPGArq / Museu Nacional / UFRJ
 *
 * Coleta o uso do CURSO de hieróglifos (curso/): conclusão de lições,
 * desempenho no quiz e no construtor de palavras. Não coleta das histórias.
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

  // Estado da sessão atual (não persiste). Contadores por página, ou seja,
  // por lição: cada lição abre em licao.html?licao=… e recarrega o módulo.
  const _s = {
    isFirstVisit:    false,
    quizAttempts:    0,  // respostas erradas no quiz da lição
    builderAttempts: 0,  // palavras montadas erradas no construtor
    quizWrong:       [], // quais perguntas do quiz erraram (ex.: 'q2')
    builderWrong:    [], // quais palavras do construtor erraram (translit)
    lessonStart:     0,  // Date.now() quando a lição abriu (para a duração)
  };

  // Segundos desde que a lição abriu. undefined se ainda não houve watchLesson.
  function _durationSec() {
    return _s.lessonStart ? Math.round((Date.now() - _s.lessonStart) / 1000) : undefined;
  }

  function _consent() {
    return localStorage.getItem(CONSENT_KEY);
  }

  // Primeira visita ao curso = nenhuma lição concluída ainda.
  function _isFirstVisit() {
    try {
      const raw = localStorage.getItem('musaeum-hieroglyphs');
      if (!raw) return true;
      const p = JSON.parse(raw);
      return !p.done || Object.keys(p.done).length === 0;
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

  // Alias usado no beforeunload, mesma lógica, keepalive já cobre.
  function _sendBeacon(data) { _send(data); }

  // ── CSS do modal ────────────────────────────────────────────────────────────

  // Visual idêntico ao modal de boas-vindas da home (index.html).
  // Cores fixas escuras de propósito: o escuro é o tema inicial padrão e
  // este painel só aparece na primeira entrada, antes de qualquer escolha
  // de tema. (O cartão do tour, esse sim, acompanha o tema.)
  function _injectStyles() {
    if (document.getElementById('research-styles')) return;
    const style = document.createElement('style');
    style.id = 'research-styles';
    style.textContent = `
#research-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: opacity 0.3s ease;
}
#research-overlay.research-exit {
  opacity: 0;
  pointer-events: none;
}
.research-box {
  background: linear-gradient(180deg, #1a2535 0%, #131e2e 100%);
  border: 1px solid rgba(201, 166, 70, 0.3);
  border-radius: 14px;
  padding: 40px 32px 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}
.research-glyph {
  font-family: 'Noto Sans Egyptian Hieroglyphs', sans-serif;
  font-size: 52px;
  color: #c9a646;
  margin-bottom: 12px;
  line-height: 1;
}
.research-title {
  font-family: 'Cinzel', 'Gentium Plus', serif;
  font-size: 15px;
  letter-spacing: 0.18em;
  color: #c9a646;
  text-transform: uppercase;
  margin: 0 0 6px;
}
.research-sub {
  font-family: 'EB Garamond', 'Gentium Plus', 'Noto Serif', serif;
  font-style: italic;
  font-size: 15px;
  color: #9a8b6d;
  margin: 0 0 24px;
  line-height: 1.5;
}
.research-input {
  width: 100%;
  background: rgba(241, 228, 198, 0.07);
  border: 1px solid rgba(201, 166, 70, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  font-family: 'EB Garamond', 'Gentium Plus', 'Noto Serif', serif;
  font-size: 18px;
  color: #f1e4c6;
  text-align: center;
  margin-bottom: 14px;
  outline: none;
  transition: border-color 0.25s ease;
  box-sizing: border-box;
}
.research-input:focus { border-color: rgba(201, 166, 70, 0.7); }
.research-input::placeholder { color: #9a8b6d; opacity: 0.6; }
.research-consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  text-align: left;
  margin-bottom: 20px;
  cursor: pointer;
}
.research-consent input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  margin: 2px 0 0;
  border: 1.5px solid rgba(201, 166, 70, 0.5);
  border-radius: 4px;
  background: rgba(241, 228, 198, 0.05);
  cursor: pointer;
  position: relative;
  transition: background 0.2s, border-color 0.2s;
}
.research-consent input[type="checkbox"]:hover { border-color: #c9a646; }
.research-consent input[type="checkbox"]:checked {
  background: rgba(201, 166, 70, 0.85);
  border-color: #c9a646;
}
.research-consent input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #131e2e;
}
.research-consent input[type="checkbox"]:focus-visible {
  outline: 2px solid #c9a646;
  outline-offset: 2px;
}
.research-consent-text {
  font-family: 'EB Garamond', 'Gentium Plus', 'Noto Serif', serif;
  font-size: 12.5px;
  line-height: 1.45;
  color: #9a8b6d;
}
.research-btn {
  width: 100%;
  padding: 12px;
  background: rgba(201, 166, 70, 0.12);
  border: 1.5px solid rgba(201, 166, 70, 0.45);
  border-radius: 8px;
  color: #c9a646;
  font-family: 'Cinzel', 'Gentium Plus', serif;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  margin-bottom: 12px;
}
.research-btn:hover {
  background: rgba(201, 166, 70, 0.22);
  border-color: #c9a646;
}
.research-btn:focus-visible {
  outline: 2px solid #c9a646;
  outline-offset: 3px;
}
.research-skip {
  background: none;
  border: none;
  color: #9a8b6d;
  font-family: 'Cinzel', 'Gentium Plus', serif;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}
.research-skip:hover { color: #c9b894; }
    `;
    document.head.appendChild(style);
  }

  // ── Modal de consentimento ──────────────────────────────────────────────────

  function _removeModal() {
    const el = document.getElementById('research-overlay');
    if (!el) return;
    el.classList.add('research-exit');
    const app = document.querySelector('.app');
    if (app) app.inert = false;
    // Devolve foco ao primeiro elemento interativo da página
    setTimeout(() => {
      el.remove();
      const first = document.querySelector('button:not([disabled]), a[href], input');
      if (first) first.focus();
    }, 370);
  }

  // Mesmos textos do modal de boas-vindas da home (nameModal/consentLabel).
  const _MODAL_TEXTS = {
    pt: {
      title:       'Como devo te chamar?',
      sub:         'Seu nome vai aparecer em sua coleção.',
      placeholder: 'Seu nome',
      btn:         'Entrar no Musæum',
      skip:        'Entrar sem nome',
      consent:     'Aceito contribuir com a pesquisa acadêmica do PPGArq · Museu Nacional / UFRJ. A gente coleta só dados anônimos de uso, nada pessoal.',
    },
    en: {
      title:       'What should I call you?',
      sub:         'Your name will appear on your collection.',
      placeholder: 'Your name',
      btn:         'Enter the Musæum',
      skip:        'Enter without a name',
      consent:     'I agree to contribute to academic research at PPGArq · Museu Nacional / UFRJ. We only collect anonymous usage data, nothing personal.',
    },
  };

  function _modalLang() {
    const saved = localStorage.getItem('musaeum-lang');
    if (saved === 'pt' || saved === 'en') return saved;
    return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  function _showModal() {
    _injectStyles();
    const t = _MODAL_TEXTS[_modalLang()];
    const overlay = document.createElement('div');
    overlay.id = 'research-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'research-title');
    overlay.innerHTML = `
      <div class="research-box">
        <div class="research-glyph" aria-hidden="true">𓂀</div>
        <h2 id="research-title" class="research-title"></h2>
        <p class="research-sub"></p>
        <input type="text" class="research-input" id="researchNameInput" maxlength="32" autocomplete="off" />
        <label class="research-consent" for="researchConsentBox">
          <input type="checkbox" id="researchConsentBox" />
          <span class="research-consent-text"></span>
        </label>
        <button class="research-btn" id="researchEnter"></button>
        <button class="research-skip" id="researchSkip"></button>
      </div>`;

    overlay.querySelector('.research-title').textContent        = t.title;
    overlay.querySelector('.research-sub').textContent          = t.sub;
    overlay.querySelector('.research-consent-text').textContent = t.consent;
    overlay.querySelector('#researchEnter').textContent         = t.btn;
    overlay.querySelector('#researchSkip').textContent          = t.skip;
    const input = overlay.querySelector('#researchNameInput');
    input.placeholder = t.placeholder;
    input.value = (typeof getPlayerName === 'function' && getPlayerName()) || '';

    document.body.appendChild(overlay);
    const app = document.querySelector('.app');
    if (app) app.inert = true; // foco e leitor de tela ficam só no modal
    setTimeout(() => input.focus(), 60);

    function _recordConsent() {
      const checked = overlay.querySelector('#researchConsentBox').checked;
      localStorage.setItem(CONSENT_KEY, checked ? 'sim' : 'não');
    }
    function _enter() {
      const name = input.value.trim();
      if (name) localStorage.setItem('musaeum-player', JSON.stringify({ name }));
      _recordConsent();
      _removeModal();
    }
    overlay.querySelector('#researchEnter').addEventListener('click', _enter);
    overlay.querySelector('#researchSkip').addEventListener('click', () => {
      _recordConsent();
      _removeModal();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') _enter();
    });
  }

  // ── Rastreio de abandono (pagehide) ─────────────────────────────────────────
  // O handler é sempre registrado; o envio só ocorre se houver consentimento.
  // Usamos 'pagehide' em vez de 'beforeunload' porque o Safari/iOS quase nunca
  // dispara beforeunload, o que subnotificava abandono em celulares.

  let _abandonFn = null;

  function _registerAbandonment(info) {
    if (_abandonFn) window.removeEventListener('pagehide', _abandonFn);

    _abandonFn = function () {
      if (_consent() !== 'sim') return;
      const s = info.getState();
      if (s.done) return; // já foi registrado via trackLessonComplete
      _sendBeacon({
        ..._envData(s.lang),
        lesson:           info.lessonId,
        lesson_num:       info.lessonNum,
        lessons_total:    info.totalLessons,
        completed:        'não',
        duration_sec:     _durationSec(),
        quiz_score:       s.quizScore,
        quiz_max:         s.quizMax,
        quiz_attempts:    _s.quizAttempts,
        quiz_wrong:       _s.quizWrong.join(',') || undefined,
        builder_solved:   s.builderSolved,
        builder_total:    s.builderTotal,
        builder_attempts: _s.builderAttempts,
        builder_wrong:    _s.builderWrong.join(',') || undefined,
      });
    };

    window.addEventListener('pagehide', _abandonFn);
  }

  // ── API pública ─────────────────────────────────────────────────────────────

  window.Research = {

    /**
     * Chame em cada página do curso logo após o setup de DOM.
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
     * Registra uma tentativa errada.
     * @param {'quiz'|'builder'} type quiz = resposta errada; builder = palavra montada errada.
     * @param {string} [item] identificador do item errado (ex.: 'q2' no quiz, translit no construtor).
     */
    trackAttempt(type, item) {
      if (type === 'builder') {
        _s.builderAttempts++;
        if (item) _s.builderWrong.push(item);
      } else {
        _s.quizAttempts++;
        if (item) _s.quizWrong.push(item);
      }
    },

    /**
     * Registra conclusão de uma lição e envia os dados.
     * Chame quando a lição chegar ao fim (último quiz ou último desafio do construtor).
     * Campos de quiz/construtor ausentes na lição ficam em branco na planilha.
     * @param {{ lessonId: string, lessonNum: number, totalLessons: number,
     *           quizScore?: number, quizMax?: number,
     *           builderSolved?: number, builderTotal?: number, lang: string }} opts
     */
    trackLessonComplete({ lessonId, lessonNum, totalLessons, quizScore, quizMax, builderSolved, builderTotal, lang }) {
      // Remove o listener de abandono, não precisamos mais dele
      if (_abandonFn) {
        window.removeEventListener('pagehide', _abandonFn);
        _abandonFn = null;
      }
      _send({
        ..._envData(lang),
        lesson:           lessonId,
        lesson_num:       lessonNum,
        lessons_total:    totalLessons,
        completed:        'sim',
        duration_sec:     _durationSec(),
        quiz_score:       quizScore,
        quiz_max:         quizMax,
        quiz_attempts:    _s.quizAttempts,
        quiz_wrong:       _s.quizWrong.join(',') || undefined,
        builder_solved:   builderSolved,
        builder_total:    builderTotal,
        builder_attempts: _s.builderAttempts,
        builder_wrong:    _s.builderWrong.join(',') || undefined,
      });
    },

    /**
     * Registra o rastreio de abandono de uma lição.
     * Chame ao renderizar a lição. getState() devolve o progresso atual.
     * @param {{ lessonId: string, lessonNum: number, totalLessons: number,
     *           getState: () => object }} opts
     */
    watchLesson({ lessonId, lessonNum, totalLessons, getState }) {
      _s.lessonStart = Date.now();
      _registerAbandonment({ lessonId, lessonNum, totalLessons, getState });
    },

    /**
     * Registra a abertura de uma história (ping anônimo, uma vez por página).
     * Só a abertura: NÃO rastreamos leitura, capítulo nem resposta das histórias.
     * A linha da planilha se distingue das do curso por ter a coluna `story`
     * preenchida (e `lesson` vazia).
     * @param {string} storyId id da história (ex.: 'naufrago').
     * @param {string} [lang] idioma corrente.
     */
    trackStoryOpen(storyId, lang) {
      _send({
        ..._envData(lang),
        story: storyId,
      });
    },
  };

})();
