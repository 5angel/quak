import {
  isObject,
  isFunction
} from './utils'

export default function resolve(expr, cb) {
  return function (scope, $event) {
    const keys = isObject(scope) ? Object.keys(scope) : []

    const args = keys.map(k => {
      return scope[k]
    }).concat($event)

    keys.push('$event')

    const result = new Function(
      keys.join(','),
      `return ${expr}`
    ).call(scope, ...args)

    isFunction(cb) && cb(scope)

    return result
  }
}
