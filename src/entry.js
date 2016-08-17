import {
  extend,
  toArray
} from './utils'

import View from './view'

export function link(tagName, ViewModel) {
  const tmpl = document.getElementById(tagName)
  const list = document.getElementsByTagName(tagName)

  tmpl.parentNode.removeChild(tmpl)

  for (const node of toArray(list)) {
    const html = tmpl.innerHTML.trim()
    const view = new View(node, html)

    view.mount(new ViewModel())
  }
}
