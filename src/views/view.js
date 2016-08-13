import {
  resolve,
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

    const found = parse(container)

    for (const prop in found) {
      this._views[prop] = found[prop].map(({node,expr}) => {
        const Fn = require(`./${prop}`)
        const view = new Fn(node, node.outerHTML, expr, this)

        return view.render(model)
      })
    }

    this._nodes = toArray(container.childNodes)

    for (const node of this._nodes) {
      frag.appendChild(node)
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

    return this
  }
}
