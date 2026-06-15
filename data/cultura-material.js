// =============================================================
// Cultura material: fichas de proveniência dos manuscritos reais
// =============================================================
// Cada entrada reúne a foto do papiro original e os dados de catálogo
// do museu que o guarda, separados por storyId. A ideia é mostrar ao
// leitor o objeto físico por trás do texto: de onde vem, como foi
// escrito, onde está hoje.
//
// Para uma história nova, basta adicionar uma chave aqui com o mesmo
// formato. Os rótulos seguem o padrão bilíngue Pt/En do projeto.

const CULTURA_MATERIAL = {
  naufrago: {
    image: 'assets/images/hermitage_1115.jpeg',
    imageAltPt: 'Trecho do Papiro Hermitage 1115, com o texto do Conto do Náufrago em escrita hierática, tinta preta e vermelha sobre papiro.',
    imageAltEn: 'Detail of the Hermitage Papyrus 1115, showing the Tale of the Shipwrecked Sailor in hieratic script, black and red ink on papyrus.',

    titlePt: '"A História do Náufrago", Folha 1',
    titleEn: '"The Tale of the Shipwrecked Sailor", Sheet 1',

    // Legenda curta que aparece sob a foto na tela de entrada.
    captionPt: 'Papiro Hermitage 1115 · Museu Hermitage, São Petersburgo',
    captionEn: 'Hermitage Papyrus 1115 · Hermitage Museum, Saint Petersburg',

    // Crédito da imagem.
    creditPt: '© Museu Estatal Hermitage, São Petersburgo',
    creditEn: '© State Hermitage Museum, Saint Petersburg',

    // Parágrafo de abertura da ficha.
    introPt: 'Este é o único manuscrito que preservou o Conto do Náufrago por completo. Foi identificado pelo egiptólogo russo Vladimir Golenishchev e hoje integra o acervo do Museu Hermitage, em São Petersburgo.',
    introEn: 'This is the only manuscript to preserve the Tale of the Shipwrecked Sailor in full. It was identified by the Russian Egyptologist Vladimir Golenishchev and is now held at the Hermitage Museum in Saint Petersburg.',

    // Link para a ficha do objeto no acervo digital do museu.
    museumUrl: 'https://hermitagemuseum.org/digital-collection/85690',

    // Campos da ficha técnica (catálogo do museu).
    fields: [
      {
        labelPt: 'Número de inventário', labelEn: 'Inventory number',
        valuePt: 'DV-1115', valueEn: 'DV-1115'
      },
      {
        labelPt: 'Datação do manuscrito', labelEn: 'Date of manuscript',
        valuePt: 'A cópia que chegou até nós foi feita entre meados do século XVIII e meados do século XVII AEC (Dinastia XIII, Reino Médio).',
        valueEn: 'The surviving copy was made between the mid-18th and mid-17th century BCE (13th Dynasty, Middle Kingdom).'
      },
      {
        labelPt: 'Datação do texto', labelEn: 'Date of text',
        valuePt: 'A composição original é anterior: provavelmente da primeira metade do século XX AEC (início da Dinastia XII).',
        valueEn: 'The original composition is older: likely the first half of the 20th century BCE (early 12th Dynasty).'
      },
      {
        labelPt: 'Material', labelEn: 'Material',
        valuePt: 'Papiro e tinta', valueEn: 'Papyrus and ink'
      },
      {
        labelPt: 'Técnica', labelEn: 'Technique',
        valuePt: 'Escrita hierática, em egípcio médio', valueEn: 'Hieratic script, in Middle Egyptian'
      },
      {
        labelPt: 'Dimensões', labelEn: 'Dimensions',
        valuePt: 'Altura 12 cm · comprimento 380 cm, dividido em oito partes (48,2; 47,0; 47,5; 48,2; 46,1; 38,4; 50,0 e 54,6 cm).',
        valueEn: 'Height 12 cm · length 380 cm, divided into eight sheets (48.2; 47.0; 47.5; 48.2; 46.1; 38.4; 50.0 and 54.6 cm).'
      },
      {
        labelPt: 'Acervo atual', labelEn: 'Current collection',
        valuePt: 'Museu Estatal Hermitage, São Petersburgo, Rússia',
        valueEn: 'State Hermitage Museum, Saint Petersburg, Russia'
      }
    ]
  },

  sinuhe: {
    image: 'assets/images/berlin_3022.jpg',
    imageAltPt: 'Papiro Berlin 3022, com a História de Sinué em escrita hierática: colunas verticais à esquerda e linhas horizontais à direita.',
    imageAltEn: 'Berlin Papyrus 3022, showing the Tale of Sinuhe in hieratic script: vertical columns on the left and horizontal lines on the right.',

    titlePt: 'Papiro hierático com a história de vida de Sinué (textos B e R)',
    titleEn: 'Hieratic papyrus with the life story of Sinuhe (Texts B and R)',

    captionPt: 'Papiro Berlin 3022 · Museu Egípcio de Berlim',
    captionEn: 'Berlin Papyrus 3022 · Egyptian Museum of Berlin',

    creditPt: '© SMB Ägyptisches Museum und Papyrussammlung · Foto: Lisa Baylis',
    creditEn: '© SMB Ägyptisches Museum und Papyrussammlung · Photo: Lisa Baylis',

    introPt: 'Este é o famoso texto da história de vida de Sinué, uma das obras-primas da literatura clássica egípcia, escrita em egípcio médio. A história se passa no Reino Médio, mas as experiências de Sinué no exílio só foram registradas cerca de 200 anos depois, num estreito rolo de papiro. A autobiografia está entre os textos linguisticamente mais ricos do Egito e ocupava lugar de destaque no currículo escolar do Império Novo.',
    introEn: 'This is the famous text of the life story of Sinuhe, one of the masterpieces of classical Egyptian literature, written in Middle Egyptian. The tale is set in the Middle Kingdom, but Sinuhe\'s experiences in exile were only recorded about 200 years later, on a narrow papyrus roll. The autobiography is among the linguistically richest texts of Egypt and held a prominent place in the New Kingdom school curriculum.',

    museumUrl: 'https://recherche.smb.museum/detail/779872/hieratischer-papyrus-mit-der-lebensgeschichte-des-sinuhe-text-b-und-r',

    fields: [
      {
        labelPt: 'Número de identificação', labelEn: 'Identification number',
        valuePt: 'P 3022/AI', valueEn: 'P 3022/AI'
      },
      {
        labelPt: 'Datação', labelEn: 'Date',
        valuePt: 'Reinado de Amenemhat IV (Dinastia XII, Reino Médio).',
        valueEn: 'Reign of Amenemhat IV (12th Dynasty, Middle Kingdom).'
      },
      {
        labelPt: 'Material / técnica', labelEn: 'Material / technique',
        valuePt: 'Papiro inscrito; escrita hierática, em egípcio médio.',
        valueEn: 'Inscribed papyrus; hieratic script, in Middle Egyptian.'
      },
      {
        labelPt: 'Dimensões', labelEn: 'Dimensions',
        valuePt: 'Altura × largura × profundidade: 17 × 499,3 × 0,02 cm.',
        valueEn: 'Height × width × depth: 17 × 499.3 × 0.02 cm.'
      },
      {
        labelPt: 'Proveniência', labelEn: 'Provenance',
        valuePt: 'Desconhecida (Egito).', valueEn: 'Unknown (Egypt).'
      },
      {
        labelPt: 'Acervo atual', labelEn: 'Current collection',
        valuePt: 'Museu Egípcio e Coleção de Papiros, Staatliche Museen zu Berlin (Neues Museum, sala 211, Berlim, Alemanha).',
        valueEn: 'Egyptian Museum and Papyrus Collection, Staatliche Museen zu Berlin (Neues Museum, room 211, Berlin, Germany).'
      }
    ]
  },

  campones: {
    image: 'assets/images/EA10274.jpg',
    imageAltPt: 'Papiro BM EA 10274, fragmentado e montado entre vidros, com o início do Camponês Eloquente em escrita hierática: colunas de tinta preta com alguns toques de vermelho.',
    imageAltEn: 'Papyrus BM EA 10274, fragmentary and mounted between glass, showing the opening of the Eloquent Peasant in hieratic script: columns of black ink with a few touches of red.',

    titlePt: '"O Camponês Eloquente", início do conto (papiro Butler)',
    titleEn: '"The Eloquent Peasant", opening of the tale (Butler papyrus)',

    captionPt: 'Papiro BM EA 10274 · Museu Britânico, Londres',
    captionEn: 'Papyrus BM EA 10274 · British Museum, London',

    creditPt: '© The Trustees of the British Museum · CC BY-NC-SA 4.0',
    creditEn: '© The Trustees of the British Museum · CC BY-NC-SA 4.0',

    introPt: 'O Camponês Eloquente chegou até nós em quatro cópias do Reino Médio. Nenhuma está completa sozinha, mas juntas dão o texto inteiro, de 430 linhas. A mais completa é o Papiro Berlin 3023 (chamado B1). Este, o "papiro Butler", preserva o começo do conto na frente (recto); no verso traz outra obra, o "Discurso do Passarinheiro". Veio da coleção de Henry Salt, depois de Samuel Butler, e foi achado em Tebas.',
    introEn: 'The Eloquent Peasant has reached us in four Middle Kingdom copies. None is complete on its own, but together they yield the full text of 430 lines. The most complete is Berlin Papyrus 3023 (known as B1). This one, the "Butler papyrus", preserves the opening of the tale on the front (recto); on the back it carries another work, the "Discourse of the Fowler". It came from the collection of Henry Salt, later Samuel Butler, and was found at Thebes.',

    museumUrl: 'https://www.britishmuseum.org/collection/object/Y_EA10274',

    fields: [
      {
        labelPt: 'Número de inventário', labelEn: 'Inventory number',
        valuePt: 'EA 10274', valueEn: 'EA 10274'
      },
      {
        labelPt: 'Datação', labelEn: 'Date',
        valuePt: 'Dinastia XII (Reino Médio).',
        valueEn: '12th Dynasty (Middle Kingdom).'
      },
      {
        labelPt: 'Material / técnica', labelEn: 'Material / technique',
        valuePt: 'Papiro inscrito; escrita hierática, em egípcio médio.',
        valueEn: 'Inscribed papyrus; hieratic script, in Middle Egyptian.'
      },
      {
        labelPt: 'Conteúdo', labelEn: 'Contents',
        valuePt: 'Recto: o início do Camponês Eloquente (40 linhas). Verso: o "Discurso do Passarinheiro".',
        valueEn: 'Recto: the opening of the Eloquent Peasant (40 lines). Verso: the "Discourse of the Fowler".'
      },
      {
        labelPt: 'Dimensões', labelEn: 'Dimensions',
        valuePt: 'Altura × comprimento: 13,7 × 72 cm.',
        valueEn: 'Height × length: 13.7 × 72 cm.'
      },
      {
        labelPt: 'Proveniência', labelEn: 'Provenance',
        valuePt: 'Tebas; coleção de Henry Salt, depois de Samuel Butler.',
        valueEn: 'Thebes; collection of Henry Salt, later Samuel Butler.'
      },
      {
        labelPt: 'Acervo atual', labelEn: 'Current collection',
        valuePt: 'Museu Britânico, Londres, Reino Unido.',
        valueEn: 'British Museum, London, United Kingdom.'
      }
    ]
  }
};

// =============================================================
// Achados: objetos reais citados nas notas arqueológicas
// =============================================================
// Nem toda nota tem um achado; só as que citam um objeto com foto
// de licença verificada e referência de acervo. O span no texto da
// nota carrega class="achado-ref" data-achado="id", e o cartão é
// montado pelo engine (toggleAchado). Campos:
//   image    caminho local da foto (assets/images/)
//   altPt/En texto alternativo da foto
//   namePt/En nome curto do achado
//   refPt/En  uma linha: o que é · onde está (nº de inventário)
//   creditPt/En crédito e licença da foto
//   url       (opcional) ficha do objeto no acervo do museu

const ACHADOS = {
  naufrago: {
    'tesouro-tod': {
      image: 'assets/images/tesouro_tod_louvre.jpg',
      altPt: 'Vitrine do Louvre com o tesouro de Tod: taças de prata, argolas e um dos cofres de metal de Amenemhat II.',
      altEn: 'Louvre showcase with the Tod treasure: silver cups, rings, and one of Amenemhat II\'s metal chests.',
      namePt: 'O tesouro de Tod',
      nameEn: 'The Tod treasure',
      refPt: 'Taças de prata e um dos cofres de Amenemhat II · Museu do Louvre, Paris',
      refEn: 'Silver cups and one of Amenemhat II\'s chests · Louvre Museum, Paris',
      creditPt: 'Foto: Neithsabes, domínio público',
      creditEn: 'Photo: Neithsabes, public domain'
    },
    'estela-mentuwoser': {
      image: 'assets/images/estela_mentuwoser_met.jpg',
      altPt: 'Estela de calcário do mordomo Mentuwoser, com o morto sentado diante de ofertas e linhas de hieróglifos.',
      altEn: 'Limestone stela of the steward Mentuwoser, with the deceased seated before offerings and lines of hieroglyphs.',
      namePt: 'A estela de Mentuwoser',
      nameEn: 'The stela of Mentuwoser',
      refPt: 'Estela autobiográfica de um mordomo real, c. 1944 AEC · The Met, Nova York (12.184)',
      refEn: 'Autobiographical stela of a royal steward, ca. 1944 BCE · The Met, New York (12.184)',
      creditPt: 'Imagem: The Metropolitan Museum of Art, CC0',
      creditEn: 'Image: The Metropolitan Museum of Art, CC0',
      url: 'https://www.metmuseum.org/art/collection/search/544320'
    }
  },

  sinuhe: {
    'piramide-amenemhat': {
      image: 'assets/images/piramide_amenemhat1_lisht.jpg',
      altPt: 'Colina de pedra e areia que restou da pirâmide de Amenemhat I em El-Lisht, atrás de um cemitério moderno.',
      altEn: 'Mound of stone and sand left of Amenemhat I\'s pyramid at El-Lisht, behind a modern cemetery.',
      namePt: 'A pirâmide de Amenemhat I',
      nameEn: 'The pyramid of Amenemhat I',
      refPt: 'O que restou dela hoje, em El-Lisht, ao sul do Cairo',
      refEn: 'What remains of it today, at El-Lisht, south of Cairo',
      creditPt: 'Foto: Ernesto Graf, CC BY-SA 2.0',
      creditEn: 'Photo: Ernesto Graf, CC BY-SA 2.0'
    },
    'procissao-abisha': {
      image: 'assets/images/aamu_facsimile_met.jpg',
      altPt: 'Pintura com dois homens de túnicas coloridas conduzindo um íbex e uma gazela, com hieróglifos acima.',
      altEn: 'Painting of two men in colorful tunics leading an ibex and a gazelle, with hieroglyphs above.',
      namePt: 'Os líderes da caravana de Abisha',
      nameEn: 'The leaders of Abisha\'s caravan',
      refPt: 'Fac-símile de N. de Garis Davies (1931) da pintura de Beni Hassan · The Met, Nova York (33.8.17)',
      refEn: 'Facsimile by N. de Garis Davies (1931) of the Beni Hassan painting · The Met, New York (33.8.17)',
      creditPt: 'Imagem: The Metropolitan Museum of Art, CC0',
      creditEn: 'Image: The Metropolitan Museum of Art, CC0',
      url: 'https://www.metmuseum.org/art/collection/search/544548'
    },
    'soldados-mesehti': {
      image: 'assets/images/mesehti_soldados_cairo.jpg',
      altPt: 'Modelo de madeira pintada com fileiras de lanceiros egípcios segurando escudos e lanças.',
      altEn: 'Painted wooden model with rows of Egyptian spearmen holding shields and spears.',
      namePt: 'Os lanceiros de Mesehti',
      nameEn: 'Mesehti\'s spearmen',
      refPt: 'Os quarenta lanceiros do modelo de Assiut · Grande Museu Egípcio, Gizé (CG 258)',
      refEn: 'The forty spearmen of the Asyut model · Grand Egyptian Museum, Giza (CG 258)',
      creditPt: 'Foto: Udimu, CC BY-SA 3.0',
      creditEn: 'Photo: Udimu, CC BY-SA 3.0'
    },
    'peitoral-sithathoryunet': {
      image: 'assets/images/pectoral_sithathoryunet_met.jpg',
      altPt: 'Peitoral de ouro incrustado de pedras azuis, vermelhas e verdes, com dois falcões e o nome de Sesostris II.',
      altEn: 'Gold pectoral inlaid with blue, red, and green stones, with two falcons and the name of Sesostris II.',
      namePt: 'O peitoral de Sithathoryunet',
      nameEn: 'Sithathoryunet\'s pectoral',
      refPt: 'Ouro, lápis-lazúli e outras pedras, achado em Lahun · The Met, Nova York (16.1.3a, b)',
      refEn: 'Gold, lapis lazuli, and other stones, found at Lahun · The Met, New York (16.1.3a, b)',
      creditPt: 'Imagem: The Metropolitan Museum of Art, CC0',
      creditEn: 'Image: The Metropolitan Museum of Art, CC0',
      url: 'https://www.metmuseum.org/art/collection/search/544232'
    },
    'estatua-sehetepibreankh': {
      image: 'assets/images/sehetepibreankh_met.jpg',
      altPt: 'Estátua de calcário de um homem sentado, com peruca até os ombros e inscrições nas laterais do assento.',
      altEn: 'Limestone statue of a seated man with a shoulder-length wig and inscriptions on the sides of the seat.',
      namePt: 'O mordomo Sehetepibreankh',
      nameEn: 'The steward Sehetepibreankh',
      refPt: 'Estátua achada no túmulo dele, junto à pirâmide, em Lisht Sul · The Met, Nova York (24.1.45)',
      refEn: 'Statue found in his tomb, beside the pyramid, at Lisht South · The Met, New York (24.1.45)',
      creditPt: 'Imagem: The Metropolitan Museum of Art, CC0',
      creditEn: 'Image: The Metropolitan Museum of Art, CC0',
      url: 'https://www.metmuseum.org/art/collection/search/573446'
    }
  },

  campones: {
    'uadi-natrun': {
      image: 'assets/images/uadi_natrun_nasa.jpg',
      altPt: 'Vista aérea de um lago salgado do uádi Natrun, com a água esverdeada cercada por crostas claras de sal no deserto.',
      altEn: 'Aerial view of a salt lake in Wadi Natrun, its greenish water ringed by pale crusts of salt in the desert.',
      namePt: 'Os lagos de sal do uádi Natrun',
      nameEn: 'The salt lakes of Wadi Natrun',
      refPt: 'Um dos lagos da depressão, onde o natrão aflora sozinho · deserto ocidental do Egito',
      refEn: 'One of the lakes in the depression, where natron forms on its own · Egypt\'s Western Desert',
      creditPt: 'Imagem: NASA, domínio público',
      creditEn: 'Image: NASA, public domain'
    },
    'barco-pesca-meketre': {
      image: 'assets/images/barco_pesca_meketre_met.jpg',
      altPt: 'Modelo de madeira pintada de um barco de papiro com homens em pé fincando arpões longos na água.',
      altEn: 'Painted wooden model of a papyrus boat with men standing and driving long harpoons into the water.',
      namePt: 'O barco de pesca de Meketre',
      nameEn: 'Meketre\'s fishing boat',
      refPt: 'Modelo de madeira da tumba tebana de Meketre (Deir el-Bahari), c. 1980 AEC · um dos 24 modelos divididos em 1920 entre o Cairo e o Met, Nova York (20.3.6)',
      refEn: 'Wooden model from the Theban tomb of Meketre (Deir el-Bahari), ca. 1980 BCE · one of 24 models split in 1920 between Cairo and the Met, New York (20.3.6)',
      creditPt: 'Imagem: The Metropolitan Museum of Art, CC0',
      creditEn: 'Image: The Metropolitan Museum of Art, CC0',
      url: 'https://www.metmuseum.org/art/collection/search/544126'
    },
    'barco-meketre': {
      image: 'assets/images/barco_meketre_met.jpg',
      altPt: 'Modelo de madeira de um barco a remo, com remadores e, na popa, um timoneiro de pé segurando o grande remo-leme.',
      altEn: 'Wooden model of a rowed boat, with oarsmen and, at the stern, a steersman standing and holding the great steering oar.',
      namePt: 'O barco de viagem de Meketre',
      nameEn: 'Meketre\'s travelling boat',
      refPt: 'Modelo de madeira da tumba tebana de Meketre (Deir el-Bahari), com o timoneiro ao leme, c. 1980 AEC · um dos 24 modelos divididos em 1920 entre o Cairo e o Met, Nova York (20.3.1)',
      refEn: 'Wooden model from the Theban tomb of Meketre (Deir el-Bahari), with the steersman at the rudder, ca. 1980 BCE · one of 24 models split in 1920 between Cairo and the Met, New York (20.3.1)',
      creditPt: 'Imagem: The Metropolitan Museum of Art, CC0',
      creditEn: 'Image: The Metropolitan Museum of Art, CC0',
      url: 'https://www.metmuseum.org/art/collection/search/544214'
    },
    'celeiro-meketre': {
      image: 'assets/images/celeiro_meketre_met.jpg',
      altPt: 'Modelo de madeira de um celeiro: homens carregam sacos de grão enquanto escribas sentados registram as medidas.',
      altEn: 'Wooden model of a granary: men carry sacks of grain while seated scribes record the measures.',
      namePt: 'O celeiro de Meketre',
      nameEn: 'Meketre\'s granary',
      refPt: 'Modelo de madeira da tumba tebana de Meketre (Deir el-Bahari), com escribas contando o grão, c. 1980 AEC · um dos 24 modelos divididos em 1920 entre o Cairo e o Met, Nova York (20.3.11)',
      refEn: 'Wooden model from the Theban tomb of Meketre (Deir el-Bahari), with scribes counting the grain, ca. 1980 BCE · one of 24 models split in 1920 between Cairo and the Met, New York (20.3.11)',
      creditPt: 'Imagem: The Metropolitan Museum of Art, CC0',
      creditEn: 'Image: The Metropolitan Museum of Art, CC0',
      url: 'https://www.metmuseum.org/art/collection/search/545281'
    }
  }
};
