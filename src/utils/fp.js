export const curry = (fn, ...rest) => (fn.length <= rest.length) ?
  fn(...rest) : (...more) => curry(fn, ...rest, ...more)

export const bind = (fn, context) => fn.bind(context)

export const noop = () => {}
