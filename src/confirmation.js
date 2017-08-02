import messages from './messages'
import Validators from './index'
import { toObjectMsg, addMsgValues, prepare, memoize } from './helpers'


let confirmation = memoize(function ({
      field,
      fieldLabel,
      caseSensitive,
      message,
      msg,
      'if': ifCond, unless
    }) {
  msg = toObjectMsg(msg || message)

  return prepare(ifCond, unless, false, function (value, allValues) {
    let fieldValue = '' + (allValues[field] || '')
    let cs = (null != caseSensitive ? caseSensitive : Validators.defaultOptions.caseSensitive)

    if (cs ? value !== fieldValue : value.toLowerCase() !== fieldValue.toLowerCase()) {
      return Validators.formatMessage(
        msg || addMsgValues(messages.confirmation, { fieldLabel: fieldLabel || field })
      )
    }
  })
})

export default confirmation