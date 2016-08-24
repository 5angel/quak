import {
  isObject,
  isFunction
} from './utils'

export default function resolve(expr, cb, ...named) {
  return function (scope, ...rest) {
    const keys = isObject(scope) ? Object.keys(scope) : []
    const args = keys.map(k => {
      return scope[k]
    }).concat(rest)

    const result = new Function(
      keys.concat(named).join(','),
      `return ${expr}`
    ).call(scope, ...args)

    isFunction(cb) && cb(scope)

    return result
  }
}
