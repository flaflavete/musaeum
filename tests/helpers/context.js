import vm from 'vm'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const ROOT = resolve(import.meta.dirname, '../..')

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
