import { formatMsg, prepareMsg, prepare, memoize, DEFAULT_OPTIONS } from './helpers'


let acceptance = memoize(function ({ accept, message, msg, 'if': ifCond, unless }={}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if ([].concat(accept || DEFAULT_OPTIONS.accept).map(String).indexOf(value) < 0) {
      return formatMsg(prepareMsg(msg, 'acceptance'))
    }
  })
})

export default acceptance