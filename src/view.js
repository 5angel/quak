import {
  extend,
  each,
  isArray,
  isUndefined,
  isTag,
  isHandler,
  toEvent,
  toArray
} from 'utils'

import parse from './parse'
import resolve from './resolve'

export default class View {
  constructor(elem, tmpl) {
    this._template = tmpl
    this._anchor = document.createTextNode('')
    this._views = {}
    this._nodes = []
    this._bindings = []
    this._handlers = []

    this.isMounted = false
    this.model = null

    elem.parentNode.replaceChild(this._anchor, elem)
  }

  mount(model) {
    if (this.isMounted) {
      return this.render(model)
    }

    this.isMounted = true
    this.model = model

    const container = document.createElement('div')
    const frag = document.createDocumentFragment()

    container.innerHTML = this._template

    const renderFn = this.render.bind(this)

    for (const item of parse(container)) {
      const {node, bindings, handlers} = item

      this._handlers.push(...handlers.map(
        ({expr, attr}) => {
          const event = toEvent(attr)
          const callback = (e) => {
            resolve(expr, renderFn)(this.model, e)
          }

          node.addEventListener(event, callback)

          return {event, callback}
        }
      ))

      if (bindings.length) {
        this._bindings.push(extend(bindings.slice(), {node}))
      }
    }

    this._nodes = toArray(container.childNodes)

    for (const node of this._nodes) {
      frag.appendChild(node)
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

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
