# Configuração da coleta de dados da pesquisa

> **A pesquisa mede o CURSO de hieróglifos em detalhe** (conclusão de lição,
> desempenho no quiz e no construtor, tempo por lição e quais itens erram).
> `research.js` é carregado em `curso/index.html`, `curso/licao.html` e nas três
> histórias, **nunca na home**. Das histórias vem **apenas um ping anônimo de
> abertura** (`trackStoryOpen`): nenhum rastreio de leitura, capítulo ou resposta.

O backend é um **Google Apps Script Web App** (não Google Forms): o `research.js`
faz uma requisição HTTP simples (GET com query string, `mode: 'no-cors'`,
`keepalive`) para o endpoint do Apps Script, que grava uma linha numa planilha
Google Sheets.

---

## 1. Crie a planilha e o Apps Script

1. Crie uma **planilha Google Sheets** (será o destino dos dados).
2. Nela, abra **Extensões → Apps Script**.
3. Escreva um `doGet(e)` que leia `e.parameter` e faça `appendRow` com os campos
   abaixo, na ordem em que você definir o cabeçalho da planilha. Esboço:

   ```js
   function doGet(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('respostas');
     const p = e.parameter;
     sheet.appendRow([
       p.timestamp, p.lang, p.theme, p.device, p.region, p.is_first_visit,
       p.lesson, p.lesson_num, p.lessons_total, p.completed, p.duration_sec,
       p.quiz_score, p.quiz_max, p.quiz_attempts, p.quiz_wrong,
       p.builder_solved, p.builder_total, p.builder_attempts, p.builder_wrong,
       p.story
     ]);
     return ContentService.createTextOutput('ok');
   }
   ```

4. **Implantar → Nova implantação → Tipo: App da Web.**
   - *Executar como:* você mesma.
   - *Quem pode acessar:* **Qualquer pessoa**.
5. Copie a **URL do app da Web** (termina em `/exec`).

---

## 2. Aponte o `research.js` para o endpoint

Abra [`/research.js`](../research.js) e substitua a constante `ENDPOINT` pela URL
copiada acima:

```js
const ENDPOINT = 'https://script.google.com/macros/s/SEU_ID/exec';
```

Não há mais lista de `entry.XXXX`: o Apps Script recebe os campos pelo nome
(query string), então basta o cabeçalho da planilha bater com os nomes dos
campos abaixo.

---

## 3. Campos coletados

Uma linha do **curso** é enviada ao **concluir** uma lição (ou ao **abandoná-la**,
via `pagehide`); uma linha de **história** é enviada ao abri-la (ping único). As
linhas se distinguem pela coluna `story` (preenchida só nas histórias, com `lesson`
vazia). Nenhum campo identifica o usuário.

### Ambiente (`_envData`)

| Campo | O que registra |
|---|---|
| `timestamp` | Data/hora ISO do evento |
| `lang` | `pt` ou `en` |
| `theme` | `dark` ou `light` |
| `device` | `mobile` ou `desktop` (inferido pela largura da tela / user agent) |
| `region` | `navigator.language` (ex.: `pt-BR`), não geolocalização |
| `is_first_visit` | `sim` na primeira visita ao curso (nenhuma lição concluída ainda) |

### Lição

| Campo | O que registra |
|---|---|
| `lesson` | id da lição (ex.: `sistema`, `unileteros`) |
| `lesson_num` | número da lição |
| `lessons_total` | total de lições publicadas |
| `completed` | `sim` (concluída) ou `não` (abandonada) |
| `duration_sec` | segundos desde a abertura da lição até o envio |
| `quiz_score` / `quiz_max` | acertos e total do quiz da lição |
| `quiz_attempts` | respostas erradas no quiz (sessão da lição) |
| `quiz_wrong` | quais perguntas do quiz erraram (ex.: `q2,q4`) |
| `builder_solved` / `builder_total` | palavras montadas e total no construtor |
| `builder_attempts` | palavras montadas erradas no construtor (sessão da lição) |
| `builder_wrong` | quais palavras do construtor erraram (transliteração) |

> Campos de quiz/construtor ausentes numa lição ficam em branco na planilha.

### História

| Campo | O que registra |
|---|---|
| `story` | id da história aberta (ex.: `naufrago`, `sinuhe`, `campones`). Preenchido só nas linhas de história; nelas os campos de lição ficam vazios. |

---

## 4. Como o `research.js` é acionado

`research.js` expõe `window.Research`. No curso, `curso/curso.js` o chama assim:

| Chamada | Quando |
|---|---|
| `Research.init()` | Ao abrir o curso. Na primeira visita (sem lição concluída), mostra o modal de consentimento se `musaeum-research-consent === null`. |
| `Research.watchLesson({ lessonId, lessonNum, totalLessons, getState })` | Ao renderizar uma lição, arma o rastreio de abandono (`pagehide`) e o cronômetro (`duration_sec`). |
| `Research.trackAttempt('quiz' \| 'builder', item)` | A cada resposta errada no quiz ou palavra errada no construtor; `item` guarda o que errou (`q2`, transliteração). |
| `Research.trackLessonComplete({ ... })` | Ao concluir a lição (último quiz ou último desafio do construtor). |

Nas histórias, `engine.js` chama, uma vez no fim de `initStory`:

| Chamada | Quando |
|---|---|
| `Research.trackStoryOpen(storyId, lang)` | Ao abrir uma história: um ping anônimo de abertura (coluna `story`). É o único hook de pesquisa nas histórias. |

O envio (`_send`) **só ocorre com consentimento** (`musaeum-research-consent === 'sim'`).

---

## 5. Consentimento

O consentimento é coletado **uma vez, no onboarding da home** (checkbox opt-in,
desmarcado por padrão, na janela de boas-vindas), e gravado em
`musaeum-research-consent` (`'sim'` / `'não'`). Como `research.js` não roda mais
na home, ele apenas **lê** essa chave nas páginas do curso. Se a pessoa chegar ao
curso sem ter decidido (`null`), o próprio `research.js` mostra um modal de
consentimento como fallback.

- Recusar (ou entrar sem marcar) não tem consequência: o curso funciona igual.
- A escolha não volta a ser pedida em visitas seguintes.

---

## 6. Teste o envio

1. Abra o DevTools → aba **Network**.
2. No console: `localStorage.setItem('musaeum-research-consent','sim')`.
3. Abra uma lição em `curso/licao.html?licao=sistema` e conclua o quiz/construtor.
4. Na aba Network, confirme a requisição GET para o endpoint `/exec`.
5. Confira a planilha vinculada: a linha deve aparecer em segundos.

---

## Notas sobre privacidade

- Nenhum dado pessoal identificável é coletado (sem nome, e-mail, IP ou localização).
- O envio só ocorre após consentimento explícito (`musaeum-research-consent = 'sim'`).
- Se o usuário recusar, nada é enviado, nem em visitas futuras.
- O campo `region` usa `navigator.language` (ex.: `pt-BR`), não geolocalização.
