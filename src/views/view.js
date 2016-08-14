import {
  resolve,
  isView,
  isUndef,
  toArray
} from 'utils'

import parse from 'parse'

export default class View {
  constructor(elem, tmpl) {
    this._template = tmpl
    this._anchor = document.createTextNode('')
    this._nodes = []
    this._views = {}

    elem.parentNode.replaceChild(this._anchor, elem)
  }

  render(model) {
    const container = document.createElement('div')
    const frag = document.createDocumentFragment()

    container.innerHTML = this._template

    const attrs = parse(container)

    for (const prop in attrs) {
      if (attrs.hasOwnProperty(prop)) {
        for (const {node, expr} of attrs[prop]) {
          if (isView(prop)) {
            const list = this._views[prop] || []
            const Fn = require(`./${prop}`)
            const view = new Fn(node, node.outerHTML, expr, this)

            list.push(view.render(model))

            this._views[prop] = list
          }
        }
      }
    }

    this._nodes = toArray(container.childNodes)

    for (const node of this._nodes) {
      frag.appendChild(node)
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

    return this
  }
}
