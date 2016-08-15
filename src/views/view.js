import {
  resolve,
  extend,
  each,
  isArray,
  isUndefined,
  isTag,
  isHandler,
  toEvent,
  toArray
} from 'utils'

import parse from 'parse'

export default class View {
  constructor(elem, tmpl) {
    this._template = tmpl
    this._anchor = document.createTextNode('')
    this._views = {}
    this._nodes = []
    this._bindings = []
    this._handlers = {}

    this.model = null

    elem.parentNode.replaceChild(this._anchor, elem)
  }

  mount(model) {
    this.model = model

    const container = document.createElement('div')
    const frag = document.createDocumentFragment()

    container.innerHTML = this._template

    this._bindings = parse(container)

    for (const {node, attr, expr} of this._bindings) {
      if (isTag(attr)) {
        // TODO: recognize views
      } else if (isHandler(attr)) {
        const handler = resolve(model, expr, this.update.bind(this))
        const event = toEvent(attr)
        const list = this._handlers[name] || []

        list.push({node, handler})
        node.addEventListener(event, handler)
      }
    }

    this._nodes = toArray(container.childNodes)

    for (const node of this._nodes) {
      frag.appendChild(node)
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

    return this.update()
  }

  update(model = this.model) {
    if (model !== this.model) {
      extend(this.model, model)
    }

    for (const {node, attr, tmpl, value, expr} of this._bindings) {
      if (isTag(attr)) {
        // TODO: recognize views
      } else if (!isUndefined(tmpl)) {
        node.nodeValue = tmpl.replace(value, resolve(model, expr))
      }
    }

    return this
  }
}
