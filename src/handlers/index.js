import each from './each'

const REGULAR = []
const NAMED = {
  each
}

export function getHandler(name) {
  let handler = NAMED[name]

  if (handler) {
    return handler
  }

  for (const item of REGULAR) {
    if (item.test.test(name)) {
      return item
    }
  }

  return null
}

export function addHandler(name, handler) {
  return NAMED[name] = handler
}
