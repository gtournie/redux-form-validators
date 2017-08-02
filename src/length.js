import messages from './messages'
import Validators from './index'
import { toObjectMsg, addMsgValues, prepare, isNumber, memoize } from './helpers'


let length = memoize(function ({
      '=': equal, is,
      max, maximum,
      min, minimum,
      'in': range, within,
      message, msg,
      'if': ifCond, unless,
      allowBlank
    }) {
  msg   = toObjectMsg(msg || message)

  equal = isNumber(equal) ? equal : is
  min   = isNumber(min)   ? min   : minimum
  max   = isNumber(max)   ? max   : maximum
  range = range || within
  if (range && isNumber(range[0]) && isNumber(range[1])) {
    min = range[0]
    max = range[1]
  }

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (isNumber(equal) && value.length !== +equal) {
      return Validators.formatMessage(msg || addMsgValues(messages.wrongLength, { count: equal }))
    }
    if (isNumber(max) && value.length > +max) {
      return Validators.formatMessage(msg || addMsgValues(messages.tooLong, { count: max }))
    }
    if (isNumber(min) && value.length < +min) {
      return Validators.formatMessage(msg || addMsgValues(messages.tooShort, { count: min }))
    }
  })
})

export default length