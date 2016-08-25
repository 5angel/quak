import {curry, bind, noop} from './fp'
import {isArray, isArrayish} from './check'

export const toArray = collection => Array.prototype.slice.call(collection)

export function extend(...rest) {
  const target = {}
  for (const obj of rest) {
    each((value, prop) => {
      target[prop] = value
    }, obj)
  }
  return target
}

export const contains = curry((value, collection) => {
  if (isArrayish(collection)) {
    return toArray(collection).indexOf(value)
  }

  return collection && collection.hasOwnProperty(value)
})

export const iterateObject = curry((onResult, fn, obj) => {
  let index = 0
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const value = obj[prop]
      onResult(fn(value, prop, index), value, prop, index)
      index++
    }
  }
})

export const each = curry((fn, collection) => {
  if (isArrayish(collection)) {
    for (let i = 0; i < collection.length; ++i) {
      fn(collection[i], i)
    }
  } else {
    iterateObject(noop, fn, collection)
  }
})

export const defineProperty = curry((obj, name, value) => {
  Object.defineProperty(obj, name, {value})
})

export const defineMethods = curry((obj, config) => {
  const target = extend(obj)

  each((value, key) => {
    defineProperty(target, key, curry(value, obj))
  }, config)

  return target
})
