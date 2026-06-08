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
  }
};
