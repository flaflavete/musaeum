// =============================================================
// Modo Palco — apresentação ao vivo do Musæum (secreto)
// =============================================================
// Camada de narração sobre o site RODANDO de verdade, para apresentar
// o projeto em eventos sem slides. Um roteiro de "cenas": cada cena
// leva o site sozinho até o ponto certo (troca de aba, abre o Sobre) e
// mostra um cartão elegante com o que falar. Avança com clicker/setas.
//
// Como entrar (secreto, nada aparece na tela normal):
//   • Link:   abra o site com ?palco  (ex.: musaeum.app/?palco)
//             favorite esse endereço; ninguém vê que existe.
//   • Atalho: digite a palavra "palco" em qualquer lugar da home.
//
// Controles no modo palco:
//   →  Espaço  PageDown  ou clicker  → próxima cena
//   ←  PageUp  ou clicker            → cena anterior
//   L  → alterna o idioma (PT/EN) do site inteiro ao vivo
//   F  → tela cheia
//   Esc → sai do modo palco
//
// É standalone e sem persistência: some quando você sai, não toca em
// nada do site. Para remover a feature, basta apagar este arquivo e a
// linha <script> no index.html.
(function () {
  'use strict';

  // --- Idioma: lê e dirige o site ao vivo via setLang() (global) ---
  function lang() { return localStorage.getItem('musaeum-lang') === 'en' ? 'en' : 'pt'; }
  function pick(pt, en) { return lang() === 'en' ? en : pt; }

  // --- Números reais, tirados das fontes do próprio projeto ---
  function publishedStories() {
    if (typeof MUSAEUM_CATALOG === 'undefined') return [];
    return MUSAEUM_CATALOG.filter(function (s) { return s.available; });
  }
  function lessonCount() {
    if (typeof window.CURSO_LICOES === 'undefined') return 6;
    var ready = window.CURSO_LICOES.filter(function (l) { return l.ready; });
    return ready.length || window.CURSO_LICOES.length;
  }

  // Fecha qualquer modal de onboarding (idioma/nome/tour), para o palco
  // começar limpo mesmo num aparelho recém-aberto. O main.js agenda o
  // onboarding com um pequeno atraso, então varremos por ~1,5s, sem
  // tocar no consentimento salvo.
  function dismissOnboarding() {
    ['langModal', 'nameModal', 'tourOfferModal'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('show');
    });
  }
  function guardOnboarding() {
    dismissOnboarding();
    [250, 600, 1000, 1500].forEach(function (ms) {
      setTimeout(function () { if (active) dismissOnboarding(); }, ms);
    });
  }

  // -----------------------------------------------------------------
  // Roteiro. Cada cena: enter() prepara o site; o resto é o cartão.
  // Só entra fato verificável (rigor acadêmico do projeto).
  // -----------------------------------------------------------------
  function scenes() {
    var pub = publishedStories();
    var titles = pub.map(function (s) { return pick(s.titlePt, s.titleEn); });
    var titlesLine = titles.length === 2
      ? titles.join(pick(' e ', ' and '))
      : titles.join(', ');

    return [
      {
        enter: function () { closeAbout(); showTab('inicio'); },
        glyph: '𓂀',
        kicker: pick('Reino Médio · 2055–1650 AEC', 'Middle Kingdom · 2055–1650 BCE'),
        title: 'Musæum',
        points: [
          pick('Biblioteca digital interativa e bilíngue de literatura do Egito Antigo.',
               'An interactive, bilingual digital library of Ancient Egyptian literature.'),
          pick('Histórias do Reino Médio para ler, decidir e interagir.',
               'Middle Kingdom stories to read, choose and interact with.'),
          pick('Um mapa dos lugares dos textos, sobre uma carta antiga.',
               'A map of the places in the texts, over an old chart.'),
          pick('Uma introdução aos hieróglifos, com lições e a Lista de Gardiner.',
               'An introduction to hieroglyphs, with lessons and the Gardiner List.')
        ]
      },
      {
        enter: function () { closeAbout(); showTab('inicio'); },
        glyph: '𓊹',
        kicker: pick('A proposta', 'The idea'),
        title: pick('Tornar esses textos acessíveis a todo mundo',
                    'Making these texts accessible to everyone'),
        points: [
          pick('Contos do Reino Médio, a época de maior criatividade da literatura egípcia, apresentados como histórias narradas.',
               'Tales from the Middle Kingdom, the peak of Egyptian literary creativity, presented as narrated stories.'),
          pick('Cada texto vem com desafios de leitura, notas de arqueologia e um código de hieróglifos que se revela aos poucos.',
               'Each text comes with reading challenges, archaeology notes, and a hieroglyphic code you uncover as you go.'),
          pick('Acesso aberto, mantendo o respeito aos originais.',
               'Open access, while staying faithful to the originals.')
        ]
      },
      {
        enter: function () { closeAbout(); showTab('inicio'); },
        live: true,
        glyph: '𓊛',
        kicker: pick('Biblioteca', 'Library'),
        title: pick('As histórias', 'The stories'),
        points: [
          pick(pub.length + ' histórias completas: ' + titlesLine + '.',
               pub.length + ' complete stories: ' + titlesLine + '.'),
          pick('Leitura interativa: você toma decisões, resolve desafios e ganha tesouros a cada capítulo.',
               'Interactive reading: you make choices, solve challenges, and earn treasures each chapter.'),
          pick('Novos contos a caminho, incluindo o Camponês Eloquente.',
               'More tales on the way, including the Eloquent Peasant.')
        ]
      },
      {
        enter: function () { closeAbout(); showTab('mapa'); },
        live: true,
        glyph: '𓈗',
        kicker: pick('Mapa', 'Map'),
        title: pick('Os lugares das histórias', 'The places of the stories'),
        points: [
          pick('Os mundos do Reino Médio sobre uma carta de 1837, em domínio público.',
               'The worlds of the Middle Kingdom over an 1837 chart, in the public domain.'),
          pick('Cada lugar diz o que era e em que conto aparece; Punt ao sul, o Levante ao norte.',
               'Each place tells what it was and which tale it appears in; Punt to the south, the Levant to the north.')
        ]
      },
      {
        enter: function () { closeAbout(); showTab('aprender'); },
        live: true,
        glyph: '𓆎',
        kicker: pick('Hieróglifos', 'Hieroglyphs'),
        title: pick('Aprender a ler os sinais', 'Learning to read the signs'),
        points: [
          pick('Uma introdução em ' + lessonCount() + ' lições interativas para reconhecer e ler hieróglifos.',
               'An introduction in ' + lessonCount() + ' interactive lessons to recognize and read hieroglyphs.'),
          pick('Apoiada na Lista de Gardiner (cerca de 900 sinais) e num baralho de prática.',
               'Backed by the Gardiner List (about 900 signs) and a practice deck.'),
          pick('Ao concluir, o leitor ganha um Certificado de Leitura.',
               'On completion, the reader earns a Reading Certificate.')
        ]
      },
      {
        enter: function () { closeAbout(); showTab('inicio'); },
        glyph: '𓏞',
        kicker: pick('Método', 'Method'),
        title: pick('Fiel às fontes', 'Faithful to the sources'),
        points: [
          pick('As histórias se apoiam em edições críticas e traduções de referência.',
               'The stories draw on critical editions and reference translations.'),
          pick('Os hieróglifos seguem Gardiner, Allen e Faulkner.',
               'The hieroglyphs follow Gardiner, Allen and Faulkner.'),
          pick('As notas citam sítios e objetos reais, com fontes nomeáveis.',
               'The notes cite real sites and objects, with sources that can be named.')
        ]
      },
      {
        enter: function () { closeAbout(); showTab('inicio'); },
        glyph: '𓋹',
        kicker: pick('Musæum', 'Musæum'),
        title: pick('Obrigada', 'Thank you'),
        points: [
          pick('Flavia Lima Corpas · PPGArq, Museu Nacional / UFRJ.',
               'Flavia Lima Corpas · PPGArq, Museu Nacional / UFRJ.'),
          pick('Acesso aberto, licença Creative Commons BY-NC-SA. DOI no Zenodo.',
               'Open access, Creative Commons BY-NC-SA license. DOI on Zenodo.'),
          'musaeum.app'
        ]
      }
    ];
  }

  // -----------------------------------------------------------------
  // Estado + render
  // -----------------------------------------------------------------
  var active = false;
  var idx = 0;
  var deck = [];
  var root = null;

  function injectStyles() {
    if (document.getElementById('palco-styles')) return;
    var css = document.createElement('style');
    css.id = 'palco-styles';
    css.textContent = [
      // Superfície sóbria (marfim de parede de museu), independente do tema do app.
      '.palco-root{position:fixed;inset:0;z-index:6000;pointer-events:none;',
      '--ps-surface:#f4efe3;--ps-ink:#1b2a3d;--ps-gold:#9c7c2f;--ps-muted:#776f5e;',
      '--ps-line:#dccfb2;--ps-body:#2c3a48;',
      "font-family:'EB Garamond','Gentium Plus','Noto Serif',Georgia,serif;}",
      // A "moldura": um retângulo transparente cuja sombra 100vmax pinta todo o
      // resto de marfim. Colapsado ao centro = slide branco cheio; expandido =
      // passe-partout emoldurando o app rodando ao vivo.
      '.palco-mat{position:absolute;inset:50%;border-radius:3px;background:transparent;',
      'box-shadow:0 0 0 100vmax var(--ps-surface),inset 0 0 0 1px var(--ps-gold),',
      'inset 0 0 60px rgba(0,0,0,.16);',
      'transition:inset .55s cubic-bezier(.7,0,.2,1);pointer-events:none;}',
      '.palco-root.live .palco-mat{inset:6vh 5vw 33vh 5vw;}',
      // Marca d\'água: glifo grande e discreto, só nos slides.
      ".palco-watermark{position:absolute;right:5vw;top:46%;transform:translateY(-50%);",
      "font-family:'Noto Sans Egyptian Hieroglyphs',sans-serif;font-size:46vh;line-height:1;",
      'color:rgba(27,42,61,.055);pointer-events:none;user-select:none;transition:opacity .5s;}',
      '.palco-root.live .palco-watermark{opacity:0;}',
      // Selo discreto no topo.
      '.palco-badge{position:absolute;top:clamp(18px,3.4vh,38px);left:50%;transform:translateX(-50%);',
      "font-family:'Cinzel','Gentium Plus',serif;font-size:11px;letter-spacing:.34em;",
      'text-transform:uppercase;color:var(--ps-gold);opacity:.7;pointer-events:none;}',
      // Conteúdo: centralizado no slide; na faixa inferior quando o app está ao vivo.
      '.palco-content{position:absolute;left:0;right:0;top:0;bottom:0;',
      'display:flex;flex-direction:column;justify-content:center;align-items:center;',
      'padding:11vh clamp(40px,9vw,150px) 16vh;pointer-events:none;opacity:0;transition:opacity .55s ease;}',
      '.palco-content.in{opacity:1;}',
      '.palco-root.live .palco-content{top:auto;height:33vh;justify-content:center;',
      'padding:0 clamp(40px,7vw,120px) 11vh;}',
      '.palco-inner{width:100%;max-width:940px;}',
      ".palco-glyph{font-family:'Noto Sans Egyptian Hieroglyphs',sans-serif;",
      'font-size:clamp(38px,6vh,70px);line-height:1;color:var(--ps-gold);margin-bottom:20px;}',
      '.palco-root.live .palco-glyph{display:none;}',
      ".palco-kicker{display:flex;align-items:center;gap:16px;font-family:'Cinzel','Gentium Plus',serif;",
      'font-size:clamp(11px,1.2vw,13px);letter-spacing:.3em;text-transform:uppercase;',
      'color:var(--ps-gold);margin-bottom:16px;}',
      '.palco-kicker::before{content:"";width:46px;height:2px;background:var(--ps-gold);flex:0 0 auto;}',
      ".palco-title{font-family:'Cinzel','Gentium Plus',serif;font-weight:700;color:var(--ps-ink);",
      'font-size:clamp(30px,4.8vw,54px);line-height:1.12;letter-spacing:.01em;}',
      '.palco-root.live .palco-title{font-size:clamp(24px,3.2vw,38px);}',
      '.palco-points{list-style:none;margin:30px 0 0;padding:0;max-width:880px;}',
      '.palco-root.live .palco-points{margin-top:14px;}',
      '.palco-points li{position:relative;padding-left:30px;margin:0 0 16px;',
      'font-size:clamp(18px,2vw,24px);line-height:1.5;color:var(--ps-body);}',
      '.palco-root.live .palco-points li{font-size:clamp(17px,1.9vw,22px);margin-bottom:9px;}',
      '.palco-points li::before{content:"";position:absolute;left:3px;top:.6em;',
      'width:9px;height:9px;border:1.6px solid var(--ps-gold);transform:rotate(45deg);}',
      // Logos institucionais, sempre no canto inferior esquerdo.
      '.palco-logos{position:absolute;left:clamp(28px,4vw,60px);bottom:clamp(24px,4vh,46px);',
      'display:flex;align-items:center;gap:16px;pointer-events:none;}',
      '.palco-logos img{height:clamp(30px,4.4vh,42px);width:auto;display:block;}',
      '.palco-logos-divider{width:1px;height:32px;background:var(--ps-line);}',
      // Progresso + dica, canto inferior direito.
      '.palco-foot{position:absolute;right:clamp(28px,4vw,60px);bottom:clamp(26px,4vh,48px);',
      'display:flex;align-items:center;gap:20px;pointer-events:none;}',
      '.palco-dots{display:flex;gap:9px;align-items:center;}',
      '.palco-dot{width:8px;height:8px;border-radius:50%;background:#cdc0a3;',
      'transition:background .3s,transform .3s;}',
      '.palco-dot.on{background:var(--ps-gold);transform:scale(1.4);}',
      ".palco-hint{font-family:'Cinzel','Gentium Plus',serif;font-size:10px;letter-spacing:.14em;",
      'text-transform:uppercase;color:var(--ps-muted);white-space:nowrap;}',
      '.palco-hint b{color:var(--ps-ink);font-weight:700;}',
      // Toast de entrada.
      '.palco-toast{pointer-events:none;position:absolute;top:50%;left:50%;',
      'transform:translate(-50%,-50%);text-align:center;color:var(--ps-ink);',
      "font-family:'Cinzel','Gentium Plus',serif;letter-spacing:.2em;text-transform:uppercase;",
      'opacity:0;transition:opacity .4s;}',
      '.palco-toast .t1{font-size:22px;margin-bottom:10px;color:var(--ps-gold);}',
      '.palco-toast .t2{font-size:12px;letter-spacing:.14em;color:var(--ps-muted);}',
      '.palco-toast.in{opacity:1;}',
      '@media (prefers-reduced-motion: reduce){',
      '.palco-mat,.palco-content,.palco-dot,.palco-toast,.palco-watermark{transition:none;}}'
    ].join('');
    document.head.appendChild(css);
  }

  function render() {
    var s = deck[idx];
    if (!s) return;
    if (typeof s.enter === 'function') { try { s.enter(); } catch (e) {} }

    root.classList.toggle('live', !!s.live);
    root.querySelector('.palco-badge').textContent = 'Musæum';
    root.querySelector('.palco-watermark').textContent = s.glyph;

    var content = root.querySelector('.palco-content');
    content.innerHTML =
      '<div class="palco-inner">' +
        '<div class="palco-glyph" aria-hidden="true">' + s.glyph + '</div>' +
        '<div class="palco-kicker">' + s.kicker + '</div>' +
        '<h2 class="palco-title">' + s.title + '</h2>' +
        '<ul class="palco-points">' +
          s.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') +
        '</ul>' +
      '</div>';

    var dots = deck.map(function (_, i) {
      return '<span class="palco-dot' + (i === idx ? ' on' : '') + '"></span>';
    }).join('');
    var hint = pick(
      '<b>→</b> avançar · <b>←</b> voltar · <b>L</b> idioma · <b>Esc</b> sair',
      '<b>→</b> next · <b>←</b> back · <b>L</b> language · <b>Esc</b> exit'
    );
    root.querySelector('.palco-foot').innerHTML =
      '<div class="palco-dots">' + dots + '</div>' +
      '<div class="palco-hint">' + (idx + 1) + '/' + deck.length + ' &nbsp;·&nbsp; ' + hint + '</div>';

    // reflow → fade-in do conteúdo
    content.classList.remove('in');
    void content.offsetWidth;
    content.classList.add('in');
  }

  function go(n) {
    var next = idx + n;
    if (next < 0 || next >= deck.length) return;
    idx = next;
    render();
  }

  // -----------------------------------------------------------------
  // Entrar / sair
  // -----------------------------------------------------------------
  function start() {
    if (active) return;
    active = true;
    idx = 0;
    deck = scenes();
    guardOnboarding();
    injectStyles();

    root = document.createElement('div');
    root.className = 'palco-root';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', pick('Modo apresentação', 'Presentation mode'));
    root.innerHTML =
      '<div class="palco-mat"></div>' +
      '<div class="palco-watermark" aria-hidden="true"></div>' +
      '<div class="palco-badge">Musæum</div>' +
      '<div class="palco-content"></div>' +
      '<div class="palco-logos" aria-hidden="true">' +
        '<img src="assets/images/ppgarq.png" alt="PPGArq · Museu Nacional / UFRJ">' +
        '<span class="palco-logos-divider"></span>' +
        '<img src="assets/images/museu-nacional.png" alt="Museu Nacional / UFRJ">' +
      '</div>' +
      '<div class="palco-foot"></div>' +
      '<div class="palco-toast"><div class="t1">' +
        pick('Modo apresentação', 'Presentation mode') + '</div><div class="t2">' +
        pick('setas para avançar · Esc para sair', 'arrows to advance · Esc to exit') +
      '</div></div>';
    document.body.appendChild(root);

    // toast de boas-vindas, some sozinho
    var toast = root.querySelector('.palco-toast');
    void toast.offsetWidth; toast.classList.add('in');
    setTimeout(function () { toast.classList.remove('in'); }, 2200);

    document.addEventListener('keydown', onKey, true);
    render();
  }

  function stop() {
    if (!active) return;
    active = false;
    document.removeEventListener('keydown', onKey, true);
    closeAbout();
    if (root && root.parentNode) root.parentNode.removeChild(root);
    root = null;
  }

  function toggle() { active ? stop() : start(); }

  function onKey(e) {
    if (!active) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
      case 'Spacebar':
        e.preventDefault(); e.stopPropagation(); go(1); break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault(); e.stopPropagation(); go(-1); break;
      case 'Home':
        e.preventDefault(); e.stopPropagation(); idx = 0; render(); break;
      case 'End':
        e.preventDefault(); e.stopPropagation(); idx = deck.length - 1; render(); break;
      case 'l': case 'L':
        e.preventDefault(); e.stopPropagation();
        if (typeof setLang === 'function') setLang(lang() === 'en' ? 'pt' : 'en');
        deck = scenes();            // reconstrói o roteiro no novo idioma
        if (idx >= deck.length) idx = deck.length - 1;
        render();
        break;
      case 'f': case 'F':
        e.preventDefault(); e.stopPropagation();
        if (!document.fullscreenElement) {
          (document.documentElement.requestFullscreen || function () {}).call(document.documentElement);
        } else if (document.exitFullscreen) { document.exitFullscreen(); }
        break;
      case 'Escape':
        e.preventDefault(); e.stopPropagation(); stop(); break;
    }
  }

  // -----------------------------------------------------------------
  // Gatilhos secretos: ?palco na URL, ou digitar "palco"
  // -----------------------------------------------------------------
  function paramWantsPalco() {
    var q = window.location.search.toLowerCase();
    return /[?&](palco|apresentar|stage)\b/.test(q);
  }

  var typed = '';
  document.addEventListener('keydown', function (e) {
    if (active) return;                       // dentro do palco, teclas são navegação
    var el = e.target;                         // não capturar digitação em campos
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
    if (e.key && e.key.length === 1) {
      typed = (typed + e.key.toLowerCase()).slice(-5);
      if (typed === 'palco') { typed = ''; start(); }
    }
  });

  // API para debug/console: window.Palco.start()/stop()/toggle()
  window.Palco = { start: start, stop: stop, toggle: toggle, next: function () { go(1); }, prev: function () { go(-1); } };

  if (paramWantsPalco()) {
    // espera o resto da home montar (main.js roda por último)
    if (document.readyState === 'complete') setTimeout(start, 300);
    else window.addEventListener('load', function () { setTimeout(start, 300); });
  }
})();
