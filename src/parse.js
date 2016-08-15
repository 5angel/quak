import {
  extend,
  isTag,
  isHandler,
  toArray,
  walkDom,
} from './utils'

const RE_EXPR = /{([^{]+)}/g

const [ELEMENT, TEXT] = [1,3]

function parseExprs(str, base) {
  const list = []
  let match
  while (match = RE_EXPR.exec(str)) {
    const [value,expr] = match
    list.push(extend({}, base, {value, expr}))
  }
  return list
}

export default function parse(container) {
  const result = []

  walkDom(container, node => {
    let tagFound = false

    switch (node.nodeType) {
      case ELEMENT:
        for (const {value, name: attr} of toArray(node.attributes)) {
          tagFound = tagFound || isTag(attr)

          if (isTag(attr) || isHandler(attr)) {
            node.removeAttribute(attr)
          }

          result.push(...parseExprs(value, {node, attr}))
        }
        break
      case TEXT:
        const tmpl = node.nodeValue

        result.push(...parseExprs(tmpl, {node, tmpl}))
        break
    }

    return !tagFound
  })

  return result
}
