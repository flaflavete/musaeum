/* Escreva seu nome no cartucho (curso/cartucho.html): a pessoa digita o nome e
   ele aparece em hieróglifos dentro de um cartucho, letra por letra. É a
   ferramenta "escreva seu nome como um faraó" dos museus, mas honesta: usa os
   sinais unilíteros (o "alfabeto" egípcio) e diz com todas as letras que é uma
   convenção moderna de aproximação, não como os egípcios de fato grafavam nomes.

   Os glifos, códigos de Gardiner e transliterações vêm dos mesmos dados do
   restante do site (gardiner/gardiner_data.js). Nenhuma persistência: guarda só
   o idioma/tema, como o Baralho. */

(function () {
  'use strict';

  var lang = localStorage.getItem('musaeum-lang') || 'pt';
  var pt = lang === 'pt';
  function T(p, e) { return pt ? p : e; }
  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function el(id) { return document.getElementById(id); }

  /* ── mapa letra latina → sinal unilítero ──────────────
     Cada entrada: glyph (hieróglifo), tr (transliteração egiptológica),
     code (Gardiner), name {pt,en} (o desenho) e, quando a correspondência é uma
     aproximação, note {pt,en} explicando a escolha. Os valores conferem com
     gardiner/gardiner_data.js. Alguns latinos (c, v, x, y, z) não têm par exato:
     seguimos a convenção usada nos museus. */
  var MAP = {
    a: { glyph: '𓄿', tr: 'ꜣ', code: 'G1',  name: { pt: 'abutre egípcio', en: 'Egyptian vulture' } },
    b: { glyph: '𓃀', tr: 'b', code: 'D58', name: { pt: 'pé', en: 'foot' } },
    c: { glyph: '𓎡', tr: 'k', code: 'V31', name: { pt: 'cesto com alça', en: 'basket with handle' },
         note: { pt: 'o C não existe: aqui vale como K (som duro).', en: 'there is no C: here it takes the K (hard) sound.' } },
    d: { glyph: '𓂧', tr: 'd', code: 'D46', name: { pt: 'mão', en: 'hand' } },
    e: { glyph: '𓇌', tr: 'y', code: 'M17A', name: { pt: 'dois juncos', en: 'two reed leaves' },
         note: { pt: 'vogal aproximada pelos dois juncos (semivogal y).', en: 'vowel approximated by the two reeds (the semivowel y).' } },
    f: { glyph: '𓆑', tr: 'f', code: 'I9',  name: { pt: 'víbora cornuda', en: 'horned viper' } },
    g: { glyph: '𓎼', tr: 'g', code: 'W11', name: { pt: 'suporte de pote', en: 'pot stand' } },
    h: { glyph: '𓎛', tr: 'ḥ', code: 'V28', name: { pt: 'pavio de linho torcido', en: 'wick of twisted flax' },
         note: { pt: 'o H é aproximado por ḥ, um agá enfático.', en: 'H is approximated by ḥ, an emphatic h.' } },
    i: { glyph: '𓇋', tr: 'ỉ', code: 'M17', name: { pt: 'junco florido', en: 'flowering reed' } },
    j: { glyph: '𓆓', tr: 'ḏ', code: 'I10', name: { pt: 'cobra', en: 'cobra' },
         note: { pt: 'o J segue o som ḏ, próximo de "dj".', en: 'J follows the ḏ sound, close to "dj".' } },
    k: { glyph: '𓎡', tr: 'k', code: 'V31', name: { pt: 'cesto com alça', en: 'basket with handle' } },
    l: { glyph: '𓃭', tr: 'l', code: 'E23', name: { pt: 'leão deitado', en: 'recumbent lion' },
         note: { pt: 'o egípcio não tinha um L próprio; o leão é a convenção.', en: 'Egyptian had no dedicated L; the lion is the convention.' } },
    m: { glyph: '𓅓', tr: 'm', code: 'G17', name: { pt: 'coruja', en: 'owl' } },
    n: { glyph: '𓈖', tr: 'n', code: 'N35', name: { pt: 'ondulação de água', en: 'water ripple' } },
    o: { glyph: '𓍯', tr: 'wꜣ', code: 'V4', name: { pt: 'laço', en: 'lasso' },
         note: { pt: 'vogal aproximada pelo laço (semivogal wꜣ).', en: 'vowel approximated by the lasso (the semivowel wꜣ).' } },
    p: { glyph: '𓊪', tr: 'p', code: 'Q3',  name: { pt: 'banquinho', en: 'stool' } },
    q: { glyph: '𓈎', tr: 'ḳ', code: 'N29', name: { pt: 'encosta arenosa', en: 'hill slope' } },
    r: { glyph: '𓂋', tr: 'r', code: 'D21', name: { pt: 'boca', en: 'mouth' } },
    s: { glyph: '𓋴', tr: 's', code: 'S29', name: { pt: 'tecido dobrado', en: 'folded cloth' } },
    t: { glyph: '𓏏', tr: 't', code: 'X1',  name: { pt: 'pão achatado', en: 'bread loaf' } },
    u: { glyph: '𓅱', tr: 'w', code: 'G43', name: { pt: 'codorniz jovem', en: 'quail chick' },
         note: { pt: 'vogal aproximada pela codorniz (semivogal w).', en: 'vowel approximated by the quail chick (the semivowel w).' } },
    v: { glyph: '𓆑', tr: 'f', code: 'I9',  name: { pt: 'víbora cornuda', en: 'horned viper' },
         note: { pt: 'o V aproxima-se do som F.', en: 'V is approximated by the F sound.' } },
    w: { glyph: '𓅱', tr: 'w', code: 'G43', name: { pt: 'codorniz jovem', en: 'quail chick' } },
    y: { glyph: '𓇌', tr: 'y', code: 'M17A', name: { pt: 'dois juncos', en: 'two reed leaves' } },
    z: { glyph: '𓊃', tr: 's', code: 'O34', name: { pt: 'ferrolho', en: 'door bolt' },
         note: { pt: 'o Z é grafado pelo ferrolho (som s/z).', en: 'Z is written with the door bolt (s/z sound).' } },
  };

  /* Dígrafo que vale um só sinal: sh → š (depressão). Reconhecível e correto. */
  var SH = { glyph: '𓈙', tr: 'š', code: 'N37', name: { pt: 'depressão / tanque', en: 'pool' },
             note: { pt: 'o dígrafo SH é o som único š.', en: 'the digraph SH is the single sound š.' } };
  /* X não tem sinal próprio: soletra-se k + s. */
  var X_PARTS = ['k', 's'];

  /* Normaliza: minúsculas, ç→s, remove acentos; mantém espaço como separador. */
  function normalize(raw) {
    var s = (raw || '').toLowerCase().replace(/ç/g, 's');
    if (s.normalize) s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    return s;
  }

  /* Converte o nome numa lista de peças. Cada peça é um sinal
     ({ glyph, tr, code, name, note, from }) ou um espaço ({ space: true }). */
  function transcribe(raw) {
    var s = normalize(raw);
    var out = [];
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (ch === ' ') { if (out.length && !out[out.length - 1].space) out.push({ space: true }); continue; }
      if (ch === 's' && s[i + 1] === 'h') { out.push(withFrom(SH, 'sh')); i++; continue; }
      if (ch === 'x') { X_PARTS.forEach(function (k) { out.push(withFrom(MAP[k], 'x')); }); continue; }
      if (MAP[ch]) { out.push(withFrom(MAP[ch], ch)); }
      /* qualquer outro caractere (dígito, pontuação) é ignorado em silêncio */
    }
    while (out.length && out[out.length - 1].space) out.pop();
    return out;
  }
  function withFrom(sign, from) {
    var c = {}; for (var k in sign) c[k] = sign[k]; c.from = from; return c;
  }

  /* ── cabeçalho (igual ao do curso) ──────────────────── */
  function backArrow() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>';
  }
  function renderHeader() {
    var langLabel = pt ? 'EN' : 'PT';
    var langAria = pt ? 'Switch to English' : 'Mudar para português';
    el('cartHeader').innerHTML =
      '<a class="licao-back" href="index.html">' + backArrow() + ' ' + T('Índice', 'Index') + '</a>' +
      '<span class="licao-header-title">' + T('Você, faraó', 'You, pharaoh') + '</span>' +
      '<div class="header-actions">' +
        '<button class="icon-btn" id="langToggle" aria-label="' + esc(langAria) + '">' + langLabel + '</button>' +
        '<button class="icon-btn" id="themeToggle" aria-label="' + esc(T('Alternar tema', 'Toggle theme')) + '" title="' + esc(T('Tema', 'Theme')) + '">◐</button>' +
      '</div>';
  }

  /* ── página ─────────────────────────────────────────── */
  function renderPage() {
    document.title = T('Você, faraó', 'You, pharaoh') + ' · Musæum';
    document.documentElement.lang = pt ? 'pt-BR' : 'en';
    renderHeader();

    var prev = el('cartName') ? el('cartName').value : '';

    el('cartContent').innerHTML =
      '<div class="cart-wrap">' +
        '<div class="deck-intro">' +
          '<span class="deck-intro-glyph" aria-hidden="true">𓊹</span>' +
          '<h1>' + T('Você, faraó.', 'You, pharaoh.') + '</h1>' +
          '<p>' + T('O cartucho era o laço de corda que envolvia o nome do rei, protegendo-o. Digite seu nome e veja-o em hieróglifos, como um faraó.',
                    'The cartouche was the loop of rope that enclosed the king\'s name, protecting it. Type your name and see it in hieroglyphs, like a pharaoh.') + '</p>' +
        '</div>' +

        '<div class="cart-field">' +
          '<label class="cart-label" for="cartName">' + T('Seu nome', 'Your name') + '</label>' +
          '<input type="text" class="cart-input" id="cartName" maxlength="24" autocomplete="off" spellcheck="false" ' +
                 'placeholder="' + esc(T('digite aqui…', 'type here…')) + '" value="' + esc(prev) + '" />' +
        '</div>' +

        '<div class="cart-stage" id="cartStage" aria-live="polite"></div>' +
        '<div class="cart-translit" id="cartTranslit" aria-hidden="true"></div>' +

        '<div class="cart-actions">' +
          '<button class="btn btn-primary" id="cartDownload" disabled>' + T('Baixar imagem', 'Download image') + '</button>' +
        '</div>' +

        '<div class="cart-breakdown" id="cartBreakdown"></div>' +

        '<div class="callout cart-note">' +
          T('<strong>Uma brincadeira séria.</strong> Os egípcios não escreviam vogais e não grafavam nomes estrangeiros letra a letra. Esta é uma convenção moderna: emprestamos os sinais unilíteros (o "alfabeto" de 24 consoantes) para aproximar cada letra do nosso nome. Divirta-se — e, para a escrita de verdade, siga para as lições.',
              '<strong>Serious fun.</strong> The Egyptians did not write vowels and did not spell foreign names letter by letter. This is a modern convention: we borrow the uniliteral signs (the 24-consonant "alphabet") to approximate each letter of our name. Enjoy — and for the real writing, head to the lessons.') +
        '</div>' +
      '</div>';

    wire();
    update();
  }

  /* Monta o cartucho (HTML, tema-consciente): laço em U com a barra de amarração
     à esquerda e os glifos em linha. Lê da esquerda para a direita. */
  function renderCartouche(pieces) {
    var stage = el('cartStage');
    if (!pieces.length) {
      stage.innerHTML = '<div class="cart-piece is-empty"><span class="cart-tie" aria-hidden="true"></span>' +
        '<span class="cart-placeholder">' + T('seu nome aparece aqui', 'your name appears here') + '</span></div>';
      return;
    }
    var glyphs = pieces.map(function (p) {
      if (p.space) return '<span class="cart-space" aria-hidden="true"></span>';
      return '<span class="cart-glyph" title="' + esc(p.from.toUpperCase() + ' · ' + p.tr + ' · ' + p.code) + '">' + p.glyph + '</span>';
    }).join('');
    stage.innerHTML = '<div class="cart-piece"><span class="cart-tie" aria-hidden="true"></span>' +
      '<div class="cart-row">' + glyphs + '</div></div>';
  }

  /* Detalhamento letra a letra: cartão por sinal, com o desenho e a nota. */
  function renderBreakdown(pieces) {
    var wrap = el('cartBreakdown');
    var signs = pieces.filter(function (p) { return !p.space; });
    if (!signs.length) { wrap.innerHTML = ''; return; }
    var head = '<h2 class="cart-breakdown-title">' + T('Sinal por sinal', 'Sign by sign') + '</h2>';
    var cards = signs.map(function (p) {
      return '<div class="cart-key">' +
        '<span class="cart-key-letter">' + esc(p.from.toUpperCase()) + '</span>' +
        '<span class="cart-key-arrow" aria-hidden="true">→</span>' +
        '<span class="cart-key-glyph">' + p.glyph + '</span>' +
        '<span class="cart-key-body">' +
          '<span class="cart-key-tr">' + esc(p.tr) + ' · <span class="cart-key-code">' + esc(p.code) + '</span></span>' +
          '<span class="cart-key-name">' + esc((p.name && p.name[lang]) || (p.name && p.name.pt) || '') + '</span>' +
          (p.note ? '<span class="cart-key-note">' + esc(p.note[lang] || p.note.pt) + '</span>' : '') +
        '</span>' +
      '</div>';
    }).join('');
    wrap.innerHTML = head + '<div class="cart-key-grid">' + cards + '</div>';
  }

  var lastPieces = [];
  function update() {
    var raw = el('cartName') ? el('cartName').value : '';
    lastPieces = transcribe(raw);
    renderCartouche(lastPieces);
    var signs = lastPieces.filter(function (p) { return !p.space; });
    var tr = signs.map(function (p) { return p.tr; }).join('');
    el('cartTranslit').textContent = tr;
    renderBreakdown(lastPieces);
    var dl = el('cartDownload');
    if (dl) dl.disabled = signs.length === 0;
  }

  /* ── download: desenha o cartucho num canvas (fundo azul-noite, glifos
        dourados) e salva PNG. Usa a fonte de hieróglifos já carregada. ── */
  function downloadImage() {
    var signs = lastPieces.filter(function (p) { return !p.space; });
    if (!signs.length) return;
    var name = normalize(el('cartName').value).trim();

    var scale = 2;               // nitidez em telas retina
    var GLYPH = 96, GAP = 8, PAD = 70, TIE = 22;
    var innerW = signs.length * GLYPH + Math.max(0, signs.length - 1) * GAP;
    var W = (innerW + PAD * 2 + TIE) ;
    var H = 300;
    var canvas = document.createElement('canvas');
    canvas.width = W * scale; canvas.height = H * scale;
    var ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    function paint() {
      var GOLD = '#c9a646', GOLD_LT = '#e8c866', NAVY = '#1b2a3d', NAVY2 = '#243449';
      var grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, NAVY2); grad.addColorStop(1, NAVY);
      ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

      // laço do cartucho (stadium) + barra de amarração
      var ovX = PAD - 18, ovY = 70, ovW = W - (PAD - 18) * 2, ovH = 150, r = ovH / 2;
      ctx.lineWidth = 6; ctx.strokeStyle = GOLD; ctx.lineJoin = 'round';
      roundRect(ctx, ovX, ovY, ovW, ovH, r); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ovX - 8, ovY + ovH * 0.16);
      ctx.lineTo(ovX - 8, ovY + ovH * 0.84);
      ctx.lineWidth = 7; ctx.stroke();

      // glifos
      ctx.fillStyle = GOLD_LT;
      ctx.font = GLYPH + "px 'Noto Sans Egyptian Hieroglyphs'";
      ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
      var cy = ovY + ovH / 2 + 4;
      var startX = ovX + (ovW - innerW) / 2;
      signs.forEach(function (p, i) {
        var cx = startX + i * (GLYPH + GAP) + GLYPH / 2;
        ctx.fillText(p.glyph, cx, cy);
      });

      // assinatura discreta
      ctx.fillStyle = GOLD;
      ctx.font = "22px 'Cinzel', serif";
      ctx.textAlign = 'center';
      ctx.fillText('Musæum', W / 2, H - 26);

      canvas.toBlob(function (blob) {
        if (!blob) return;
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'cartucho-' + (name ? name.replace(/[^a-z0-9]+/g, '-') : 'musaeum') + '.png';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      }, 'image/png');
    }

    // garante que a fonte de hieróglifos esteja pronta antes de pintar
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load(GLYPH + "px 'Noto Sans Egyptian Hieroglyphs'"),
        document.fonts.load("22px 'Cinzel'"),
      ]).then(paint).catch(paint);
    } else {
      paint();
    }
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ── ligações ───────────────────────────────────────── */
  function wire() {
    el('langToggle').addEventListener('click', function () {
      lang = pt ? 'en' : 'pt'; pt = lang === 'pt';
      localStorage.setItem('musaeum-lang', lang);
      renderPage();
    });
    el('themeToggle').addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var nx = cur === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nx);
      localStorage.setItem('musaeum-theme', nx);
    });
    var input = el('cartName');
    if (input) {
      input.addEventListener('input', update);
      input.focus();
    }
    var dl = el('cartDownload');
    if (dl) dl.addEventListener('click', downloadImage);
  }

  document.addEventListener('DOMContentLoaded', renderPage);
})();
