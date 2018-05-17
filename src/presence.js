import { isFileList } from './file'
import { getFormatMessage, prepareMsg, prepare, memoize } from './helpers'

let presence = memoize(function ({ message, msg, 'if': ifCond, unless } = {}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if (typeof value === 'string' ? !value.trim() : isFileList(value) && !isNaN(value.length) ? !value.length : !value) {
      return getFormatMessage()(prepareMsg(msg, 'presence'))
    }
  })
})

export default presence
