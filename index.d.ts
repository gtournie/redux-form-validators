// Type definitions for redux-form-validators
// Project: https://github.com/gtournie/redux-form-validators
// Definitions by: Ben Barber <https://github.com/benbarber>
// TypeScript Version: 2.6

export type Validator = (value: any, allValues?: any, props?: any) => any
export type FormValidator = (allValues?: any) => any

export interface MessageDescriptor {
  id?: string
  defaultMessage?: string
  description?: string
  values?: string | object
}

export interface MessageProps {
  props: MessageDescriptor
}

declare type ValidatorMessage = MessageDescriptor | MessageProps | string

export interface DefaultValidatorOptions {
  if?: (values: any, value: any, props: any, name: string) => boolean
  unless?: (values: any, value: any, props: any, name: string) => boolean
  memoize?: any
  message?: ValidatorMessage
  msg?: ValidatorMessage
}

export interface ValidatorMessages {
  absence: ValidatorMessage
  acceptance: ValidatorMessage
  confirmation: ValidatorMessage
  dateFormat: ValidatorMessage
  dateInvalid: ValidatorMessage
  dateRange: ValidatorMessage
  email: ValidatorMessage
  emailDomain: ValidatorMessage
  equalTo: ValidatorMessage
  even: ValidatorMessage
  exclusion: ValidatorMessage
  file: ValidatorMessage
  fileAccept: ValidatorMessage
  fileTooBig: ValidatorMessage
  fileTooFew: ValidatorMessage
  fileTooMany: ValidatorMessage
  fileTooSmall: ValidatorMessage
  greaterThan: ValidatorMessage
  greaterThanOrEqualTo: ValidatorMessage
  inclusion: ValidatorMessage
  invalid: ValidatorMessage
  lessThan: ValidatorMessage
  lessThanOrEqualTo: ValidatorMessage
  notAnInteger: ValidatorMessage
  notANumber: ValidatorMessage
  odd: ValidatorMessage
  otherThan: ValidatorMessage
  presence: ValidatorMessage
  tooLong: ValidatorMessage
  tooShort: ValidatorMessage
  url: ValidatorMessage
  wrongLength: ValidatorMessage
}

export const validateForm: (validations: object) => FormValidator

export interface AddValidatorOptions {
  validator: Validator
  defaultMessage?: string
  defaultMsg?: string
}
export const addValidator: (options: AddValidatorOptions) => Validator

export const combine: (...validators: Validator[]) => Validator

export const absence: (options?: DefaultValidatorOptions) => Validator
export const acceptance: (options?: DefaultValidatorOptions) => Validator

export interface ConfirmationValidatorOptions extends DefaultValidatorOptions {
  field?: string
  fieldLabel?: string
  caseSensitive?: boolean
}

export const confirmation: (options?: ConfirmationValidatorOptions) => Validator

export interface DateValidatorOptions extends DefaultValidatorOptions {
  format?: string
  ymd?: string
  '='?: Date | number | string
  '!='?: Date | number | string
  '>'?: Date | number | string
  '>='?: Date | number | string
  '<'?: Date | number | string
  '<='?: Date | number | string
  allowBlank?: boolean
}

export const date: (options?: DateValidatorOptions) => Validator
export const exclusion: (options?: DefaultValidatorOptions) => Validator

export interface EmailValidatorOptions extends DefaultValidatorOptions {
  allowBlank?: boolean
}

export const email: (options?: EmailValidatorOptions) => Validator

export interface FileValidatorOptions extends DefaultValidatorOptions {
  accept?: string
  minSize?: number | string
  maxSize?: number | string
  minFiles?: number
  maxFiles?: number
  allowBlank?: boolean
}

export const file: (options?: FileValidatorOptions) => Validator

export interface FormatOptions extends DefaultValidatorOptions {
  with?: RegExp
  without?: RegExp
  allowBlank?: boolean
}

export const format: (options?: FormatOptions) => Validator

export interface InclusionValidatorOptions extends DefaultValidatorOptions {
  in?: any[]
  within?: any[]
  caseSensitive?: boolean
  allowBlank?: boolean
}

export const inclusion: (options?: InclusionValidatorOptions) => Validator

export interface LengthValidatorOptions extends DefaultValidatorOptions {
  '='?: number
  is?: number
  max?: number
  maximum?: number
  min?: number
  minimum?: number
  in?: number[]
  within?: number[]
  allowBlank?: boolean
}

export const length: (options?: LengthValidatorOptions) => Validator

export interface NumericalityValidatorOptions extends DefaultValidatorOptions {
  int?: boolean
  integer?: boolean
  even?: boolean
  odd?: boolean
  '='?: number
  equalTo?: number
  '!='?: number
  otherThan?: number
  '>'?: number
  greaterThan?: number
  '<'?: number
  lessThan?: number
  '>='?: number
  greaterThanOrEqualTo?: number
  '<='?: number
  lessThanOrEqualTo?: number
  allowBlank?: boolean
}

export const numericality: (options?: NumericalityValidatorOptions) => Validator

export const presence: (options?: DefaultValidatorOptions) => Validator
export const required: (options?: DefaultValidatorOptions) => Validator

export interface UrlValidatorOptions extends DefaultValidatorOptions {
  protocol?: string
  protocols?: string[]
  emptyProtocol?: boolean
  protocolIdentifier?: boolean
  basicAuth?: boolean
  local?: boolean
  ipv4?: boolean
  ipv6?: boolean
  host?: boolean
  port?: boolean
  path?: boolean
  search?: boolean
  hash?: boolean
}

export const url: (options?: UrlValidatorOptions) => Validator

declare const Validators: {
  formatMessage: (msg: MessageDescriptor) => string
  formatSize: (size: string, units: string) => string
  defaultOptions: {
    memoize: any
    allowBlank: boolean
    urlProtocols: string[]
    dateFormat: string
    dateYmd: string
    accept: string[]
    caseSensitive: boolean
  }
  messages: ValidatorMessages
  pluralRules: object
}

export default Validators
