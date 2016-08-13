import {
  extend,
  resolve,
} from 'utils'

import View from './view'

export default class EachView extends View {
  constructor(elem, tmpl, expr, parent) {
    super(elem, tmpl)

    this._expr = expr
    this._parent = parent
    this._views = []
  }

  render(model) {
    const frag = document.createDocumentFragment()
    const items = resolve(this._expr, extend(model, this._parent)) || []

    for (const model of items) {
      const temp = document.createTextNode('')

      frag.appendChild(temp)

      const view = new View(temp, this._template)

      this._views.push(view.render(model))
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

    return this
  }
}
