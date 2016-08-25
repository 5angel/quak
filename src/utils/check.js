import {curry} from './fp'

export const isType = curry((type, value) => typeof value === type)

export const isInstance = curry((Fn, obj) => obj instanceof Fn)

export const isArray = isInstance(Array)

export const isObject = isType('object')

export const isNumber = isType('number')

export const isFunction = isType('function')

export const isUndefined = value => value === void(0)

export const isArrayish = obj => {
  return obj && isObject(obj) && isNumber(obj.length) &&
    obj.length > 0 && obj.hasOwnProperty(obj.length - 1)
}
