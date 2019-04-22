import { isObject, getIn, HAS_PROP } from './helpers'
import { firstErr } from './combine'

export default function validateForm (validations) {
  /* istanbul ignore next */
  return function () {
    return process(validations, arguments)
  }
}

function process (validations, args, keys) {
  const errors = {}
  for (let attr in validations) {
    if (HAS_PROP.call(validations, attr) && validations[attr]) {
      let attrKeys = keys ? keys.concat(attr) : [attr]
      errors[attr] = isObject(validations[attr])
        ? process(validations[attr], args, attrKeys)
        : firstErr([].concat(validations[attr])).apply(null, [].concat(getIn(args[0], attrKeys), args))
    }
  }
  return errors
}
