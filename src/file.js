import Validators from './validators'
import { prepareMsg, prepare, selectNum, memoize, TO_STRING } from './helpers'

let ACCEPT_SEP_REG = /\s*,\s*/
// eslint-disable-next-line no-useless-escape
let ESCAPE_REG = /([.+?^=!:${}()|[\]\/\\])/g // Removed star char
let ANY_REG = /\*/g

let file = memoize(function ({
  message,
  msg,
  accept,
  minSize,
  maxSize,
  minFiles,
  maxFiles,
  if: ifCond,
  unless,
  allowBlank
} = {}) {
  msg = msg || message

  minFiles = selectNum(minFiles)
  maxFiles = selectNum(maxFiles)
  if (maxFiles < 0) {
    maxFiles = null
  }
  if (minFiles === null) {
    minFiles = 1
  }

  if (typeof accept === 'string' && accept.trim()) {
    accept = accept
      .trim()
      .toLowerCase()
      .split(ACCEPT_SEP_REG)
      .map(function (type) {
        return type.charAt(0) === '.' || type.indexOf('*') < 0
          ? type
          : new RegExp('^' + type.replace(ESCAPE_REG, '\\$1').replace(ANY_REG, '.*') + '$', 'i')
      })
  } else {
    accept = null
  }

  let min = minSize != null ? sizeToInt(minSize) : null
  let max = maxSize != null ? sizeToInt(maxSize) : null

  return prepare(ifCond, unless, false, function (value) {
    let isAFileList = isFileList(value)

    // special blank check
    if ((allowBlank != null ? allowBlank : Validators.defaultOptions.allowBlank) && isAFileList && value.length === 0) {
      return
    }
    if (!isAFileList) {
      return Validators.formatMessage(prepareMsg(msg, 'file'))
    }
    if (isNaN(value.length)) {
      value = [value]
    }
    if (value.length < minFiles) {
      return Validators.formatMessage(prepareMsg(msg, 'fileTooFew', { count: minFiles }))
    }
    if (maxFiles !== null && value.length > maxFiles) {
      return Validators.formatMessage(prepareMsg(msg, 'fileTooMany', { count: maxFiles }))
    }

    let acceptError = []
    let tooSmallError = []
    let tooBigError = []
    for (let i = 0, len = value.length, val, ftype, fext; i < len; ++i) {
      val = value[i]
      if (accept) {
        ftype = val.type || ''
        fext = fileExt(val.name || '')
        if (
          !accept.some(function (type) {
            return typeof type === 'string' ? type === (type.charAt(0) === '.' ? fext : ftype) : type.test(ftype)
          })
        ) {
          acceptError.push(val)
        }
      }
      if (min != null && val.size < min) {
        tooSmallError.push(val)
      }
      if (max != null && val.size > max) {
        tooBigError.push(val)
      }
    }
    if (acceptError.length) {
      return Validators.formatMessage(prepareMsg(msg, 'fileAccept', { files: acceptError, count: acceptError.length }))
    }
    if (tooSmallError.length) {
      let pair = parse(minSize)
      return Validators.formatMessage(
        prepareMsg(msg, 'fileTooSmall', {
          files: tooSmallError,
          count: tooSmallError.length,
          size: Validators.formatSize(pair[1], pair[2] || 'B')
        })
      )
    }
    if (tooBigError.length) {
      let pair = parse(maxSize)
      return Validators.formatMessage(
        prepareMsg(msg, 'fileTooBig', {
          files: tooBigError,
          count: tooBigError.length,
          size: Validators.formatSize(pair[1], pair[2] || 'B')
        })
      )
    }
  })
})

export default file

export function isFileList (value) {
  if (
    (typeof FileList !== 'undefined' && value instanceof FileList) ||
    (typeof File !== 'undefined' && (value instanceof File || value[0] instanceof File))
  ) {
    return true
  }
  let str = TO_STRING.call(value)
  return str === '[object FileList]' || str === '[object File]' || TO_STRING.call(value[0]) === '[object File]'
}

// private
// eslint-disable-next-line no-useless-escape
const SIZE_REG = /^([\d\.]+)\s*([KMGTPE]?B)?$/
const SIZE_UNITS = {
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776,
  PB: 1125899906842624,
  EB: 1152921504606847000
}

function parse (size) {
  return SIZE_REG.exec(('' + size).trim())
}

function sizeToInt (size) {
  let pair = parse(size)
  return pair ? pair[1] * (SIZE_UNITS[pair[2]] || 1) : null
}

function fileExt (filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 1).toLowerCase()
}
