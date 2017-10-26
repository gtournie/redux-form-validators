import Validators from './index'
import { prepareMsg, prepare, memoize } from './helpers'


let absence = memoize(function ({ message, msg, 'if': ifCond, unless }={}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if (value.trim()) {
      return Validators.formatMessage(prepareMsg(msg, 'absence'))
    }
  })
})

export default absence