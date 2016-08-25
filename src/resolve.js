import {
  isObject,
  isFunction
} from './utils/check'

export default function resolve(expr, fn, ...named) {
  return (scope, ...rest) => {
    const keys = isObject(scope) ? Object.keys(scope) : []
    const args = keys.map(k => scope[k]).concat(rest)

    const result = new Function(
      keys.concat(named).join(','),
      `return ${expr}`
    ).call(scope, ...args)

    isFunction(fn) && fn(scope)

    return result
  }
}
