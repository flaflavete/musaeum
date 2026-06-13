// =============================================================
// Geografia das histórias do Musæum
// =============================================================
// Fonte única dos lugares citados nos textos, usados pelo mapa
// interativo do index.html. O mapa de fundo é a carta antiga
// "Égypte Ancienne" de V. A. Malte-Brun (1837, domínio público,
// via Wikimedia Commons): assets/images/mapa-egito-malte-brun-1837.jpg
//
// Como aquela carta abrange do Mediterrâneo à Baixa Núbia, os lugares
// fora dela (Punt, ao sul; o Levante, ao norte) viram marcadores de
// BORDA com seta apontando a direção. Cada entrada reúne:
//
//   id          identificador
//   namePt/En   nome bilíngue (forma egípcia + moderna quando útil)
//   kind        tipo de lugar (chave em GEO_KINDS, rótulo bilíngue)
//   stories     histórias em que aparece (storyId)
//   uncertain   true quando a localização é debatida ou não atestada
//   pos         { map: [left%, top%] }  -> ponto sobre a carta
//               { edge: 'n'|'s', at: %  } -> marcador de borda c/ seta
//   descPt/En   descrição factual, fiel às fontes (sem invenção)
//
// Rigor: localizações debatidas (Punt, Iaa, Qedem) e lugares conhecidos
// só pelos textos (Muros do Soberano) levam uncertain:true e a ressalva
// aparece no próprio cartão. As posições sobre a carta são aproximadas;
// vários desses lugares não têm localização exata atestada.

const GEO_KINDS = {
  sea:      { pt: 'Mar',       en: 'Sea' },
  river:    { pt: 'Rio',       en: 'River' },
  capital:  { pt: 'Capital',   en: 'Capital' },
  city:     { pt: 'Cidade',    en: 'City' },
  fortress: { pt: 'Fortaleza', en: 'Fortress' },
  region:   { pt: 'Região',    en: 'Region' },
  kingdom:  { pt: 'Reino',     en: 'Kingdom' }
};

const MUSAEUM_GEO = [
  {
    id: 'grande-verde',
    namePt: 'Grande Verde', nameEn: 'Great Green',
    kind: 'sea', stories: ['naufrago'], uncertain: false,
    pos: { map: [24, 6] },
    descPt: 'Nome egípcio do Mar Mediterrâneo (Wadj-Wer), e às vezes do Mar Vermelho. Diferente do Nilo, controlado e previsível, o mar era espaço de caos: navegar no Grande Verde sempre teve a aura de uma aventura perigosa.',
    descEn: 'Egyptian name for the Mediterranean (Wadj-Wer), and sometimes the Red Sea. Unlike the controlled, predictable Nile, the sea was a space of chaos: sailing the Great Green always carried the aura of a dangerous adventure.'
  },
  {
    id: 'muros',
    namePt: 'Muros do Soberano', nameEn: 'Walls of the Ruler',
    kind: 'fortress', stories: ['sinuhe'], uncertain: true,
    pos: { map: [55, 13] },
    descPt: 'Linha de fortalezas (inbw-heqa) na fronteira nordeste, erguida para controlar a entrada de povos do Levante. Sinué precisou cruzá-la clandestinamente ao fugir. Nunca foi localizada: é conhecida só pelos textos.',
    descEn: 'A line of fortresses (inbw-heqa) on the northeastern border, raised to control the entry of peoples from the Levant. Sinuhe had to cross it in secret as he fled. It has never been located: it is known only from texts.'
  },
  {
    id: 'egito',
    namePt: 'Itj-taui (Lisht)', nameEn: 'Itj-tawy (Lisht)',
    kind: 'capital', stories: ['naufrago', 'sinuhe'], uncertain: false,
    pos: { map: [32, 26] },
    descPt: 'O coração das duas histórias. No Reino Médio a capital era Itj-taui, perto da atual Lisht, onde faraós da XII dinastia como Amenemhat I e Sesostris I ergueram suas pirâmides. É o Egito a que Sinué anseia voltar.',
    descEn: 'The heart of both stories. In the Middle Kingdom the capital was Itj-tawy, near present-day Lisht, where Twelfth Dynasty pharaohs such as Amenemhat I and Senusret I built their pyramids. It is the Egypt Sinuhe longs to return to.'
  },
  {
    id: 'nilo',
    namePt: 'Nilo', nameEn: 'Nile',
    kind: 'river', stories: ['naufrago', 'sinuhe'], uncertain: false,
    pos: { map: [44, 50] },
    descPt: 'O eixo vital do Egito, chamado Iteru, "o rio". Suas cheias anuais traziam a lama fértil; era a via de transporte do país e a imagem terrena da barca solar que cruza o céu.',
    descEn: 'The lifeline of Egypt, called Iteru, "the river". Its annual flood brought fertile silt; it was the country\'s transport route and the earthly image of the solar bark crossing the sky.'
  },
  {
    id: 'mar-vermelho',
    namePt: 'Mar Vermelho', nameEn: 'Red Sea',
    kind: 'sea', stories: ['naufrago'], uncertain: false,
    pos: { map: [77, 56] },
    descPt: 'Mar a leste do Egito, ligado por rotas de deserto a portos como Mersa Gauasis. Por ele partiam as expedições rumo a Punt, em busca de incenso, mirra e ouro.',
    descEn: 'Sea east of Egypt, linked by desert routes to ports such as Mersa Gawasis. From here expeditions set out toward Punt in search of incense, myrrh, and gold.'
  },
  {
    id: 'wawat',
    namePt: 'Wawat', nameEn: 'Wawat',
    kind: 'region', stories: ['naufrago'], uncertain: false,
    pos: { map: [50, 90] },
    descPt: 'Nome egípcio da Baixa Núbia, entre a primeira e a segunda cataratas do Nilo. Expedições reais buscavam ali ouro, cobre e pedras semipreciosas. No Conto do Náufrago, é por Wawat que a tripulação volta para casa.',
    descEn: 'Egyptian name for Lower Nubia, between the first and second Nile cataracts. Royal expeditions sought gold, copper, and semi-precious stones there. In the Shipwrecked Sailor, it is past Wawat that the crew returns home.'
  },
  // ----- Fora da carta, ao norte (Levante) -----
  {
    id: 'byblos',
    namePt: 'Biblos', nameEn: 'Byblos',
    kind: 'city', stories: ['sinuhe'], uncertain: false,
    pos: { edge: 'n', at: 70 },
    descPt: 'Antiga cidade portuária na costa do atual Líbano (egípcio Kebny), parceira comercial do Egito por séculos, sobretudo na exportação de madeira de cedro. Sinué passa por ela em seu exílio.',
    descEn: 'Ancient port city on the coast of present-day Lebanon (Egyptian Kebny), a trading partner of Egypt for centuries, above all in cedar wood. Sinuhe passes through it in his exile.'
  },
  {
    id: 'iaa',
    namePt: 'Iaa (Araru)', nameEn: 'Yaa (Araru)',
    kind: 'region', stories: ['sinuhe'], uncertain: true,
    pos: { edge: 'n', at: 80 },
    descPt: 'Terra fértil que Amunenshi concede a Sinué, descrita como "sem igual": figos, uvas, mais vinho que água, mel, azeite e gado sem fim. Não foi identificada com precisão; estudiosos a situam em Canaã ou no atual Líbano.',
    descEn: 'Fertile land Amunenshi grants to Sinuhe, described as "without equal": figs, grapes, more wine than water, honey, oil, and cattle without end. It has not been precisely identified; scholars place it in Canaan or present-day Lebanon.'
  },
  {
    id: 'retjenu',
    namePt: 'Retjenu', nameEn: 'Retjenu',
    kind: 'region', stories: ['sinuhe'], uncertain: false,
    pos: { edge: 'n', at: 89 },
    descPt: 'Nome egípcio da Síria-Palestina (Canaã: atuais Israel, Palestina, Líbano e sul da Síria), dividida em Retjenu Superior e Inferior. Sinué passa a maior parte do exílio no Alto Retjenu, sob proteção de Amunenshi.',
    descEn: 'Egyptian name for Syria-Palestine (Canaan: present-day Israel, Palestine, Lebanon, and southern Syria), divided into Upper and Lower Retjenu. Sinuhe spends most of his exile in Upper Retjenu, under Amunenshi\'s protection.'
  },
  {
    id: 'qedem',
    namePt: 'Qedem', nameEn: 'Qedem',
    kind: 'region', stories: ['sinuhe'], uncertain: true,
    pos: { edge: 'n', at: 97 },
    descPt: 'Região a leste, cujo nome significa literalmente "o oriente". Sinué fica por lá um ano e meio antes de Amunenshi mandá-lo buscar. Sua localização exata não é segura.',
    descEn: 'A region to the east, whose name means literally "the orient". Sinuhe stays there a year and a half before Amunenshi sends for him. Its exact location is uncertain.'
  },
  // ----- Fora da carta, ao sul -----
  {
    id: 'nubia',
    namePt: 'Núbia', nameEn: 'Nubia',
    kind: 'region', stories: ['naufrago', 'sinuhe'], uncertain: false,
    pos: { edge: 's', at: 44 },
    descPt: 'Região ao sul do Egito, ao longo do Nilo no atual sul do Egito e Sudão. Fronteira de ouro, comércio e guerra; controlá-la foi central para a política dos faraós do Reino Médio.',
    descEn: 'Region south of Egypt, along the Nile in present-day southern Egypt and Sudan. A frontier of gold, trade, and war; controlling it was central to Middle Kingdom royal policy.'
  },
  {
    id: 'punt',
    namePt: 'Punt', nameEn: 'Punt',
    kind: 'kingdom', stories: ['naufrago'], uncertain: true,
    pos: { edge: 's', at: 62 },
    descPt: 'Reino lendário ao sul, fonte de incenso, mirra, ouro, marfim e ébano. Os egípcios o chamavam Ta-Netjer, "Terra do Deus". A localização exata ainda é debatida, provavelmente no Corno da África (Somália, Eritreia) ou no Iêmen.',
    descEn: 'Legendary kingdom to the south, source of incense, myrrh, gold, ivory, and ebony. The Egyptians called it Ta-Netjer, "Land of the God". Its exact location is still debated, likely in the Horn of Africa (Somalia, Eritrea) or Yemen.'
  }
];

// -------------------------------------------------------------
// Cores por história (drop-in para histórias novas)
// -------------------------------------------------------------
// Cada história tem duas tonalidades: `pin` (escura, legível sobre a
// carta de pergaminho e nas setas) e `lite` (clara, legível na legenda
// e nos selos quando o painel está no tema escuro). No tema claro o
// painel usa a `pin`. Histórias sem cor explícita recebem uma da paleta,
// na ordem do catálogo: basta adicionar os lugares, sem tocar em CSS.
const GEO_STORY_STYLE = {
  naufrago: { pin: '#2f6b75', lite: '#6fb0bb' },
  sinuhe:   { pin: '#97650f', lite: '#e8c866' }
};
const GEO_STORY_PALETTE = [
  { pin: '#6d4a86', lite: '#b79bd4' },  // violeta
  { pin: '#8a3f2c', lite: '#d6896f' },  // terracota
  { pin: '#3d6b3a', lite: '#86c083' },  // verde
  { pin: '#2c5a8a', lite: '#7fa8d6' }   // azul
];
let _geoPaletteNext = 0;

// Cor de uma história (memoizada). Conhecidas usam GEO_STORY_STYLE;
// novas recebem a próxima cor da paleta, na ordem em que aparecem.
function geoStoryStyle(id) {
  if (!GEO_STORY_STYLE[id]) {
    GEO_STORY_STYLE[id] = GEO_STORY_PALETTE[_geoPaletteNext % GEO_STORY_PALETTE.length];
    _geoPaletteNext++;
  }
  return GEO_STORY_STYLE[id];
}

// Histórias que têm pelo menos um lugar no mapa, na ordem do catálogo.
function geoStoriesInMap() {
  const ids = [...new Set(MUSAEUM_GEO.flatMap(p => p.stories))];
  if (typeof MUSAEUM_CATALOG !== 'undefined') {
    return MUSAEUM_CATALOG.map(s => s.storyId).filter(id => ids.includes(id));
  }
  return ids;
}

// Gradiente de pinos para lugares de duas ou mais histórias.
function geoGradient(stories, key) {
  const cols = stories.map(id => geoStoryStyle(id)[key]);
  const step = 100 / cols.length;
  const stops = cols.map((c, i) => `${c} ${i * step}% ${(i + 1) * step}%`).join(', ');
  return `linear-gradient(90deg, ${stops})`;
}

// Injeta (uma vez) as regras de cor por história, derivadas do catálogo.
// Cada história ganha: cor do pino, da seta, do quadradinho da legenda e
// do selo, com variantes para tema claro e escuro.
function injectGeoStoryStyles() {
  if (document.getElementById('geoStoryStyles')) return;
  const css = geoStoriesInMap().map(id => {
    const c = geoStoryStyle(id);
    return `
.geo-pin--${id} { background: ${c.pin}; }
.geo-arrow--${id} { color: ${c.pin}; }
.geo-swatch--${id} { background: ${c.lite}; }
.geo-badge--${id} { color: ${c.lite}; border-color: ${c.lite}; }
:root[data-theme="light"] .geo-swatch--${id} { background: ${c.pin}; }
:root[data-theme="light"] .geo-badge--${id} { color: ${c.pin}; border-color: ${c.pin}; }`;
  }).join('\n');
  // Quadradinho "em mais de uma história": gradiente das duas primeiras.
  const set = geoStoriesInMap();
  let multiCss = '';
  if (set.length >= 2) {
    const a = geoStoryStyle(set[0]), b = geoStoryStyle(set[1]);
    multiCss = `
.geo-swatch--multi { background: linear-gradient(90deg, ${a.lite} 0 50%, ${b.lite} 50% 100%); }
:root[data-theme="light"] .geo-swatch--multi { background: linear-gradient(90deg, ${a.pin} 0 50%, ${b.pin} 50% 100%); }`;
  }
  const el = document.createElement('style');
  el.id = 'geoStoryStyles';
  el.textContent = css + '\n' + multiCss;
  document.head.appendChild(el);
}

// Monta a legenda a partir do catálogo: uma cor por história presente no
// mapa, mais (se houver) "em mais de uma história" e "localização debatida".
function renderGeoLegend(lang, labels) {
  const ul = document.getElementById('geoLegend');
  if (!ul) return;
  const isPt = lang === 'pt';
  const items = geoStoriesInMap().map(id => {
    const s = (typeof catalogGet === 'function') ? catalogGet(id) : null;
    const title = s ? (isPt ? s.titlePt : s.titleEn) : id;
    return `<li><span class="geo-swatch geo-swatch--${id}"></span>${title}</li>`;
  });
  if (MUSAEUM_GEO.some(p => p.stories.length > 1)) {
    items.push(`<li><span class="geo-swatch geo-swatch--multi"></span>${labels.multi}</li>`);
  }
  items.push(`<li><span class="geo-swatch geo--uncertain"></span>${labels.uncertain}</li>`);
  ul.innerHTML = items.join('');
}

// Estado do mapa entre re-renders (troca de idioma, seleção atual).
let _geoSelectedId = null;

// Desenha os marcadores sobre a carta e prepara a interação.
// Chamada por render() do index.html sempre que o idioma muda.
function renderGeoMap(lang) {
  const layer = document.getElementById('geoMarkers');
  if (!layer) return;
  const isPt = lang === 'pt';

  layer.innerHTML = MUSAEUM_GEO.map(place => {
    const name = isPt ? place.namePt : place.nameEn;
    const multi = place.stories.length > 1;
    const unc = place.uncertain ? ' geo-marker--uncertain' : '';
    const sel = place.id === _geoSelectedId ? ' geo-marker--selected' : '';
    const q = place.uncertain ? ' <span class="geo-q">?</span>' : '';
    const tag = `<span class="geo-tag">${name}${q}</span>`;

    if (place.pos.map) {
      const [lx, ty] = place.pos.map;
      const pinCls = multi ? 'geo-pin' : `geo-pin geo-pin--${place.stories[0]}`;
      const pinStyle = multi ? ` style="background:${geoGradient(place.stories, 'pin')}"` : '';
      return `<button type="button" class="geo-marker geo-marker--dot${unc}${sel}"
                style="left:${lx}%; top:${ty}%" data-geo="${place.id}" aria-label="${name}">
          <span class="${pinCls}"${pinStyle} aria-hidden="true"></span>${tag}
        </button>`;
    }
    // Marcador de borda (fora da carta) com seta apontando a direção.
    const edge = place.pos.edge; // 'n' | 's'
    const arrow = edge === 's' ? '▾' : '▴';
    const style = edge === 's' ? `left:${place.pos.at}%; bottom:0` : `left:${place.pos.at}%; top:0`;
    const arrowCls = multi ? 'geo-arrow' : `geo-arrow geo-arrow--${place.stories[0]}`;
    const arrowStyle = multi
      ? ` style="background:${geoGradient(place.stories, 'pin')};-webkit-background-clip:text;background-clip:text;color:transparent"`
      : '';
    return `<button type="button" class="geo-marker geo-marker--edge geo-edge--${edge}${unc}${sel}"
              style="${style}" data-geo="${place.id}" aria-label="${name}">
        <span class="${arrowCls}"${arrowStyle} aria-hidden="true">${arrow}</span>${tag}
      </button>`;
  }).join('');

  layer.querySelectorAll('.geo-marker').forEach(el => {
    const id = el.getAttribute('data-geo');
    el.addEventListener('click', () => selectGeoPlace(id, lang));
  });

  renderGeoPanel(lang);
}

// Atualiza o painel de detalhe com o lugar selecionado.
function renderGeoPanel(lang) {
  const panel = document.getElementById('geoPanel');
  if (!panel) return;
  const isPt = lang === 'pt';
  const place = MUSAEUM_GEO.find(p => p.id === _geoSelectedId);

  if (!place) {
    panel.innerHTML = `<p class="geo-panel-hint">${isPt
      ? 'Toque em um lugar do mapa para ler sobre ele. As setas na borda apontam lugares fora da carta: Punt ao sul, o Levante ao norte.'
      : 'Tap a place on the map to read about it. The arrows at the edge point to places beyond the chart: Punt to the south, the Levant to the north.'}</p>`;
    return;
  }

  const name = isPt ? place.namePt : place.nameEn;
  const desc = isPt ? place.descPt : place.descEn;
  const kind = GEO_KINDS[place.kind][isPt ? 'pt' : 'en'];
  const badges = place.stories.map(sid => {
    const s = (typeof catalogGet === 'function') ? catalogGet(sid) : null;
    const title = s ? (isPt ? s.titlePt : s.titleEn) : sid;
    return `<span class="geo-badge geo-badge--${sid}">${title}</span>`;
  }).join('');
  const uncNote = place.uncertain
    ? `<p class="geo-panel-uncertain">${isPt
        ? 'Localização debatida: o cartão diz o que as fontes permitem afirmar.'
        : 'Debated location: the card states only what the sources allow.'}</p>`
    : '';

  panel.innerHTML = `
    <div class="geo-panel-head">
      <span class="geo-panel-kind">${kind}</span>
      <h3 class="geo-panel-name">${name}</h3>
    </div>
    <div class="geo-panel-badges">${badges}</div>
    <p class="geo-panel-desc">${desc}</p>
    ${uncNote}`;
}

// Seleciona um lugar: marca no mapa e abre o painel.
function selectGeoPlace(id, lang) {
  _geoSelectedId = (_geoSelectedId === id) ? null : id;
  renderGeoMap(lang);
  if (_geoSelectedId) {
    const panel = document.getElementById('geoPanel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
