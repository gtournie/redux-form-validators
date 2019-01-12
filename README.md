[![Build Status](https://travis-ci.org/gtournie/redux-form-validators.svg?branch=master)](https://travis-ci.org/gtournie/redux-form-validators)
[![Coverage Status](https://coveralls.io/repos/github/gtournie/redux-form-validators/badge.svg?branch=master)](https://coveralls.io/github/gtournie/redux-form-validators?branch=master)
[![Peer Dependencies Status](https://david-dm.org/gtournie/redux-form-validators/peer-status.svg)](https://david-dm.org/gtournie/redux-form-validators/peer-status.svg)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://img.shields.io/npm/v/redux-form-validators.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validators)
[![npm downloads](https://img.shields.io/npm/dm/redux-form-validators.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validators)

/!\ Version 2.0.0 is now dependency-free. If you're working with react-intl, look at the [i18n and react-intl](#i18n-and-react-intl) section.

# redux-form-validators

Simple validations with redux-form. Heavily inspired by the rails validations.

[Installation](#installation) | [Example](#example) | [Documentation](#documentation)

## Installation

`npm install redux-form-validators`

> Note: For internationalization purposes, this package is compatible with [react-intl](https://github.com/yahoo/react-intl).

## Example

To run the example project you need to clone the repo and run `npm i -d && npm start`.
Then go to [http://localhost:3003/](http://localhost:3003/)

## How to use

If you're already familiar with [redux-form](http://redux-form.com/) it should be pretty straight forward:

### Field validation

[This example](http://redux-form.com/7.0.3/examples/fieldLevelValidation/) shows you how to set a field level validation with redux-form.
Thanks to `redux-form-validators`, you'll only have to pass the validators needed:

```
import { required, email } from 'redux-form-validators'

<Field name="email" type="email" label="Email" component={renderField}
    validate={[required(), email()]} />
```

That's it! =)

### Sync validation

Now let's replace the validate function of [this redux-form example](http://redux-form.com/7.0.3/examples/syncValidation/):

```
validations = {
  username: [required(), length({ max: 15 })],
  email:    [required(), email()],
  age:      [
    required(),
    numericality({
      int: true,
      '>=': 18,
      msg: { greaterThanOrEqualTo: "You must be at least 18 years old" }
    })
  ]
}

// Reusable with any other form
validate = (values) => {
  const errors = {}
  for (let field in validations) {
    let value = values[field]
    errors[field] = validations[field].map(validateField => {
      return validateField(value, values)
    }).find(x => x)
  }
  return errors
}
```

## Documentation

Validators

* [required / presence](#required-alias-presence)
* [email](#email)
* [numericality](#numericality)
* [date](#date)
* [length](#length)
* [confirmation](#confirmation)
* [format](#format)
* [acceptance](#acceptance)
* [inclusion](#inclusion)
* [exclusion](#exclusion)
* [absence](#absence)
* [url](#url)
* [file](#file)

More

* [default options](#default-options)
* [i18n and react-intl](#i18n-and-react-intl)
* [default messages override](#default-messages-override)
* [common validation options](#common-validation-options)
* [conditional validation](#conditional-validation)
* [adding a validator](#adding-a-validator)
* [date helpers](#date-helpers)

### required (alias: presence)

Validates that the specified value is not empty. It uses the `trim()` method to check if the value is a blank string, that is, a string that is either empty or consists of whitespace.

```
<Field name="login" type="text" label="Login" component={renderField}
    validate={required()} />
```

The default error message is "is required". You can also pass custom message via the [message option](#common-validation-options).

### email

Validates that the specified value is a valid email address. It uses the `email.REG_EMAIL` regexp to check the value.

```
<Field name="email" type="email" label="Email" component={renderField}
    validate={email()} />
```

The default error message is "is not a valid email".

### numericality

Validates that your value have only numeric values. By default, it will match an optional sign followed by an integral or floating point number. To specify that only integral numbers are allowed set `int` (or `integer`) to true.

```
<Field name="lat" type="text" label="Latitude" component={renderField}
    validate={numericality()} />
```

Besides `int`, this validator also accepts the following options to add constraints to acceptable values:

* `>` (or `greaterThan`) - Specifies the value must be greater than the supplied value. The default error message for this option is "must be greater than ${count}".
* `>=` (or `greaterThanOrEqualTo`) - Specifies the value must be greater than or equal to the supplied value. The default error message for this option is "must be greater than or equal to ${count}".
* `=` (or `equalTo`) - Specifies the value must be equal to the supplied value. The default error message for this option is "must be equal to ${count}".
* `!=` (or `otherThan`) - Specifies the value must be other than the supplied value. The default error message for this option is "must be other than 4{count}".
* `<` (or `lessThan`) - Specifies the value must be less than the supplied value. The default error message for this option is "must be less than ${count}".
* `<=` (or `lessThanOrEqualTo`) - Specifies the value must be less than or equal to the supplied value. The default error message for this option is "must be less than or equal to ${count}".
* `odd` - Specifies the value must be an odd number if set to true. The default error message for this option is "must be odd".
* `even` - Specifies the value must be an even number if set to true. The default error message for this option is "must be even".

Examples

```
numericality({ int: true })
numericality({ '>': 6 })
numericality({ '>': 6, '<=': 20 })
numericality({ int: true, odd: true })
```

The default error messages are:

* "is not a number"
* "must be greater than {number}"
* "must be greater than or equal to {number}"
* "must be equal to {number}"
* "must be other than {number}"
* "must be less than {number}"
* "must be less than or equal to {number}"
* "must be odd"
* "must be even"

### date

Very simple date validator. Limited to year, month and day validation (but it should mostly match your needs). Feel free to use a date manipulation lib to write a better date validator (see [add a validator](#adding-a-validator)).

```
<Field name="date" type="text" label="Date" component={renderField}
    validate={date({ format: 'mm/dd/yyyy' })} />
```

Accepts the following options:

* `format` - Specifies the format that should match the date string. Accepts only the current flags: `y`, `m` & `d`. The number of flags used represents the number of digits expected (e.g. `yyyy` expects 4 digits while `yy` expects 2). Format examples: `mm/dd/yyyy`, `dd/mm/yyyy`, `yyyy-mm-dd`, `mm/dd/yy`, `yyyy/mm`, `mm/dd`...
* `ymd` - Allows you to customize the format, to be more readable in case you're using i18n. For instance, you could use `{ format: 'jj/mm/aaaa', ymd: 'amj' }` for a French format.

(See [default options](#default-options) to set `format` and `ymd` globally)

And the comparable options:

* '=', '>', '>=', '<', '<='. All of these options accept either a Date object, a timestamp, or a function (which returns a Date or a timestamp). To avoid syncing issues, don't pass `new Date()` directly but wrap it in a function or just pass the string `'today'`. Note that these options are only available if these flags are present: `y` + `m` + `d` OR `y` + `m` OR just `y`)

Examples

```
date({ format: 'mm/dd/yyyy' })
date({ format: 'mm/yyyy' })
date({ format: 'YYYY-MM-DD', ymd: 'YMD' })
date({ format: 'dd/mm/yyyy', '<': new Date(2020, 0, 1), '>=': new Date(1980, 0, 1) })
date({ format: 'mm/dd/yyyy', '>': 'today', msg: "must be in the future" })
date({ format: 'mm/dd/yyyy', '<=': twentyYearsAgo, msg: "you must be at least 20 years old" })

function twentyYearsAgo () {
  let d = new Date()
  d.setFullYear(d.getFullYear() - 20)
  return d
}
```

The default error messages are:

* "expected format: {format}"
* "is not a valid date" (e.g. Feb 29 2017)
* "should be {op} {date}" (e.g. 'should be > 01/14/2017')

See also [parseDate](#parsedate) & [formatDate](#formatdate)

### length

Validates the length of the value. It provides a variety of options, so you can specify length constraints in different ways:

```
<Field name="name" type="text" label="Name" component={renderField}
    validate={length({ min: 2 })} />
```

The possible length constraint options are:

* `min` (or `minimum`) - The value cannot have less than the specified length.
* `max` (or `maximum`) - The value cannot have more than the specified length.
* `in` (or `within`) - The value length must be included in a given interval. The value for this option must be an array.
* `is` (or `=`) - The value length must be equal to the given value.

Examples

```
length({ minimum: 2 })
length({ min: 2, max: 8 })
length({ in: [2, 8] })
length({ is: 6 })
```

The default error messages depend on the type of length validation being performed. You can personalize these messages using the `wrongLength`, `tooLong`, and `tooShort` options and ${count} as a placeholder for the number corresponding to the length constraint being used. You can still use the `msg` (or `message`) option to specify an error message (don't forget to pluralize it).

### confirmation

You should use this validator when you have two text fields that should receive exactly the same content. For example, you may want to confirm an email address or a password.

```
<Field name="pass" type="password" label="Password" component={renderField} />
<Field name="confirmation" type="password" label="Confirmation" component={renderField}
    validate={confirmation({ field: 'pass', fieldLabel: 'Password' })} />
```

There is also a `caseSensitive` option that you can use to define whether the confirmation constraint will be case sensitive or not. This option defaults to true (see [default options](#default-options)).

Examples

```
confirmation({ field: 'email' })
confirmation({ field: 'email', fieldLabel: 'Email' })
confirmation({ field: 'email', fieldLabel: 'Email', caseSensitive: false })
```

The default error message for this validator is "doesn't match ${fieldLabel || field}".

### format

Validates the value by testing whether it match a given regular expression, which is specified using the `with` option.

```
<Field name="legacyCode" type="text" label="Legacy Code" component={renderField}
    validate={format({ with: /^[a-z]+$/i, message: "Only allows letters" })} />
```

Alternatively, you can require that the specified value does not match the regular expression by using the `without` option.

Examples

```
format({ with: /[a-z0-9]/i })
format({ without: /#@%&\!\:\?\+\=/i }) // doesn't allow these chars: '#@%&!:?+='
```

The default error message is "is invalid".

### acceptance

This method validates that a checkbox on the user interface was checked. This is typically used when the user needs to agree to your application's terms of service, confirm that some text is read, or any similar concept.

```
<Field name="terms" type="checkbox" label="I accept the terms of service"
    component={renderField} validate={acceptance()} />
```

It can also receive an `accept` option, which determines the allowed values that will be considered as accepted. It defaults to ['1', 'true'] (see [default options](#default-options)).

Examples

```
acceptance({ accept: 'yes' })
acceptance({ accept: ['TRUE', 'accepted'] })
```

The default error message for this validator is "must be accepted".

### inclusion

Validates that the value is included in a given set.

```
<Field name="size" type="text" label="Size" component={renderField}
    validate={inclusion({ in: ['small', 'medium', 'large'] })} />
```

The inclusion validator has an option `in` that receives the set of values that will be accepted. The `in` option has an alias called `within` that you can use for the same purpose, if you'd like to.

There is also a `caseSensitive` option that you can use to define whether the match will be case sensitive or not. This option defaults to true (see [default options](#default-options)).

Examples

```
inclusion({ in: [1, 2, 3, 4] })
inclusion({ in: ['blue', 'white', 'red'], caseSensitive: false })
```

The default error message for this validator is "is not included in the list".

### exclusion

Validates that the value is not included in a given set.

```
<Field name="subdomain" type="text" label="Subdomain" component={renderField}
    validate={exclusion({ in: ['www', 'us', 'ca'] })} />
```

The exclusion validator has an option `in` that receives the set of values that will not be accepted for the validated attributes. The `in` option has an alias called `within` that you can use for the same purpose, if you'd like to.

There is also a `caseSensitive` option that you can use to define whether the match will be case sensitive or not. This option defaults to true (see [default options](#default-options)).

Examples

```
exclusion({ in: [1, 2, 3, 4] })
exclusion({ in: ['apple', 'banana'], caseSensitive: false })
```

The default error message is "${value} is reserved".

### absence

Validates that the specified value are absent. It uses the `trim()` method to check if the value is not a blank string, that is, a string that is either empty or consists of whitespace.

```
<Field name="name" type="text" label="Name" component={renderField}
    validate={absence()} />
```

The default error message is "must be blank".

### url

Validates that the specified value is a valid URL. It uses the `url.REG_URL` regexp to check the value.

```
<Field name="url" type="text" label="URL" component={renderField}
    validate={url()} />
```

The url validator has an option `protocol` (or its alias `protocols`) that receives the set of protocols that will be accepted. This option default to ['http', 'https'] (see [default options](#default-options)).

Examples

```
url({ protocol: 'http' })
url({ protocol: 'ftp' })
url({ protocols: ['http', 'https'] })
```

The default error message is "is not a valid URL".

> Note: As of version 2.0.0, the default protocol value is now: ['http', 'https'] ('ftp' was previously included)

### file

Validates that the specified value is a valid File or FileList.

```
<Field name="file" type="file" label="File" component={renderFileField}
    validate={file()} />
```

The possible file constraint options are:

* `accept` - The value is a file (or a list of files) that match a comma-separated list of allowed file extensions or MIME types
* `minSize` - The value is a file (or a list of files) that cannot be smaller than the specified size
* `maxSize` - The value is a file (or a list of files) that cannot be bigger than the specified size
* `minFiles` - The value is a list of files that cannot be smaller than the specified length
* `maxFiles` - The value is a list of files that cannot be bigger than the specified length

Examples

```
file()
file({ accept: 'image/png, image/jpeg' })
file({ accept: '.png, .jpg, .jpeg' })
file({ accept: 'image/*' }) // Accept any file with an image/* MIME type
file({ minSize: '5 MB', maxSize: '1 TB' })
file({ minFiles: 2, maxFiles: 5 })
```

The default error messages are:

* "is not a file"
* "invalid file type" / "invalid file types ({count})"
* "is too small (minimum is {size})" / "{count} files are too small (minimum is {size} each)"
* "is too big (maximum is {size})" / "{count} files are too big (maximum is {size} each)"
* "invalid number of files (minimum is {count})"
* "invalid number of files (maximum is {count})"

> Note: size units supported: B, KB, MB, GB, TB, PB, EB

> Note: file inputs are only compatible with `file`, `required` or `absence` validators

### Default options

redux-form-validators comes with default options:

```
{
  allowBlank:    false,
  urlProtocols:  ['http', 'https'],
  dateFormat:    'yyyy-mm-dd',
  dateYmd:       'ymd',
  accept:        ['1', 'true'],
  caseSensitive: true,  // confirmation, inclusion, exclusion
  pluralRules: { // See the "i18n and react-intl" section
    0: 'zero',
    1: 'one'
  }
};
```

But you can easily change them:

```
import Validators from 'redux-validators'

// Override dateFormat & urlProtocols
Object.assign(Validators.defaultOptions, {
  dateFormat: 'mm/dd/yyyy',
  urlProtocols: ['http', 'https', 'ftp']
})
```

### i18n and react-intl

By default, all errors messages are in english and are pluralized if needed (basic support) but you can use [react-intl](https://github.com/yahoo/react-intl) to support different languages. All you need to do is to insert the following lines:

```
import Validators from 'redux-form-validators'
import { FormattedMessage } from 'react-intl'

Validators.formatMessage = function(msg) {
  return <FormattedMessage {...(msg.props || msg)} />
}
```

> Note: You can also implement your own i18n/pluralization module by overriding `Validators.formatMessage`. The first argument is a javascript object compatible with react-intl:

```
{
  id: "form.errors.greaterThan",
  defaultMessage: "must be greater than {count, number}",
  values: { count: 10 }
}
```

> Note: You can also change the default plural rules or file size formats:

```
// Plural rules
Validators.pluralRules = {
  1: 'one', 5: 'one', 7: 'one', 8: 'one', 9: 'one', 10: 'one',
  2: 'two', 3: 'two',
  4: 'few',
  6: 'many'
}
let msg = '{count, plural, one {foo} two {bar} few {fooo} many {baaar} other {foobar}}'

// Size format
const FR_UNITS = {
  B:  'octets',
  KB: 'Ko',
  ...
}
Validators.formatSize = function (size, unit) {
  return size + ' ' + FR_UNITS[unit]
}
file({ minSize: '5MB' }) // -> is too small (minimum is 5 Mo)
file({ minSize: 500 })   // -> is too small (minimum is 500 octets)
```

And if you're using [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl) to extract your application messages, you'll need to **add** a new plugin entry in your webpack config ([example](https://github.com/gtournie/redux-form-validators/blob/master/webpack/example.js)):

```
["react-intl", {
  "messagesDir": ...,
  "languages": ...,
  // /!\ it's important to keep a relative path here
  "moduleSourceName": "./redux-form-validators"
}
```

### Default messages override

To override the default messages globally:

```
Object.assign(Validators.messages, {
  email: {
    id: "form.errors.email",
    defaultMessage: "is not a valid email address"
  },
  presence: {
    id: "form.errors.presence",
    defaultMessage: "is missing"
  },
  tooShort: {
    id: "form.errors.tooShort",
    defaultMessage: "is too short: {count, number} chars minimum"
  },
  ...
})
```

OR even simpler if you don't override formatMessage (and don't need ids):

```
Object.assign(Validators.messages, {
  email:    "is not a valid email address",
  presence: "is missing",
  tooShort: "is too short: {count, number} chars minimum",
  ...
})
```

> Note: This won't work with react-intl, as you load the messages from a json file

[See all default messages](https://github.com/gtournie/redux-form-validators/blob/master/src/messages.js).

### Common validation options

#### allowBlank

This option will let validation pass if the value is blank, like an empty string for example.

```
<Field name="name" type="text" label="Name" component={renderField}
    validate={length({ '=': 5, allowBlank: true })} />
```

Not available for: required, absence, acceptance & confirmation.

> Note: If you're already using the required validator you don't need to care about the allowBlank option.

#### message (alias: msg)

As you've already seen, the `message` option lets you specify the message that will be added to the errors collection when validation fails. When this option is not used, `redux-form-validators` will use the respective default error message for each validator. The `message` option accepts a String, a Hash or a [FormattedMessage](https://github.com/yahoo/react-intl/wiki/Components#string-formatting-components).

```
format({ with: /^[a-z]+$/i, message: 'Letters only' })
format({ with: /^[a-z]+$/i, message: { defaultMessage: 'Letters only' } })

// I18n with react-intl
format({ with: /^[a-z]+$/i, message: { id: 'form.errors.alpha',
  defaultMessage: 'Letters only' } })
format({ with: /^[a-z]+$/i, message: <FormattedMessage id="form.errors.alpha"
  defaultMessage="Letters only"/> })

// Version >= 2.1.0 only
length({ msg: { tooShort: 'too short', tooLong: 'too long' }, in: [2, 8] })
length({ msg: { tooShort: { id: 'errors.length.min',
  defaultMessage: 'too short' } }, min: 2 })
length({ msg: { tooShort: <FormattedMessage id="errors.length.min"
  defaultMessage="too short"/> }, min: 2 })
length({ msg: { tooShort: 'min {count, number} characters' }, min: 2, max: 8 })
  //=> tooLong message remains the default message
```

> Note: As of version 2.1.0, you can also override just certain messages, and/or use interpolation.

> Note: all messages are internally converted into javascript objects (see [i18n and react-intl](#i18n-and-react-intl)), so if you pass a FormattedMessage as an argument, don't expect it to be returned as it.

[See all default messages](https://github.com/gtournie/redux-form-validators/blob/master/src/messages.js).

### Conditional validation

#### Using a function with `if` and `unless`

Finally, it's possible to associate `if` and `unless` with a function which will be called. Using a function gives you the ability to write an inline condition instead of a separate method. This option is best suited for one-liners.

```
<Field name="surname" type="text" label="Surname" component={renderField}
    validate={presence({ if: (values, value) => { return '' !== values.name } })} />
```

### Adding a validator

```
const alphaValidator = addValidator({
  defaultMessage: "Letters only",
  validator: function(options, value, allValues) {
    return (options.lowerCase ? /^[a-z]+$/ : /^[a-z]+$/i).test(value)
  }
})

<Field name="name" type="text" label="Name" component={renderField}
    validate={alphaValidator({ lowerCase: true, allowBlank: true })} />

// Version >= 2.0.0 only
const digitValidator = addValidator({
  validator: function(options, value, allValues) {
    if (options.digits !== value.replace(/[^0-9]/g, '').length) {
      return {
        id: "form.errors.custom"
        defaultMessage: "must contain {count, number} {count, plural, one {digit} other {digits}})"
        values: { count: options.digits }
      }
    }
  }
})

<Field name="digits" type="text" label="4 digits" component={renderField}
    validate={digitValidator({ digits: 4 })} />
```

`defaultMessage` accepts a String, a Hash or a [FormattedMessage](https://github.com/yahoo/react-intl/wiki/Components#string-formatting-components). See the `message` option. Its default value is `is not valid`.

> Note: As of version 2.0.0, you can now return a message directly if invalid (allowing things like pluralization). For backward compatibility, if you return a boolean, the validator will return the defaultMessage if invalid.

> Note: you'll still be able to use the common options (`message` & `allowBlank`) and the conditional validation (`if` and `unless`).

### Date helpers

#### parseDate

parser used to validate dates.

Signature: `parseDate(dateString, format[, ymd])`

Examples:

```
import { date } from 'redux-form-validators'
let parseDate = date.parseDate

parseDate('12/31/2017', 'mm/dd/yyyy')        => new Date(2017, 11, 31)
parseDate('2016/01',    'yyyy/mm'))          => new Date(2016,  1,  1)
parseDate('12/01',      'mm/dd'))            => new Date(1970, 11,  1)

// Custom ymd
parseDate('12/31/2017', 'mm/jj/aaaa', 'amj') => new Date(2017, 11, 31)

// Error
parseDate('12122016',   'mm/dd/yyyy')        => Invalid date
```

#### formatDate

formatter used to display dates.

Signature: `formatDate(date, format[, ymd])`

Examples:

```
import { date } from 'redux-form-validators'
let formatDate = date.formatDate

formatDate(new Date(2017, 11, 31), 'mm/dd/yyyy')        => '12/31/2017'
formatDate(new Date(2016,  1,  1), 'yyyy/mm'))          => '2016/01'
formatDate(new Date(1970, 11,  1), 'mm/dd'))            => '12/01'

// Custom ymd
formatDate(new Date(2017, 11, 31), 'mm/jj/aaaa', 'amj') => '12/31/2017'

// Error
formatDate(new Date(NaN), 'mm/dd/yyyy')                 => null
formatDate(null,          'mm/dd/yyyy')                 => null
formatDate({},            'mm/dd/yyyy')                 => null
```
