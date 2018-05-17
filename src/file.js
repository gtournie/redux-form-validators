import { getFormatMessage, prepareMsg, prepare, selectNum, memoize, TO_STRING, getOptions, getFormatSize } from './helpers'


let ACCEPT_SEP_REG = /\s*,\s*/
let ESCAPE_REG = /([.+?^=!:${}()|[\]\/\\])/g; // Removed star char
let ANY_REG    = /\*/g

let file = memoize(function ({
      message, msg,
      accept,
      minSize,
      maxSize,
      minFiles,
      maxFiles,
      'if': ifCond,
      unless,
      allowBlank
    }={}) {
  msg   = msg   || message

  minFiles = selectNum(minFiles)
  maxFiles = selectNum(maxFiles)
  if (maxFiles < 0) {
    maxFiles = null
  }
  if (null === minFiles) {
    minFiles = 1
  }

  if ('string' === typeof accept && accept.trim()) {
    accept = accept.trim().toLowerCase().split(ACCEPT_SEP_REG).map(function(type) {
      return '.' === type.charAt(0) || type.indexOf('*') < 0
        ? type
        : new RegExp('^' + type.replace(ESCAPE_REG, '\\$1').replace(ANY_REG, '.*') + '$', 'i')
    })
  } else {
    accept = null
  }

  let min = null != minSize ? sizeToInt(minSize) : null
  let max = null != maxSize ? sizeToInt(maxSize) : null

  return prepare(ifCond, unless, false, function (value) {
    let isAFileList = isFileList(value)

    // special blank check
    if ((null != allowBlank ? allowBlank : getOptions().allowBlank) && isAFileList && 0 === value.length) {
      return
    }
    if (!isAFileList) {
      return getFormatMessage()(prepareMsg(msg, 'file'))
    }
    if (isNaN(value.length)) {
      value = [value]
    }
    if (value.length < minFiles) {
      return getFormatMessage()(prepareMsg(msg, 'fileTooFew', { count: minFiles }))
    }
    if (null !== maxFiles && value.length > maxFiles) {
      return getFormatMessage()(prepareMsg(msg, 'fileTooMany', { count: maxFiles }))
    }

    let acceptError   = []
    let tooSmallError = []
    let tooBigError   = []
    for (let i = 0, len = value.length, val, ftype, fext; i < len; ++i) {
      val = value[i]
      if (accept) {
        ftype = val.type || ''
        fext = fileExt(val.name || '')
        if (!accept.some(function(type) {
              return 'string' === typeof type ? type === ('.' === type.charAt(0) ? fext : ftype) : type.test(ftype)
            })) {
          acceptError.push(val);
        }
      }
      if (null != min && val.size < min) {
        tooSmallError.push(val)
      }
      if (null != max && val.size > max) {
        tooBigError.push(val)
      }
    }
    if (acceptError.length) {
      return getFormatMessage()(prepareMsg(msg, 'fileAccept', { files: acceptError, count: acceptError.length }))
    }
    if (tooSmallError.length) {
      let pair = parse(minSize)
      return getFormatMessage()(prepareMsg(msg, 'fileTooSmall', {
        files: tooSmallError,
        count: tooSmallError.length,
        size:  getFormatSize()(pair[1], pair[2] || 'B')
      }))
    }
    if (tooBigError.length) {
      let pair = parse(maxSize)
      return getFormatMessage()(prepareMsg(msg, 'fileTooBig', {
        files: tooBigError,
        count: tooBigError.length,
        size:  getFormatSize()(pair[1], pair[2] || 'B')
      }))
    }
  })
})

export default file

export function isFileList (value) {
  if (('undefined' !== typeof FileList && value instanceof FileList) ||
      ('undefined' !== typeof File && (value instanceof File || value[0] instanceof File))) {
    return true;
  }
  let str = TO_STRING.call(value);
  return '[object FileList]' === str || '[object File]' === str || '[object File]' === TO_STRING.call(value[0]);
}

// private
const SIZE_REG = /^([\d\.]+)\s*([KMGTPE]?B)?$/
const SIZE_UNITS = {
  B:  1,
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
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 1).toLowerCase()
}
