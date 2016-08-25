import each from './each'

const REGULAR = []
const NAMED = {
  each
}

export const getHandler = (name) => {
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

export const addHandler = (name, handler) => {
  return NAMED[name] = handler
}
