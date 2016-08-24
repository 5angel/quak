export function isArray(value) {
  return value instanceof Array
}

export function isObject(value, allowNull = false) {
  const result = typeof value === 'object'

  if (result && !value) {
    return allowNull
  }

  return result
}

export function isUndefined(value) {
  return value === void(0)
}

export function isFunction(value) {
  return typeof value === 'function'
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

export function each(collection, cb) {
  for (const key in collection) {
    if (collection.hasOwnProperty(key)) {
      cb(collection[key], key)
    }
  }
}

export function contains(collection, value) {
  return collection.indexOf(value) !== -1
}

export function toArray(collection) {
  return Array.prototype.slice.call(collection)
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

export function defineMethods(obj, config) {
  each(config, (value, key) => {
    defineProperty(obj, key, curry(value, obj))
  })
}

export function defineProperty(obj, name, value) {
  Object.defineProperty(obj, name, {value})
}

export function curry(f, ...rest) {
  return (...more) => f(...rest, ...more)
}
