import { getFormatMessage, prepareMsg, prepare, isNumber, selectNum, trunc, memoize } from './helpers'

let numericality = memoize(function ({
  int, integer,
  even,
  odd,
  '=': equal, equalTo,
  '!=': diff, otherThan,
  '>': greater, greaterThan,
  '<': less, lessThan,
  '>=': greaterOrEqual, greaterThanOrEqualTo,
  '<=': lessOrEqual, lessThanOrEqualTo,
  message, msg,
  'if': ifCond, unless,
  allowBlank
} = {}) {
  msg = msg || message

  int = int || integer
  equal = selectNum(equal, equalTo)
  diff = selectNum(diff, otherThan)
  greater = selectNum(greater, greaterThan)
  greaterOrEqual = selectNum(greaterOrEqual, greaterThanOrEqualTo)
  less = selectNum(less, lessThan)
  lessOrEqual = selectNum(lessOrEqual, lessThanOrEqualTo)

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (!isNumber(value)) {
      return getFormatMessage()(prepareMsg(msg, 'notANumber'))
    }
    if (int && (+value % 1)) {
      return getFormatMessage()(prepareMsg(msg, 'notAnInteger'))
    }
    if (equal !== null && +value !== equal) {
      return getFormatMessage()(prepareMsg(msg, 'equalTo', { count: equal }))
    }
    if (diff !== null && +value === diff) {
      return getFormatMessage()(prepareMsg(msg, 'otherThan', { count: diff }))
    }
    if (greater !== null && +value <= greater) {
      return getFormatMessage()(prepareMsg(msg, 'greaterThan', { count: greater }))
    }
    if (greaterOrEqual !== null && +value < greaterOrEqual) {
      return getFormatMessage()(prepareMsg(msg, 'greaterThanOrEqualTo', { count: greaterOrEqual }))
    }
    if (less !== null && +value >= less) {
      return getFormatMessage()(prepareMsg(msg, 'lessThan', { count: less }))
    }
    if (lessOrEqual !== null && +value > lessOrEqual) {
      return getFormatMessage()(prepareMsg(msg, 'lessThanOrEqualTo', { count: lessOrEqual }))
    }
    if (even && (trunc(+value) % 2)) {
      return getFormatMessage()(prepareMsg(msg, 'even'))
    }
    if (odd && !(trunc(+value) % 2)) {
      return getFormatMessage()(prepareMsg(msg, 'odd'))
    }
  })
})

export default numericality
