// =============================================================
// Cultura material — fichas de proveniência dos manuscritos reais
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
    titleEn: 'Hieratic papyrus with the life story of Sinuhe (Text B and R)',

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
  }
};
