const SPECIAL = ['each']
const RE_EVENTS = /^on(click)$/

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

export function isUndef(value) {
  return typeof value === void(0)
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isView(value) {
  return contains(SPECIAL, value)
}

export function getEvent(str) {
  const [,name] = str.match(RE_EVENTS) || []
  return name
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

export function resolve(scope, expr, cb) {
  return function () {
    try {
      const keys = !isObject(scope) ? []: Object.keys(scope)
      const vals = keys.map(k => scope[k])
      const result = new Function(
        keys.join(','),
        `return ${expr}`
      ).call(scope, ...vals)

      isFunction(cb) && cb()

      return result
    } catch (error) {

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
