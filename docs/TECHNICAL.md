# Documentação Técnica — Musæum

## Arquitetura geral

Aplicação web estática sem etapa de build. O HTML de cada história é um esqueleto mínimo que carrega os scripts compartilhados; o conteúdo (textos, desafios, glossário) vive em `data/`, e a lógica no motor compartilhado `engine.js`.

```
index.html              Página inicial: biblioteca, mapa, coleção, certificado, modal "sobre"
naufrago.html           Experiência interativa do Conto do Náufrago
sinuhe.html             Experiência interativa da História de Sinué
campones.html           Experiência interativa do Camponês Eloquente (pronta, ainda não publicada)
script.js               Utilitários compartilhados + shell HTML das histórias
engine.js               Motor das histórias: telas, render, desafios, save
tour.js                 Tour guiado (coach marks), usado na home e nas histórias
research.js             Coleta anônima e consentida da pesquisa; hoje mede só o curso (carregado apenas nas páginas de curso/)
style.css               Estilos globais das histórias (tema, tipografia); não usado pelo index
home/                   CSS e JS exclusivos da página inicial. index.css: todo
                        o estilo do index (um arquivo só). JS separado por seção
                        (i18n, biblioteca, modais, onboarding, abas, mapa,
                        certificado, aprender, main). main.js carrega por último.
                        3 abas: Biblioteca, Mapa e Hieróglifos (não há mais aba
                        Coleção nem Certificado; ver abaixo).
data/catalogo.js        Catálogo central: cards, tesouros, códex e disponibilidade
data/naufrago.js        Textos, desafios e glossário do Náufrago
data/sinuhe.js          Textos, desafios e glossário do Sinué
data/campones.js        Textos, desafios e glossário do Camponês Eloquente
data/cultura-material.js  Fichas dos manuscritos reais (foto + catálogo) e achados das notas
data/geografia.js       Lugares citados nos textos, para o mapa interativo do index
curso/                  Introdução aos hieróglifos (standalone, não usa engine.js)
  licoes.js             Fonte única das 6 lições (window.CURSO_LICOES)
  curso.js              Motor único: serve o índice e cada lição (lê ?licao=<id>)
  curso.css             Folha única do módulo (tokens de cor nos dois temas)
  index.html            Shell do índice das lições
  licao.html            Shell de uma lição
  baralho.html / baralho.js  Baralho de sinais (soletrar o fonema de cada sinal)
gardiner/               Lista de Gardiner e construtor de palavras (standalone)
  gardiner.html         ~900 sinais, selos de função, construtor livre de palavras
  gardiner_data.js / _en.js  Dados dos sinais (PT/EN), gerados da planilha-fonte
  build_data.py / merge_pt.py  Pipeline de geração dos dados
  source/               Planilha-fonte (gardiner-sign-list.xlsx) e TSVs de tradução
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

Objeto `i18n` com chaves `pt` e `en`, em `home/i18n.js`. A função `setLang(lang)` (em `home/main.js`) atualiza `currentLang`, persiste em localStorage e chama `render()`. Elementos com `data-t="chave"` são atualizados via `querySelectorAll`. O JS da home não é mais inline: vive em `home/*.js`, carregado em ordem com `home/main.js` por último (contém o `init`). O CSS também não é mais inline: o `index.html` só carrega `home/index.css` (arquivo único com todo o estilo da página, variáveis de cor definidas nos dois temas).

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
| `musaeum-hieroglyphs` | JSON | `{ done: { <id>: true } }` — lições concluídas do curso |
| `musaeum-research-consent` | string | `"sim"` ou `"não"` — consentimento da pesquisa; `null` enquanto não decidido (dispara o onboarding) |
| `musaeum-muted` | string | `"1"` ou `"0"` — preferência de som mutado |
| `musaeum-tour-<storyId>` | string | `"seen"` — marca que o tour daquela história já auto-disparou |

### Estrutura do save de uma história

```js
{
  screen: 'splash' | 'intro' | 'chapter' | 'challenge' | 'final',
  chapter: 0–7,
  score: number,
  collected: [true|false, ...],        // tesouros (vazio nas histórias com award, ex.: Camponês)
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
- **Tesouros (8):** Coroa 👑, Falcão 🦅, Camelo 🐪, Mel 🍯, Arco 🏹, Escaravelho 🪲, Rolo Real 📜, Pena de Maat 🪶
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

### O Camponês Eloquente (`campones.html`) — escrita, ainda não publicada

Já existe como arquivo completo (`campones.html` + `data/campones.js`); falta só `available: true` no catálogo para publicar.

- **STORY_ID:** `campones`
- **Prêmio:** não tem tesouros (`items: null`). Em vez disso, premia com um único pergaminho ao concluir: o título **«Justo de Voz»** (mꜣꜥ-ḫrw), via o campo `award` no catálogo (ver abaixo).
- **Hieróglifos do Códex (9):** asno, espiga de cevada, pena de Maât, íbis de Tot, tilápia, remo, medida de grãos, chacal de Anúbis, rolo de papiro (capítulos 0 a 8)
- **Capítulos:** **9** (as nove apelações de Khun-Anup)

> O número de capítulos é derivado de `CHAPTERS.length`, não fixo: Náufrago e Sinué têm 8; o Camponês tem 9. O fluxo de telas e a barra de progresso se ajustam sozinhos.

### Prêmio por conclusão (`award`) — alternativa aos tesouros

Uma história pode não ter tesouros colecionáveis. Nesse caso, a entrada do catálogo traz `items: null` e um objeto `award`:

```js
award: {
  icon: '📜',
  titlePt: 'Justo de Voz',  titleEn: 'True of Voice',
  descPt: '...',            descEn: '...'
}
```

- **Tela final** (`engine.js`): se a história tem `award` e não tem tesouros, o bloco do prêmio substitui o rank/glifo final (não repete).
- **Card na Biblioteca** (`home/biblioteca.js`, `renderCardTreasures`): histórias com `items` mostram a grade de tesouros no card; histórias com `award` mostram o pergaminho (`.card-treasure.award`), travado até `screen === 'final'`.

---

## Abas da home e tesouros nos cards (index.html)

A página inicial tem **três abas** (`home/abas.js`, tablist WAI-ARIA): **Biblioteca** (`#panel-inicio`), **Mapa** (`#panel-mapa`) e **Hieróglifos** (`#panel-aprender`). Não há mais aba **Coleção** nem aba **Certificado** separadas: o progresso vive nos próprios cards e o certificado passou para a aba Hieróglifos.

**Tesouros nos cards** (`home/biblioteca.js`, `renderCardTreasures`): cada card de história disponível mostra seus tesouros inline (grade `.card-treasure` earned/locked por item), lidos do catálogo cruzado com o save (`storeGet`/`musaeum-stories`). Histórias com `award` (ex.: Camponês) mostram o pergaminho único, travado até `screen === 'final'`. Ao fim da grade, um convite (`.codex-invite`) leva à aba Hieróglifos. Os glifos descobertos aparecem no momento da leitura (toast dentro da história); não há mais códex cruzado na home.

### MUSAEUM_CATALOG (data/catalogo.js)

Fonte única de verdade das histórias. Cada entrada tem `storyId`, `href`,
`available`, `cardGlyph`, títulos e descrições bilíngues, `items` (tesouros)
e `codex` (os 9 hieróglifos). A Coleção mostra uma história quando ela está
publicada ou quando existe progresso salvo dela no aparelho.

```js
const MUSAEUM_CATALOG = [
  { storyId: 'naufrago', href: 'naufrago.html', available: true,  items: [...], codex: [...] },
  { storyId: 'sinuhe',   href: 'sinuhe.html',   available: true,  items: [...], ... },
  { storyId: 'campones', href: 'campones.html', available: false, items: null, award: {...}, ... }, // pronta, não publicada
];
```

Glifos desbloqueados são clicáveis — abrem a ficha do hieróglifo num modal
(`openGlyphCard(storyId, idx)`).

### Primeiro acesso (onboarding) e nome do jogador

Na primeira visita — detectada por `musaeum-research-consent === null` — o `index.html` abre uma sequência de três pop-ups, uma de cada vez:

1. **Seletor de idioma** (`#langModal`, ~500 ms após o carregamento) — bandeiras 🇧🇷 / 🇺🇸. A escolha (`chooseLang`) grava `musaeum-lang` e define o idioma de toda a experiência. É a única pop-up bilíngue; as seguintes já aparecem no idioma escolhido.
2. **Boas-vindas** (`#nameModal`) — campo de nome (opcional) mais um checkbox de consentimento da pesquisa, **desmarcado por padrão** (opt-in ativo). Ao entrar, grava `musaeum-player` (se houver nome) e `musaeum-research-consent` (`sim`/`não`).
3. **Oferta de tour** (`#tourOfferModal`) — pergunta se a pessoa quer o tour guiado da home. "Sim" chama `startHomeTour()`.

O consentimento coletado aqui (`musaeum-research-consent`) vale para a pesquisa, que **desde a v1.2 mede só o curso de hieróglifos**: `research.js` não é mais carregado na home nem nas histórias, só nas páginas de `curso/`, onde lê essa chave. Se a pessoa chegar ao curso sem ter decidido (`consent === null`), o próprio `research.js` mostra um modal de consentimento como fallback (ver §Introdução aos hieróglifos). O nome é editável a qualquer momento na seção Coleção (reabre o `#nameModal`).

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

**Tour da home** (`home/onboarding.js`, `startHomeTour`): 4 passos — `#tab-inicio` (Biblioteca), `#tab-mapa` (Mapa), `#tab-aprender` (Hieróglifos), `#btnAbout` (Sobre). Textos no objeto `i18n` (`tourSteps`).

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

> A saudação **«Em hotep!»** da tela de abertura (`splash-welcome` no `I18N`) é um link de glossário para o termo `em-hotep`, presente nas três histórias. Toda história nova deve trazer a entrada `em-hotep` (e a `aec`) no seu `GLOSSARY`.

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

### Achados nas notas arqueológicas

Também em `data/cultura-material.js`, o registro `ACHADOS` (indexado por `storyId`) guarda objetos reais citados em notas arqueológicas. Quando uma nota menciona um objeto com foto de licença verificada e referência de acervo, o trecho recebe um `<span class="achado-ref" data-achado="id">`; o clique chama `toggleAchado()` (em `engine.js`) e revela um cartão pequeno com foto, nome, referência e crédito.

```js
ACHADOS[storyId] = {
  'id-do-achado': {
    image,            // caminho local da foto (assets/images/)
    altPt, altEn,     // texto alternativo
    namePt, nameEn,   // nome curto
    refPt, refEn,     // uma linha: o que é · onde está (nº de inventário)
    creditPt, creditEn, // crédito e licença da foto
    url               // (opcional) ficha do objeto no acervo
  }
}
```

De propósito **não há contador, coleção nem persistência**: tesouros e códex já são inventário suficiente; o achado é só o momento da descoberta. Nem toda nota tem achado, também de propósito. Só entra objeto com imagem de licença verificada (CC0 / domínio público / CC BY-SA com crédito) e referência fiel ao acervo.

---

## Mapa interativo (index.html)

Aba **Mapa** da home: os lugares citados nos textos plotados sobre a carta antiga «Égypte Ancienne» (Malte-Brun, 1837, domínio público). Os dados vivem em `data/geografia.js`.

`MUSAEUM_GEO` é um array; cada lugar tem:

| Campo | Descrição |
|---|---|
| `id` | identificador |
| `namePt` / `nameEn` | nome bilíngue (forma egípcia + moderna quando útil) |
| `kind` | tipo de lugar (chave em `GEO_KINDS`, rótulo bilíngue) |
| `stories` | array de `storyId` em que o lugar aparece |
| `uncertain` | `true` quando a localização é debatida ou não atestada |
| `pos` | `{ map: [left%, top%] }` (ponto sobre a carta) **ou** `{ edge: 'n'\|'s', at: % }` (lugar fora da carta, vira seta de borda) |
| `descPt` / `descEn` | descrição factual, fiel às fontes |

Lugares fora da carta (Punt ao sul, o Levante ao norte) viram marcadores de **borda** com seta apontando a direção. As cores por história derivam do catálogo (`geoStoryStyle` / `injectGeoStoryStyles`), então **história nova é drop-in**: basta adicionar lugares com o novo `storyId` em `stories`. Renderização: `renderGeoMap()` (marcadores), `renderGeoPanel()` (cartão do lugar selecionado), `renderGeoLegend()` (legenda por história).

**Rigor:** localizações debatidas (Punt, Iaa, Qedem) e lugares conhecidos só pelos textos (Muros do Soberano) levam `uncertain: true`, e a ressalva aparece no próprio cartão. As posições sobre a carta são aproximadas. Só usar carta de fundo com licença verificada e crédito.

---

## Tutorial de Hieróglifos

3 passos, acessíveis via "Como ler hieróglifos" no Códex:

1. Os três tipos de signos (logogramas, fonogramas, determinativos)
2. A direção da leitura (como identificar o sentido do texto)
3. O cartucho real (e a decifração de Champollion em 1822)

---

## Certificado de Leitura (index.html, `home/certificado.js`)

Desde a v1.2, o certificado premia a conclusão do **curso de hieróglifos**, não das histórias, e mora na seção "Sua Conquista" da aba **Hieróglifos** (não é mais uma aba própria).

Desbloqueia quando **todas as lições `ready`** do curso estão concluídas no save do curso:

```js
// Fonte das lições: window.CURSO_LICOES (curso/licoes.js). Só as prontas contam.
const lessons = (window.CURSO_LICOES || []).filter(l => l.ready);
const done = JSON.parse(localStorage.getItem('musaeum-hieroglyphs') || '{}').done || {};
const unlocked = lessons.length && lessons.every(l => done[l.id]);
```

Título: **"CERTIFICADO DE LEITURA"** (assunto: "a Introdução aos Hieróglifos do Musæum"). Gerado em `<canvas>` 800 × 560 px com suporte a devicePixelRatio, traz o nome do leitor, a data e as **logos institucionais** (PPGArq + Museu Nacional), sem tesouros. Exportável como PNG via `downloadCertificate()`.

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

> O Camponês Eloquente já passou por esses passos: `campones.html` e
> `data/campones.js` existem e estão completos (9 capítulos, prêmio `award`
> em vez de tesouros). Falta só `available: true` para publicá-lo.

Para **criar uma história nova** do zero:

1. Completar a entrada dela em `data/catalogo.js` com `href`, `codex`
   (9 glifos) e **ou** `items` (tesouros colecionáveis) **ou** `items: null`
   + `award` (pergaminho de conclusão, como no Camponês)
2. Criar `data/<historia>.js` com `I18N`, `CHAPTERS` (8 ou mais capítulos),
   `GLOSSARY` (incluindo as entradas `em-hotep` e `aec`) e as linhas
   `const ITEMS = catalogGet('<id>').items;` e
   `const GLYPHS_CODEX = catalogGet('<id>').codex;`
3. Criar `<historia>.html` seguindo a estrutura de `sinuhe.html` (mesma ordem
   de scripts, trocando só o data file da história)
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

## Introdução aos hieróglifos (`curso/`)

Módulo standalone, **não** carrega `script.js`, `engine.js` nem o catálogo. Exibido como **"Primeiros passos nos hieróglifos"** (subtítulo "Uma introdução"); a pasta mantém o nome interno `curso/`. Acessível pela aba **Hieróglifos** da home (`#panel-aprender`, `home/aprender.js`).

### Fonte única e motor

- **`curso/licoes.js`** — `window.CURSO_LICOES`, fonte única das lições. Cada lição é um objeto com metadado (`id`, `num`, `glyph`, `kicker`, `title`, `desc`, `dur`, `type`, `badge`, `ready`) e um array `sections` de blocos + um `quiz`. Renomear ou reordenar aqui reflete no índice, nas lições e no hub da home sozinho (acaba com a duplicação tripla do curso antigo).
- **`curso/curso.js`** — motor único. Serve o índice (`data-page="index"`) e cada lição (`data-page="lesson"`, lê `?licao=<id>`). Troca de idioma e tema **ao vivo** pelos botões do header.
- **`curso/curso.css`** — folha única, tokens de cor da casa nos dois temas, foco visível, `prefers-reduced-motion`, responsivo.
- **`curso/index.html`** e **`curso/licao.html`** — shells mínimos (fontes + css + `licoes.js` + `curso.js`).

### Tipos de bloco de conteúdo (renderizados por `curso.js`)

| Bloco | Uso |
|---|---|
| `p` / `callout` | Parágrafo e caixa de destaque |
| `signtypes` | Cartões dos tipos de sinal (fonético, logograma, determinativo) |
| `word` | Decomposição de uma palavra sinal a sinal (com flag `cartouche` para o oval) |
| `direction` | Ilustração da direção de leitura |
| `siggrid` | Grade de sinais que puxa **glifo, nome e explicação do Gardiner** do `GARDINER_DATA`/`_EN` por id (fonte única; a `licao.html` carrega os dois `gardiner_data*.js`). Clique marca "visto" e revela a explicação |
| `builder` | Construtor guiado de palavras (paleta de sinais do `GARDINER_DATA`; cada desafio dá significado + transliteração e dá feedback na hora; flag `cartouche` faz o strip virar oval) |

Transliteração usa override só onde o dado do Gardiner falha (ex.: `tr: { M17:'ỉ', Z4:'y', V31:'k' }`).

### As 6 lições

| # | id | Título | Foco |
|---|---|---|---|
| 1 | `sistema` | Como funciona a escrita egípcia | Os 3 tipos de sinal, direção de leitura, a palavra nfr |
| 2 | `unileteros` | Os 24 unilíteros | O "alfabeto" consonantal (grid do Gardiner) |
| 3 | `bi-tri` | Bilíteros e trilíteros | Sinais de 2 e 3 consoantes; complementos fonéticos |
| 4 | `palavras` | Escrevendo em egípcio antigo | Construtor guiado (pr, mn, nfr, ꜥnḫ) |
| 5 | `cartuchos` | Cartuchos e os nomes do rei | O shen, os 5 nomes reais, construtor em modo cartucho (ỉmn, rꜥ-ms-s) |
| 6 | `texto` | Ler um texto mágico | Capstone: a fórmula de oferenda ḥtp-dỉ-nsw, palavra a palavra + Osíris |

### Progresso

`localStorage 'musaeum-hieroglyphs'` como `{ done: { <id>: true } }`. Contagem e % derivam de `CURSO_LICOES.length` (sem número mágico). O hub da home (`home/aprender.js`) lê o mesmo save e renderiza os cards a partir de `CURSO_LICOES` (não duplica dados).

### Coleta da pesquisa (só aqui)

Desde a v1.2, a pesquisa acadêmica (`research.js`) mede **o curso**, não as histórias. `research.js` é carregado apenas em `curso/index.html` e `curso/licao.html`, e `curso/curso.js` o aciona:

- `Research.init()` — na primeira visita ao curso (nenhuma lição concluída), mostra o modal de consentimento se `musaeum-research-consent === null`.
- `Research.watchLesson({ lessonId, lessonNum, totalLessons, getState })` — arma o rastreio de abandono (`pagehide`) ao abrir a lição.
- `Research.trackAttempt('quiz' | 'builder')` — conta cada resposta errada no quiz ou palavra errada no construtor.
- `Research.trackLessonComplete({ ... })` — envia ao concluir a lição (quiz final ou último desafio do construtor).

O envio só ocorre com consentimento (`'sim'`). Backend: Google Apps Script Web App → Google Sheets. Detalhes de campos e configuração em [RESEARCH_SETUP.md](RESEARCH_SETUP.md). **Não** reintroduzir hooks de pesquisa em `engine.js`/`script.js`/histórias.

### Ferramentas de prática

- **Baralho de sinais** (`curso/baralho.html` + `baralho.js`): soletrar o fonema de cada sinal.
- **Lista de Gardiner** (`gardiner/gardiner.html`): ~900 sinais com selos de função e o construtor livre de palavras.

Referências do conteúdo: Allen *Middle Egyptian* (sequência didática); Gardiner *Egyptian Grammar* (1957) e Faulkner *Concise Dictionary* (1962) para tipologia, lista de sinais e transliterações. Caracteres egiptológicos seguem o padrão do projeto: ꜣ (U+A723), ꜥ (U+A725), ỉ (U+1EC9 precomposto, nunca marcas combinantes).

---

## Como citar

O projeto tem DOI no Zenodo (*concept DOI*, aponta sempre para a versão mais recente):

**DOI:** [10.5281/zenodo.20617042](https://doi.org/10.5281/zenodo.20617042)

> CORPAS, Flavia Lima. *Musæum: biblioteca digital interativa de literatura do Egito Antigo*. Zenodo, 2026. DOI: 10.5281/zenodo.20617042. Disponível em: https://doi.org/10.5281/zenodo.20617042.

A ficha de citação legível por máquina está em [`CITATION.cff`](../CITATION.cff) na raiz do repositório. Cada *release* gera um *version DOI* próprio; o *concept DOI* acima permanece fixo.
