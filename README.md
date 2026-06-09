# Musæum · Biblioteca Interativa / Interactive Library

[🇧🇷 Português](#português) · [🇬🇧 English](#english)

<!-- Depois que o Zenodo gerar o DOI, descomente a linha abaixo e troque XXXXXXX pelo número do *concept DOI*: -->
<!-- [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.XXXXXXX.svg)](https://doi.org/10.5281/zenodo.XXXXXXX) -->
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR)

—

<a name="português"></a>
## 🇧🇷 Português

Biblioteca digital interativa e bilíngue (PT/EN) de textos literários do Egito Antigo do **Reino Médio** (2055–1650 AEC).

Projeto acadêmico de **Flavia Corpas** — PPGArq / Museu Nacional / UFRJ.

### O que é

O Musæum apresenta textos da literatura egípcia antiga como experiências interativas de leitura: narrativa por capítulos, desafios de compreensão, coleção de hieróglifos e notas arqueológicas em cada passagem. O objetivo é tornar acessível ao público geral uma literatura que normalmente só circula em ambientes universitários.

### Textos disponíveis

| Texto | Arquivo | Status |
|---|---|---|
| O Conto do Náufrago | `naufrago.html` | ✅ Disponível |
| A História de Sinué | `sinuhe.html` | 🔒 Em preparação |
| O Camponês Eloquente | — | 🔒 Em breve |

### Como abrir

Abra `index.html` diretamente no navegador — não há servidor nem build necessário.

### Scripts disponíveis

```bash
npm install               # instala dependências (necessário só para TTS e testes)
npm start                 # inicia o proxy TTS em http://localhost:3001
npm test                  # roda os testes automatizados uma vez
npm run test:watch        # roda os testes em modo watch (desenvolvimento)
```

Para o proxy TTS, crie um `.env` com `ELEVENLABS_API_KEY=sua-chave` antes de rodar `npm start`.

### Funcionalidades

- **Leitura bilíngue** — alterne entre PT e EN a qualquer momento
- **Tema claro/escuro** — persiste entre visitas
- **8 capítulos** por história, cada um com desafio de múltipla escolha
- **Tesouros** desbloqueados por acerto na primeira tentativa
- **Códex de hieróglifos** — 9 signos por história, com transliteração e nota
- **Glossário** — termos da cultura egípcia com busca e links no texto
- **Tutorial de leitura** — introdução a logogramas, fonogramas e determinativos
- **Tour guiado** — setas douradas apresentam a biblioteca, a coleção e as ferramentas de cada história; aparece no primeiro acesso e volta pelo botão ?
- **Coleção** — painel na página inicial com progresso cruzado entre histórias
- **Certificado** — gerado em canvas, exportável como PNG, ao concluir todas as histórias
- **Nome do leitor** — opcional, aparece na coleção e no certificado
- **Participação na pesquisa** — opcional e anônima, escolhida no primeiro acesso (dados de uso, nenhuma informação pessoal)
- **Acessibilidade** — ARIA, foco gerenciado em modais, `prefers-reduced-motion`

### Estrutura

```
index.html            Página da biblioteca
naufrago.html         Conto do Náufrago
sinuhe.html           História de Sinué (em preparação)
script.js             Utilitários compartilhados + shell HTML das histórias
engine.js             Motor das histórias (telas, desafios, save, TTS)
tour.js               Tour guiado (usado na home e nas histórias)
research.js           Coleta anônima de dados da pesquisa
style.css             Estilos globais
server.cjs            Proxy TTS ElevenLabs (opcional)
data/                 Dados das histórias (naufrago.js, sinuhe.js)
assets/audio/         Trilha sonora e efeitos (acerto, erro)
assets/images/        Imagens de fundo
tests/                Testes automatizados (Vitest)
fontes/               PDFs e áudio de referência (uso interno)
docs/                 Documentação (técnica, dev, guia do usuário, pesquisa)
```

**Stack:** HTML · CSS · JavaScript vanilla · localStorage · Google Fonts · Node/Express (TTS opcional)

### Referências bibliográficas principais

- ALLEN, J. P. *Middle Egyptian*. Cambridge University Press, 2000.
- ARAUJO, Emanuel. *Escrito para a Eternidade*. Brasília, 2000.
- BLACKMAN, A. M. *Middle-Egyptian Stories*. Bruxelas, 1932.
- LICHTHEIM, M. *Ancient Egyptian Literature, Vol. I*. UC Press, 1973.
- NEDERHOF, M.-J. *The Shipwrecked Sailor*. 2015.
- PARKINSON, R. B. *The Tale of Sinuhe and Other Ancient Egyptian Poems*. Oxford, 1997.
- POE, W. C. *The Writing of a Skillful Scribe*. Santa Rosa, 2010.
- SIMPSON, W. K. (ed.). *The Literature of Ancient Egypt*. 3ª ed. Yale, 2003.

### Créditos

Foto de fundo: Fachada do templo de Horus em Edfu, Egito · Flavia Lima Corpas, outubro de 2025.

Fontes: [Cinzel](https://fonts.google.com/specimen/Cinzel), [EB Garamond](https://fonts.google.com/specimen/EB+Garamond), [Noto Sans Egyptian Hieroglyphs](https://fonts.google.com/noto/specimen/Noto+Sans+Egyptian+Hieroglyphs) (Google Fonts).

*PPGArq · Museu Nacional / UFRJ · 2026*

### Licença

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR)

Distribuído sob a licença [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt_BR).

Os textos do Egito Antigo são de domínio público. As traduções são baseadas nas fontes bibliográficas citadas. Curadoria, notas arqueológicas e design por **Flavia Lima Corpas**.

—

<a name="english"></a>
## 🇬🇧 English

An interactive, bilingual (PT/EN) digital library of literary texts from Ancient Egypt's **Middle Kingdom** (2055–1650 BCE).

An academic project by **Flavia Corpas** — PPGArq / Museu Nacional / UFRJ.

### What it is

Musæum presents ancient Egyptian literary texts as interactive reading experiences: chapter-by-chapter narrative, comprehension challenges, a hieroglyph collection, and archaeological notes throughout. The goal is to make a literature that normally circulates only in academic settings accessible to the general public.

### Available texts

| Text | File | Status |
|---|---|---|
| The Tale of the Shipwrecked Sailor | `naufrago.html` | ✅ Available |
| The Story of Sinuhe | `sinuhe.html` | 🔒 Coming soon |
| The Eloquent Peasant | — | 🔒 Coming soon |

### How to open

Open `index.html` directly in your browser — no server or build step required.

### Available scripts

```bash
npm install               # install dependencies (only needed for TTS and tests)
npm start                 # start the TTS proxy at http://localhost:3001
npm test                  # run automated tests once
npm run test:watch        # run tests in watch mode (development)
```

For the TTS proxy, create a `.env` file with `ELEVENLABS_API_KEY=your-key` before running `npm start`.

### Features

- **Bilingual reading** — switch between PT and EN at any time
- **Light/dark theme** — persists across visits
- **8 chapters** per story, each with a multiple-choice comprehension challenge
- **Treasures** unlocked by answering correctly on the first attempt
- **Hieroglyph Codex** — 9 signs per story, with transliteration and notes
- **Glossary** — Egyptian cultural terms with search and inline text links
- **Reading tutorial** — introduction to logograms, phonograms, and determinatives
- **Guided tour** — golden arrows introduce the library, the collection, and each story's tools; appears on first visit and returns via the ? button
- **Collection** — dashboard on the home page with cross-story progress
- **Certificate** — generated on canvas, exportable as PNG, upon completing all stories
- **Reader name** — optional, shown in the collection and certificate
- **Research participation** — optional and anonymous, chosen on first visit (usage data only, no personal information)
- **Accessibility** — ARIA labels, managed focus in modals, `prefers-reduced-motion`

### Structure

```
index.html            Library home page
naufrago.html         The Shipwrecked Sailor
sinuhe.html           The Story of Sinuhe (coming soon)
script.js             Shared utilities + stories' HTML shell
engine.js             Story engine (screens, challenges, save, TTS)
tour.js               Guided tour (used on home and in stories)
research.js           Anonymous research data collection
style.css             Global styles
server.cjs            ElevenLabs TTS proxy (optional)
data/                 Story data files (naufrago.js, sinuhe.js)
assets/audio/         Soundtrack and sound effects (correct, wrong)
assets/images/        Background images
tests/                Automated tests (Vitest)
fontes/               Reference PDFs and audio (internal use)
docs/                 Documentation (technical, dev, user guide, research)
```

**Stack:** HTML · CSS · Vanilla JavaScript · localStorage · Google Fonts · Node/Express (TTS optional)

### Main bibliographic references

- ALLEN, J. P. *Middle Egyptian*. Cambridge University Press, 2000.
- ARAUJO, Emanuel. *Escrito para a Eternidade*. Brasília, 2000.
- BLACKMAN, A. M. *Middle-Egyptian Stories*. Brussels, 1932.
- LICHTHEIM, M. *Ancient Egyptian Literature, Vol. I*. UC Press, 1973.
- NEDERHOF, M.-J. *The Shipwrecked Sailor*. 2015.
- PARKINSON, R. B. *The Tale of Sinuhe and Other Ancient Egyptian Poems*. Oxford, 1997.
- POE, W. C. *The Writing of a Skillful Scribe*. Santa Rosa, 2010.
- SIMPSON, W. K. (ed.). *The Literature of Ancient Egypt*. 3rd ed. Yale, 2003.

### Credits

Background photo: Facade of the Temple of Horus at Edfu, Egypt · Flavia Lima Corpas, October 2025.

Fonts: [Cinzel](https://fonts.google.com/specimen/Cinzel), [EB Garamond](https://fonts.google.com/specimen/EB+Garamond), [Noto Sans Egyptian Hieroglyphs](https://fonts.google.com/noto/specimen/Noto+Sans+Egyptian+Hieroglyphs) (Google Fonts).

*PPGArq · Museu Nacional / UFRJ · 2026*

### License

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0)

Distributed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0) license.

Ancient Egyptian texts are in the public domain. Translations are based on the cited bibliographic sources. Curation, archaeological notes, and design by **Flavia Lima Corpas**.
