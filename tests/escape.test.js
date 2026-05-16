import { describe, it, expect } from 'vitest'
import { createScriptContext } from './helpers/context.js'

const { ctx } = createScriptContext()

describe('escapeHtml', () => {
  it('escapa &', () => expect(ctx.escapeHtml('a & b')).toBe('a &amp; b'))
  it('escapa <', () => expect(ctx.escapeHtml('<script>')).toBe('&lt;script&gt;'))
  it('escapa >', () => expect(ctx.escapeHtml('a > b')).toBe('a &gt; b'))
  it('escapa "', () => expect(ctx.escapeHtml('"texto"')).toBe('&quot;texto&quot;'))
  it("escapa '", () => expect(ctx.escapeHtml("it's")).toBe("it&#39;s"))
  it('não altera texto sem caracteres especiais', () =>
    expect(ctx.escapeHtml('hello world')).toBe('hello world'))
  it('converte número para string', () => expect(ctx.escapeHtml(42)).toBe('42'))
  it('retorna vazio para string vazia', () => expect(ctx.escapeHtml('')).toBe(''))
})
