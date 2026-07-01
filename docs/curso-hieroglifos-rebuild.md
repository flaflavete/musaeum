# Curso de Hieróglifos — Plano do Rebuild

> Documento de trabalho para refazer o curso de hieróglifos do Musæum do zero.
> Status: **em construção** (fatia vertical da fundação + Lição 1 pronta e verificada). Última atualização: 2026-06-30.
> Objetivo deste arquivo: poder retomar o projeto em qualquer sessão sem perder o fio.

## 0. Progresso

Decidido em 2026-06-30: rebuild numa **pasta nova em paralelo** (`curso/`), sem tocar na `aprender/` atual; os links só trocam na virada, quando o curso novo estiver completo.

**Fatia vertical concluída (fundação + Lição 1):**

- `curso/licoes.js` — fonte única `window.CURSO_LICOES`. Lição 1 codificada em blocos (`p`, `callout`, `signtypes`, `word`, `direction`) + `quiz`; lições 2 a 6 só com metadado (`ready:false`, aparecem bloqueadas no índice). Acaba com a duplicação tripla do curso antigo.
- `curso/curso.js` — motor único que serve índice (`data-page="index"`) e lição (`data-page="lesson"`, lê `?licao=<id>`). Troca de idioma e tema **ao vivo** (botões no header). Progresso em `localStorage 'musaeum-hieroglyphs'` como `{ done: { <id>: true } }`; contagem e % derivam de `CURSO_LICOES.length` (sem número mágico).
- `curso/curso.css` — folha única, tokens de cor da casa nos dois temas, foco visível, `prefers-reduced-motion`, responsivo.
- `curso/index.html` e `curso/licao.html` — shells mínimos (só carregam fontes + css + licoes.js + curso.js).

Verificado no navegador: índice lista 6 lições (5 bloqueadas), Lição 1 renderiza as 5 seções + os 3 tipos de sinal + as 2 caixas de palavra (nfr) + direção + quiz; troca PT/EN ao vivo; quiz marca concluído e persiste; índice reflete 1/6 com check; mobile empilha os cards.

**Quiz multi-pergunta (feito):** o `quiz` de cada lição virou um array; o motor mostra uma pergunta de cada vez, com placar e "próxima pergunta" (`renderQuizQuestion`/`showQuizNext`). Lição 1 tem 4 perguntas.

**Nome de exibição (feito):** deixou de ser "curso" e virou **"Primeiros passos nos hieróglifos"** / "Uma introdução" (é uma introdução honesta, não um curso). Pasta `curso/` mantém o nome interno.

**Lição 2 — Os 24 unilíteros (feito e verificado):** novo bloco `siggrid` no motor, que puxa **glifo, nome e a explicação do Gardiner** do `GARDINER_DATA`/`_EN` por id (fonte única; `licao.html` carrega os dois `gardiner_data*.js`). Clique no sinal marca "visto" (check + contador) e revela a explicação num painel. Grid na ordem convencional dos 24, com **override de transliteração só onde o dado falha** (`tr: { M17:'ỉ', Z4:'y', V31:'k' }`). Seções: alfabeto consonantal; o grid; nota honesta de que ꜣ/ꜥ são consoantes, não vogais. Quiz de 4 perguntas.

> **Achado sobre os dados do Gardiner (a corrigir na fonte/Excel um dia):** `gardiner_data.js` tem `M17` como `i` (deveria ser yod `ỉ`), e `Z4` (`y`) e `V31` (`k`) com fonema **vazio**; `N29` está como `q` (a casa lê Gardiner/Faulkner, que usariam `ḳ`). O curso contorna com override, mas a página `gardiner/gardiner.html` mostra os valores crus. Vale revisar a planilha-fonte.

**Lição 3 — Bilíteros e trilíteros (feito e verificado):** dois `siggrid` (12 bilíteros + 9 trilíteros, do `GARDINER_DATA`) + a seção de complementos fonéticos com dois blocos `word` (ꜥnḫ 𓋹𓈖𓐍 e mn 𓏠𓈖, mostrando que o complemento não dobra o som) + quiz de 4. Sinais escolhidos e conferidos na fonte (ex.: pr O1, ꜥnḫ S34, nṯr R8, ḥḳꜣ S38).

**Lição 4 — Montar palavras reais (feito e verificado):** bloco novo `builder` no motor, uma versão **guiada** do construtor (não o livre do `gardiner.html`): paleta de sinais do `GARDINER_DATA`, cada desafio dá significado + transliteração, o aluno clica os sinais na ordem e recebe feedback na hora (acerto verde com nota do complemento; erro pede conferir a ordem). 4 desafios (pr, mn, nfr, ꜥnḫ) que revisitam sinais das lições 1 a 3. Sem quiz: a lição conclui ao montar as 4 palavras. `wireBuilder` guarda o estado; ⌫ Apagar / Limpar.

**Próximos passos:** Lição 5 (cartuchos e nomes do rei), Lição 6 (ler um texto curto, capstone, texto a definir no §8), e conectar o hub da home ao `curso/` na virada. Pendências de design seguem no §8.

---

## 1. Por que refazer

O curso atual vive em `aprender/` (6 lições + flashcards + índice). Funciona, mas a arquitetura nasceu com problemas mapeados na análise de 2026-06-30:

- Metadados das lições **duplicados em 3 lugares** (`aprender/index.html`, `home/aprender.js`, e a nav de cada lição), já divergindo entre si.
- Cada lição repete o mesmo texto PT **duas vezes** (no HTML e no objeto `I18N`).
- Progresso fragmentado e com thresholds errados (lição 3 conclui em 16 de 20 sinais; lição 4 em 7 de 9).
- Listas de sinais e palavras **hardcoded** em cada HTML, em vez de fonte única.
- O hub do curso na home (`home/aprender.js`) está **pronto mas desconectado**: o `panel-aprender` do `index.html` ainda mostra "Em breve" e nada linka para `/aprender/`.

A decisão é reconstruir com calma, com fonte única de dados e um motor de lição reutilizável, em vez de remendar seis HTMLs.

## 2. Escopo (decidido)

**O curso é introdutório, de reconhecimento e leitura leve, interessante e interativo.**

- **NÃO** é curso de gramática completo. Sem mergulho em verbos (sḏm.n.f, estativo, pseudoverbal) nem morfologia pesada. Motivo: alto risco de erro e não é o público do Musæum (curioso querendo ler um nome de faraó, não estudante de pós).
- Gramática entra só como **aperitivo final, leve e opcional**: feminino `-t`, plural `-w`, sufixo `.f`, adjetivo depois do nome. Só o gostinho.
- Mordidas curtas (10 a 30 min por lição), nunca apostila de 24 horas.
- Interatividade **dentro do site**, nunca "ache uma imagem na internet" ou "transcreva seu nome num papel".

## 3. Princípios inegociáveis

1. **Coerência com o Musæum inteiro** (acessibilidade, arquitetura, design/UX, engenharia). Não inventar padrão isolado por tela: reusar variáveis de cor nos dois temas, ARIA/foco/`prefers-reduced-motion`, o mecanismo de i18n PT/EN ao vivo, localStorage com prefixo `musaeum-`. Nada de frankenstein.
2. **Rigor acadêmico**: só fato verificável (função e leitura segundo Gardiner/Faulkner). Nada de poesia, simbolismo não atestado ou "história bonita".
3. **Bilíngue PT/EN** desde o começo, troca de idioma ao vivo.
4. **Convenções de transliteração**: `ꜣ` (não 3), `ꜥ` (não ˁ), yod `ỉ` precomposto U+1EC9 (não j nem marca combinante).
5. **Datação**: AEC em PT, BCE em EN. Nunca "a.C.".
6. **Sem travessões** em nenhum texto de UI/conteúdo (PT e EN). Vírgula, dois-pontos, ponto e vírgula ou parênteses.
7. **Copyright**: seguir a progressão do Allen e citá-lo não é plágio (estrutura e fatos da língua são livres; só a expressão dele é protegida). Caminho: **redação própria + Allen citado + exemplos de vocabulário padrão e bem atestado** (Gardiner/Faulkner), apresentados como vocabulário em si, nunca os exercícios/frases-exemplo do Allen verbatim.
8. **Curso autônomo, sem conexões com as histórias** (decidido 2026-06-30): por ora o curso NÃO cria pontes com o Náufrago nem com o Sinué (nada de "esta palavra aparece no Sinué, vá ler"). A Flavia não quer afirmar essas conexões agora. O curso fica independente do acervo; se um dia fizer sentido conectar, é decisão posterior e consciente.

## 4. Fontes

- **Dados de sinais**: pasta `gardiner/`. Modelo `[id, glifo, fonema, nome, func, details]`, onde `func` combina P (fonograma), I (logograma), D (determinativo); um sinal pode ter mais de uma função. Planilha-fonte em `gardiner/source/gardiner-sign-list.xlsx`; pipeline `build_data.py` + `merge_pt.py`.
- **Allen, *Middle Egyptian* (3ª ed., 2014)**: manual cuja sequência o curso segue. PDF em `fontes/Allen-MiddleEgyptian.pdf` (pasta gitignored, local).
- **Gardiner, *Egyptian Grammar*** e **Faulkner, *Concise Dictionary***: PDFs em `fontes/` (também gitignored). São a fonte do **vocabulário de exemplo** do curso (palavras frequentes e bem atestadas, apresentadas como vocabulário em si). O curso fica autônomo, sem puxar exemplos do acervo do Musæum (ver princípio 8).

## 5. Direção de arquitetura (proposta, a confirmar)

- **Fonte única de dados** das lições (ex.: `aprender/licoes.js` com `{pt, en}`), consumida por home, índice e lições. Acaba com a duplicação tripla.
- **Motor de lição reutilizável** (um JS + um CSS), em vez de 6 HTMLs que repetem modal/quiz/grid. Cada lição = dados + chamada ao motor.
- **Reusar o construtor de palavras do `gardiner/`** como widget de exercício: clicar nos sinais, montar a palavra, ver a transliteração e o feedback na hora.
- **Sinais sempre vindos do `gardiner/`**, nunca relistados à mão dentro de `aprender/`.
- Vanilla, sem build (como todo o Musæum).
- Progresso unificado num objeto `musaeum-hieroglyphs`, thresholds derivados de `DATA.length` (sem números mágicos).
- **Conectar o hub na home**: trocar o "Em breve" do `panel-aprender` pelos containers que `home/aprender.js` já espera, e linkar para `/aprender/`.

## 6. Esqueleto das lições (acordado)

| # | Lição | Foco | Mecânica interativa | Exemplos |
|---|---|---|---|---|
| 1 | O sistema | Não é magia; Roseta/Champollion; os 3 tipos de sinal; direção de leitura ("os sinais olham para o começo"); agrupamento em quadrados (quadrats) | Inspecionar uma inscrição: apontar direção, separar grupos | Sinais do próprio corpus |
| 2 | Os 24 unilíteros | O "alfabeto" consonantal | Grid + construtor + quiz | — |
| 3 | Bilíteros + trilíteros | Sinais de 2 e 3 consoantes; complementos fonéticos | Construtor: montar com complemento e ver que o som não dobra | nfr, ꜥnḫ, ḫpr, pr |
| 4 | Montar palavras reais | Combinar sinais para ler palavras | Construtor: montar a palavra, ver transliteração e feedback na hora | Vocabulário padrão frequente (Gardiner/Faulkner) |
| 5 | Cartuchos e os nomes do rei | O cartucho; os 5 nomes reais; ler nomes de faraó | Montar/ler cartuchos reais | Ramsés, Tutancâmon, etc. |
| 6 | Ler um texto curto (capstone) | Juntar tudo num texto curto | Tradução guiada, palavra a palavra | Texto curto, padrão e bem atestado (a definir, ver §8) |
| 7 | Aperitivo de gramática (opcional) | Só o gostinho: feminino `-t`, plural `-w`, sufixo `.f`, adjetivo depois do nome | Exemplos curtos, sem exercício pesado | Corpus |

Ferramentas de apoio (já existem, manter/integrar): **flashcards**, **quiz**, **lista de Gardiner** completa.

## 7. O que NÃO levar do roteiro-rascunho

Veio um roteiro inicial (estilo apostila) com pontos a descartar:

- **A "história do abutre"** ("vale 3 porque a palavra de abutre era 3rt"): é o princípio acrofônico, **hipótese contestada**, não fato. Fere o rigor. Cortar ou marcar claramente como teoria.
- **"Escreva seu nome"** (tipo ANA = ꜥ-n-ꜣ): usar ayin/aleph para vogais do português é linguisticamente furado. Só como brincadeira explicitamente rotulada, nunca como leitura real.
- **Gramática pesada** (verbos, estativo, pseudoverbal): fora do escopo. O rascunho ainda trazia paradigmas com erros.
- **"a.C."**, transliteração com `3 / ˁ / j`, exercícios que mandam sair do site: tudo contra as convenções da casa.

O que do roteiro **vale a pena** e foi incorporado acima: abertura desmistificadora (Roseta, Champollion, 3 tipos), direção de leitura, agrupamento em quadrats, cartuchos com os 5 nomes, e terminar lendo um texto real.

## 8. Decisões ainda em aberto

- Qual texto curto, padrão e bem atestado vira o **capstone** da lição 6 (ex.: uma fórmula de oferenda simples, ou uma frase montada com o vocabulário das próprias lições). Sem puxar do acervo do Musæum.
- Onde o curso entra (ou não) na **Coleção** e no **Certificado** (hoje as histórias derivam de `data/catalogo.js`; decidir se o curso entra nesse mesmo sistema ou fica à parte de propósito).
- Formato exato da **fonte única de dados** das lições e do **motor**.
- Se a lição 1 ganha um visualizador de inscrição interativo (apontar direção/grupos) ou se isso fica como ilustração estática numa primeira versão.

## 9. Ponteiros rápidos

- Curso atual: `aprender/` (`index.html`, `01-sistema.html` … `06-cartuchos.html`, `flashcards.html`, `hieroglyphs-data.js`, `aprender.css`).
- Hub na home: `home/aprender.js` (pronto, desconectado), `index.html` `#panel-aprender`.
- Dados de sinais: `gardiner/` (página `gardiner.html` já tem o construtor de palavras + selos de função + explicação do Gardiner em PT/EN).
- Memórias relacionadas: `curso-hieroglifos-rebuild`, `coerencia-musaeum`, `rigor-hieroglifos`, `gardiner-fonte-oficial`, `faulkner-dicionario-fonte`.
