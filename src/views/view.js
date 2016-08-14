import {
  resolve,
  each,
  isArray,
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

    each(attrs, (value, key) => {
      for (const {node, expr} of attrs[key]) {
        const event = getEvent(key)

        if (isView(key)) {
          const list = this._views[key] || []
          const Fn = require(`./${key}`)
          const view = new Fn(node, node.outerHTML, expr, this)

          list.push(view.render(model))

          this._views[key] = list
        } else if (event) {
          const handler = resolve(model, expr, this.update.bind(this))
          const list = this._handlers[event] || []

          list.push({node, handler})
          node.addEventListener(event, handler)
        }
      }
    })

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

    const list = !isArray(this._views) ?
      Object
        .keys(this._views)
        .map(key => {
          return this._views[key]
        })
        .reduce((result, items) => {
          return result.concat(items)
        }, []) :
      this._views

    for (const view of list) {
      view.update(model)
    }

    return this
  }
}
