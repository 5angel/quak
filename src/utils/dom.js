import {curry, bind} from './fp'
import {each} from './common'

export const createElem = bind(document.createElement, document)

export const createText = bind(document.createTextNode, document)

export const createFrag = bind(document.createDocumentFragment, document)

export const getById = bind(document.getElementById, document)

export const getByTagName = bind(document.getElementsByTagName, document)

export const removeNode = node => node.parentNode.removeChild(node)

export const insertNodeAt = curry((a, b) => a.parentNode.insertBefore(b, a))

export const appendNodeTo = curry((a, b) => a.appendChild(b))

export const swapNodes = curry((a, b) => a.parentNode.replaceChild(b, a))

export const walkNodes = curry((fn, node) => {
  if (fn(node)) {
    each(child => walkNodes(fn, child), node.childNodes)
  }
})
