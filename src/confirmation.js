import { formatMsg, prepareMsg, prepare, memoize, DEFAULT_OPTIONS } from './helpers'


let confirmation = memoize(function ({
      field,
      fieldLabel,
      caseSensitive,
      message,
      msg,
      'if': ifCond, unless
    }) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value, allValues) {
    // Immutable.js compatibility
    let fieldValue = 'function' === typeof allValues.getIn
      ? allValues.getIn(field.split('.'))
      : allValues[field]
    fieldValue = '' + (fieldValue || '')

    let cs = (null != caseSensitive ? caseSensitive : DEFAULT_OPTIONS.caseSensitive)

    if (cs ? value !== fieldValue : value.toLowerCase() !== fieldValue.toLowerCase()) {
      return formatMsg(prepareMsg(msg, 'confirmation', { fieldLabel: fieldLabel || field }))
    }
  })
})

export default confirmation