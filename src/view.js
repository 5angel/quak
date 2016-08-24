import {
  extend,
  each,
  curry,
  defineMethods,
  isArray,
  isFunction,
  isUndefined,
  toArray
} from 'utils'

import parse from './parse'
import resolve from './resolve'

export function mount(view, model) {
  if (view.mounted) {
    return render(view, model)
  }

  update(view, model)

  view.mounted = true

  const container = document.createElement('div')
  const frag = document.createDocumentFragment()

  container.innerHTML = view.template

  for (const {handlers, bindings} of parse(container)) {
    handlers.length && view.handlers.push(handlers)
    bindings.length && view.bindings.push(bindings)
  }

  for (const list of view.handlers) {
    for (const handler of list) {
      isFunction(handler.mount) && handler.mount(list.node, view)
    }
  }

  view.nodes = toArray(container.childNodes)

  for (const node of view.nodes) {
    frag.appendChild(node)
  }

  view.anchor.parentNode.insertBefore(frag, view.anchor)

  return render(view, model)
}

export function unmount(view) {

}

export function update(view, model) {
  if (isUndefined(model)) {
    model = view.model
  } else if (model !== view.model) {
    extend(view.model, model)
  }
}

export function render(view, model) {
  update(view, model)

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

export function factory(elem, template = elem.outerHTML, {
  handlers = [],
  bindings = []
} = {}) {
  const anchor = document.createTextNode('')

  if (elem) {
    elem.parentNode.replaceChild(anchor, elem)
  }

  const view = {
    template,
    handlers,
    bindings,
    anchor,
    nodes: [],
    mounted: false,
    model: {},
  }

  defineMethods(view, {mount, unmount, render})

  return view
}
