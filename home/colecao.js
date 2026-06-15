// Seção Coleção: tesouros e Códex de hieróglifos por história, lidos do
// catálogo cruzado com o progresso salvo (musaeum-stories).
  function renderCollection() {
    const t = i18n[currentLang];
    const name = getPlayerName();

    const headingEl = document.getElementById('collectionHeading');
    if (name) {
      headingEl.innerHTML = `${t.collectionTitle} ${t.collectionOf} <span class="player-name-val">${escapeHtml(name)}</span>`;
    } else {
      headingEl.textContent = t.collectionTitle;
    }

    // Histórias que entram na Coleção: têm tesouros e estão publicadas
    // (ou guardam progresso de quem já jogou).
    const collectible = MUSAEUM_CATALOG.filter(s =>
      s.items && (s.available || storeGet(s.storyId)));

    // badge de resumo (X / total)
    let earnedCount = 0, totalCount = 0;
    for (const game of collectible) {
      totalCount += game.items.length;
      const save = storeGet(game.storyId);
      if (save) {
        const collected = save.collected || [];
        earnedCount += game.items.filter((_, i) => collected[i] === true).length;
      }
    }
    const summaryEl = document.getElementById('collectionSummary');
    if (summaryEl) summaryEl.textContent = `${earnedCount} / ${totalCount}`;

    const playerEl = document.getElementById('collectionPlayer');
    if (name) {
      playerEl.innerHTML = `<button class="edit-name-btn" onclick="openNameModal()" aria-label="${t.editNameLabel}" title="${t.editNameLabel}">✎</button>`;
    } else {
      playerEl.innerHTML = `<button class="edit-name-btn" onclick="openNameModal()" aria-label="${t.addNameLabel}" title="${t.addNameLabel}" style="opacity:0.45; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; font-family:'Cinzel',serif; text-decoration:underline;">${t.addNameLabel}</button>`;
    }

    const content = document.getElementById('collectionContent');
    let html = '';
    let anyData = false;

    // Tesouros por história
    for (const game of collectible) {
      const save = storeGet(game.storyId);
      if (!save) continue;
      anyData = true;
      const collected = save.collected || [];
      const gameTitle = currentLang === 'pt' ? game.titlePt : game.titleEn;
      html += `<div style="margin-bottom:24px;">
        <div class="collection-game-name">${gameTitle}</div>
        <div class="collection-grid">`;
      for (let i = 0; i < game.items.length; i++) {
        const item  = game.items[i];
        const earned = collected[i] === true;
        const label  = currentLang === 'pt' ? item.pt : item.en;
        html += `<div class="col-item ${earned ? 'earned' : 'locked'}" title="${earned ? escapeHtml(label) : '?'}">
          <div class="col-item-icon" aria-hidden="true">${earned ? item.icon : '·'}</div>
          <div class="col-item-label">${earned ? escapeHtml(label) : '?'}</div>
        </div>`;
      }
      html += `</div></div>`;
    }

    // Pergaminho de conclusão: histórias que premiam com um título único (em
    // vez de tesouros colecionáveis). Desbloqueia ao concluir (screen === 'final').
    const awardStories = MUSAEUM_CATALOG.filter(s => s.award && storeGet(s.storyId));
    for (const story of awardStories) {
      anyData = true;
      const save = storeGet(story.storyId);
      const earned = save?.screen === 'final';
      const a = story.award;
      const title = currentLang === 'pt' ? a.titlePt : a.titleEn;
      const desc  = earned
        ? (currentLang === 'pt' ? a.descPt : a.descEn)
        : t.awardLocked;
      const storyTitle = currentLang === 'pt' ? story.titlePt : story.titleEn;
      html += `<div style="margin-bottom:24px;">
        <div class="collection-game-name">${escapeHtml(storyTitle)}</div>
        <div class="col-award ${earned ? 'earned' : 'locked'}">
          <div class="col-award-icon" aria-hidden="true">${a.icon}</div>
          <div class="col-award-body">
            <div class="col-award-title">${escapeHtml(title)}</div>
            <div class="col-award-desc">${escapeHtml(desc)}</div>
          </div>
        </div>
      </div>`;
    }

    // Códex de hieróglifos por história
    const codexStories = MUSAEUM_CATALOG.filter(s => s.codex && storeGet(s.storyId));
    for (const story of codexStories) {
      anyData = true;
      const save = storeGet(story.storyId);
      const discovered = new Set(save?.discoveredGlyphs ?? []);
      const storyTitle = currentLang === 'pt' ? story.titlePt : story.titleEn;
      const heading = codexStories.length > 1
        ? `${t.codexSectionTitle} · ${storyTitle}`
        : t.codexSectionTitle;
      html += `<div style="margin-bottom:8px;">
        <div class="collection-game-name">${heading}</div>
        <div class="collection-grid">`;
      for (let i = 0; i < story.codex.length; i++) {
        const g     = story.codex[i];
        const found = discovered.has(i);
        const label = currentLang === 'pt' ? g.namePt : g.nameEn;
        if (found) {
          html += `<div class="col-item earned" onclick="openGlyphCard('${story.storyId}', ${i})" title="${escapeHtml(label)}">
            <div class="col-item-icon is-glyph" aria-hidden="true">${g.glyph}</div>
            <div class="col-item-label">${escapeHtml(label)}</div>
          </div>`;
        } else {
          html += `<div class="col-item locked">
            <div class="col-item-icon is-glyph" aria-hidden="true">?</div>
            <div class="col-item-label">?</div>
          </div>`;
        }
      }
      html += `</div></div>`;
    }

    if (!anyData) html = `<div class="collection-empty">${t.collectionEmpty}</div>`;
    content.innerHTML = html;
  }
