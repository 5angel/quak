import {
  extend,
  toArray,
  isTag,
  isHandler,
  walkDom
} from './utils'

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

export default function parse(container) {
  const result = []

  walkDom(container, node => {
    const bindings = []
    const handlers = []

    let tagFound = false

    switch (node.nodeType) {
      case 1: // element
        for (const {value, name: attr} of toArray(node.attributes)) {
          const hasTag = isTag(attr)
          const hasHandler = isHandler(attr)

          tagFound = tagFound || hasTag

          if (hasTag || hasHandler) {
            node.removeAttribute(attr)
          }

          const items = parseExpressions(value, attr)

          hasHandler ?
            handlers.push(...items) :
            bindings.push(...items)
        }
        break
      case 3: // text
        bindings.push(...parseExpressions(node.nodeValue))
        break
    }

    if (bindings.length + handlers.length > 0) {
      result.push({node, bindings, handlers})
    }

    return !tagFound
  })

  return result
}
