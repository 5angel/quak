import {
  isView,
  toArray,
  walkDom,
} from './utils'

const RE_ATTR_EXPR = /^{(.+)}$/
const RE_TEXT_EXPR = /{([^{]+)}/g

const [ELEMENT, TEXT] = [1,3]

export default function parse(container) {
  const attrs = {}
  const binds = []

  walkDom(container, node => {
    let viewFound = false

    switch (node.nodeType) {
      case ELEMENT:
        for (const {value, name} of toArray(node.attributes)) {
          viewFound = viewFound || isView(name)

          const list = attrs[name] || []
          const [,expr] = value.match(RE_ATTR_EXPR) || []

          if (expr) {
            node.removeAttribute(name)
            list.push({node, expr})

            attrs[name] = list
          }
        }
        break
      case TEXT:
        let match
        const list = []

        list.node = node
        list.tmpl = node.nodeValue

        while (match = RE_TEXT_EXPR.exec(node.nodeValue)) {
          const [value,expr] = match

          list.push({value, expr})
        }

        binds.push(list)

        break
    }

    return !viewFound
  })

  return [attrs, binds]
}
