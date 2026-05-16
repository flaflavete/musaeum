import { describe, it, expect, beforeEach } from 'vitest'
import { createScriptContext } from './helpers/context.js'

let ctx, localStorage

beforeEach(() => {
  ;({ ctx, localStorage } = createScriptContext())
})

// ── storeGet / storeSave ──────────────────────────────────────────────────────

describe('storeGet / storeSave', () => {
  it('retorna null quando nada foi salvo', () => {
    expect(ctx.storeGet('naufrago')).toBeNull()
  })

  it('salva e recupera dados de uma história', () => {
    const data = { screen: 'final', score: 100 }
    ctx.storeSave('naufrago', data)
    expect(ctx.storeGet('naufrago')).toEqual(data)
  })

  it('preserva outras histórias ao salvar uma nova', () => {
    ctx.storeSave('naufrago', { score: 80 })
    ctx.storeSave('sinuhe', { score: 60 })
    expect(ctx.storeGet('naufrago')).toEqual({ score: 80 })
    expect(ctx.storeGet('sinuhe')).toEqual({ score: 60 })
  })

  it('retorna null se o JSON estiver corrompido', () => {
    localStorage.setItem('musaeum-stories', 'CORROMPIDO')
    expect(ctx.storeGet('naufrago')).toBeNull()
  })

  it('usa a chave musaeum-stories', () => {
    ctx.storeSave('naufrago', { score: 10 })
    expect(localStorage.getItem('musaeum-stories')).not.toBeNull()
  })
})

// ── getPlayerName ─────────────────────────────────────────────────────────────

describe('getPlayerName', () => {
  it('retorna null quando nenhum nome foi salvo', () => {
    expect(ctx.getPlayerName()).toBeNull()
  })

  it('retorna o nome salvo', () => {
    localStorage.setItem('musaeum-player', JSON.stringify({ name: 'Flavia' }))
    expect(ctx.getPlayerName()).toBe('Flavia')
  })

  it('retorna null se o JSON estiver corrompido', () => {
    localStorage.setItem('musaeum-player', 'CORROMPIDO')
    expect(ctx.getPlayerName()).toBeNull()
  })
})

// ── migrateOldSaves ───────────────────────────────────────────────────────────

describe('migrateOldSaves', () => {
  it('migra musaeum-naufrago legado para o store novo', () => {
    localStorage.setItem('musaeum-naufrago', JSON.stringify({ score: 50 }))
    ctx.migrateOldSaves()
    expect(ctx.storeGet('naufrago')).toEqual({ score: 50 })
    expect(localStorage.getItem('musaeum-naufrago')).toBeNull()
  })

  it('migra musaeum-sinuhe legado para o store novo', () => {
    localStorage.setItem('musaeum-sinuhe', JSON.stringify({ score: 30 }))
    ctx.migrateOldSaves()
    expect(ctx.storeGet('sinuhe')).toEqual({ score: 30 })
    expect(localStorage.getItem('musaeum-sinuhe')).toBeNull()
  })

  it('não sobrescreve dados novos existentes ao migrar', () => {
    ctx.storeSave('naufrago', { score: 80 })
    localStorage.setItem('musaeum-naufrago', JSON.stringify({ score: 50 }))
    ctx.migrateOldSaves()
    expect(ctx.storeGet('naufrago')).toEqual({ score: 80 })
  })
})

// ── lógica de desbloqueio do certificado ─────────────────────────────────────

describe('allStoriesComplete (lógica do certificado)', () => {
  const AVAILABLE = ['naufrago']
  const allComplete = (storeGet) =>
    AVAILABLE.every(id => { const s = storeGet(id); return s && s.screen === 'final' })

  it('false quando não há save', () => {
    expect(allComplete(ctx.storeGet)).toBe(false)
  })

  it('false quando história está em andamento', () => {
    ctx.storeSave('naufrago', { screen: 'chapter', score: 80 })
    expect(allComplete(ctx.storeGet)).toBe(false)
  })

  it('true quando todas as histórias têm screen=final', () => {
    ctx.storeSave('naufrago', { screen: 'final', score: 140 })
    expect(allComplete(ctx.storeGet)).toBe(true)
  })
})
