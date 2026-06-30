# Curso de Hieróglifos — Plano do Rebuild

> Documento de trabalho para refazer o curso de hieróglifos do Musæum do zero.
> Status: **planejamento** (nada implementado ainda). Última atualização: 2026-06-30.
> Objetivo deste arquivo: poder retomar o projeto em qualquer sessão sem perder o fio.

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
