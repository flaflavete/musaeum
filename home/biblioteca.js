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
