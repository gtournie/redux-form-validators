import messages from './messages'
import Validators from './index'
import { toObjectMsg, prepare, memoize } from './helpers'


let acceptance = memoize(function ({ accept, message, msg, 'if': ifCond, unless }={}) {
  msg = toObjectMsg(msg || message) || messages.acceptance

  return prepare(ifCond, unless, false, function (value) {
    if ([].concat(accept || Validators.defaultOptions.accept).map(String).indexOf(value) < 0) {
      return Validators.formatMessage(msg)
    }
  })
})

export default acceptance