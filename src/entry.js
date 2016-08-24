import {
  extend,
  toArray,
  isFunction
} from './utils'

import * as View from './view'

export function link(tagName, ViewModel) {
  const tmpl = document.getElementById(tagName)
  const list = document.getElementsByTagName(tagName)

  tmpl.parentNode.removeChild(tmpl)

  const html = tmpl.innerHTML.trim()

  for (const node of toArray(list)) {
    const model = isFunction(ViewModel) ?
      new ViewModel() : ViewModel

    const view = View.factory(node, html)

    View.mount(view, model)
  }
}
