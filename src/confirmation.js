import Validators from './validators'
import { prepareMsg, prepare, memoize } from './helpers'

let confirmation = memoize(function ({ field, fieldLabel, caseSensitive, message, msg, if: ifCond, unless }) {
  msg = msg || message
  let fieldKeys = field.split('.')
  fieldLabel = fieldLabel || fieldKeys[fieldKeys.length - 1]

  return prepare(ifCond, unless, false, function (value, allValues) {
    // Immutable.js compatibility
    let fieldValue = typeof allValues.getIn === 'function' ? allValues.getIn(fieldKeys) : getIn(allValues, fieldKeys)

    fieldValue = '' + (fieldValue || '')

    let cs = caseSensitive != null ? caseSensitive : Validators.defaultOptions.caseSensitive

    if (cs ? value !== fieldValue : value.toLowerCase() !== fieldValue.toLowerCase()) {
      return Validators.formatMessage(prepareMsg(msg, 'confirmation', { fieldLabel: fieldLabel }))
    }
  })
})

export default confirmation

function getIn (h, keys) {
  /* istanbul ignore next */
  return keys.reduce((h, k) => (h || {})[k], h)
}
