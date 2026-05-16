import vm from 'vm'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const ROOT = resolve(import.meta.dirname, '../..')

function makeMockEl() {
  const el = {
    innerHTML: '',
    textContent: '',
    style: { display: '' },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false } },
    setAttribute() {},
    getAttribute() { return null },
    focus() {},
    contains() { return false },
    querySelector() { return makeMockEl() },
    querySelectorAll() { return [] },
    get disabled() { return false },
    set disabled(_) {},
  }
  return el
}

/**
 * Cria um contexto vm isolado com script.js + engine.js carregados.
 * Chama initStory automaticamente para inicializar o estado interno.
 * Aceita dados opcionais: glossary, glyphs, items, chapters.
 */
export function createEngineContext({
  glossary = [],
  glyphs = [],
  items = [{ icon: '🏺', pt: 'Jarro', en: 'Jar' }],
  chapters = [],
} = {}) {
  const _store = {}
  const localStorage = {
    getItem:    k => (_store[k] !== undefined ? _store[k] : null),
    setItem:    (k, v) => { _store[k] = String(v) },
    removeItem: k => { delete _store[k] },
    clear:      () => { for (const k of Object.keys(_store)) delete _store[k] },
  }

  // createElement funcional para ttsPlainText: suporta innerHTML, querySelectorAll('i') e textContent
  const createElement = () => {
    let _html = ''
    return {
      set innerHTML(v) { _html = String(v) },
      get innerHTML()  { return _html },
      querySelectorAll(sel) {
        const found = []
        if (sel === 'i') {
          _html = _html.replace(/<i[^>]*>[\s\S]*?<\/i>/gi, () => {
            found.push({ remove() {} })
            return ''
          })
        }
        return { forEach: fn => found.forEach(fn) }
      },
      get textContent() { return _html.replace(/<[^>]*>/g, '') },
      get innerText()   { return _html.replace(/<[^>]*>/g, '') },
    }
  }

  const ctx = vm.createContext({
    localStorage,
    document: {
      getElementById:  () => makeMockEl(),
      createElement,
      querySelector:   () => makeMockEl(),
      querySelectorAll: () => [],
      documentElement: {
        lang: '',
        getAttribute() { return null },
        setAttribute() {},
        style: {},
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false } },
      },
      addEventListener: () => {},
      activeElement: null,
      body: { innerHTML: '' },
    },
    window: { scrollTo: () => {}, Research: null },
    I18N:          { pt: {}, en: {} },
    CHAPTERS:      chapters,
    ITEMS:         items,
    GLYPHS_CODEX:  glyphs,
    GLOSSARY:      glossary,
    SERPENT_CHAPTER: 999,
  })

  vm.runInContext(readFileSync(resolve(ROOT, 'script.js'),  'utf8'), ctx)
  vm.runInContext(readFileSync(resolve(ROOT, 'engine.js'), 'utf8'), ctx)
  vm.runInContext('initStory({ storyId: "test" })', ctx)

  return { ctx, localStorage }
}

/**
 * Cria um contexto vm isolado com script.js carregado.
 * Cada chamada retorna um contexto fresco (localStorage zerado).
 */
export function createScriptContext() {
  const _store = {}
  const localStorage = {
    getItem:    k => (_store[k] !== undefined ? _store[k] : null),
    setItem:    (k, v) => { _store[k] = String(v) },
    removeItem: k => { delete _store[k] },
    clear:      () => { for (const k of Object.keys(_store)) delete _store[k] },
  }

  const ctx = vm.createContext({
    localStorage,
    document: {
      getElementById:  () => null,
      documentElement: { getAttribute: () => null, setAttribute: () => {} },
    },
    window: {},
  })

  const code = readFileSync(resolve(ROOT, 'script.js'), 'utf8')
  vm.runInContext(code, ctx)

  return { ctx, localStorage }
}

/**
 * Carrega um arquivo JS de dados em vm e extrai uma variável const por nome.
 * Usa `var _out = <name>` para expor a const através do contexto vm.
 */
export function loadDataVar(filePath, varName) {
  const code = readFileSync(resolve(ROOT, filePath), 'utf8')
  const ctx = vm.createContext({
    window: {},
    document: { getElementById: () => null, querySelectorAll: () => [] },
    localStorage: { getItem: () => null, setItem: () => {} },
  })
  vm.runInContext(code, ctx)
  vm.runInContext(`var _out = ${varName}`, ctx)
  return ctx._out
}
