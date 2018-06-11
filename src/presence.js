import Validators from './validators'
import { isFileList } from './file'
import { prepareMsg, prepare, memoize } from './helpers'

let presence = memoize(function ({ message, msg, if: ifCond, unless } = {}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if (
      typeof value === 'string' ? !value.trim() : isFileList(value) && !isNaN(value.length) ? !value.length : !value
    ) {
      return Validators.formatMessage(prepareMsg(msg, 'presence'))
    }
  })
})

export default presence
