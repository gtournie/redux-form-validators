import Validators from '../index'

global.ValidatorsFormatMessage = Validators.getFormatMessage()
Validators.setFormatMessage(function (msg) {
  return msg
})

global.FileList = function (params) {
  params = params || { length: 0 }
  Object.assign(this, params)
  this.length = params.length
}

global.File = function (params) {
  Object.assign(this, params)
}
