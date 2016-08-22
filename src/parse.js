import {
  extend,
  toArray,
  walkDom
} from './utils'

import {getHandler} from 'handlers/index'

const RE_EXPR = /{([^{]+)}/g

function parseExpressions(tmpl, attr = null) {
  const list = []
  let match
  while (match = RE_EXPR.exec(tmpl)) {
    const [value,expr] = match
    list.push({tmpl, value, expr, attr})
  }
  return list
}

function parseAttributes(attributes = []) {
  const handlers = []
  const bindings = []

  for (const {value, name: attr} of toArray(attributes)) {
    const handle = getHandler(attr)

    if (handle) {
      attributes.removeNamedItem(attr)
      handlers.push({value, handle})
    } else {
      bindings.push(value, attr)
    }
  }

  return [handlers, bindings]
}

export default function parse(container) {
  const result = []

  walkDom(container, node => {
    const [handlers, bindings] = parseAttributes(node.attributes)

    if (node.nodeType === 3) { // text
      bindings.push(...parseExpressions(node.nodeValue))
    }

    result.push({node, handlers, bindings})

    return handlers.some(handle => handle.scope)
  })

  return result
}
