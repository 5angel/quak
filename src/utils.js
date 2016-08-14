export function isArray(value) {
  return value instanceof Array
}

export function isUndef(value) {
  return typeof value === void(0)
}

const SPECIAL = ['each']

export function isView(value) {
  return contains(SPECIAL, value)
}

export function extend(target, ...rest) {
  for (const obj of rest) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        target[prop] = obj[prop]
      }
    }
  }

  return target
}

export function contains(collection, value) {
  return collection.indexOf(value) !== -1
}

export function toArray(collection) {
  return Array.prototype.slice.call(collection)
}

export function resolve(expr, model) {
  const path = expr.split('.')

  while (model && path.length) {
    model = model[path.shift()]
  }

  return model
}

export function walkDom(node, cb) {
  if (!node) {
    return
  }

  if (cb(node)) {
    for (const child of toArray(node.childNodes)) {
      walkDom(child, cb)
    }
  }
}
