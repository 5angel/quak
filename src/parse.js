import {
  isView,
  toArray,
  walkDom,
} from './utils'

const RE_EXPR = /^{(.+)}$/

export default function parse(container) {
  const attrs = {}

  walkDom(container, node => {
    let viewFound = false

    if (node.nodeType === 1) {
      for (const {value, name} of toArray(node.attributes)) {
        viewFound = viewFound || isView(name)

        const list = attrs[name] || []
        const [,expr] = value.match(RE_EXPR) || []

        if (expr) {
          node.removeAttribute(name)
          list.push({node, expr})

          attrs[name] = list
        }
      }
    }

    return !viewFound
  })

  return attrs
}
