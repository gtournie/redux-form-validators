import Validators from './index'
import { prepareMsg, prepare, memoize } from './helpers'


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
    let fieldValue = '' + (allValues[field] || '')
    let cs = (null != caseSensitive ? caseSensitive : Validators.defaultOptions.caseSensitive)

    if (cs ? value !== fieldValue : value.toLowerCase() !== fieldValue.toLowerCase()) {
      return Validators.formatMessage(prepareMsg(msg, 'confirmation', { fieldLabel: fieldLabel || field }))
    }
  })
})

export default confirmation