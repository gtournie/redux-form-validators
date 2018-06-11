import Validators from './validators'
import { prepareMsg, prepare, memoize } from './helpers'

let acceptance = memoize(function ({ accept, message, msg, if: ifCond, unless } = {}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if (
      []
        .concat(accept || Validators.defaultOptions.accept)
        .map(String)
        .indexOf(value) < 0
    ) {
      return Validators.formatMessage(prepareMsg(msg, 'acceptance'))
    }
  })
})

export default acceptance
