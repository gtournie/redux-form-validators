import Validators from './validators'
import { prepareMsg, prepare, memoize } from './helpers'

let inclusion = memoize(function (options) {
  return inclusionExclusion(true, options)
})

export default inclusion

export function inclusionExclusion (
  inclusion,
  { in: inc, within, caseSensitive, message, msg, if: ifCond, unless, allowBlank }
) {
  msg = msg || message
  within = [].concat(within || inc).map(val => '' + val)

  return prepare(ifCond, unless, allowBlank, function (value) {
    let cs = caseSensitive != null ? caseSensitive : Validators.defaultOptions.caseSensitive
    let array = within

    if (!cs) {
      value = value.toLowerCase()
      array = array.map(val => val.toLowerCase())
    }
    if (inclusion) {
      if (array.indexOf(value) < 0) {
        return Validators.formatMessage(prepareMsg(msg, 'inclusion'))
      }
    } else {
      if (array.indexOf(value) >= 0) {
        return Validators.formatMessage(prepareMsg(msg, 'exclusion'))
      }
    }
  })
}
