# Documentação Técnica — Musæum

## Arquitetura geral

Aplicação web estática sem etapa de build. O HTML de cada história é um esqueleto mínimo que carrega os scripts compartilhados; o conteúdo (textos, desafios, glossário) vive em `data/`, e a lógica no motor compartilhado `engine.js`.

```
index.html              Página inicial: biblioteca, coleção, certificado, modal "sobre"
naufrago.html           Experiência interativa do Conto do Náufrago
sinuhe.html             Experiência interativa da História de Sinué
script.js               Utilitários compartilhados + shell HTML das histórias
engine.js               Motor das histórias: telas, render, desafios, save
tour.js                 Tour guiado (coach marks), usado na home e nas histórias
research.js             Coleta anônima e consentida de dados da pesquisa
style.css               Estilos globais (tema, tipografia)
data/catalogo.js        Catálogo central: cards, tesouros, códex e disponibilidade
data/naufrago.js        Textos, desafios e glossário do Náufrago
data/sinuhe.js          Textos, desafios e glossário do Sinué
data/cultura-material.js  Fichas dos manuscritos reais (foto + catálogo do museu)
tests/                  Testes automatizados (vitest)
package.json            Dependências de teste (vitest)
fontes/                 PDFs e áudio de referência bibliográfica
docs/TECHNICAL.md       Este arquivo
```

### Assets de mídia

| Arquivo | Uso |
|---|---|
| `trilha_naufrago.mp3` | Música de fundo do Náufrago |
| `acerto.wav` | Feedback sonoro de resposta correta |
| `erro.wav` | Feedback sonoro de resposta incorreta |
| `pexels-clioseye-35506459.jpg` | Foto de fundo (fachada do templo de Horus em Edfu) |
| `assets/images/hermitage_1115.jpeg` | Foto do Papiro Hermitage 1115 (cultura material do Náufrago) |
| `assets/images/berlin_3022.jpg` | Foto do Papiro Berlin 3022 (cultura material do Sinué) |
| `assets/images/mapa-egito-malte-brun-1837.jpg` | Carta de fundo do mapa interativo: «Égypte Ancienne», V. A. Malte-Brun, 1837. Domínio público, via Wikimedia Commons |
| `ankh-icon.svg` / `ankh-icon-512.png` | Ícone do app |

---

## script.js — utilitários compartilhados

Todas as páginas carregam `<script src="script.js">` antes dos demais scripts. Expõe:

| Função | Descrição |
|---|---|
| `initStoryApp(config)` | Injeta o shell HTML completo no `<body>` (áudio, HUD, barra de topo, modal overlay) e chama `initTheme()`. `config.inventory` é um array de emojis para os slots. |
| `initTheme()` | Lê `musaeum-theme` do localStorage e aplica `data-theme` no `<html>`. |
| `toggleTheme()` | Alterna entre `"dark"` e `"light"` e persiste. |
| `toggleSound()` | Muta/desmuta `bgMusic` e atualiza o botão 🔊/🔇. |
| `playFeedback(type)` | Reproduz `soundCorrect` ou `soundWrong`. |
| `getPlayerName()` | Retorna o nome do jogador do localStorage (ou `null`). |
| `escapeHtml(str)` | Escapa HTML para exibição segura de strings do usuário. |
| `storeGet(storyId)` | Lê o save de uma história do armazenamento unificado. |
| `storeSave(storyId, data)` | Salva o estado de uma história no armazenamento unificado. |
| `migrateOldSaves()` | Migra saves legados (`musaeum-naufrago`, `musaeum-sinuhe`) para a chave unificada. |

### Shell HTML injetado por `initStoryApp()`

```
<audio id="bgMusic">            música de fundo (loop)
<audio id="soundCorrect">       acerto.wav
<audio id="soundWrong">         erro.wav
.score-hud #scoreHud            placar de pontos
.discovery-toast #discoveryToast  notificação de novo glifo descoberto
.app > .topbar                  barra: ← voltar, brand, lang-toggle, Códex, Glossário, tema, som, ? (tour)
.inventory-hud #inventoryHud    slots de tesouros coletados
.progress #progressBar          barra de progresso de capítulos
#sceneContainer                 área de conteúdo dinâmico
.modal-overlay #modalOverlay    sobreposição para Códex / Glossário / Ficha
```

---

## Sistema de internacionalização (i18n)

### index.html

Objeto `i18n` com chaves `pt` e `en`. A função `setLang(lang)` atualiza `currentLang`, persiste em localStorage e chama `render()`. Elementos com `data-t="chave"` são atualizados via `querySelectorAll`.

### histórias (data/naufrago.js, data/sinuhe.js)

Objeto `I18N` com chaves `pt` e `en`, definido no arquivo de dados de cada história. Função auxiliar `t(k)` (em `engine.js`) retorna `I18N[state.lang][k] || k`. A troca de idioma é imediata, re-renderiza a cena atual e persiste em `musaeum-lang` — vale também ao trocar dentro de uma história.

---

## Sistema de temas

```js
document.documentElement.setAttribute('data-theme', 'light' | 'dark');
localStorage.setItem('musaeum-theme', theme);
```

Tema padrão: **escuro**. Variáveis redefinidas em `:root[data-theme="light"]`.

| Variável | Escuro | Claro |
|---|---|---|
| `--papyrus` | `#f1e4c6` (creme) | `#0d0a06` (quase preto) |
| `--ink` | `#1b2a3d` (azul-noite) | `#fdf8ee` (papel claro) |
| `--gold` | `#c9a646` | `#5c480e` |
| `--terracotta-lt` | `#d97a5c` | `#8a2b18` |

---

## Persistência (localStorage)

> Todas as chaves usam **hífen**, não underscore.

| Chave | Tipo | Conteúdo |
|---|---|---|
| `musaeum-lang` | string | `"pt"` ou `"en"` (escolhido no seletor de idioma da primeira visita) |
| `musaeum-theme` | string | `"dark"` ou `"light"` |
| `musaeum-player` | JSON | `{ name: "..." }` |
| `musaeum-stories` | JSON | `{ naufrago: {...}, sinuhe: {...} }` — save unificado |
| `musaeum-research-consent` | string | `"sim"` ou `"não"` — consentimento da pesquisa; `null` enquanto não decidido (dispara o onboarding) |
| `musaeum-muted` | string | `"1"` ou `"0"` — preferência de som mutado |
| `musaeum-tour-<storyId>` | string | `"seen"` — marca que o tour daquela história já auto-disparou |

### Estrutura do save de uma história

```js
{
  screen: 'splash' | 'intro' | 'chapter' | 'challenge' | 'final',
  chapter: 0–7,
  score: number,
  collected: [true|false, ...],        // 8 tesouros
  answeredChapters: [true|false, ...], // desafios já respondidos (impede repontuar ao recarregar)
  discoveredGlyphs: [0, 1, 3, ...]     // índices dos glifos descobertos
}
```

A migração automática de saves antigos (`musaeum-naufrago`, `musaeum-sinuhe`) é feita por `migrateOldSaves()` no primeiro carregamento pós-atualização.

---

## Histórias disponíveis

### O Conto do Náufrago (`naufrago.html`)

- **STORY_ID:** `naufrago`
- **Tesouros (8):** Uvas 🍇, Vinho 🍷, Incenso 💨, Mirra 🏺, Óleo 🪔, Marfim 🦷, Macaco 🐒, Cão 🐕
- **Hieróglifos do Códex (9):** ankh, olho de Hórus, sol·Rá, águas, coração, serpente, escriba, barco, casa
- **Glossário:** 14 termos (Punt, côvado, Grande Verde, Ka, Maat, Osíris, lápis-lazúli, mirra, incenso, kohl, faraó, Reino Médio, Wawat, Senemut)
- **Capítulos:** 8

### A História de Sinué (`sinuhe.html`)

- **STORY_ID:** `sinuhe`
- **Tesouros (8):** Trigo 🌾, Falcão 🦅, Onda 🌊, Palmeira 🌴, Espadas ⚔️, Pena de Maat 🪶, Lua 🌙, Rolo Real 📜
- **Hieróglifos do Códex (9):**

| # | Glifo | Translit | Capítulo |
|---|---|---|---|
| 0 | 𓆣 | ḫpr | Intro |
| 1 | 𓂋 | r | Cap. 1 |
| 2 | 𓅓 | m | Cap. 2 |
| 3 | 𓈉 | xꜣst | Cap. 3 |
| 4 | 𓆸 | sšn | Cap. 4 |
| 5 | 𓃒 | kꜣ | Cap. 5 |
| 6 | 𓃭 | rw | Cap. 6 |
| 7 | 𓇹 | jꜥḥ | Cap. 7 |
| 8 | 𓇼 | sbꜣ | Cap. 8 |

- **Glossário:** termos específicos da história (Amenemhat I, Sesostris I, Retjenu, Araru, etc.)
- **Capítulos:** 8

---

## Sistema de Coleção (index.html)

Seção accordion na página inicial que exibe progresso cruzado:

1. **Tesouros coletados** por história (itens definidos em `data/catalogo.js`)
2. **Códex de hieróglifos** desbloqueados, por história (lê `musaeum-stories`)

### MUSAEUM_CATALOG (data/catalogo.js)

Fonte única de verdade das histórias. Cada entrada tem `storyId`, `href`,
`available`, `cardGlyph`, títulos e descrições bilíngues, `items` (tesouros)
e `codex` (os 9 hieróglifos). A Coleção mostra uma história quando ela está
publicada ou quando existe progresso salvo dela no aparelho.

```js
const MUSAEUM_CATALOG = [
  { storyId: 'naufrago', href: 'naufrago.html', available: true, items: [...], codex: [...] },
  { storyId: 'sinuhe',   href: 'sinuhe.html',   available: false, ... },
];
```

Glifos desbloqueados são clicáveis — abrem a ficha do hieróglifo num modal
(`openGlyphCard(storyId, idx)`).

### Primeiro acesso (onboarding) e nome do jogador

Na primeira visita — detectada por `musaeum-research-consent === null` — o `index.html` abre uma sequência de três pop-ups, uma de cada vez:

1. **Seletor de idioma** (`#langModal`, ~500 ms após o carregamento) — bandeiras 🇧🇷 / 🇺🇸. A escolha (`chooseLang`) grava `musaeum-lang` e define o idioma de toda a experiência. É a única pop-up bilíngue; as seguintes já aparecem no idioma escolhido.
2. **Boas-vindas** (`#nameModal`) — campo de nome (opcional) mais um checkbox de consentimento da pesquisa, **desmarcado por padrão** (opt-in ativo). Ao entrar, grava `musaeum-player` (se houver nome) e `musaeum-research-consent` (`sim`/`não`).
3. **Oferta de tour** (`#tourOfferModal`) — pergunta se a pessoa quer o tour guiado da home. "Sim" chama `startHomeTour()`.

Na home, `Research.init({ suppressModal: true })` impede que o `research.js` mostre seu próprio modal de consentimento, já que a boas-vindas cuida disso. O nome é editável a qualquer momento na seção Coleção (reabre o `#nameModal`).

---

## Tour guiado (`tour.js`)

Motor de *coach marks* reutilizável por qualquer página. Destaca um elemento real com um spotlight dourado, uma seta piscando apontando para ele e um cartão com texto e botões (pular / voltar / avançar).

```js
Tour.start(steps, { labels: { skip, prev, next, done }, onClose });
// steps: [{ selector, title, body }, ...] — textos já no idioma escolhido
```

- **Cores do cartão são fixas claras**, não usam as variáveis de tema, porque o cartão é sempre escuro (inclusive no tema claro).
- Navegação por teclado (←/→/Esc); reposiciona ao rolar/redimensionar.
- Botão `#btnTour` (`?`) na barra superior reabre o tour a qualquer momento.

**Tour da home** (`index.html`, `startHomeTour`): 4 passos — `#card1` (biblioteca), `#collectionSection`, `#certSection`, `#btnAbout`. Textos no objeto `i18n` (`tourSteps`).

**Tour da história** (`engine.js`, `startStoryTour`): aponta os recursos visíveis na cena — `#btnGlossary`, `#btnCodex`, `#btnSound`, `#inventoryHud`, `#btnNote`, `#btnChallenge`. **Auto-dispara uma única vez** na primeira chegada à tela `story` (gravando `musaeum-tour-<storyId>`); depois fica disponível só pelo `?`. Textos nas chaves `tour-*` do `I18N`.

---

## Códex dos Hieróglifos (em cada história)

Cada história tem seu próprio `GLYPHS_CODEX`. Estrutura de cada entrada:

| Campo | Descrição |
|---|---|
| `glyph` | Caractere Unicode do bloco Egípcio Hieroglífico |
| `translit` | Transliteração acadêmica |
| `namePt` / `nameEn` | Nome do signo |
| `meaningPt` / `meaningEn` | Significado |
| `notePt` / `noteEn` | Nota arqueológica/linguística |
| `typeKey` | Tipo (`type-logogram`, `type-phonogram`, `type-determin`, `type-uni`, `type-bi`, `type-tri`, `type-ideo`) |
| `chapter` | Capítulo onde é descoberto (-1 = introdução) |

### Discovery Toast

Ao desbloquear um glifo, `#discoveryToast` aparece com o signo e a mensagem "Novo signo descoberto!". Clicar abre o Códex. O botão Códex recebe efeito de pulse (`codexHasNew: true`).

---

## Glossário (em cada história)

Termos bilíngues acessíveis por:
- Botão "Glossário" na barra superior
- Palavras sublinhadas no texto (`.gloss`) que chamam `openGlossaryAt(id)`
- Campo de busca por texto

Cada entrada: `{ id, termPt, termEn, tagPt, tagEn, defPt, defEn }`

---

## Cultura material (em cada história)

Ficha do manuscrito real por trás do texto. Vive em `data/cultura-material.js` (arquivo único compartilhado), registro indexado por `storyId`. Carregado no HTML da história **antes** de `engine.js`.

Cada entrada:

```js
CULTURA_MATERIAL[storyId] = {
  image, imageAltPt, imageAltEn,
  titlePt, titleEn, captionPt, captionEn,
  creditPt, creditEn, introPt, introEn,
  museumUrl,
  fields: [ { labelPt, labelEn, valuePt, valueEn }, ... ]
}
```

Renderização (em `engine.js`):
- `renderArtifactStrip()` — foto emoldurada + legenda + botão "De onde vem este texto?" na splash. Se não houver entrada para o `storyId`, retorna vazio.
- `openArtifact()` / `renderArtifactView()` — ficha completa no modal (`state.modalView === 'artifact'`), reaproveitando `#modalOverlay`.
- A `<img>` tem `onerror` que esconde a `<figure>` se o arquivo faltar (evita ícone de imagem quebrada).

Strings de UI no `I18N` de cada história: `artifact-btn`, `artifact-title`, `artifact-museum` (PT e EN).

Os dados de catálogo devem vir da ficha do museu depositário; preservar o crédito do fotógrafo quando houver. Datas em **AEC/BCE**, exceto títulos de obras citadas.

Fichas atuais: Náufrago → Papiro Hermitage 1115 (`assets/images/hermitage_1115.jpeg`); Sinué → Papiro Berlin 3022 (`assets/images/berlin_3022.jpg`).

---

## Tutorial de Hieróglifos

3 passos, acessíveis via "Como ler hieróglifos" no Códex:

1. Os três tipos de signos (logogramas, fonogramas, determinativos)
2. A direção da leitura (como identificar o sentido do texto)
3. O cartucho real (e a decifração de Champollion em 1822)

---

## Certificado (index.html)

Desbloqueia quando todas as histórias em `AVAILABLE_STORIES` têm `screen === 'final'`.

```js
// Derivado de data/catalogo.js: toda história com available: true conta.
const AVAILABLE_STORIES = MUSAEUM_CATALOG.filter(s => s.available).map(s => s.storyId);
```

Gerado em `<canvas>` 800 × 560 px com suporte a devicePixelRatio. Inclui nome do jogador, tesouros coletados, data e assinatura. Exportável como PNG via `downloadCertificate()`.

---

## Fluxo de telas (cada história)

```
splash → intro → chapter[0] → challenge[0] → ... → challenge[7] → final
```

Objeto `state` completo:

```js
{
  lang, screen, chapter, score, answered, attempts,
  collected,          // [bool × 8] — tesouros
  discoveredGlyphs,   // Set de índices de glifos
  modalView,          // 'codex' | 'sheet' | 'tutorial' | 'glossary' | null
  tutorialStep, sheetIndex,
  glossaryHighlight, glossarySearch,
  codexHasNew,
  shuffledOptions     // opções embaralhadas da questão atual
}
```

---

## Pasta `fontes/`

Referências bibliográficas em PDF e áudio para uso interno da pesquisa:

```
Faulkner-ConciseDictionaryMiddleEgyptian.pdf
Gardiner-EgyptianGrammar.pdf
Poe, The_Writing_of_a_Skillful_Scribe_An_intr.pdf
Review_of_J_L_Foster_Thought_Couplets_in.pdf
Semion Krivenko-Adamov - Ancient Egypt.mp3
Shipwrecked.pdf
Sinuhe-glos.pdf
Sinuhe.pdf
```

Esta pasta **não** é servida pelo site e não deve ser comitada no repositório público.

---

## Publicando uma nova história

Para **publicar uma história que já existe** (ex.: Sinué): mudar `available`
para `true` na entrada dela em `data/catalogo.js`. Só isso — card, Coleção,
Certificado e desbloqueio derivam todos do catálogo.

Para **criar uma história nova** (ex.: Camponês Eloquente):

1. Completar a entrada dela em `data/catalogo.js` com `href`, `items`
   (8 tesouros) e `codex` (9 glifos)
2. Criar `data/campones.js` com `I18N`, `CHAPTERS` (8 capítulos), `GLOSSARY`
   e as linhas `const ITEMS = catalogGet('campones').items;` e
   `const GLYPHS_CODEX = catalogGet('campones').codex;`
3. Criar `campones.html` seguindo a estrutura de `sinuhe.html` (mesma ordem
   de scripts, trocando só `data/sinuhe.js` por `data/campones.js`)
4. Quando estiver pronta, `available: true` no catálogo
5. (opcional) **Cultura material:** salvar a foto do papiro em
   `assets/images/`, criar a chave `storyId` em `CULTURA_MATERIAL`
   (`data/cultura-material.js`) com os dados do museu depositário e adicionar
   `artifact-btn`/`artifact-title`/`artifact-museum` ao `I18N`.

---

## Convenções de código

- **JS:** camelCase em português para conteúdo (`nomePapiro`, `progressoAtual`)
- **CSS:** kebab-case descritivo (`.archaeo-note`, `.glyph-card`, `.collection-section`)
- **IDs:** kebab-case (`card-naufrago`, `aboutModal`, `certCanvas`)
- **localStorage:** prefixo `musaeum-` com hífen (`musaeum-stories`, `musaeum-lang`)
- **i18n em index.html:** atributo `data-t="chave"`
- Comentários em português dentro dos arquivos

## Como citar

O projeto tem DOI no Zenodo (*concept DOI*, aponta sempre para a versão mais recente):

**DOI:** [10.5281/zenodo.20617042](https://doi.org/10.5281/zenodo.20617042)

> CORPAS, Flavia Lima. *Musæum: biblioteca digital interativa de literatura do Egito Antigo*. Zenodo, 2026. DOI: 10.5281/zenodo.20617042. Disponível em: https://doi.org/10.5281/zenodo.20617042.

A ficha de citação legível por máquina está em [`CITATION.cff`](../CITATION.cff) na raiz do repositório. Cada *release* gera um *version DOI* próprio; o *concept DOI* acima permanece fixo.
