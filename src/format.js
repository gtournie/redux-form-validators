import Validators from './validators'
import { prepareMsg, prepare, memoize } from './helpers'

let format = memoize(function ({ with: wit, without, message, msg, if: ifCond, unless, allowBlank }) {
  msg = msg || message

  return prepare(ifCond, unless, allowBlank, function (value) {
    if ((wit && !value.match(wit)) || (without && value.match(without))) {
      return Validators.formatMessage(prepareMsg(msg, 'invalid'))
    }
  })
})

export default format
