// Certificado de leitura: desbloqueia quando todas as histórias publicadas
// têm screen === 'final'. Desenhado em canvas 800x560 e exportável em PNG.

  // Histórias publicadas (derivado do catálogo): todas precisam estar
  // concluídas para desbloquear o certificado.
  const AVAILABLE_STORIES = MUSAEUM_CATALOG.filter(s => s.available).map(s => s.storyId);

  function allStoriesComplete() {
    return AVAILABLE_STORIES.every(id => {
      const s = storeGet(id);
      return s && s.screen === 'final';
    });
  }

  function renderCertificateSection() {
    const section = document.getElementById('panel-cert');
    if (!section) return;
    const t = i18n[currentLang];
    const unlocked = allStoriesComplete();
    document.getElementById('certHeading').textContent = t.certSectionTitle;
    document.getElementById('certLockedWrap').style.display  = unlocked ? 'none' : '';
    document.getElementById('certLockedMsg').textContent     = t.certLocked;
    document.getElementById('certUnlockMsg').style.display   = unlocked ? '' : 'none';
    document.getElementById('certUnlockMsg').textContent     = t.certUnlock;
    document.getElementById('certOpenBtnWrap').style.display = unlocked ? '' : 'none';
    document.getElementById('certOpenBtn').textContent       = t.certOpenBtn;
    document.getElementById('certDownloadBtn').textContent   = t.certDownload;
    document.getElementById('certCloseBtn').textContent      = t.certClose;
  }

  function showCertificate() {
    document.getElementById('certPreview').style.display = '';
    document.getElementById('certOpenBtnWrap').style.display = 'none';
    document.fonts.ready.then(() => drawCertificate(currentLang));
  }

  function hideCertificate() {
    document.getElementById('certPreview').style.display = 'none';
    document.getElementById('certOpenBtnWrap').style.display = '';
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

      // Historias
      const certStories = MUSAEUM_CATALOG.filter(s => s.available);
      let storyY = 282 - (certStories.length - 1) * 14;
      for (const s of certStories) {
        ctx.font = '20px "Noto Sans Egyptian Hieroglyphs", sans-serif';
        ctx.fillStyle = GOLD_L;
        ctx.textAlign = 'right';
        ctx.fillText(s.cardGlyph, W/2 - 12, storyY);
        ctx.font = '500 16px Cinzel, serif';
        ctx.fillStyle = INK_SOFT;
        ctx.textAlign = 'left';
        ctx.fillText(lang === 'pt' ? s.titlePt : s.titleEn, W/2 + 18, storyY);
        storyY += 28;
      }

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
