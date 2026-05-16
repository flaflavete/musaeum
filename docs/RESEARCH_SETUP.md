# Configuração do Google Forms para coleta de dados

## 1. Crie o formulário

Acesse [forms.google.com](https://forms.google.com) e crie um novo formulário em branco.

**Título sugerido:** `Musæum — Dados de Pesquisa`

Crie **15 perguntas**, todas do tipo **Resposta curta**, com os nomes abaixo (na ordem):

| # | Nome da pergunta      | Valores possíveis                          |
|---|----------------------|--------------------------------------------|
| 1 | timestamp            | Data/hora ISO (ex: 2025-05-14T20:30:00Z)  |
| 2 | lang                 | `pt` ou `en`                              |
| 3 | theme                | `dark` ou `light`                         |
| 4 | device               | `mobile` ou `desktop`                     |
| 5 | region               | navigator.language (ex: `pt-BR`, `en-US`) |
| 6 | is_first_visit       | `sim` ou `não`                            |
| 7 | story                | `naufrago`, `sinuhe`, etc.                |
| 8 | score                | número                                    |
| 9 | max_score            | número (ex: 160)                          |
|10 | attempts             | número de tentativas erradas              |
|11 | completed            | `sim` ou `não`                            |
|12 | chapter_abandoned    | número (0–7) ou `N/A`                     |
|13 | glossary_opened      | `sim` ou `não`                            |
|14 | codex_opened         | `sim` ou `não`                            |
|15 | notes_opened         | `sim` ou `não`                            |

Todas as perguntas podem ser **não obrigatórias** — o envio ocorre mesmo sem preencher tudo.

---

## 2. Obtenha o endpoint e os IDs de campo

1. Com o formulário aberto, clique nos três pontinhos (⋮) → **Visualizar**
2. Na página de visualização, abra o DevTools do navegador (F12) → aba **Network**
3. Preencha qualquer resposta e clique em **Enviar**
4. Observe a requisição POST para `formResponse` — copie a URL completa

   Ela terá este formato:
   ```
   https://docs.google.com/forms/d/e/FORM_ID_LONGO/formResponse
   ```

5. No corpo da requisição (aba Payload), você verá os pares `entry.XXXXXXXXX=valor`
   Cada número corresponde a uma pergunta na ordem em que aparecem no formulário

> **Alternativa mais fácil:** inspecione o HTML da página de visualização e procure por `entry.` — cada campo `<input name="entry.XXXXXXXXX">` corresponde a uma pergunta.

---

## 3. Configure research.js

Abra [`/research.js`](../research.js) e substitua os dois blocos:

```js
const FORM_URL = 'SUBSTITUA_PELO_ENDPOINT_DO_FORMULARIO';

const ENTRIES = {
  timestamp:         'entry.XXXXXXXXX',   // ← substitua cada um
  lang:              'entry.XXXXXXXXX',
  theme:             'entry.XXXXXXXXX',
  device:            'entry.XXXXXXXXX',
  region:            'entry.XXXXXXXXX',
  is_first_visit:    'entry.XXXXXXXXX',
  story:             'entry.XXXXXXXXX',
  score:             'entry.XXXXXXXXX',
  max_score:         'entry.XXXXXXXXX',
  attempts:          'entry.XXXXXXXXX',
  completed:         'entry.XXXXXXXXX',
  chapter_abandoned: 'entry.XXXXXXXXX',
  glossary_opened:   'entry.XXXXXXXXX',
  codex_opened:      'entry.XXXXXXXXX',
  notes_opened:      'entry.XXXXXXXXX',
};
```

---

## 4. Teste o envio

1. Abra o DevTools → aba **Network**
2. Acesse `index.html` sem o cookie `musaeum-research-consent`
   (ou limpe o localStorage com `localStorage.removeItem('musaeum-research-consent')` no console)
3. O modal de consentimento deve aparecer → clique **Aceito contribuir**
4. Acesse `naufrago.html`, jogue até o final
5. Na aba Network, confirme que houve uma requisição para `formResponse`
6. Confira a planilha vinculada ao formulário — a linha deve aparecer em segundos

---

## 5. Planilha de respostas

O Google Forms cria automaticamente uma planilha Google Sheets vinculada.  
Acesse: **Respostas → ícone de planilha** no formulário.

Os dados chegam em tempo real sem nenhuma configuração adicional.

---

## Notas sobre privacidade

- Nenhum dado pessoal identificável é coletado
- O envio só ocorre após consentimento explícito (`musaeum-research-consent = 'sim'`)
- Se o usuário recusar, nada é enviado — nem em visitas futuras
- O campo `region` usa `navigator.language` (ex: `pt-BR`), não geolocalização

---

## Para adicionar uma nova história

Quando `sinuhe.html` for publicada, adicione ao final do seu script de inicialização:

```js
if (window.Research) Research.watchAbandonment({
  storyId:  'sinuhe',
  maxScore: CHAPTERS.length * 20,   // ajuste conforme a história
  getState: () => state,
});
```

E chame `Research.trackComplete(...)` no `goFinal()` equivalente da nova história.
