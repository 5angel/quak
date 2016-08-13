import {
  contains,
  toArray,
  walkDom,
} from './utils'

const RE_EXPR = /^{(.+)}$/
const SPECIAL = ['each']

export default function parse(container) {
  const children = {}

  walkDom(container, node => {
    let hasView = false

    if (node.nodeType === 1) {
      for (const attr of toArray(node.attributes)) {
        hasView = hasView || contains(SPECIAL, attr.name)

        const chldn = children[attr.name] || []
        const match = attr.value.match(RE_EXPR)

        if (match) {
          const expr = match[1]

          if (hasView) {
            node.removeAttribute(attr.name)
            chldn.push({node, expr})

            children[attr.name] = chldn
          }
        }
      }
    }

    return !hasView
  })

  return children
}
