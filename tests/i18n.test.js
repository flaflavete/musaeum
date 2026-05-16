import { describe, it, expect } from 'vitest'
import { loadDataVar } from './helpers/context.js'

// ── data/naufrago.js — objeto I18N ────────────────────────────────────────────

describe('i18n — data/naufrago.js', () => {
  const I18N = loadDataVar('data/naufrago.js', 'I18N')

  it('tem as chaves pt e en', () => {
    expect(I18N).toHaveProperty('pt')
    expect(I18N).toHaveProperty('en')
  })

  it('en contém todas as chaves de pt', () => {
    const missing = Object.keys(I18N.pt).filter(k => !(k in I18N.en))
    expect(missing, `Chaves ausentes em en: ${missing.join(', ')}`).toEqual([])
  })

  it('pt contém todas as chaves de en', () => {
    const missing = Object.keys(I18N.en).filter(k => !(k in I18N.pt))
    expect(missing, `Chaves ausentes em pt: ${missing.join(', ')}`).toEqual([])
  })

  it('nenhuma chave tem valor vazio ou nulo em pt', () => {
    for (const [key, val] of Object.entries(I18N.pt)) {
      expect(val, `I18N.pt['${key}'] está vazio`).toBeTruthy()
    }
  })

  it('nenhuma chave tem valor vazio ou nulo em en', () => {
    for (const [key, val] of Object.entries(I18N.en)) {
      expect(val, `I18N.en['${key}'] está vazio`).toBeTruthy()
    }
  })
})
