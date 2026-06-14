# Manual do Desenvolvedor — Musæum

> Para quem está entrando no projeto pela primeira vez.

---

## 1. O que é o Musæum

Musæum é uma biblioteca digital interativa de textos literários do Egito Antigo (Reino Médio, 2055–1650 AEC). É um projeto acadêmico de Flavia Lima Corpas (PPGArq / Museu Nacional / UFRJ).

O site é bilíngue (PT/EN), gamificado, e funciona como aplicação web estática — sem framework, sem build, sem bundler. Você abre o HTML direto no navegador.

---

## 2. Tecnologias e dependências

| Tecnologia | Uso |
|---|---|
| HTML/CSS/JS vanilla | Todo o frontend |
| CSS custom properties | Sistema de temas (dark/light) |
| localStorage | Persistência de progresso, idioma e tema |
| Google Fonts | Cinzel, EB Garamond, Noto Sans Egyptian Hieroglyphs, Noto Serif |

**Não há `npm install` para o frontend.** O `package.json` existe apenas para os testes automatizados (vitest).

---

## 3. Estrutura de arquivos

```
musaeum/
├── index.html              Página inicial: biblioteca, coleção, certificado
├── naufrago.html           Experiência interativa: O Conto do Náufrago
├── sinuhe.html             Experiência interativa: A História de Sinué
├── script.js               Utilitários compartilhados + shell HTML (initStoryApp)
├── engine.js               Motor das histórias: telas, render, desafios, save
├── tour.js                 Motor do tour guiado (coach marks), usado na home e nas histórias
├── research.js             Coleta anônima de dados da pesquisa (consentimento + envio)
├── style.css               Estilos globais (tema, tipografia, componentes)
│
├── data/
│   ├── naufrago.js         Dados do Náufrago: I18N, ITEMS, GLYPHS_CODEX, GLOSSARY, CHAPTERS
│   ├── sinuhe.js           Dados do Sinué (mesma estrutura)
│   ├── cultura-material.js Fichas dos manuscritos reais (CULTURA_MATERIAL) e achados das notas (ACHADOS)
│   └── geografia.js        Lugares citados nos textos (MUSAEUM_GEO), para o mapa interativo do index
│
├── docs/
│   ├── TECHNICAL.md        Documentação técnica de sistemas e estruturas de dados
│   ├── DEVELOPER.md        Este arquivo
│   ├── USER_GUIDE.md       Guia do usuário final
│   └── RESEARCH_SETUP.md   Como configurar o backend da pesquisa
│
├── package.json            Dependências de teste (vitest)
├── .env.example            Modelo do arquivo de variáveis de ambiente
│
├── trilha_naufrago.mp3     Música de fundo
├── acerto.wav              Som de resposta correta
├── erro.wav                Som de resposta incorreta
├── pexels-clioseye-35506459.jpg  Foto de fundo (templo de Horus em Edfu)
├── ankh-icon.svg / ankh-icon-512.png  Ícones do app
```

> `fontes/` contém PDFs e áudio de referência bibliográfica para uso interno da pesquisa — não é servida no site e não deve ir para o repositório público.

---

## 4. Como rodar localmente

O projeto não precisa de servidor para funcionar, mas alguns navegadores bloqueiam `fetch` e áudio de arquivos locais por restrições de CORS.

**Opção 1 — Python (recomendado, sem instalação)**

```bash
cd musaeum
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

**Opção 2 — serve.py (script já incluído)**

```bash
python3 serve.py
```

**Opção 3 — extensão VS Code**
Use a extensão "Live Server" e clique em "Go Live".


---

## 5. Arquitetura do frontend

Cada página de história (`naufrago.html`, `sinuhe.html`) segue sempre esta ordem:

```html
<body>
  <script src="script.js"></script>        <!-- 1. utilitários + shell HTML -->
  <script src="data/naufrago.js"></script> <!-- 2. dados da história (I18N, CHAPTERS...) -->
  <script src="research.js"></script>      <!-- 3. coleta da pesquisa -->
  <script src="engine.js"></script>        <!-- 4. motor: telas, render, desafios, save -->
  <script src="tour.js"></script>          <!-- 5. motor do tour guiado -->
  <script>initStory({ storyId: 'naufrago' });</script>  <!-- 6. dá o play -->
</body>
```

Os scripts são carregados em ordem, então todas as funções e constantes ficam disponíveis globalmente. A lógica da história vive em `engine.js` (não inline): `initStory()` monta o estado, injeta o shell via `initStoryApp()`, carrega o save e renderiza. `tour.js` é opcional do ponto de vista do motor — se estiver presente, `engine.js` o usa para o tour da história.

---

## 6. script.js — utilitários compartilhados

Funções e variáveis globais disponíveis em qualquer página que inclua `script.js`:

| Função / Variável | O que faz |
|---|---|
| `initStoryApp(config)` | Injeta o shell HTML completo no `<body>` (áudio, HUD, barra de topo, modal overlay) e chama `initTheme()`. `config.inventory` é array de emojis |
| `initTheme()` | Lê `musaeum-theme` do localStorage e aplica `data-theme` no `<html>` |
| `toggleTheme()` | Alterna entre `"dark"` e `"light"` e persiste |
| `toggleSound()` | Muta/desmuta `bgMusic` e atualiza o botão 🔊/🔇 |
| `playFeedback(type)` | Reproduz `soundCorrect` (acerto) ou `soundWrong` (erro) |
| `toggleNote()` | Abre/fecha a nota arqueológica do capítulo |
| `getPlayerName()` | Retorna o nome do jogador do localStorage ou `null` |
| `escapeHtml(str)` | Escapa HTML — use sempre ao inserir strings do usuário no DOM |
| `storeGet(storyId)` | Lê o save de uma história do armazenamento unificado |
| `storeSave(storyId, data)` | Salva o estado de uma história no armazenamento unificado |
| `migrateOldSaves()` | Migra saves legados para a chave unificada (chame uma vez na inicialização) |
| `isMuted` | Variável de estado do som (boolean) |

### Shell HTML injetado por `initStoryApp()`

Após a chamada, o `<body>` terá:

```
#bgMusic              música de fundo (loop)
#soundCorrect         acerto.wav
#soundWrong           erro.wav
#scoreHud             placar de pontos (oculto até a história começar)
#discoveryToast       notificação flutuante de glifo descoberto
.topbar               barra superior: voltar, brand, lang-toggle, Códex, Glossário, tema, som, ? (tour)
#inventoryHud         slots de tesouros coletados (oculto até a história começar)
#progressBar          barra de progresso de capítulos
#sceneContainer       área onde o conteúdo dinâmico é renderizado
#modalOverlay         sobreposição para Códex / Glossário / Ficha do glifo
```

---

## 7. Arquivos de dados (`data/*.js`)

Cada história tem seu arquivo de dados com estas constantes:

### `I18N` — textos bilíngues

```js
const I18N = {
  pt: { 'brand': 'Musæum', 'intro-title': 'O Conto do Náufrago', ... },
  en: { 'brand': 'Musæum', 'intro-title': 'The Shipwrecked Sailor', ... }
};
```

Acessado via a função `t(chave)` definida no JS inline de cada história:

```js
function t(k) { return I18N[state.lang][k] || k; }
```

### `ITEMS` — tesouros colecionáveis (8 por história)

```js
const ITEMS = [
  { pt: 'Uvas', en: 'Grapes', icon: '🍇' },
  // ... 7 mais
];
```

### `GLYPHS_CODEX` — hieróglifos desbloqueáveis (9 por história)

```js
const GLYPHS_CODEX = [
  {
    glyph:     '𓋹',          // caractere Unicode do bloco Egípcio Hieroglífico
    translit:  'ꜥnḫ',         // transliteração acadêmica
    namePt:    'Ankh',        nameEn:    'Ankh',
    meaningPt: 'Vida',        meaningEn: 'Life',
    notePt:    '...',         noteEn:    '...',
    typeKey:   'type-logogram', // tipo (ver tabela abaixo)
    chapter:   -1              // -1 = intro, 0–7 = capítulos
  },
  // ... 8 mais
];
```

Valores válidos de `typeKey`: `type-logogram`, `type-phonogram`, `type-determin`, `type-uni`, `type-bi`, `type-tri`, `type-ideo`.

### `GLOSSARY` — termos do glossário

```js
const GLOSSARY = [
  {
    id:    'punt',
    termPt: 'Punt',   termEn: 'Punt',
    tagPt:  'lugar',  tagEn:  'place',
    defPt:  '...',    defEn:  '...'
  },
  // ...
];
```

Para linkar um termo do glossário no texto de um capítulo, use a classe `.gloss`:

```html
<span class="gloss" tabindex="0"
  onclick="openGlossaryAt('punt')"
  onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openGlossaryAt('punt')}">
  Punt
</span>
```

### `CHAPTERS` — capítulos da história

```js
const CHAPTERS = [
  {
    titlePt: 'A Tempestade',
    titleEn: 'The Storm',
    glyphIndex: 1,               // índice do glifo em GLYPHS_CODEX
    storyPt: `<p>Texto em PT...</p>`,
    storyEn: `<p>Text in EN...</p>`,
    notePt: `Nota arqueológica PT...`,
    noteEn: `Archaeological note EN...`,
    question: {
      pt: 'Pergunta em PT?',
      en: 'Question in EN?',
      options: [
        { pt: 'Opção A', en: 'Option A', correct: true },
        { pt: 'Opção B', en: 'Option B', correct: false },
        { pt: 'Opção C', en: 'Option C', correct: false },
        { pt: 'Opção D', en: 'Option D', correct: false },
      ]
    }
  },
  // ... 7 capítulos mais (total: 8)
];
```

### `CULTURA_MATERIAL` — ficha do manuscrito real

Vive em `data/cultura-material.js` (arquivo único e compartilhado, **não** dentro de cada `data/<historia>.js`). É um registro indexado por `storyId`:

```js
const CULTURA_MATERIAL = {
  naufrago: {
    image:      'assets/images/hermitage_1115.jpeg',  // foto do papiro real
    imageAltPt: '...', imageAltEn: '...',
    titlePt:    '...', titleEn:    '...',   // título do objeto no museu
    captionPt:  '...', captionEn:  '...',   // legenda curta (faixa da splash)
    creditPt:   '...', creditEn:   '...',   // crédito da imagem (mantenha o fotógrafo!)
    introPt:    '...', introEn:    '...',   // parágrafo de abertura da ficha
    museumUrl:  'https://...',              // link para a página oficial do objeto
    fields: [                               // linhas da ficha de catálogo
      { labelPt: 'Número de inventário', labelEn: 'Inventory number',
        valuePt: 'DV-1115',               valueEn: 'DV-1115' },
      // ... demais campos
    ]
  },
  sinuhe: { /* mesma estrutura */ }
};
```

Renderização (em `engine.js`):

- `renderArtifactStrip()` — desenha a foto emoldurada + legenda + botão **"De onde vem este texto?"** na tela de abertura (splash). Se `CULTURA_MATERIAL[storyId]` não existir, retorna vazio (a história simplesmente não mostra a faixa).
- `openArtifact()` / `renderArtifactView()` — abrem a ficha completa no modal (`state.modalView === 'artifact'`), reaproveitando o `modalOverlay`.
- A imagem usa `onerror` para **se esconder** caso o arquivo não exista, evitando ícone de imagem quebrada.

> **Fidelidade à fonte:** os dados de catálogo devem vir da ficha do museu que guarda o objeto. Datas seguem a convenção **AEC/BCE** (ver §16), exceto títulos de obras citadas. Se a foto trouxer crédito de fotógrafo, mantenha-o.

> O `cultura-material.js` precisa ser carregado no HTML da história, **antes** de `engine.js`:
> `<script src="data/cultura-material.js"></script>`. As strings de UI da ficha (`artifact-btn`, `artifact-title`, `artifact-museum`) ficam no `I18N` de cada história (PT e EN).

### `ACHADOS` — objetos reais nas notas arqueológicas

Também em `data/cultura-material.js`, indexado por `storyId`. Quando uma nota cita um objeto real com foto licenciada, o trecho recebe um `<span class="achado-ref" data-achado="id">`; o clique chama `toggleAchado()` (em `engine.js`), que monta o cartão de descoberta.

```js
const ACHADOS = {
  naufrago: {
    'tesouro-tod': {
      image:    'assets/images/tesouro_tod_louvre.jpg', // foto local
      altPt:    '...', altEn:    '...',                 // texto alternativo
      namePt:   '...', nameEn:   '...',                 // nome curto
      refPt:    '...', refEn:    '...',                 // o que é · onde está (nº de inventário)
      creditPt: '...', creditEn: '...',                 // crédito + licença da foto
      url:      'https://...'                           // (opcional) ficha no acervo
    }
  }
};
```

> De propósito **não há contador, coleção nem persistência**: o achado é só o momento da descoberta (tesouros e códex já são o inventário). Nem toda nota tem achado. Só entra objeto com imagem de licença verificada (CC0 / domínio público / CC BY-SA com crédito) e referência fiel ao acervo.

### `MUSAEUM_GEO` — lugares do mapa interativo

Vive em `data/geografia.js`. Array dos lugares citados nos textos, plotados sobre a carta «Égypte Ancienne» (Malte-Brun, 1837, domínio público) na aba **Mapa** do `index.html`.

```js
const MUSAEUM_GEO = [
  {
    id:       'grande-verde',
    namePt:   'Grande Verde',  nameEn: 'Great Green',
    kind:     'sea',           // chave em GEO_KINDS (rótulo bilíngue)
    stories:  ['naufrago'],    // storyId(s) em que aparece
    uncertain: false,          // true = localização debatida/não atestada
    pos:      { map: [24, 6] },// ponto sobre a carta [left%, top%]
    //        { edge: 's', at: 50 } -> lugar fora da carta, vira seta de borda
    descPt:   '...',  descEn: '...'  // descrição factual, fiel às fontes
  },
  // ...
];
```

> As cores por história derivam do catálogo (`geoStoryStyle`/`injectGeoStoryStyles`), então **história nova é drop-in**: basta acrescentar lugares com o novo `storyId` em `stories`. Render: `renderGeoMap()`, `renderGeoPanel()`, `renderGeoLegend()`. Localizações debatidas levam `uncertain: true`, e a ressalva aparece no cartão. Só usar carta de fundo com licença verificada e crédito.

---

## 8. Estado da aplicação (`state`)

Cada história mantém um objeto `state` em memória. A estrutura completa:

```js
const state = {
  lang: 'pt',                     // idioma atual
  screen: 'splash',               // tela atual: 'splash' | 'intro' | 'chapter' | 'challenge' | 'final'
  chapter: 0,                     // índice do capítulo atual (0–7)
  score: 0,                       // pontuação acumulada
  answered: false,                // se o desafio atual já foi respondido
  attempts: 0,                    // tentativas no desafio atual
  collected: [false, false, ...], // 8 booleans — tesouros coletados
  discoveredGlyphs: new Set(),    // índices dos glifos desbloqueados
  modalView: null,                // 'codex' | 'sheet' | 'tutorial' | 'glossary' | null
  tutorialStep: 0,
  sheetIndex: 0,                  // índice do glifo na ficha individual
  glossaryHighlight: null,        // id de termo para destacar ao abrir o glossário
  glossarySearch: '',             // texto de busca do glossário
  codexHasNew: false,             // ativa o pulse visual no botão Códex
  shuffledOptions: []             // opções do desafio embaralhadas
};
```

### Fluxo de telas

```
splash → intro → chapter[0] → challenge[0] → chapter[1] → challenge[1] → ... → challenge[7] → final
```

---

## 9. Persistência (localStorage)

Todas as chaves usam **hífen** (não underscore).

| Chave | Tipo | Conteúdo |
|---|---|---|
| `musaeum-lang` | string | `"pt"` ou `"en"` (escolhido no seletor de idioma do 1º acesso) |
| `musaeum-theme` | string | `"dark"` ou `"light"` |
| `musaeum-player` | JSON | `{ name: "..." }` |
| `musaeum-stories` | JSON | `{ naufrago: {...}, sinuhe: {...} }` |
| `musaeum-research-consent` | string | `"sim"` / `"não"`; `null` enquanto não decidido (é o gatilho do onboarding) |
| `musaeum-tour-<storyId>` | string | `"seen"` quando o tour daquela história já auto-disparou |

O save de cada história dentro de `musaeum-stories`:

```js
{
  screen: 'splash' | 'intro' | 'chapter' | 'challenge' | 'final',
  chapter: 0–7,
  score: number,
  collected: [true|false, ...],       // 8 elementos
  discoveredGlyphs: [0, 1, 3, ...]    // array de índices (Set é serializado como array)
}
```

Para ler/salvar:

```js
const saved = storeGet('naufrago');      // retorna o objeto ou null
storeSave('naufrago', { ...state, ... }); // salva
```

---

## 10. Sistema de temas

O tema é controlado pelo atributo `data-theme` no elemento `<html>`:

```js
document.documentElement.setAttribute('data-theme', 'light'); // ou 'dark'
```

O CSS define variáveis em `:root` (dark, padrão) e as redefine em `:root[data-theme="light"]`. As variáveis principais:

| Variável | Dark | Light |
|---|---|---|
| `--papyrus` | `#f1e4c6` (creme) | `#0d0a06` (quase preto) |
| `--papyrus-soft` | texto secundário | texto secundário |
| `--ink` | `#1b2a3d` (azul-noite) | `#fdf8ee` (papel claro) |
| `--gold` | `#c9a646` | `#5c480e` |
| `--terracotta-lt` | vermelho-terracota | vermelho escuro |

Nunca hardcode cores — use sempre as variáveis CSS.

---

## 11. Internacionalização (i18n)

### Nas histórias

Função auxiliar disponível no JS inline de cada história:

```js
function t(k) { return I18N[state.lang][k] || k; }
```

Troca de idioma: chame `setLang('pt')` ou `setLang('en')`, que atualiza `state.lang`, persiste em localStorage e chama `render()`.

### No index.html

O `index.html` usa um sistema diferente: elementos com `data-t="chave"` são atualizados em massa pela função `render()` que chama `querySelectorAll('[data-t]')`.

```html
<span data-t="collection-title">Coleção</span>
```

---

## 12. Acessibilidade

Padrões que devem ser mantidos em qualquer alteração:

- Botões interativos têm `aria-label` descritivo
- Modais usam `role="dialog"` e `aria-modal="true"`
- Ao abrir um modal, o foco é movido para dentro dele; ao fechar, retorna ao elemento que o abriu
- Elementos clicáveis sem `<button>` ou `<a>` têm `tabindex="0"` e `onkeydown` para Enter/Space
- Respeita `prefers-reduced-motion` (animações desativadas para quem preferir)
- Toast de descoberta de glifo usa `role="status"` e `aria-live="polite"`

---

## 13. Como adicionar uma nova história

Exemplo: adicionar "O Camponês Eloquente" (`campones.html`).

### Passo 1 — criar o arquivo de dados

Crie `data/campones.js` seguindo a estrutura de `data/sinuhe.js`. Defina:

- `I18N` — todos os textos bilíngues da UI
- `ITEMS` — 8 tesouros (emoji + nome PT + nome EN)
- `GLYPHS_CODEX` — 9 hieróglifos (preencha todos os campos)
- `GLOSSARY` — termos do glossário
- `CHAPTERS` — 8 capítulos com texto, nota, contexto e questão

### Passo 2 — criar o HTML da história

Copie `sinuhe.html` e renomeie para `campones.html`. Altere:

1. `<title>` e metatags no `<head>`
2. `<script src="data/sinuhe.js">` → `<script src="data/campones.js">`
3. `initStoryApp({ inventory: ['emoji1', ..., 'emoji8'] })` — use os ícones dos seus ITEMS
4. `const STORY_ID = 'campones';` (se a história usar essa constante)
5. Revise o objeto `state` inicial
6. Adapte a lógica se houver diferenças narrativas

### Passo 3 — publicar no index.html

Em `index.html`, localize o card correspondente (ex: `card3`) e converta de card bloqueado para link:

```html
<!-- antes -->
<div class="scroll-card locked" id="card3" aria-label="...">

<!-- depois -->
<a href="campones.html" class="scroll-card" id="card3" aria-label="...">
```

Feche com `</a>` em vez de `</div>`.

### Passo 4 — adicionar ao GAME_CATALOG

No `index.html`, localize o array `GAME_CATALOG` e adicione:

```js
{
  storyId: 'campones',
  titlePt: 'O Camponês Eloquente',
  titleEn: 'The Eloquent Peasant',
  items: ITEMS_CAMPONES   // importar do data file ou duplicar o array aqui
}
```

> Atenção: o `index.html` não carrega os arquivos `data/*.js`. Se precisar dos ITEMS no catálogo, copie o array diretamente ou reestruture para carregar o JS.

### Passo 5 — adicionar ao AVAILABLE_STORIES

```js
const AVAILABLE_STORIES = ['naufrago', 'campones']; // adicione aqui
```

Essa constante controla quais histórias precisam estar completas para o certificado ser desbloqueado.

### Passo 6 (opcional) — cultura material

Para mostrar o manuscrito real na tela de abertura:

1. salve a foto do papiro em `assets/images/`;
2. crie uma chave nova em `CULTURA_MATERIAL` (`data/cultura-material.js`) com o mesmo formato do `naufrago` (ver §7), preenchendo os campos a partir da ficha de catálogo do museu que guarda o objeto;
3. garanta que `data/cultura-material.js` esteja carregado no HTML da história, antes de `engine.js`;
4. acrescente as strings `artifact-btn`, `artifact-title` e `artifact-museum` ao `I18N` (PT e EN) da história.

A faixa e a ficha aparecem sozinhas — nenhuma mudança no `engine.js` é necessária.

---

## 14. Publicação de uma nova história (referência)

A História de Sinué foi publicada na **v1.0** (2026-06-09). Os passos abaixo
ficam como referência para publicar a próxima história (ex.: o Camponês Eloquente):

1. Em `index.html`, converta o card de `<div class="scroll-card locked">` para `<a href="<historia>.html" class="scroll-card">` (com a tag `tag-ready` / `tagOpen`)
2. Adicione no `GAME_CATALOG` a entrada com os tesouros (os mesmos `ITEMS` do `data/<historia>.js`):
   ```js
   { storyId: '<historia>', titlePt: '...', titleEn: '...', items: [...] }
   ```
3. Adicione `'<historia>'` em `AVAILABLE_STORIES` (passa a contar para o certificado)
4. No HTML da história, carregue `research.js` e `tour.js` (paridade com `naufrago.html`) e garanta as chaves `tour-*` no `I18N` de `data/<historia>.js`

---


## 16. Convenções de código

- **JavaScript:** camelCase em português para nomes de conteúdo (`nomePapiro`, `progressoAtual`)
- **CSS classes:** kebab-case descritivo (`.archaeo-note`, `.glyph-card`, `.collection-section`)
- **IDs HTML:** kebab-case (`card1`, `aboutModal`, `certCanvas`)
- **localStorage:** sempre prefixo `musaeum-` com hífen
- **Sem frameworks:** manter tudo em JS/CSS/HTML vanilla
- **Comentários:** em português, apenas quando o "por quê" não for óbvio pelo código
- **Cores:** sempre via variáveis CSS (`--gold`, `--ink`, etc.), nunca hardcoded
- **i18n:** nunca coloque texto fixo em português no HTML ou JS — use `t('chave')` ou o objeto `I18N`

---

## 17. Fluxo Git

O repositório está no GitHub (branch `main`). Não há CI ou deploy automático configurado.

```bash
git status
git add arquivo.html arquivo.js
git commit -m "Descrição clara do que foi alterado"
git push origin main
```

Evite commits com múltiplos arquivos não relacionados. Prefira commits focados por funcionalidade.

---

## 18. Onboarding e tour guiado

### Sequência de primeiro acesso (index.html)

Disparada quando `musaeum-research-consent === null`. Três pop-ups, em ordem:

1. `#langModal` — seletor de idioma (🇧🇷/🇺🇸). `chooseLang(lang)` grava `musaeum-lang` e segue para a boas-vindas. Única pop-up bilíngue.
2. `#nameModal` — boas-vindas: nome (opcional) + checkbox de consentimento **desmarcado por padrão**. Grava `musaeum-player` e `musaeum-research-consent`. Já é mostrada no idioma escolhido.
3. `#tourOfferModal` — oferta do tour; "Sim" chama `startHomeTour()`.

Na home, `research.js` é iniciado com `Research.init({ suppressModal: true })` para não duplicar o modal de consentimento (a boas-vindas já cobre isso). Em entrada direta numa história, o `research.js` mostra seu próprio modal como fallback.

### Motor de tour (`tour.js`)

API única, agnóstica de página:

```js
Tour.start(steps, { labels: { skip, prev, next, done }, onClose });
// steps: [{ selector, title, body }] com os textos já no idioma escolhido
Tour.isActive();  Tour.close();
```

Spotlight dourado sobre o elemento real + seta piscando + cartão com texto e botões. **As cores do cartão são fixas claras** (não usam as variáveis de tema), porque o cartão é sempre escuro, inclusive no tema claro. Teclado: ←/→/Esc. Reposiciona em scroll/resize. O botão `#btnTour` (`?`), tanto na home quanto no shell das histórias, reabre o tour.

- **Home** (`startHomeTour`, index.html): 5 passos — `.library-grid .scroll-card`, `#tab-mapa`, `#tab-colecao`, `#tab-cert`, `#btnAbout`. Textos em `i18n.<lang>.tourSteps`.
- **História** (`startStoryTour`, engine.js): `#btnGlossary`, `#btnCodex`, `#btnSound`, `#inventoryHud`, `#btnNote`, `#btnChallenge` (filtra só os visíveis). **Auto-dispara uma vez** ao chegar à tela `story` (flag `musaeum-tour-<storyId>`). Textos nas chaves `tour-*` do `I18N`.

### Estilo dos textos de UI

Sem travessões (`—`); use ponto, vírgula ou `!`. Tom caloroso, de quem mostra o projeto para um amigo. Vale para PT e EN.

---

## 19. Referências úteis

- [Documentação técnica detalhada](TECHNICAL.md) — estruturas de dados, fluxo de telas, sistemas internos
- [Unicode Egyptian Hieroglyphs](https://www.unicode.org/charts/PDF/U13000.pdf) — bloco U+13000–U+1342F
- [Lista de hieróglifos de Gardiner](https://en.wikipedia.org/wiki/Gardiner%27s_sign_list) — referência para transliteração e tipos de signos

## 20. Como citar

O Musæum tem DOI no Zenodo. Para citar, use o *concept DOI* (sempre aponta para a versão mais recente); a ficha legível por máquina está em [`CITATION.cff`](../CITATION.cff).

**DOI:** [10.5281/zenodo.20617042](https://doi.org/10.5281/zenodo.20617042)

> CORPAS, Flavia Lima. *Musæum: biblioteca digital interativa de literatura do Egito Antigo*. Zenodo, 2026. DOI: 10.5281/zenodo.20617042. Disponível em: https://doi.org/10.5281/zenodo.20617042.

Ao publicar uma versão nova: crie um *release* no GitHub (tag `vX.Y.Z`) e o Zenodo arquiva e gera um *version DOI* automaticamente. O *concept DOI* acima nunca muda.
