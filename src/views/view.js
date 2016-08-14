import {
  resolve,
  isView,
  isUndef,
  getEvent,
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
    this._attributes = {}
    this._handlers = {}

    elem.parentNode.replaceChild(this._anchor, elem)
  }

  render(model = {}) {
    const container = document.createElement('div')
    const frag = document.createDocumentFragment()

    container.innerHTML = this._template

    const [attrs, binds] = parse(container)

    this._attributes = attrs
    this._bindings = binds

    for (const prop in attrs) {
      if (attrs.hasOwnProperty(prop)) {
        const event = getEvent(prop)

        for (const {node, expr} of attrs[prop]) {
          if (isView(prop)) {
            const list = this._views[prop] || []
            const Fn = require(`./${prop}`)
            const view = new Fn(node, node.outerHTML, expr, this)

            list.push(view.render(model))

            this._views[prop] = list
          } else if (event) {
            const handler = resolve(model, expr, this.update.bind(this))
            const list = this._handlers[event] || []

            list.push({node, handler})
            node.addEventListener(event, handler)
          }
        }
      }
    }

    this._nodes = toArray(container.childNodes)

    for (const node of this._nodes) {
      frag.appendChild(node)
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

    return this.update(model)
  }

  update(model = {}) {
    for (const list of this._bindings) {
      const {node, tmpl} = list
      let result = tmpl

      for (const {value,expr} of list) {
        result = result.replace(value, resolve(model, expr))
      }

      node.nodeValue = result
    }

    return this
  }
}
