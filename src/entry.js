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

  for (const node of toArray(list)) {
    const html = tmpl.innerHTML.trim()
    const view = View.factory(node, html)
    const model = isFunction(ViewModel) ?
      new ViewModel() : ViewModel

    View.mount(view, model)
  }
}
