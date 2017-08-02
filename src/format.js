import messages from './messages'
import Validators from './index'
import { toObjectMsg, prepare, memoize } from './helpers'


let format = memoize(function ({ 'with': wit, without, message, msg, 'if': ifCond, unless, allowBlank }) {
  msg = toObjectMsg(msg || message)

  return prepare(ifCond, unless, allowBlank, function (value) {
    if ((wit && !value.match(wit)) || (without && value.match(without))) {
      return Validators.formatMessage(msg || messages.invalid)
    }
  })
})

export default format