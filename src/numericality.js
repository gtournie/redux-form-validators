import Validators from './index'
import { prepareMsg, prepare, isNumber, selectNum, trunc, memoize } from './helpers'


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
      return Validators.formatMessage(prepareMsg(msg, 'notANumber'))
    }
    if (int && (+value % 1)) {
      return Validators.formatMessage(prepareMsg(msg, 'notAnInteger'))
    }
    if (null !== equal && +value !== equal) {
      return Validators.formatMessage(prepareMsg(msg, 'equalTo', { count: equal }))
    }
    if (null !== diff && +value === diff) {
      return Validators.formatMessage(prepareMsg(msg, 'otherThan', { count: diff }))
    }
    if (null !== greater && +value <= greater) {
      return Validators.formatMessage(prepareMsg(msg, 'greaterThan', { count: greater }))
    }
    if (null !== greaterOrEqual && +value < greaterOrEqual) {
      return Validators.formatMessage(prepareMsg(msg, 'greaterThanOrEqualTo', { count: greaterOrEqual }))
    }
    if (null !== less && +value >= less) {
      return Validators.formatMessage(prepareMsg(msg, 'lessThan', { count: less }))
    }
    if (null !== lessOrEqual && +value > lessOrEqual) {
      return Validators.formatMessage(prepareMsg(msg, 'lessThanOrEqualTo', { count: lessOrEqual }))
    }
    if (even && (trunc(+value) % 2)) {
      return Validators.formatMessage(prepareMsg(msg, 'even'))
    }
    if (odd && !(trunc(+value) % 2)) {
      return Validators.formatMessage(prepareMsg(msg, 'odd'))
    }
  })
})

export default numericality
