import {
  isUndefined,
  extend,
  curry,
  defineMethods
} from 'utils'

const RE_EXPR = /^{(?:(\S+)in)*(\S+)}$/

import resolve from 'resolve'
import * as View from 'view'

function mount(attr, node, parent) {
  attr.tmpl = node.outerHTML

  node.parentNode.replaceChild(attr.anchor, node)

  return attr.render(parent)
}

function unmount(attr) {

}

function render(attr, parent) {
  View.update(attr, parent.model)

  const {value, target} = attr.expr

  const list = resolve(target)(attr.model)

  for (const item of list) {
    const view = View.factory(null, attr.tmpl)
    const base = isUndefined(value) ? item : {[value]: item}
    const model = extend(base, {parent})

    attr.anchor.parentNode.insertBefore(view.anchor, attr.anchor)

    view.mount(model)

    attr.views.push(view)
  }
}

export default function each(expr) {
  const [, value, target] = RE_EXPR.exec(expr.replace(/\s/g, ''))

  const attr = {
    expr: {value, target},
    model: {},
    anchor: document.createTextNode(''),
    tmpl: null,
    views: []
  }

  defineMethods(attr, {mount, unmount, render})

  return attr
}
