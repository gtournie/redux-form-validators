import messages from './messages'
import Validators from './index'
import { toObjectMsg, prepare, memoize } from './helpers'


let absence = memoize(function ({ message, msg, 'if': ifCond, unless }={}) {
  msg = toObjectMsg(msg || message) || messages.absence

  return prepare(ifCond, unless, false, function (value) {
    if (value.trim()) {
      return Validators.formatMessage(msg)
    }
  })
})

export default absence