import { getFormatMessage, prepareMsg, prepare, isNumber, selectNum, memoize } from './helpers'

let length = memoize(function ({
  '=': equal, is,
  max, maximum,
  min, minimum,
  'in': range, within,
  message, msg,
  'if': ifCond, unless,
  allowBlank
}) {
  msg = msg || message

  equal = selectNum(equal, is)
  min = selectNum(min, minimum)
  max = selectNum(max, maximum)

  range = range || within
  if (range && isNumber(range[0]) && isNumber(range[1])) {
    min = range[0]
    max = range[1]
  }

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (equal !== null && value.length !== equal) {
      return getFormatMessage()(prepareMsg(msg, 'wrongLength', { count: equal }))
    }
    if (max !== null && value.length > max) {
      return getFormatMessage()(prepareMsg(msg, 'tooLong', { count: max }))
    }
    if (min !== null && value.length < min) {
      return getFormatMessage()(prepareMsg(msg, 'tooShort', { count: min }))
    }
  })
})

export default length
