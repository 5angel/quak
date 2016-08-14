import {
  resolve
} from 'utils'

import View from './view'

export default class EachView extends View {
  constructor(elem, tmpl, expr, parent) {
    super(elem, tmpl)

    this._expr = expr
    this._parent = parent
    this._views = []
    this._previous = []
  }

  render(model) {
    return this.update(model)
  }

  update(model) {
    const frag = document.createDocumentFragment()
    const items = resolve(model, this._expr)() || []

    for (const model of items) {
      const temp = document.createTextNode('')

      frag.appendChild(temp)

      const view = new View(temp, this._template)

      this._views.push(view.render(model))
    }

    this._anchor.parentNode.insertBefore(frag, this._anchor)

    this._previous = items.slice()

    return this
  }
}
