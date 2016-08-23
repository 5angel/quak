import {
  extend,
  each,
  isArray,
  isUndefined,
  toArray
} from 'utils'

import parse from './parse'
import resolve from './resolve'

export function factory(elem, template = elem.outerHTML, {
  handlers = [],
  bindings = []
} = {}) {
  const anchor = document.createTextNode('')

  elem.parentNode.replaceChild(anchor, elem)

  return {
    template,
    handlers,
    bindings,
    anchor,
    nodes: [],
    mounted: false,
    model: null
  }
}

export function mount(view, model) {
  if (view.mounted) {
    return render(view, model)
  }

  view.mounted = true
  view.model = model

  const container = document.createElement('div')
  const frag = document.createDocumentFragment()

  container.innerHTML = view.template

  for (const {handlers, bindings} of parse(container)) {
    view.handlers.push(handlers)
    view.bindings.push(bindings)
  }

  view.nodes = toArray(container.childNodes)

  for (const node of view.nodes) {
    frag.appendChild(node)
  }

  view.anchor.parentNode.insertBefore(frag, view.anchor)

  return render(view)
}

export function render(view, model = view.model) {
  if (model !== view.model) {
    extend(view.model, model)
  }

  for (const list of view.bindings) {
    const node = list.node
    const isTextNode = node.nodeType === 3

    if (isTextNode) {
      node.nodeValue = list[0].tmpl
    }

    for (const {value, expr} of list) {
      if (isTextNode) {
        node.nodeValue = node.nodeValue
          .replace(value, resolve(expr)(model))
      }
    }
  }

  return view
}
