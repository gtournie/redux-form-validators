import messages from './messages'
import Validators from './index'
import { toObjectMsg, prepare, isNumber, trunc, memoize } from './helpers'
import {addMsgValues} from "./helpers";


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

  msg            = toObjectMsg(msg || message)

  int            = int || integer
  equal          = isNumber(equal)          ? equal          : equalTo
  diff           = isNumber(diff)           ? diff           : otherThan
  greater        = isNumber(greater)        ? greater        : greaterThan
  less           = isNumber(less)           ? less           : lessThan
  greaterOrEqual = isNumber(greaterOrEqual) ? greaterOrEqual : greaterThanOrEqualTo
  lessOrEqual    = isNumber(lessOrEqual)    ? lessOrEqual    : lessThanOrEqualTo

  return prepare(ifCond, unless, allowBlank, function (value) {
    if (!isNumber(value)) {
      return Validators.formatMessage(msg || messages.notANumber)
    }
    if (int && (+value % 1)) {
      return Validators.formatMessage(msg || messages.notANumber)
    }
    if (isNumber(equal) && +value !== +equal) {
      return Validators.formatMessage(msg || addMsgValues(messages.equalTo, { count: equal }))
    }
    if (isNumber(diff) && +value === +diff) {
      return Validators.formatMessage(msg || addMsgValues(messages.otherThan, { count: diff }))
    }
    if (isNumber(greater) && +value <= +greater) {
      return Validators.formatMessage(msg || addMsgValues(messages.greaterThan, { count: greater }))
    }
    if (isNumber(greaterOrEqual) && +value < +greaterOrEqual) {
      return Validators.formatMessage(msg || addMsgValues(messages.greaterThanOrEqualTo, { count: greaterOrEqual }))
    }
    if (isNumber(less) && +value >= +less) {
      return Validators.formatMessage(msg || addMsgValues(messages.lessThan, { count: less }))
    }
    if (isNumber(lessOrEqual) && +value > +lessOrEqual) {
      return Validators.formatMessage(msg || addMsgValues(messages.lessThanOrEqualTo, { count: lessOrEqual }))
    }
    if (even && (trunc(+value) % 2)) {
      return Validators.formatMessage(msg || messages.even)
    }
    if (odd && !(trunc(+value) % 2)) {
      return Validators.formatMessage(msg || messages.odd)
    }
  })
})

export default numericality
