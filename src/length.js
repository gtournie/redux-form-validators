import Validators from './index'
import { prepareMsg, prepare, isNumber, selectNum, memoize } from './helpers'


let length = memoize(function ({
      '=': equal, is,
      max, maximum,
      min, minimum,
      'in': range, within,
      message, msg,
      'if': ifCond, unless,
      allowBlank
    }) {
  msg   = msg || message

  equal = selectNum(equal, is)
  min   = selectNum(min,   minimum)
  max   = selectNum(max,   maximum)

  range = range || within
  if (range && isNumber(range[0]) && isNumber(range[1])) {
    min = range[0]
    max = range[1]
  }

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (null !== equal && value.length !== equal) {
      return Validators.formatMessage(prepareMsg(msg, 'wrongLength', { count: equal }))
    }
    if (null !== max && value.length > max) {
      return Validators.formatMessage(prepareMsg(msg, 'tooLong', { count: max }))
    }
    if (null !== min && value.length < min) {
      return Validators.formatMessage(prepareMsg(msg, 'tooShort', { count: min }))
    }
  })
})

export default length