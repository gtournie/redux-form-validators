import messages from './messages'
import Validators from './index'
import { toObjectMsg, prepare, memoize } from './helpers'


let presence = memoize(function ({ message, msg, 'if': ifCond, unless }={}) {
  msg = toObjectMsg(msg || message) || messages.presence

  return prepare(ifCond, unless, false, function (value) {
    if (!value.trim()) {
      return Validators.formatMessage(msg)
    }
  })
})

export default presence

