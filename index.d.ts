// Type definitions for redux-form-validators
// Project: https://github.com/gtournie/redux-form-validators
// Definitions by: Ben Barber <https://github.com/benbarber>
// TypeScript Version: 2.6

  export type Validator = (value: any, allValues?: any, props?: any) => any;

  export interface MessageDescriptor {
    id: string;
    defaultMessage?: string;
    description?: string;
    values?: string | object;
  }

  export interface DefaultValidatorOptions {
    if?: (values: any, value: any) => boolean;
    unless?: (values: any, value: any) => boolean;
    message?: MessageDescriptor | string;
    msg?: MessageDescriptor | string;
  }

  export interface ValidatorMessages {
    absence: MessageDescriptor | string;
    acceptance: MessageDescriptor | string;
    confirmation: MessageDescriptor | string;
    dateFormat: MessageDescriptor | string;
    dateInvalid: MessageDescriptor | string;
    dateRange: MessageDescriptor | string;
    email: MessageDescriptor | string;
    equalTo: MessageDescriptor | string;
    even: MessageDescriptor | string;
    exclusion: MessageDescriptor | string;
    file: MessageDescriptor| string;
    fileAccept: MessageDescriptor | string;
    fileTooBig: MessageDescriptor | string;
    fileTooFew: MessageDescriptor | string;
    fileTooMany: MessageDescriptor | string;
    fileTooSmall: MessageDescriptor | string;
    greaterThan: MessageDescriptor | string;
    greaterThanOrEqualTo: MessageDescriptor | string;
    inclusion: MessageDescriptor | string;
    invalid: MessageDescriptor | string;
    lessThan: MessageDescriptor | string;
    lessThanOrEqualTo: MessageDescriptor | string;
    notAnInteger: MessageDescriptor | string;
    notANumber: MessageDescriptor | string;
    odd: MessageDescriptor | string;
    otherThan: MessageDescriptor | string;
    presence: MessageDescriptor | string;
    tooLong: MessageDescriptor | string;
    tooShort: MessageDescriptor | string;
    url: MessageDescriptor | string;
    wrongLength: MessageDescriptor | string;
  }

  export const absence: (options?: DefaultValidatorOptions) => Validator;
  export const acceptance: (options?: DefaultValidatorOptions) => Validator;

  export interface ConfirmationValidatorOptions extends DefaultValidatorOptions {
    field?: string;
    fieldLabel?: string;
    caseSensitive?: boolean;
  }

  export const confirmation: (options?: ConfirmationValidatorOptions) => Validator;

  export interface DateValidatorOptions extends DefaultValidatorOptions {
    format?: string;
    ymd?: string;
    '='?: Date | number | string;
    '!='?: Date | number | string;
    '>'?: Date | number | string;
    '>='?: Date | number | string;
    '<'?: Date | number | string;
    '<='?: Date | number | string;
    allowBlank?: boolean;
  }

  export const date: (options?: DateValidatorOptions) => Validator;
  export const email: (options?: DefaultValidatorOptions) => Validator;
  export const exclusion: (options?: DefaultValidatorOptions) => Validator;

  export interface FileValidatorOptions extends DefaultValidatorOptions {
    accept?: string;
    minSize?: number | string;
    maxSize?: number | string;
    minFiles?: number;
    maxFiles?: number;
    allowBlank?: boolean;
  }

  export const file: (options?: FileValidatorOptions) => Validator;

  export interface FormatOptions extends DefaultValidatorOptions {
    'with'?: RegExp;
    without?: RegExp;
    allowBlank?: boolean;
  }

  export const format: (options?: FormatOptions) => Validator;

  export interface InclusionValidatorOptions extends DefaultValidatorOptions {
    'in'?: any[];
    within?: any[];
    caseSensitive?: boolean;
    allowBlank?: boolean;
  }

  export const inclusion: (options?: InclusionValidatorOptions) => Validator;


  export interface LengthValidatorOptions extends DefaultValidatorOptions {
    '='?: number;
    is?: number;
    max?: number;
    maximum?: number;
    min?: number;
    minimum?: number;
    'in'?: number[];
    within?: number[];
    allowBlank?: boolean;
  }

  export const length: (options?: LengthValidatorOptions) => Validator;

  export interface NumericalityValidatorOptions extends DefaultValidatorOptions {
    int?: boolean;
    integer?: boolean;
    even?: boolean;
    odd?: boolean;
    '='?: number;
    equalTo?: number;
    '!='?: number;
    otherThan?: number;
    '>'?: number;
    greaterThan?: number;
    '<'?: number;
    lessThan?: number;
    '>='?: number;
    greaterThanOrEqualTo?: number;
    '<='?: number;
    lessThanOrEqualTo?: number;
    allowBlank?: boolean;
  }

  export const numericality: (options?: NumericalityValidatorOptions) => Validator;

  export const presence: (options?: DefaultValidatorOptions) => Validator;
  export const required: (options?: DefaultValidatorOptions) => Validator;

  export interface UrlValidatorOptions extends DefaultValidatorOptions {
    protocol?: string;
    protocols?: string[]
  }

  export const url: (options?: UrlValidatorOptions) => Validator;

  declare const Validators: {
    formatMessage: (msg: MessageDescriptor | string) => string;
    formatSize: (size: number | string, units: string) => string;
    defaultOptions: {
      allowBlank: boolean;
      urlProtocols: string[];
      dateFormat: string;
      dateYmd: string;
      accept: string[];
      caseSensitive: boolean;
    };
    messages: ValidatorMessages,
    pluralRules: any
  }

  export default Validators;
  