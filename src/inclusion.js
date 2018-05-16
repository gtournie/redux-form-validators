import { formatMsg, prepareMsg, prepare, memoize, getOptions } from './helpers'


let inclusion = memoize(function (options) {
  return inclusionExclusion(true, options)
})

export default inclusion

export function inclusionExclusion (inclusion, {
      'in': inc, within,
      caseSensitive,
      message, msg,
      'if': ifCond, unless,
      allowBlank
    }) {
  msg = msg || message
  within = [].concat(within || inc).map(function(val) { return ('' + val) })

  return prepare(ifCond, unless, allowBlank, function (value) {
    let cs = (null != caseSensitive ? caseSensitive : getOptions().caseSensitive)
    let array = within;

    if (!cs) {
      value = value.toLowerCase()
      array = array.map(function(val) { return val.toLowerCase() })
    }
    if (inclusion) {
      if (array.indexOf(value) < 0) {
        return formatMsg(prepareMsg(msg, 'inclusion'))
      }
    } else {
      if (array.indexOf(value) >= 0) {
        return formatMsg(prepareMsg(msg, 'exclusion'))
      }
    }
  })
}