# O Camponês Eloquente — rascunho de conteúdo

> Documento de trabalho (não publicado). Fonte: Emanuel Araújo, *Escrito para a Eternidade*, pp. 225–243.
> Transcrição fiel da tradução de Araújo + proposta de estrutura para a página do Musæum (`storyId: 'campones'`).
> Travessões, "a.C." e demais convenções do site serão ajustados só na fase de autoria das `storyPt/storyEn`; aqui a transcrição é fiel à fonte.

---

## 1. Mapa da estrutura (proposta: 9 capítulos = 9 glifos)

O texto tem uma **moldura em prosa** (partida → roubo dos asnos → queixa → epílogo/colofão) e um **núcleo de 9 apelações** em estilo poético. Como decidido no planejamento, NÃO fazemos 1 capítulo por apelação (repetitivo): agrupamos. Resultado: 9 capítulos, casando com os 9 glifos do códex.

| Cap | Título (provisório) | Páginas | Conteúdo | Glifo candidato |
|---|---|---|---|---|
| 1 | A partida de Khun-Anup | 226–227 | Apresentação: camponês do uádi Natrun, esposa Meryt, carrega os asnos, ruma a Heracleópolis | 𓃫 asno (ꜥꜣ) |
| 2 | A armadilha no caminho | 227–229 | Nemti-nakht, o pano estendido, o asno come a cevada, a surra, o roubo dos asnos | 𓇼/grão cevada (jt) |
| 3 | A queixa e a 1ª apelação | 229–231 | 10 dias suplicando; apela a Rensi filho de Meru; 1ª apelação; Rensi informa o rei Neb-kau-Rá; provisões à esposa | 𓆄 pena de Maât (mꜣꜥt) |
| 4 | 2ª e 3ª apelações | 232–236 | A balança, o prumo, Tot; "Maât foge de seu lugar"; justiça como respiração | 𓅝 íbis de Tot (ḏḥwty) |
| 5 | 4ª e 5ª apelações | 237–238 | O caçador, o pescador; o portão do templo de Hery-shef; lista de peixes | 𓆟 peixe (rm) ou 𓃝 carneiro de Hery-shef |
| 6 | 6ª e 7ª apelações | 238–241 | Verdade x mentira; o timoneiro/leme; o cálamo, o papiro, a paleta de Tot | 𓂗 leme/remo-direção (ḥmw) |
| 7 | 8ª apelação | 240–241 | A ganância; o celeiro transborda; "tua barriga está cheia"; a medida de grãos | 𓅻? celeiro / medida heqat |
| 8 | 9ª apelação | 242 | A verdade domina a mentira; invocação a Anúbis (o nome Khun-Anup = "protegido de Anúbis") | 𓃢 chacal de Anúbis (jnpw) |
| 9 | O veredito e o colofão | 242–243 | Epílogo: o rei manda copiar as apelações num rolo novo; os bens de Nemti-nakht vão ao camponês; "Justo de Voz"; colofão | 𓏛 rolo de papiro (mḏꜣt) |

**Premiação:** sem tesouros (`items: null`). Pergaminho único ao concluir = título **"Justo de Voz" / "True of Voice"** (mꜣꜥ-ḫrw). Campo `award` já dormente em `data/catalogo.js`.

---

## 2. Candidatos a glossário

Convenção: toda história nova precisa da entrada `aec` e do span clicável no intro-kicker.

| id | termo PT / EN | nota |
|---|---|---|
| `aec` | AEC / BCE | **obrigatório** (padrão do site) |
| `maat` | Maât | já existe nas outras; reusar definição |
| `reino-medio` | Reino Médio / Middle Kingdom | já existe; reusar |
| `heracleopolis` | Heracleópolis (Nen-nesut) / Herakleopolis | capital do reino de Per-Féfi; sede do grande intendente; pólo das dinastias IX–X |
| `uadi-natrun` | uádi Natrun / Wadi Natrun | oásis de onde vem Khun-Anup; sal e natrão para o Egito |
| `natrao` | natrão / natron | sal usado na mumificação e na limpeza; produto que o camponês transporta |
| `grande-intendente` | grande intendente (imy-r pr wr) / high steward | título de Rensi, filho de Meru; literalmente "supervisor da Casa" |
| `justo-de-voz` | Justo de Voz (mꜣꜥ-ḫrw) / True of Voice | epíteto "de palavra perfeita"; vira o prêmio da história |
| `tot` | Tot / Thoth | deus da escrita e da justiça; "juiz que não é parcial" |
| `hery-shef` | Hery-shef / Herishef | deus-carneiro de Heracleópolis, "o que está sobre seu lago" |
| `anubis` | Anúbis / Anubis | deus invocado no clímax; dá nome ao camponês (Khun-Anup) |
| `heqat` | heqat / heqat | medida de grãos (1 galão ≈ 4,77 litros) |

(Decidir se `neb-kau-ra`/`kheti` entra como termo ou fica só em nota.)

---

## 3. Candidatos aos 9 glifos do códex (verificar Gardiner/Faulkner + Unicode antes de fechar)

> Regra de rigor: significado = função e leitura segundo Gardiner/Faulkner. Glifo de capítulo com valor semântico ligado ao tema, não puramente fonético. **Cada valor abaixo precisa ser conferido antes de publicar.**

1. **Asno** 𓃫 (Gardiner E7?) — ꜥꜣ "asno"; logograma/determinativo. Os asnos são o objeto roubado.
2. **Cevada / grão** — jt "cevada" (M34 espiga?); a cevada que o asno come dispara o conflito. *(conferir signo exato)*
3. **Pena de Maât** 𓆄 (H6) — mꜣꜥt; logograma de Maât e da verdade/ordem. Núcleo temático.
4. **Íbis de Tot** 𓅝 (G26) — ḏḥwty; logograma do deus Tot, juiz e escriba.
5. **Peixe** 𓆟 (K1?) — rm "peixe"; determinativo. (alt.: carneiro de Hery-shef, deus de Heracleópolis)
6. **Leme / remo de direção** — ḥmw "leme"; a imagem recorrente do timoneiro e do leme do Estado. *(conferir signo)*
7. **Celeiro / medida** — para a 8ª apelação (celeiro que transborda, medida de grãos). *(conferir signo: heqat / granary)*
8. **Chacal de Anúbis** 𓃢 (E15/E16) — jnpw "Anúbis"; fecha o nome do herói (Khun-Anup) e o clímax.
9. **Rolo de papiro** 𓏛 (Y1) — determinativo de escrita/abstrato; mḏꜣt "rolo"; as apelações copiadas "para a eternidade".

---

## 4. Candidatos a notas arqueológicas / achados (a pesquisar e referenciar com fonte verificável)

Regra: a nota cita sítio/objeto/inscrição reais, nunca reconta a trama. Só entra achado com imagem de licença verificada.

- **Os manuscritos** (= cultura material / faixa da splash): Papiros **Berlin 3023 (B1)** e **3025 (B2)**, **Berlin 10499 (R, Ramesseum)** e **Butler / BM 10274**. Texto integral com 428 linhas. Manuscrito-base sugerido para a ficha: **Papiro Berlin 3023 (B1)**. (paralelo ao Papiro Hermitage do Náufrago.)
- **Heracleópolis Magna (Ihnasya el-Medina)**: capital das dinastias IX–X heracleopolitanas; sítio real escavado (Naville, Petrie, missão espanhola de Padró). Onde fica o tribunal do grande intendente.
- **Hery-shef**: templo do deus-carneiro em Heracleópolis; objeto candidato a achado (ex.: estátua de Herishef no acervo do Museu... a confirmar licença).
- **Uádi Natrun / natrão**: geografia econômica real; o natrão usado na mumificação. Liga o ofício do camponês ao mundo material.
- **O cargo de grande intendente** (imy-r pr wr): realidade administrativa do Reino Médio; conferir Shupak 1992 e Vogelsang 1964 (citados nas notas de Araújo).
- **Tot e a paleta do escriba**: a justiça registrada por escrito; possível achado de paleta real.

(Nem toda nota precisa de achado. Definir 2–3 achados com imagem licenciada.)

---

## 5. Geografia (mapa do index)

Lugares citados, drop-in em `data/geografia.js` com `storyId: 'campones'`:
- **Uádi Natrun** (Sekhet Hemat, ~100 km a noroeste do Cairo) — origem do camponês.
- **Heracleópolis** (Per-Féfi / Nen-nesut) — destino, sede do tribunal.
- **Medenit** — o camponês passa ao norte; topônimo de leitura incerta (nota de Araújo).
- (uádi Natrun e Heracleópolis ficam dentro da carta de 1837; conferir posições.)

---

# TRANSCRIÇÃO FIEL (Araújo, pp. 226–243)

> Marcadores (R x), (B1 x), (B2 x) = numeração de linha dos papiros, mantida da fonte. Asterisco (*) = nota do tradutor. Travessões da fonte preservados aqui; serão reescritos na autoria do site.

## Cap. 1 — A partida de Khun-Anup  *(pp. 226–227)*

**(R 1)** Era uma vez um homem chamado Khun-Anup,¹ camponês do uádi Natrun.² Ele tinha uma mulher cujo nome era [Me]ryt.³ Um dia Khun-Anup disse à sua mulher: "Eis que vou descer ao Egito para trazer comida para meus filhos. Vai e mede para mim a cevada que está no celeiro, o que resta [do ano passado]." Então **(R 5)** mediu vinte [e seis] galões de cevada.⁴ [Em seguida] o camponês disse à sua mulher: "Vê, [ficarão] vinte alqueires de cevada que servirão de alimento <para ti> e teus filhos. Faze para mim esses (outros) seis galões de cevada, pão e cerveja para cada dia em que [estarei viajando]."

Khun-Anup, assim, desceu ao Egito depois de carregar seus asnos com juncos, palmas, *redemet*, **(R 10)** natrão, sal, varas de ---, varetas *iiunt* do oásis de Farafra, peles de leopardo, **(R 15)** peles de lobo, plantas *nesha*, pedras *ibau*, plantas *tenem* e *kheperur*, **(R 20)** *sahut*, grãos *saksut*, plantas *misut*, pedras *senet* e *abau*, **(R 25)** plantas *ibesa* e *inebi*, pombos, pássaros *naru* e *uges*, **(R 30)** plantas *uben* e *tebesu*, grãos *gengenet*, juncas e grãos *inset*, **(R 35)** (em suma) uma quantidade de todos os bons produtos do uádi Natrun.⁶

### Começo da querela

Khun-Anup rumou para o sul em direção a *Heracleópolis e chegou ao território de Per-Féfi, ao norte de Medenit.⁷ Encontrou aí um homem que se postava na margem do rio e cujo nome era Nemti-nakht;⁸ era filho de um

> Notas de pé de página (pp. 226–228):
> ¹ 'Protegido de Anúbis'.
> ² Sekhet Hemat, 'Campo do Sal', oásis a cerca de 100 km a noroeste do Cairo, cujos lagos, numa extensão de 25 km, forneciam sobretudo sal e natrão para o Egito.
> ³ 'Amada'.
> ⁴ Um galão (*heqat*) equivalia a 4,77 litros; assim, foram medidos 124 litros de cevada.
> ⁵ Ta Ihu, 'Terra dos Bois', oásis a 500 km a sudoeste do Cairo, situado no meio de grande planície. Como este local está muito além, para o sul, da provável rota de Khun-Anup, é lícito presumir alguma troca comercial entre os oásis.
> ⁶ A maioria desses produtos, muitos dos quais aparecem em outras fontes como de uso medicinal, é de significado incerto.
> ⁷ Localidades desconhecidas. Observe-se, todavia, que o topônimo Medenit constitui uma formação com *m*, 'abater, sufocar, refrear, estorvar, impedir', dos acontecimentos que se seguem.
> ⁸ 'Nemti é poderoso', formação irônica do nome deste personagem, composto com o deus Nemti, divindade menor talvez padroeira dos viajantes; cf. Parkinson (1997: 70, nota 4).

## Cap. 2 — A armadilha no caminho  *(pp. 228–229)*

homem **(R 40)** chamado Iséri, subordinado ao grande intendente Rensi, filho de Meru.⁹ Então Nemti-nakht disse, ao ver os asnos desse camponês, que agradavam a seu coração: "Pudera eu ter algum poder (mágico) para apossar-me das coisas desse camponês!" Ora, a casa de Nemti-nakht estava em um caminho junto do rio, **(R 45)** muito estreito, não mais largo do que um pano de linho. Um de seus lados estava sob a água e o outro com (plantação de) cevada. Então Nemti-nakht disse a seu criado: "Vai e traze-me uma roupa de minha casa." Ela foi rapidamente trazida e (Nemti-nakht) estendeu-a no meio do caminho, de modo a que uma ponta ficasse na água e a outra na cevada.

Ora, o camponês vinha pelo caminho seguido por todo mundo. **(B1 1)** Então Nemti-nakht disse: "Cuidado, camponês! Passarás por cima de minhas roupas?" O camponês respondeu: "Farei o que queres, mas meu caminho é o certo." O camponês desviou-se para o alto, porém Nemti-nakht disse: **(B1 5)** "Minha (plantação de) cevada te servirá de caminho?" O camponês retrucou: "Meu caminho é o certo. O lado do rio é um precipício (mágico), o (único outro) caminho tem a (plantação de) cevada e me impedes (o meio do) caminho com tuas roupas. Queres então impedir-me de passar pelo caminho?

### Nemti-nakht apodera-se dos asnos

Mal acabara de dizer essas palavras um dos asnos encheu **(B1 10)** a boca com um punhado de cevada. Então Nemti-nakht disse: "Vê, tomarei teu asno, camponês, porque está comendo minha cevada. Ele pisoteará o grão pelo dano que fez." O camponês respondeu: "Meu caminho é o certo. Apenas um (punhado) foi perdido. É por este preço que comprarei meu asno de volta, pois **(B1 15)** se tomas o que ele encheu a boca com um punhado de cevada. Mas sei quem é o senhor deste domínio: pertence ao grande intendente Rensi, filho de Meru. Ele pune qualquer ladrão em toda esta terra. Serei roubado em seu domínio?" Nemti-nakht disse: "Este é o provérbio do povo diz: **(B1 20)** 'O nome do pobre só é pronunciado por causa de seu senhor.' Sou eu quem te fala e é o grande intendente que invocas!"

Então ele pegou uma vara de tamarga verde para agredi-lo,¹¹ açoitou todos os membros (do camponês) e apoderou-se dos asnos, mandados para sua terra. **(B1 25)** O camponês chorou muito por causa dos maus-tratos que lhe foram infligidos. Mas Nemti-nakht disse: "Não levantes a voz, camponês! Eis que estás [no caminho do] que (leva) à morada do Senhor do Silêncio!"¹² O camponês retrucou: "Tu me bateste, roubaste minhas coisas e agora (ainda) **(B1 30)** te aproprias da queixa de minha boca. Ó, Senhor do Silêncio, devolve-me o que é meu e pararei de clamar (para exerceres) teu temor!"

> ⁹ O título *imy-r* significa literalmente 'supervisor da Casa', isto é, dos domínios do rei; o funcionário que exercia o cargo era o mais importante depois do vizir. Ver *AEO*, vol. 2, 45*–47*, Shupak (1992: 5-6) e Vogelsang (1964: 36-37).
> ¹⁰ Literalmente 'é bom'.
> ¹¹ A palavra *iséri*, 'tamarga', é homófona do nome próprio Iséri, pai de Nemti-nakht. O sentido da associação escapa-nos, mas talvez aponte para a violência dessa família.
> ¹² Neb Seger, epíteto de *Osíris, que possuía um santuário nas vizinhanças de *Heracleópolis. Alusão a outro epíteto de Osíris, Neb Sendjet, 'Senhor do Temor' (ou do Medo, ou do Terror).

## Cap. 3 — A queixa e a primeira apelação  *(pp. 229–231)*

### Queixa ao grande intendente

O camponês ficou dez dias a suplicar a Nemti-nakht, que não lhe dava (qualquer) atenção. Assim, o camponês foi para o sul, até *Heracleópolis, para apelar ao grande intendente Rensi, filho de Meru. **(B1 35)** Encontrou-o à porta de casa quando ia descer para sua barca oficial. Então o camponês disse: "Podes permitir comunicar-te uma reclamação? Poderias fazer vir a mim um assistente de tua confiança, a quem eu informaria o ocorrido?" Assim, o grande intendente Rensi, filho de Meru, mandou **(B1 40)** um assistente de sua confiança se dirigisse a Khun-Anup, que o informou sobre a questão em todos os detalhes.

Então o grande intendente Rensi, filho de Meru, denunciou Nemti-nakht aos magistrados que estavam com ele.¹⁴ Estes argumentaram: "Trata-se provavelmente de seus camponeses que vêm (entregar a mercadoria) a outro **(B1 45)** É o que costumam fazer os camponeses, que vêm (entregar mercadorias) a outros. É assim que punem esse Nemti-nakht por um punhado de natrão e um punhado de sal? Se for-lhe ordenado devolver, ele o devolverá." Mas o grande intendente Rensi, filho de Meru, **(B1 50)** ficou em silêncio. Não respondeu nem a esses magistrados nem ao camponês.

### Primeira apelação

Então o camponês veio apelar ao grande intendente Rensi, filho de Meru. Ele disse: "Ó, grande intendente, meu senhor, maior dos maiores, guia de tudo o que (ainda) não existe e do que existe!

> Quando desces pelo lago de **(B1 55)** *Maât
> e por ele navegas com vento favorável,
> nenhuma rajada rasgará tua vela,
> nem teu barco irá devagar.
> Nenhum acidente estragará teu mastro,
> tuas vergas não se partirão.
> Não naufragarás quando aportares,
> nenhuma corrente te arrastará.
> Não experimentarás os perigos **(B1 60)** do rio,
> não verás um rosto com medo.
> Os peixes mais ariscos saltarão (da água) para ti,
> as aves mais gordas te rodearão.
> Pois és um pai para o órfão,
> um marido para a viúva,
> um irmão para a mulher repudiada,
> um avental para o que não tem mãe.

Permite-me fazer teu renome **(B1 65)** nesta terra conforme todas as boas regras:

> Guia isento de ambição,
> grande homem sem maldade,
> destruidor da falsidade,
> cultivador da verdade,
> o que acorre à voz de quem chama.
> Possas ouvir-me quando eu falo!
> Faze justiça, ó louvado,
> louvado pelos louvados!¹⁵
> Tira **(B1 70)** minha angústia, estou oprimido,
> olha por mim, estou na miséria!"

### O grande intendente informa o rei

Ora, o camponês fez essa peroração no tempo da majestade do rei Neb-kau-Rá, *justo de voz.¹⁶ O grande intendente Rensi, filho de Meru, foi diante de Sua Majestade e disse: "Meu senhor, **(B1 75)** encontrei um desses camponeses realmente eloquente.¹⁷ Suas coisas foram roubadas [por um homem que está a meu serviço] e eis que ele veio apelar a mim sobre isso." Sua Majestade disse: "Tanto quanto desejas ver-me com saúde, faze-o demorar-se aqui sem nada responderes ao que ele diga. Para que continue **(B1 80)** a falar, fica tu em silêncio. Mas cuida do sustento de sua mulher e de seus filhos, pois esses camponeses só vêm (ao Egito) quando sua casa está vazia até o chão. Cuida também do sustento do próprio camponês. Farás com que lhe dêem provisões sem deixá-lo saber que foste tu que deste."

Assim, foram dados a ele dez pães e duas bilhas de cerveja **(B1 85)** todo dia. O grande intendente Rensi, filho de Meru, remetia-os a um de seus amigos, e este dava-os a ele. Então o grande intendente Rensi, filho de Meru, mandou (uma mensagem) ao governador do uádi Natrun para que assegurasse alimentação à mulher do camponês, (dando-lhe) três galões de cevada todo dia.¹⁹

> ¹³ 'Amada'.  [nota da abertura — confirmar]
> ¹⁴ Esses magistrados, *seru*, atuavam como conselheiros do grande intendente no tribunal local, além de exercerem a função de juízes. Ver Shupak (1992: 6).
> ¹⁵ Repetição verbal retórica por anáfora: *hesy heses hesyu*.
> ¹⁶ Rá é o senhor dos *kau*, nome de coroação de Khéti III, rei da décima dinastia heracleopolitana.
> ¹⁷ Literalmente 'de palavra perfeita'.
> ¹⁸ O plural majestático não era usado pelos egípcios; assim, o rei alude provavelmente a seu séquito.
> ¹⁹ Isto é, pouco mais de 14 litros.

## Cap. 4 — Segunda e terceira apelações  *(pp. 232–236)*

### Segunda apelação

Então o camponês veio apelar pela segunda vez. Ele disse: "Ó, grande intendente, meu senhor, maior dos maiores, o mais rico dos ricos, que têm (em ti) **(B1 90)** um ainda maior, que têm (em ti) um ainda mais rico!

> Leme do céu, esteio da terra,
> fio de prumo que sustenta o peso!
> Ó, leme, não derives, ó, esteio, não vergues,
> ó, fio de prumo, não osciles!

Um grande senhor pode tomar algo do que (agora) não tem dono e deixar um homem sozinho ser roubado? Teu sustento acha-se em tua casa: uma bilha de cerveja e três pães. Quanto gastas para satisfazer **(B1 95)** teus dependentes? Um mortal (poderoso) morre do mesmo modo que seus subordinados: serás um homem eterno?²⁰

> Não é ruim uma balança que pende,
> um prumo que se inclina,
> um honesto que se perverte?
> Vê, *Maât foge de ti,
> expulsa de seu lugar!
> Os magistrados fazem o mal,
> a retidão é posta de lado,
> os juízes agarram o que foi roubado.
> O que dispõe sobre o reto, **(B1 100)** faz (o reto) balançar torto,
> o que deve dar o ar sufoca quem está embaixo,
> o que deve refrescar faz ofegar.
> O árbitro é espoliador,
> o que deve acabar a pobreza é quem a cria.
> A cidade está submersa,
> o que deve punir o mal comete crimes!"

O grande intendente Rensi, filho de Meru, perguntou: "Teus pertences são mais importantes para teu coração do que (o risco de) seres levado por um de meus assistentes?" **(B1 105)** (Mas) o camponês continuou:

> "O que mede teus grãos frauda em seu proveito,
> o que enche (o celeiro) de outros surrupia sua parte.
> O que deve orientar pela lei comanda o roubo:
> quem, então, punirá o crime?
> O que deve repelir o mal comete faltas,
> um parece direito mas anda por vias tortas,
> outro bandeia-se (abertamente) para o crime.
> Acharás nisso alguma (lição) para ti?
> A punição é curta, a injustiça longa,
> uma boa ação volta a seu lugar de ontem.
> Esta é o preceito:
> 'Faze a quem **(B1 110)** faz como ele faz.'
> Isso significa agradecer a alguém pelo que fez,
> desviar um golpe antes de ele atingir (o alvo),
> dar uma ordem a quem pode executá-la."

Ah, se num momento pudesse abater-te a destruição, estragando tua vinha, diminuindo tuas aves, acabando com teus pássaros aquáticos! Alguém que via te tornasse cego, um que ouvisse ficasse surdo, um guia que se perdesse... **(B1 115)** Ó, cesto! Não foste demasiado longe? Por que ages contra ti mesmo?

> És forte e poderoso, teu braço é valoroso, mas teu coração é ambicioso, a piedade passou a teu largo. É de dar dó o desgraçado por ti destruído! És como um mensageiro de Khenty,²¹ sobrepujas (até) **(B1 120)** a Senhora da Peste.²² O que não é para ti, não é para ela, e nada há contra ela, nada contra ti, se nada fazes, ela nada faz. O rico deve ser generoso, assim como o malfeitor é (sempre) violento. Roubar é natural para quem tem (assim como) o roubo o é para o malfeitor. Não se pode culpar (o pobre), pois ele apenas busca para si **(B1 125)** a sobrevivência. Mas tu estás saciado com teu pão, embriagado com tua cerveja, rico como todo (teu tesouro). Embora o rosto do timoneiro se volte para a frente, o barco deriva como quer. Embora o rei esteja em seu palácio e o leme em tua mão, o mal está a tua volta. Longa é minha súplica, duro é meu dever. 'O que ele quer?', perguntam.

### Terceira apelação

Então o camponês veio apelar pela terceira vez. Ele disse: **(B1 140)** "Ó, grande intendente, meu senhor,

> és *Rá, senhor do céu, com teu séquito.
> O sustento dos homens vem de ti, como a inundação,
> és *Hāpy, que verdeja os prados e fertiliza as terras estéreis.
> Pune o ladrão, protege o miserável,
> não sejas **(B1 145)** uma torrente contra o suplicante!

Toma cuidado porque se aproxima a *eternidade-neheh, e a vontade de durar é como se diz: 'Fazer justiça é como respiração para o nariz.'

> Pune aquele que merece ser punido
> e ninguém será igual a ti em retidão.
> A balança de mão curva-se?
> A balança de pé inclina-se?
> Se *Tot **(B1 150)** concordar com isso,
> então podes fazer o mal.
> Sê como esses três:
> se os três concordarem com isso,
> podes então concordar (também)!²³
> Não respondas ao bem com o mal,
> não ponhas uma coisa no lugar de outra!

Minha peroração cresce mais que a erva *senemyt²⁴ e agride quem lhe respira o odor. Não respondes, (e com isso) irrigas **(B1 155)** o mal e a decepção cresce. (Tiveste) três vezes para fazê-lo agir.

> Se manejares o leme conforme a vela,
> controlarás a correnteza para bem navegares.
> Guarda-te de aportares pela corda do leme,
> o equilíbrio do país está em *Maât!
> Não mintas, pois és grande,
> não ajas com ligeireza, **(B1 160)** pois és um homem de peso!
> Não mintas, pois és a balança,
> não te desvies, pois és a retidão!
> És o mesmo que a balança,
> se ela se inclina, (também) te inclinas.
> Não derives (ao manejar) o leme,
> segura a corda do leme!
> Não pilhes, age contra o ladrão,
> **(B1 165)** não é grande quem é grande em cobiça.
> Tua língua é o prumo (da balança),
> teu coração é o peso,
> teus lábios são os braços.
> Se voltares teu rosto ao violento,
> quem deterá a maldade?
> Eis que és como um miserável lavadeiro,
> um ganancioso que prejudica **(B1 170)** o amigo,
> o que abandona um sócio por seu cliente:
> seu irmão é aquele que vem com presentes.
> Eis que és um barqueiro que (só) atravessa quem paga,
> um reto de retidão em frangalhos.
> Eis que és como o gerente de loja que não favorece o pobre.²⁵
> Eis que és **(B1 175)** um falcão para a gente humilde,
> que vive dos pássaros mais fracos.
> Eis que és um açougueiro cuja alegria é o abate,
> a carnagem é nada para ele.
> Eis que és como um pastor,
> e para mim é um erro não reconheceres (o rebanho)
> e causares desperdício (como) um crocodilo voraz,
> um amparo que abandonou o porto de todo o país!

**(B1 180)** Deves ouvir, (mas) não ouves! Por que não ouves? Hoje me opus a um violento: o crocodilo recua. O que lucras com isso? Ao encontrar-se o segredo de *Maât, a mentira é jogada de costas por terra. Não te prepares para o amanhã antes que ele chegue, (pois) ninguém conhece os males que com ele virão."

Ora, o camponês fez essa peroração **(B1 185)** ao grande intendente Rensi, filho de Meru, na entrada do prédio do tribunal. Então mandou contra ele dois guardas com chicotes e fustigaram todo o seu corpo. O camponês disse: "O filho de Meru erra! Seu rosto está cego ao que vê, surdo ao que ouve e desatento ao que lhe é contado.

> Eis que és como uma cidade **(B1 190)** sem governante,
> como uma tropa sem chefe,
> como um navio sem comandante,
> <como> um grupo sem guia.
> Eis que és como um policial que rouba,
> um governante que aceita (subornos),
> um chefe de distrito que devia punir o crime,
> mas é um modelo para quem age (mal)!"

> ²⁰ Literalmente 'da *eternidade-neheh'?
> ²¹ Deus-crocodilo da morte.
> ²² Epíteto de *Sekhmet.
> ²³ Isto é, o grande intendente deve comportar-se como as duas balanças e o deus Tot.
> ²⁴ Planta não identificada, decerto uma erva daninha.
> ²⁵ O tipo de loja referido, *senbu*, comercializava vários tipos de mercadorias, como utensílios, louças, alimentos etc. Ver *AEO*, vol. 2, 209*–210*.

## Cap. 5 — Quarta e quinta apelações  *(pp. 237–238)*

### Quarta apelação

Então o camponês veio apelar pela quarta vez. Encontrando-o **(B1 195)** ao sair do portão do templo de Hery-shef, ele disse:²⁶ "Ó, louvado, que Hery-shef, de cujo templo sais, te louve! O bem desapareceu, ninguém adere a ele, para jogar de costas a mentira na terra. Se o barco voltou, como atravessar (o rio)? Isso torna-se de ser triste. Passar **(B1 200)** o rio (na) ou a pé...

> [trecho com lacunas; conferir continuidade B1 200–205]
> ...De que nada adianta dizer-te (que) a piedade passou a teu largo (e que) é de dar dó o desgraçado **(B1 205)** por ti destruído!

> Eis que és como um caçador que segue seu impulso,²⁷
> empenhado em fazer o que quer:
> arpoa hipopótamos, trespassa touros selvagens,
> apanha peixes, prende pássaros.
> (Mas) ninguém leve de boca é isento de ansiedade,
> ninguém tem o coração pesado por paixões.²⁸
> Sê paciente **(B1 210)** e busca *Maât,
> contém tua raiva contra aquele que entra humildemente.
> Não há homem impulsivo que pratique a virtude,
> nem arrebatado (cujo) braço seja procurado.

Quando os olhos vêem, o coração é informado. **(B1 215)** Não sejas duro ao exerceres o poder para fazer (um dia) a desgraça não te atinja. Descuida-te de um assunto e ele duplicará. Quem come, saboreia; quem é perguntado, responde. Quem dorme vê o sonho, e o juiz que merece punição é o modelo de quem age (mal). Insensato, eis que és atacado! Ignorante, eis que **(B1 220)** és interrogado! Tu, que tiras água (do barco), eis que és atingido!

> Timoneiro, não deixes teu barco ir à deriva,
> dispensador de vida, não deixes que se morra,
> provedor, não deixes que se pereça,²⁹
> sombra, não queimes como o Sol,
> abrigo, não deixes que o crocodilo rapte!

(Esta é) a quarta vez que te dirijo uma súplica. **(B1 225)** Irei passar nisso todo o meu tempo?"

### Quinta apelação

Então o camponês veio apelar pela quinta vez. Ele disse: "Ó, grande intendente, meu senhor! O pescador *khudu ----, o --- mata o peixe *iy, o pescador de arpão trespassa o peixe *aubeb, o pescador de *djabehu ataca **(B1 230)** o peixe *pâger, o pescador de rede do peixe *uhá devasta o rio.³⁰ Ora, és como eles! Não roubes as coisas de um pobre, um homem humilde que sabes quem é! O ar do pobre são seus pertences, quem os toma tapa-lhe o nariz. Foste nomeado para ouvir as causas, para julgar entre dois homens, **(B1 235)** para punir o assaltante, mas só fazes apoiar o ladrão! Confia-se em ti, mas tornas-te um transgressor! Foste nomeado para (ser) um dique para o miserável, velando para que não se afogue, mas eis que és uma torrente veloz para ele!"

> ²⁶ Deus-carneiro de *Heracleópolis cujo nome significa 'O que está sobre seu lago'. Plutarco (*Sobre Ísis e Osíris*, 37) traduziu-o por Harsáfes e deu seu significado como 'virilidade, coragem'. Sob a nona e décima dinastias heracleopolitanas esse deus foi associado à função real. Ver *AEO*, vol. 2, 113*–114*. Franco (1993: s.v. Héryshef), Hart (1993: s.v. Heryshef) e Vogelsang (1964: 154-159).
> ²⁷ Literalmente 'que lava seu coração'.
> ²⁸ Literalmente '...o coração lento ao mover-se pelo conselho do corpo'.
> ²⁹ Jogo de palavras entre os homófonos 'provedor' e 'perecer, ser destruído', *hetem*.
> ³⁰ O peixe *uhá é o *Synodontis schall* da África tropical e do Nilo: ver Brewer & Friedman (1989: 67-68). Os outros peixes não são identificados.

## Cap. 6 — Sexta e sétima apelações  *(pp. 238–241)*

### Sexta apelação

Então o camponês veio **(B1 240)** apelar pela sexta vez. Ele disse: "Ó, grande intendente, meu senhor!

> <Quem combate a mentira> favorece a verdade,
> quem favorece o bem destrói <o mal>,
> como a saciedade vem para acabar com a fome,
> <como> a roupa <vem> para acabar com a nudez,
> como o céu se acalma depois **(B1 245)** da tempestade,
> aquecendo todos que têm frio,
> como o fogo que cozinha o que é cru,
> como a água aplaca a sede.
> Vê com teus próprios olhos:
> o árbitro é ladrão,
> o pacificador causa tribulação,
> quem devia acalmar **(B1 250)** causa ira.

O trapaceiro zomba de *Maât! Mas quando se enche corretamente (a medida), Maât nem falta nem excede. Se adquirires algo, dá a teu próximo: a voracidade é insensata. Minha dor leva a **(B1 255)** separação, minha acusação provoca partida: não se pode saber o que se passa no coração. Não demores, age sobre a queixa (que fiz)! Se separares, (mas) a água está rasa. O barco quiser entrar (no porto) com a âncora levantada, sua carga se perde **(B1 260)** na margem.

> És instruído, inteligente, talentoso,
> e decerto não és avarento.
> Poderias ser o modelo de todos os homens,
> mas teus casos andam de forma tortuosa!
> O modelo dos homens engana toda a terra!
> O cultivador do mal irriga seu canteiro com maldades,
> até (que em) seu canteiro brote **(B1 265)** mentira
> e irrigará (somente) o mal em (sua) propriedade!"

### Sétima apelação

Então o camponês veio apelar pela sétima vez. Ele disse: "Ó, grande intendente, meu senhor! És o leme de todo o país, o país navega segundo tuas ordens. És um igual a *Tot, o juiz que não é parcial. Meu senhor, sê paciente quando um homem apela a ti **(B1 270)** por sua causa justa. Não te mostres irritado, isso não é digno de ti. O que vê longe torna-se angustiado.³¹ Não te preocupes com o que ainda não aconteceu, não te rejubiles com o que ainda não veio. A indulgência prolonga a amizade, sem levar em conta o passado: não veio. Se a lei for subvertida e *Maât **(B1 275)** destruída, nenhum pobre [poderá] sobreviver: quando for roubado, Maât não chegará até ele.

> Meu corpo estava repleto, meu coração pesado. Como um dique que se rompe e a água sai, assim minha boca se abre para falar. Joguei minha âncora e baldeei minha água, esvaziei o que estava em meu corpo, lavei minha roupa suja. **(B1 280)** Minha peroração terminou, minha desdita completou-se diante de ti. O que queres ainda? Tua lentidão te levará ao erro, tua cobiça te enloquecerá, tua voracidade te criará inimigos. Mas encontrarás outro camponês como eu? Haverá (outro) lento (como tu) em cuja porta baterá um suplicante?

> **(B1 285)** Não há homem calado a quem fizeste falar,
> adormecido a quem tivesses acordado,
> desacordado a quem tivesses animado,
> ninguém de boca fechada a quem tivesses aberto (a boca),
> ignorante a quem tivesses instruído,
> néscio a quem tivesses ensinado.
> (Contudo) os magistrados deviam ser inimigos do mal,
> senhores do bem,
> artesãos que criam o que existe,
> os que juntam cabeças cortadas!"

> ³¹ Literalmente 'o de vista longa fica com o coração estreito'.

## Cap. 7 — Oitava apelação  *(pp. 240–241)*

### Oitava apelação

Então o camponês **(B1 290)** veio apelar pela oitava vez. Ele disse: "Ó, grande intendente, meu senhor! Pode-se cair fundo por causa da ganância. O cobiçoso não terá sucesso, só alcança o fracasso. És cobiçoso, mas isso em nada resulta para ti. Roubas, mas isso não é bom para ti. Quem um homem possa defender sua causa justa! Teu sustento acha-se em tua casa, tua barriga está cheia. A medida de grãos transborda **(B1 295)** e se for sacudida sobrar-se perderá no chão. Ladrão, assaltante, gatuno! Os magistrados foram nomeados para combater o crime, (mas de fato) são um refúgio para o violento! Os magistrados foram nomeados para reprimir a mentira! O medo de ti não me impede de apelar. **(B1 300)** Não conheces meu coração, um homem humilde que volta para censurar-te e que não teme aquele a quem suplica.

> Tens lotes de terra no campo, tuas propriedades no distrito, teu sustento no depósito (de provisões). Os magistrados te dão e tomas (ainda mais!). És então um ladrão? E não te dão quando os soldados acompanham para (se fazer) a divisão dos lotes de terra?

> Faze justiça pelo amor ao Senhor da Justiça,
> cuja justiça encerra a justiça!
> **(B1 305)** Tu, (que és) o cálamo, o papiro, a paleta de *Tot,
> guarda-te de fazer o mal.
> É bom quando a bondade é boa,³²
> pois a justiça é para a *eternidade-neheh:
> ela vai para o túmulo com quem a pratica.
> Quando é sepultado e a terra se junta,
> **(B1 310)** seu *nome não é apagado,
> ele é lembrado pela virtude,
> princípio das palavras do deus.

> Se ele for uma balança de mão, ela não se curvará; se for uma de pé, não se inclinará. Se for eu a vir, se for outro a vir, dirige-lhe a palavra. Não agridas quem te **(B1 315)** falou. Não tens piedade, não te incomodas, não perturbas. Não me agrediu. Não recompenses pela bela peroração³³ que veio da boca do próprio *Rá! Profere justiça, faze justiça, pois ela é grande, é poderosa, ela dura, sua valia é comprovada, ela leva ao estado de *imakhu. Se a balança de **(B1 320)** mão curva-se, então seus pratos estão (demasiado) cheios e não se pode pesar o resultado certo. **(B1 325)** O crime não deve alcançar o porto, mas a honestidade (tem de) chegar à terra."

> ³² Repetição retórica por aliteração: *nefer nefert nefer ref*.
> ³³ Literalmente 'pela fala perfeita'.

## Cap. 8 — Nona apelação  *(p. 242)*

### Nona apelação

**(B2 91)** Então o camponês veio apelar pela nona vez. Ele disse: "Ó, grande-intendente, meu senhor! A língua é a balança de pé dos homens, (mas) é a balança de mão que revela as faltas. Pune aquele que merece ser punido e **(B2 95)** a verdade domina a mentira e deixa que ela viceje, mas a mentira nunca prosperará. Se a mentira andar, ela se extraviará: não atravessará no barco, ela não progredirá. **(B2 100)** Quem enriquecer com ela não terá filhos, não terá herdeiros sobre a terra. Quem navegar com ela não acostará em terra, sua barca não atracará no porto.

> Não sejas pesado, nem tampouco ligeiro,
> não sejas lento, nem tampouco apressado,
> não sejas parcial, nem escutes (só) **(B2 105)** teu coração.
> Não vires o rosto a quem conheces,
> não sejas cego diante de quem já viste,
> não repilas aquele que te suplica.
> Abandona essa lerdeza,
> deixa tua sentença ser ouvida.
> Ajuda a quem te ajudar,
> não ouças qualquer um
> quando um homem apela (a ti) por sua causa justa.

Não existe ontem para o preguiçoso,³⁴ nem amigo para quem é **(B2 110)** surdo à justiça, nem dia de folga para o cobiçoso. O que denuncia (um crime) transforma-se num desgraçado e o desgraçado torna-se um suplicante. O que se torna teu adversário é (seu) assassino. Eis que me dirijo uma súplica e não me ouves! Irei (portanto) suplicar **(B2 115)** por ti a *Anúbis!"

> ³⁴ Isto é, não tem boa reputação no passado; a frase contém um jogo de palavras entre *sef*, 'ontem', e *usef*, 'preguiçoso'.

## Cap. 9 — O veredito e o colofão  *(pp. 242–243)*

### Epílogo

Então o grande intendente Rensi, filho de Meru, mandou dois guardas trazê-lo de volta. O camponês teve medo, achando que se fazia isso para puni-lo pelas perorações que proferira. O camponês disse: "Aproximar um sedento da água, erguer à boca da criança **(B2 128)** que busca leite, assim é a morte, para aquele cuja morte chega (enfim) tarde. Mas (eu) queria ver-te (e) não veio, (para aquele) cuja morte chega (enfim) tarde." Mas o grande intendente Rensi, filho de Meru, retrucou: "Não temas, camponês! Eis o que se fez (foi) contra ti para te obrigar a ficares comigo." O camponês disse: **(B2 125)** "Por minha vida! Terei de comer teu pão e beber tua cerveja (para) sempre?" O grande intendente Rensi, filho de Meru, disse: "Espera aqui para ouvires tuas apelações." E ele fez ler em um rolo de papiro novo cada apelação conforme [seu] conteúdo.

**(B2 130)** Em seguida o grande intendente Rensi, filho de Meru, mandou (o rolo) para a majestade do rei do Alto e do Baixo Egito, Neb-kau Rá, *justo de voz, e isso agradou ao coração [de Sua Majestade] mais que qualquer coisa em todo este país. Sua Majestade ordenou: "Julga tu mesmo, filho de Meru!"

Então [o grande intendente] Rensi, filho de Meru, enviou dois guardas para trazerem Nemti-nakht. **(B2 135)** Ele foi trazido e fez-se um inventário [de seus bens e do] seu pessoal, a saber: seis pessoas, além de ---, sua cevada do Alto Egito, seu trigo, [seus] asnos, [seu rebanho], seus porcos e [seu] gado miúdo. [Então tudo que pertencia] a Nemti-nakht [foi dado] a esse camponês, **(B2 140)** [com toda sua propriedade, todos os seus serviços e tudo o que pertencia] a Nemti-nakht.

### Colofão

Concluiu-se (a cópia), [do começo ao fim, como estava escrito] (no manuscrito).

---

## 6. Decisões abertas (precisam de você)

1. **Registro do texto no site (`storyPt/storyEn`):** as outras histórias usam *reconto acessível* ("Era uma vez..."), não a tradução erudita verbatim. No Camponês o valor literário ESTÁ na retórica das apelações. Mantemos a tradução de Araújo (citando trechos de verso) ou recontamos? Sugiro um híbrido: moldura recontada + apelações citadas em verso (poucas, as mais fortes por capítulo).
2. **Tradução EN:** faço uma versão fiel própria (registro acessível, sem travessões, BCE) a partir da PT, ou prefere partir de uma tradução publicada (Parkinson/Lichtheim) como referência?
3. **Os 9 glifos:** confirmar as escolhas da seção 3 e me liberar pra verificar cada valor em Gardiner/Faulkner (peixe vs. carneiro de Hery-shef no cap. 5; celeiro vs. medida no cap. 7).
4. **Manuscrito da splash (cultura material):** uso o **Papiro Berlin 3023 (B1)** como ficha-base? Preciso de foto com licença verificada.
5. **Achados:** quais 2–3? Candidatos: Heracleópolis Magna (Ihnasya el-Medina), templo/estátua de Hery-shef, paleta de escriba.
6. **Glossário:** ok incluir `heracleopolis`, `uadi-natrun`, `natrao`, `grande-intendente`, `justo-de-voz`, `tot`, `hery-shef`, `anubis`, `heqat`? Algum a cortar/somar?
