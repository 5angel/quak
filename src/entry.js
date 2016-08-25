import {
  extend,
  each,
  toArray
} from './utils/common'

import {
  getById,
  getByTagName,
  removeNode
} from './utils/dom'

import {isFunction} from './utils/check'

import * as View from './view'

export const link = (tagName, ViewModel) => {
  const tmpl = removeNode(getById(tagName))
  const list = getByTagName(tagName)

  const html = tmpl.innerHTML.trim()

  each(node => {
    const model = isFunction(ViewModel) ?
      new ViewModel() : ViewModel

    const view = View.factory(node, html)

    View.mount(view, model)
  }, list)
}
