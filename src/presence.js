import { isFileList } from './file'
import { formatMsg, prepareMsg, prepare, memoize } from './helpers'


let presence = memoize(function ({ message, msg, 'if': ifCond, unless }={}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if ('string' === typeof value ? !value.trim() : isFileList(value) && !isNaN(value.length) ? !value.length : !value) {
      return formatMsg(prepareMsg(msg, 'presence'))
    }
  })
})

export default presence

