// Certificado de leitura: desbloqueia quando o leitor PASSA na Prova do Módulo 1
// (o porteiro do curso), não mais pela simples conclusão das lições. A aprovação
// grava done['prova-1'] no mesmo save do curso (musaeum-hieroglyphs), via
// curso/curso.js. Desenhado em canvas 800x560 e exportável em PNG.

  // Id da prova (fonte: window.CURSO_PROVA, curso/prova.js). Fallback defensivo
  // caso o script da prova não tenha carregado.
  function provaId() {
    return (window.CURSO_PROVA && window.CURSO_PROVA.id) || 'prova-1';
  }

  // Desbloqueado = aprovado na prova. Certifica quem provou, não quem só clicou.
  function allLessonsComplete() {
    let done = {};
    try { done = JSON.parse(localStorage.getItem('musaeum-hieroglyphs') || '{}').done || {}; }
    catch (e) { done = {}; }
    return !!done[provaId()];
  }

  function renderCertificateSection() {
    const wrap = document.getElementById('certWrap');
    if (!wrap) return;
    const t = i18n[currentLang];
    const unlocked = allLessonsComplete();
    document.getElementById('certSectionTitle').textContent = t.certSectionTitle;
    document.getElementById('certLockedWrap').style.display  = unlocked ? 'none' : '';
    document.getElementById('certLockedMsg').textContent     = t.certLocked;
    document.getElementById('certUnlockMsg').textContent     = t.certUnlock;
    document.getElementById('certOpenBtnWrap').style.display = unlocked ? '' : 'none';
    document.getElementById('certOpenBtn').textContent       = t.certOpenBtn;
    document.getElementById('certDownloadBtn').textContent   = t.certDownload;
    document.getElementById('certCloseBtn').textContent      = t.certClose;

    // Nome que aparece no certificado (editável a qualquer momento)
    const nameLine = document.getElementById('certNameLine');
    if (nameLine) {
      const name = getPlayerName();
      nameLine.innerHTML = name
        ? `<span class="cert-name-label">${t.certNameLabel}:</span> <span class="cert-name-val">${escapeHtml(name)}</span> <button class="edit-name-btn" onclick="openNameModal()" aria-label="${t.editNameLabel}" title="${t.editNameLabel}">✎</button>`
        : `<button class="edit-name-btn cert-add-name" onclick="openNameModal()" aria-label="${t.addNameLabel}" title="${t.addNameLabel}">${t.addNameLabel}</button>`;
    }
  }

  function showCertificate() {
    const modal = document.getElementById('certModal');
    modal.classList.add('show');
    modal.addEventListener('click', _certBackdropClose);
    document.fonts.ready.then(() => drawCertificate(currentLang));
  }

  function _certBackdropClose(e) {
    if (e.target === document.getElementById('certModal')) hideCertificate();
  }

  function hideCertificate() {
    const modal = document.getElementById('certModal');
    modal.classList.remove('show');
    modal.removeEventListener('click', _certBackdropClose);
  }

  function downloadCertificate() {
    document.fonts.ready.then(() => drawCertificate(currentLang).then(() => {
      const canvas = document.getElementById('certCanvas');
      const a = document.createElement('a');
      const raw = (getPlayerName() || 'musaeum').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      a.download = `musaeum-certificado-${raw || 'leitura'}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    }));
  }

  function drawCertificate(lang) {
    const canvas = document.getElementById('certCanvas');
    const t = i18n[lang];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 800, H = 560;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const GOLD = '#b5922e', GOLD_L = '#c8a642';
    const INK = '#1a1008', INK_SOFT = '#4a3820', INK_DIM = '#7a6040';

    function line(y, op=0.32) {
      const g = ctx.createLinearGradient(44, y, W - 44, y);
      g.addColorStop(0, 'transparent');
      g.addColorStop(0.12, `rgba(181,146,46,${op})`);
      g.addColorStop(0.88, `rgba(181,146,46,${op})`);
      g.addColorStop(1, 'transparent');
      ctx.strokeStyle = g; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(44, y); ctx.lineTo(W - 44, y); ctx.stroke();
    }

    function draw(ppImg, mnImg) {
      // Fundo marfim
      ctx.fillStyle = '#faf8f0';
      ctx.fillRect(0, 0, W, H);

      // Bordas
      ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5;
      ctx.strokeRect(12, 12, W - 24, H - 24);
      ctx.strokeStyle = `rgba(181,146,46,0.35)`; ctx.lineWidth = 0.7;
      ctx.strokeRect(20, 20, W - 40, H - 40);

      // Losangos nos cantos
      [[12,12],[W-12,12],[12,H-12],[W-12,H-12]].forEach(([x,y]) => {
        ctx.fillStyle = GOLD;
        ctx.beginPath();
        ctx.moveTo(x, y-5); ctx.lineTo(x+5, y); ctx.lineTo(x, y+5); ctx.lineTo(x-5, y);
        ctx.closePath(); ctx.fill();
      });

      line(36);

      ctx.textAlign = 'center';

      // Hieroglifos ornamentais
      ctx.font = '17px "Noto Sans Egyptian Hieroglyphs", sans-serif';
      ctx.fillStyle = `rgba(181,146,46,0.42)`;
      ctx.fillText('𓊹   𓂀   𓇳', W/2, 60);

      // MUSAEUM
      ctx.font = 'bold 28px Cinzel, serif';
      ctx.fillStyle = GOLD;
      ctx.fillText('M U S Æ U M', W/2, 86);

      line(102, 0.16);

      // Titulo do certificado
      ctx.font = '700 9.5px Cinzel, serif';
      ctx.fillStyle = INK_DIM;
      ctx.fillText(t.certTitle.split('').join(' '), W/2, 118);

      line(132, 0.1);

      // Atesta-se que
      ctx.font = 'italic 16px "EB Garamond", Georgia, serif';
      ctx.fillStyle = INK_DIM;
      ctx.fillText(t.certAttest, W/2, 162);

      // Nome
      const playerName = getPlayerName() || (lang === 'pt' ? 'Leitor do Musæum' : 'Musæum Reader');
      ctx.font = 'bold 32px Cinzel, serif';
      ctx.fillStyle = INK;
      ctx.fillText(playerName, W/2, 200);

      line(218, 0.2);

      // concluiu com exito
      ctx.font = 'italic 15px "EB Garamond", Georgia, serif';
      ctx.fillStyle = INK_DIM;
      ctx.fillText(t.certCompleted, W/2, 246);

      // Assunto: a introducao aos hieroglifos
      ctx.textAlign = 'center';
      ctx.font = '24px "Noto Sans Egyptian Hieroglyphs", sans-serif';
      ctx.fillStyle = GOLD_L;
      ctx.fillText('𓂀', W/2, 290);
      ctx.font = '500 18px Cinzel, serif';
      ctx.fillStyle = INK_SOFT;
      ctx.fillText(t.certSubjectDraw, W/2, 320);

      line(340);

      // Data centralizada
      const now = new Date();
      const dateStr = now.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' });
      ctx.font = 'italic 12px "EB Garamond", Georgia, serif';
      ctx.fillStyle = INK_DIM;
      ctx.textAlign = 'center';
      ctx.fillText(dateStr, W/2, 364);

      // Logos institucionais centralizadas no rodape
      const logoH = 36;
      const ppW = ppImg && ppImg.naturalWidth ? logoH * (ppImg.naturalWidth / ppImg.naturalHeight) : 0;
      const mnW = mnImg && mnImg.naturalWidth ? logoH * (mnImg.naturalWidth / mnImg.naturalHeight) : 0;
      const gap = 28;
      const totalW = ppW + gap + mnW;
      const logoX = (W - totalW) / 2;
      const logoY = 386;
      if (ppImg && ppImg.naturalWidth) ctx.drawImage(ppImg, logoX, logoY, ppW, logoH);
      if (mnImg && mnImg.naturalWidth) ctx.drawImage(mnImg, logoX + ppW + gap, logoY, mnW, logoH);

      // Ornamento de rodape
      ctx.font = '13px "Noto Sans Egyptian Hieroglyphs", sans-serif';
      ctx.fillStyle = `rgba(181,146,46,0.09)`;
      ctx.textAlign = 'center';
      ctx.fillText('𓊹𓂀𓇳𓏞𓊛𓁹𓄿𓅓𓆑𓈋𓈖𓉐𓊛𓊴𓌀𓏃𓌛𓏞', W/2, 476);
    }

    return new Promise(resolve => {
      const ppImg = new Image();
      const mnImg = new Image();
      let pending = 2;
      function onDone() { if (--pending === 0) { draw(ppImg, mnImg); resolve(); } }
      ppImg.onload = ppImg.onerror = onDone;
      mnImg.onload = mnImg.onerror = onDone;
      ppImg.src = 'assets/images/ppgarq.png';
      mnImg.src = 'assets/images/museu-nacional.png';
    });
  }

  // Toast dourado de conclusão: aparece uma única vez, quando o leitor volta à
  // home tendo concluído todas as lições do curso. Guardado por um marcador
  // próprio (musaeum-cert-celebrated) para não repetir a cada visita. O
  // certificado em si continua sempre acessível na seção "Sua Conquista".
  let _certToastTimer = null;

  function maybeCelebrateCertificate() {
    // Não roubar a cena da apresentação institucional (Modo Palco).
    if (/[?&](palco|apresentar|stage)\b/.test(location.search)) return;
    if (localStorage.getItem('musaeum-cert-celebrated') === '1') return;
    if (!allLessonsComplete()) return;
    showCertToast();
  }

  function showCertToast() {
    const toast = document.getElementById('certToast');
    if (!toast) return;
    localStorage.setItem('musaeum-cert-celebrated', '1');
    const t = i18n[currentLang];
    document.getElementById('certToastTitle').textContent = t.certToastTitle;
    document.getElementById('certToastMsg').textContent = t.certToastMsg;
    document.getElementById('certToastBtn').textContent = t.certToastBtn;
    document.getElementById('certToastClose').setAttribute('aria-label', t.certToastCloseLabel);
    // Mesmo padrão do toast de descoberta das histórias: só alterna .show;
    // o visibility:hidden do CSS já mantém o toast fora da tabulação enquanto
    // escondido (nada de atributo hidden, que quebra a transição).
    toast.classList.add('show');
    clearTimeout(_certToastTimer);
    _certToastTimer = setTimeout(dismissCertToast, 12000);
  }

  function dismissCertToast() {
    const toast = document.getElementById('certToast');
    if (!toast) return;
    clearTimeout(_certToastTimer);
    toast.classList.remove('show');
  }

  function openCertFromToast() {
    dismissCertToast();
    showTab('aprender');
    const wrap = document.getElementById('certWrap');
    if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showCertificate();
  }
