import each from './each'

const HANDLERS = {
  each
}

export function getHandler(name, value) {
  return HANDLERS[name] || null
}

export function addHandler(name, fn) {
  return HANDLERS[name] = fn
}
