import {
  extend,
  isTag,
  toArray,
  walkDom,
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
  const bindings = []

  walkDom(container, node => {
    const list = extend([], {node})
    let tagFound = false

    switch (node.nodeType) {
      case 1: // element
        for (const {value, name: attr} of toArray(node.attributes)) {
          tagFound = tagFound || isTag(attr)

          list.push(...parseExpressions(value, attr))
        }
        break
      case 3: // text
        list.push(...parseExpressions(node.nodeValue))
        break
    }

    if (list.length) {
      bindings.push(list)
    }

    return !tagFound
  })

  return bindings
}
