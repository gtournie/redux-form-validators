import { getFormatMessage, prepareMsg, prepare, memoize, getOptions } from './helpers'


let acceptance = memoize(function ({ accept, message, msg, 'if': ifCond, unless }={}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if ([].concat(accept || getOptions().accept).map(String).indexOf(value) < 0) {
      return getFormatMessage()(prepareMsg(msg, 'acceptance'))
    }
  })
})

export default acceptance