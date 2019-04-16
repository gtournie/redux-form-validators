import Validators from '../index'

global.ValidatorsFormatMessage = Validators.formatMessage
Validators.formatMessage = function (msg) {
  return msg
}

global.FileList = function (params) {
  params = params || { length: 0 }
  Object.assign(this, params)
  this.length = params.length
}

global.File = function (params) {
  Object.assign(this, params)
}

console.error = function () {
  console.__lastError = arguments
  console.__lastErrorIncludes = txt =>
    [].slice
      .call(arguments)
      .join(' ')
      .indexOf(txt) >= 0
}
console.error(null)
