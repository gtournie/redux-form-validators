// Type definitions for redux-form-validators
// Project: https://github.com/gtournie/redux-form-validators
// Definitions by: Ben Barber <https://github.com/benbarber>
// TypeScript Version: 2.6

  export type Validator = (value: any, allValues?: any, props?: any) => any;

  export interface DefaultValidatorOptions {
    if?: (values: any, value: any) => boolean;
    unless?: (values: any, value: any) => boolean;
    message?: string;
    msg?: string
  }

  export const absence: (options?: DefaultValidatorOptions) => Validator | Validator[];
  export const acceptance: (options?: DefaultValidatorOptions) => Validator | Validator[];

  export interface ConfirmationValidatorOptions extends DefaultValidatorOptions {
    field?: string;
    fieldLabel?: string;
    caseSensitive?: boolean;
  }

  export const confirmation: (options?: ConfirmationValidatorOptions) =>
                              Validator | Validator[];

  export interface DateValidatorOptions extends DefaultValidatorOptions {
    format?: string;
    ymd?: string;
    '='?: Date | string;
    '!='?: Date | string;
    '>'?: Date | string;
    '>='?: Date | string;
    '<'?: Date | string;
    '<='?: Date | string;
    allowBlank?: boolean;
  }

  export const date: (options?: DateValidatorOptions) => Validator | Validator[];
  export const email: (options?: DefaultValidatorOptions) => Validator | Validator[];
  export const exclusion: (options?: DefaultValidatorOptions) => Validator | Validator[];

  export interface FileValidatorOptions extends DefaultValidatorOptions {
    accept?: string;
    minSize?: string;
    maxSize?: string;
    minFiles?: number;
    maxFiles?: number;
    allowBlank?: boolean;
  }

  export const file: (options?: FileValidatorOptions) => Validator | Validator[];

  export interface FormatOptions extends DefaultValidatorOptions {
    'with'?: RegExp;
    without?: RegExp;
    allowBlank?: boolean;
  }

  export const format: (options?: FormatOptions) => Validator | Validator[];

  export interface InclusionValidatorOptions extends DefaultValidatorOptions {
    'in'?: any[];
    within?: any[];
    caseSensitive?: boolean;
    allowBlank?: boolean;
  }

  export const inclusion: (options?: InclusionValidatorOptions) => 
                          Validator | Validator[];


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

  export const length: (options?: LengthValidatorOptions) => Validator | Validator[];

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

  export const numericality: (options?: NumericalityValidatorOptions) =>
                              Validator | Validator[];

  export const presence: (options?: DefaultValidatorOptions) => Validator | Validator[];
  export const required: (options?: DefaultValidatorOptions) => Validator | Validator[];

  export interface UrlValidatorOptions extends DefaultValidatorOptions {
    protocol?: string;
    protocols?: string[]
  }

  export const url: (options?: UrlValidatorOptions) => Validator | Validator[];
  