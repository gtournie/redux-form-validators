import { getFormatMessage, prepareMsg, prepare, memoize } from './helpers'
import { isFileList } from './file'

let absence = memoize(function ({ message, msg, 'if': ifCond, unless } = {}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if (typeof value === 'string' ? value.trim() : isFileList(value) && !isNaN(value.length) ? value.length : value) {
      return getFormatMessage()(prepareMsg(msg, 'absence'))
    }
  })
})

export default absence
