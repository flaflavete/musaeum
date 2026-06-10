import { describe, it, expect, beforeEach } from 'vitest'
import { createEngineContext } from './helpers/context.js'

// ── shuffleArray ──────────────────────────────────────────────────────────────

describe('shuffleArray', () => {
  const { ctx } = createEngineContext()

  it('retorna array com os mesmos elementos', () => {
    const result = ctx.shuffleArray([1, 2, 3, 4, 5])
    expect(result.sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5])
  })

  it('não muta o array original', () => {
    const original = [1, 2, 3]
    ctx.shuffleArray(original)
    expect(original).toEqual([1, 2, 3])
  })

  it('retorna array vazio para entrada vazia', () => {
    expect(ctx.shuffleArray([])).toEqual([])
  })

  it('retorna array de único elemento intacto', () => {
    expect(ctx.shuffleArray([42])).toEqual([42])
  })

  it('preserva todos os elementos sem duplicatas', () => {
    const input = ['a', 'b', 'c', 'd', 'e']
    const result = ctx.shuffleArray(input)
    expect(result.length).toBe(input.length)
    expect(new Set(result).size).toBe(input.length)
  })
})

// ── discoverGlyph ─────────────────────────────────────────────────────────────

describe('discoverGlyph', () => {
  const testGlyphs = [
    { glyph: '𓋹', translit: 'ꜥnḫ', namePt: 'Ankh', nameEn: 'Ankh',
      chapter: -1, typeKey: 'type-a', meaningPt: 'Vida', meaningEn: 'Life', notePt: '', noteEn: '' },
    { glyph: '𓆑', translit: 'f', namePt: 'Víbora', nameEn: 'Viper',
      chapter: 0, typeKey: 'type-b', meaningPt: 'Som f', meaningEn: 'Sound f', notePt: '', noteEn: '' },
  ]
  let ctx

  beforeEach(() => {
    ;({ ctx } = createEngineContext({ glyphs: testGlyphs }))
  })

  it('adiciona novo hieróglifo ao conjunto de descobertos', () => {
    ctx.discoverGlyph(1)
    ctx.saveState()
    expect(ctx.storeGet('test').discoveredGlyphs).toContain(1)
  })

  it('não duplica hieróglifo já descoberto', () => {
    ctx.discoverGlyph(0)
    ctx.discoverGlyph(0)
    ctx.saveState()
    const saved = ctx.storeGet('test')
    expect(saved.discoveredGlyphs.filter(g => g === 0).length).toBe(1)
  })

  it('registra múltiplos hieróglifos distintos', () => {
    ctx.discoverGlyph(0)
    ctx.discoverGlyph(1)
    ctx.saveState()
    const saved = ctx.storeGet('test')
    expect(saved.discoveredGlyphs).toContain(0)
    expect(saved.discoveredGlyphs).toContain(1)
  })
})

// ── saveState / loadState ─────────────────────────────────────────────────────

describe('saveState / loadState', () => {
  it('salva campos essenciais do estado', () => {
    const { ctx } = createEngineContext()
    ctx.saveState()
    const saved = ctx.storeGet('test')
    expect(saved).not.toBeNull()
    expect(saved).toHaveProperty('lang', 'pt')
    expect(saved).toHaveProperty('screen', 'splash')
    expect(saved).toHaveProperty('score', 0)
    expect(saved).toHaveProperty('chapter', 0)
    expect(Array.isArray(saved.discoveredGlyphs)).toBe(true)
  })

  it('loadState retorna false quando não há estado salvo', () => {
    const { ctx, localStorage } = createEngineContext()
    localStorage.removeItem('musaeum-stories')
    expect(ctx.loadState()).toBe(false)
  })

  it('loadState recupera score, idioma e capítulo salvos', () => {
    const { ctx } = createEngineContext()
    ctx.storeSave('test', {
      score: 77, lang: 'en', screen: 'story', chapter: 3,
      collected: [], discoveredGlyphs: [], codexHasNew: false,
      answered: false, attempts: 0,
    })
    ctx.loadState()
    ctx.saveState()
    const restored = ctx.storeGet('test')
    expect(restored.score).toBe(77)
    expect(restored.lang).toBe('en')
    expect(restored.chapter).toBe(3)
  })

  it('loadState sempre repõe screen como splash', () => {
    const { ctx } = createEngineContext()
    ctx.storeSave('test', { screen: 'minigame', chapter: 2, score: 50,
      discoveredGlyphs: [], collected: [] })
    ctx.loadState()
    ctx.saveState()
    expect(ctx.storeGet('test').screen).toBe('splash')
  })
})

// ── onAnswer — cálculo de pontos ──────────────────────────────────────────────

describe('onAnswer — cálculo de pontos', () => {
  const mockQ = { factPt: 'Fato.', factEn: 'Fact.' }

  it('primeira tentativa correta vale 20 pontos', () => {
    const { ctx } = createEngineContext()
    const before = ctx.storeGet('test')?.score ?? 0
    ctx.onAnswer(true, mockQ, true)
    expect(ctx.storeGet('test').score - before).toBe(20)
  })

  it('acerto com firstTry=false e 0 tentativas vale 2 pontos', () => {
    const { ctx } = createEngineContext()
    const before = ctx.storeGet('test')?.score ?? 0
    ctx.onAnswer(true, mockQ, false)
    expect(ctx.storeGet('test').score - before).toBe(2)
  })

  it('acerto na primeira tentativa coleta o item do capítulo', () => {
    const { ctx } = createEngineContext()
    ctx.onAnswer(true, mockQ, true)
    expect(ctx.storeGet('test').collected[0]).toBe(true)
  })

  it('acerto fora da primeira tentativa não coleta item', () => {
    const { ctx } = createEngineContext()
    ctx.onAnswer(true, mockQ, false)
    expect(ctx.storeGet('test').collected[0]).toBe(false)
  })

  it('responder de novo o mesmo capítulo não soma pontos de novo', () => {
    const { ctx } = createEngineContext()
    ctx.onAnswer(true, mockQ, true)
    const scoreAfterFirst = ctx.storeGet('test').score
    // simula recarregar a página e responder o mesmo desafio outra vez
    ctx.onAnswer(true, mockQ, true)
    const saved = ctx.storeGet('test')
    expect(saved.score).toBe(scoreAfterFirst)
    expect(saved.answeredChapters[0]).toBe(true)
  })
})

// ── renderGlossaryList — filtro e ordenação ───────────────────────────────────

describe('renderGlossaryList', () => {
  const testGlossary = [
    { id: 'ba',   termPt: 'Ba',   termEn: 'Ba',   defPt: 'Aspecto da alma',  defEn: 'Aspect of soul',   tagPt: 'conceito', tagEn: 'concept' },
    { id: 'ankh', termPt: 'Ankh', termEn: 'Ankh', defPt: 'Símbolo da vida', defEn: 'Symbol of life',   tagPt: 'símbolo',  tagEn: 'symbol'  },
    { id: 'ka',   termPt: 'Ka',   termEn: 'Ka',   defPt: 'Força vital',     defEn: 'Vital force',      tagPt: 'conceito', tagEn: 'concept' },
  ]

  it('renderiza todos os termos quando não há filtro', () => {
    const { ctx } = createEngineContext({ glossary: testGlossary })
    const html = ctx.renderGlossaryList()
    expect(html).toContain('Ankh')
    expect(html).toContain('Ba')
    expect(html).toContain('Ka')
  })

  it('ordena os termos em ordem alfabética', () => {
    const { ctx } = createEngineContext({ glossary: testGlossary })
    const html = ctx.renderGlossaryList()
    expect(html.indexOf('Ankh')).toBeLessThan(html.indexOf('Ba'))
    expect(html.indexOf('Ba')).toBeLessThan(html.indexOf('Ka'))
  })

  it('filtra termos pela busca', () => {
    const { ctx } = createEngineContext({ glossary: testGlossary })
    ctx.document.getElementById = (id) => {
      if (id === 'glossarySearchInput') return { value: 'ankh' }
      return { innerHTML: '', style: {}, classList: { toggle() {} }, setAttribute() {} }
    }
    ctx.filterGlossary()
    const html = ctx.renderGlossaryList()
    expect(html).toContain('Ankh')
    expect(html).not.toContain('>Ka<')
    expect(html).not.toContain('>Ba<')
  })

  it('retorna mensagem de vazio quando não há resultados', () => {
    const { ctx } = createEngineContext({ glossary: testGlossary })
    ctx.document.getElementById = (id) => {
      if (id === 'glossarySearchInput') return { value: 'xyzxyzxyz' }
      return { innerHTML: '', style: {}, classList: { toggle() {} }, setAttribute() {} }
    }
    ctx.filterGlossary()
    const html = ctx.renderGlossaryList()
    expect(html).toContain('glossary-empty')
  })

  it('usa termos em inglês quando idioma é "en"', () => {
    const { ctx } = createEngineContext({ glossary: [
      { id: 'djed', termPt: 'Djed (pt)', termEn: 'Djed (en)',
        defPt: 'Coluna', defEn: 'Column', tagPt: 'símbolo', tagEn: 'symbol' },
    ]})
    ctx.setLang('en')
    const html = ctx.renderGlossaryList()
    expect(html).toContain('Djed (en)')
    expect(html).not.toContain('Djed (pt)')
  })
})
