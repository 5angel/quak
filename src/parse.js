import {walkNodes} from './utils/dom'
import {each} from './utils/common'
import {getHandler} from 'handlers/index'

const RE_EXPR = /{([^{]+)}/g

const parseExpressions = (tmpl, attr = null) => {
  const list = []
  let match
  while (match = RE_EXPR.exec(tmpl)) {
    const [value,expr] = match
    list.push({tmpl, value, expr, attr})
  }
  return list
}

const parseAttributes = (attributes = []) => {
  const handlers = []
  const bindings = []

  each(({value: expr, name: attr}) => {
    const factory = getHandler(attr)

    if (factory) {
      attributes.removeNamedItem(attr)
      handlers.push(factory(expr))
    } else {
      bindings.push(expr, attr)
    }
  }, attributes)

  return [handlers, bindings]
}

export default function parse(container) {
  const result = []

  walkNodes(node => {
    const [handlers, bindings] = parseAttributes(node.attributes)

    if (node.nodeType === 3) { // text
      bindings.push(...parseExpressions(node.nodeValue))
    }

    handlers.node = bindings.node = node

    if (handlers.length + bindings.length > 0) {
      result.push({handlers, bindings})

      return !handlers.some(handle => handle.model)
    }

    return true
  }, container)

  return result
}
