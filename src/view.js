import {
  extend,
  each,
  isArray,
  isUndefined,
  toArray
} from 'utils'

import parse from './parse'
import resolve from './resolve'

export default class View {
  constructor(elem, tmpl, {
    handlers = [],
    bindings = []
  } = {}) {
    this._template = tmpl

    this._bindings = handlers.slice()
    this._handlers = bindings.slice()

    this._anchor = document.createTextNode('')
    this._nodes = []

    this.mounted = false
    this.model = null

    elem.parentNode.replaceChild(this._anchor, elem)
  }

  mount(model) {
    if (this.mounted) {
      return this.render(model)
    }

    this.mounted = true
    this.model = model

    const container = document.createElement('div')
    const frag = document.createDocumentFragment()

    container.innerHTML = this._template

    this._nodes = toArray(container.childNodes)

    for (const node of this._nodes) {
      frag.appendChild(node)
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

    for (const {node, handlers, bindings} of parse(container)) {
      this._handlers.push(extend(handlers.slice(), {node}))
      this._bindings.push(extend(bindings.slice(), {node}))
    }

    return this.render()
  }

  render(model = this.model) {
    if (model !== this.model) {
      extend(this.model, model)
    }

    for (const list of this._bindings) {
      const node = list.node
      const isTextNode = node.nodeType === 3

      if (isTextNode) {
        node.nodeValue = list[0].tmpl
      }

      for (const {value, expr} of list) {
        if (isTextNode) {
          node.nodeValue = node.nodeValue
            .replace(value, resolve(expr)(model))
        }
      }
    }

    return this
  }
}
