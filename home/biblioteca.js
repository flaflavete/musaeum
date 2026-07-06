// Monta os cards da biblioteca a partir do catálogo (uma vez, no load;
// os textos são atualizados por render() para preservar a animação).
  function buildLibrary() {
    const grid = document.getElementById('libraryGrid');
    let html = '';
    for (const s of MUSAEUM_CATALOG) {
      if (s.available) {
        html += `
      <a href="${s.href}" class="scroll-card" id="card-${s.storyId}">
        <span class="status-tag tag-ready" data-t="tagOpen"></span>
        <div class="card-glyph" aria-hidden="true">${s.cardGlyph}</div>
        <div class="card-title"></div>
        <div class="card-desc"></div>
        <div class="card-treasures" id="treasures-${s.storyId}"></div>
      </a>`;
      } else {
        html += `
      <div class="scroll-card locked" id="card-${s.storyId}" aria-disabled="true">
        <span class="status-tag tag-locked" data-t="tagLocked"></span>
        <div class="card-glyph" aria-hidden="true">${s.cardGlyph}</div>
        <div class="card-title"></div>
        <div class="card-desc"></div>
      </div>`;
      }
    }
    html += `
      <div class="scroll-card more-soon" aria-hidden="true">
        <div class="card-glyph more-glyph" aria-hidden="true">𓏼</div>
        <div class="card-title" data-t="tMore"></div>
        <div class="card-desc" data-t="dMore"></div>
      </div>`;
    grid.innerHTML = html;
  }

  // Tesouros de cada história dentro do próprio card + o convite para o curso
  // de hieróglifos ao fim da grade. Lê o catálogo cruzado com o progresso salvo
  // (musaeum-stories via storeGet). Chamado por render() (é sensível ao idioma).
  function renderCardTreasures() {
    const t = i18n[currentLang];

    for (const s of MUSAEUM_CATALOG) {
      if (!s.available) continue;
      const slot = document.getElementById('treasures-' + s.storyId);
      if (!slot) continue;
      const save = storeGet(s.storyId);

      // Tesouros colecionáveis (grade de emoji): earned = descoberto na leitura.
      if (s.items) {
        const collected = save?.collected || [];
        const earnedCount = s.items.filter((_, i) => collected[i] === true).length;
        let cells = '';
        for (let i = 0; i < s.items.length; i++) {
          const item   = s.items[i];
          const earned = collected[i] === true;
          const label  = currentLang === 'pt' ? item.pt : item.en;
          cells += `<span class="card-treasure ${earned ? 'earned' : 'locked'}" title="${earned ? escapeHtml(label) : '?'}">${earned ? item.icon : ''}</span>`;
        }
        slot.setAttribute('aria-label', `${earnedCount} / ${s.items.length} ${t.treasuresLabel}`);
        slot.innerHTML = cells;
        continue;
      }

      // Pergaminho único de conclusão (histórias com award em vez de tesouros).
      if (s.award) {
        const earned = save?.screen === 'final';
        const title  = currentLang === 'pt' ? s.award.titlePt : s.award.titleEn;
        slot.setAttribute('aria-label', earned ? title : t.awardLocked);
        slot.innerHTML = `<span class="card-treasure award ${earned ? 'earned' : 'locked'}" title="${earned ? escapeHtml(title) : escapeHtml(t.awardLocked)}">${s.award.icon}</span>`;
      }
    }

    // Convite para a introdução aos hieróglifos (aba Hieróglifos). Ponte entre
    // ler as histórias e aprender a escrita; os glifos descobertos aparecem no
    // momento da leitura (toast), aqui fica o caminho para o curso.
    const invite = document.getElementById('libraryInvite');
    if (invite) {
      invite.innerHTML = `<div class="codex-invite">
        <div class="codex-invite-icon" aria-hidden="true">𓂀</div>
        <div class="codex-invite-body">
          <div class="codex-invite-title">${t.codexInviteTitle}</div>
          <div class="codex-invite-desc">${t.codexInviteBody}</div>
          <button class="codex-invite-btn" type="button" onclick="showTab('aprender')">${t.codexInviteBtn} &rarr;</button>
        </div>
      </div>`;
    }
  }
