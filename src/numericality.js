import { formatMsg, prepareMsg, prepare, isNumber, selectNum, trunc, memoize } from './helpers'


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
    }={}) {

  msg            = msg || message

  int            = int || integer
  equal          = selectNum(equal,          equalTo)
  diff           = selectNum(diff,           otherThan)
  greater        = selectNum(greater,        greaterThan)
  greaterOrEqual = selectNum(greaterOrEqual, greaterThanOrEqualTo)
  less           = selectNum(less,           lessThan)
  lessOrEqual    = selectNum(lessOrEqual,    lessThanOrEqualTo)

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (!isNumber(value)) {
      return formatMsg(prepareMsg(msg, 'notANumber'))
    }
    if (int && (+value % 1)) {
      return formatMsg(prepareMsg(msg, 'notAnInteger'))
    }
    if (null !== equal && +value !== equal) {
      return formatMsg(prepareMsg(msg, 'equalTo', { count: equal }))
    }
    if (null !== diff && +value === diff) {
      return formatMsg(prepareMsg(msg, 'otherThan', { count: diff }))
    }
    if (null !== greater && +value <= greater) {
      return formatMsg(prepareMsg(msg, 'greaterThan', { count: greater }))
    }
    if (null !== greaterOrEqual && +value < greaterOrEqual) {
      return formatMsg(prepareMsg(msg, 'greaterThanOrEqualTo', { count: greaterOrEqual }))
    }
    if (null !== less && +value >= less) {
      return formatMsg(prepareMsg(msg, 'lessThan', { count: less }))
    }
    if (null !== lessOrEqual && +value > lessOrEqual) {
      return formatMsg(prepareMsg(msg, 'lessThanOrEqualTo', { count: lessOrEqual }))
    }
    if (even && (trunc(+value) % 2)) {
      return formatMsg(prepareMsg(msg, 'even'))
    }
    if (odd && !(trunc(+value) % 2)) {
      return formatMsg(prepareMsg(msg, 'odd'))
    }
  })
})

export default numericality
