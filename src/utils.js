const TAGS = ['each']
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

export function isUndefined(value) {
  return value === void(0)
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isTag(value) {
  return contains(TAGS, value)
}

export function isHandler(str) {
  return RE_EVENTS.test(str)
}

export function toEvent(str) {
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
