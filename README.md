
[![Build Status](https://travis-ci.org/gtournie/redux-form-validators.svg?branch=master)](https://travis-ci.org/gtournie/redux-form-validators)
[![Coverage Status](https://coveralls.io/repos/github/gtournie/redux-form-validators/badge.svg?branch=master)](https://coveralls.io/github/gtournie/redux-form-validators?branch=master)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://img.shields.io/npm/v/redux-form-validators.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validators)
[![npm downloads](https://img.shields.io/npm/dm/redux-form-validators.svg?style=flat-square)](https://www.npmjs.com/package/redux-form-validators)


# redux-form-validators

Simple validations with redux-form. Heavily inspired by the rails validations.

## Installation
```npm install redux-form-validators```

> Note: For internationalization purposes, this package depends on [react-intl](https://github.com/yahoo/react-intl).

## Example

To run the example project you need to clone the repo and run `npm i -d && npm start`.
Then go to [http://localhost:3003/]()

## How to use

If you're already familiar with [redux-form](http://redux-form.com/) it should be pretty straight forward:

### Field validation

[This example](http://redux-form.com/6.4.3/examples/fieldLevelValidation/) shows you how to set a field level validation with redux-form.
Thanks to `redux-form-validators`, you'll only have to pass the validators needed:

```
import { required, email } from 'redux-form-validators'

<Field name="email" type="email" label="Email" component={renderField} 
    validate={[required(), email()]} />
```

That's it! =)

### Sync validation

Now let's replace the validate function of [this redux-form example](http://redux-form.com/6.4.3/examples/syncValidation/):


```
const TOO_YOUNG_ERROR = (
  <FormattedMessage id="form.errors.tooYoung"
      defaultMessage="Sorry, you must be at least 18 years old">
)

validations = {
  username: [required(), length({ max: 15 })],
  email:    [required(), email()],
  age:      [
    required(), 
    numericality({ int: true }), 
    numericality({ '>=': 18, msg: TOO_YOUNG_ERROR })
  ]
}

// Reusable with any other form
validate = (values) => {
  const errors = {}
  for (let field of validations) {
    let value = values[field]
    errors[field] = validations[field].find(validateField => validateField(value))
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

More
* [adding a validator](#adding-a-validator)
* [common validation options](#common-validation-options)
* [conditional validation](#conditional-validation)


### required (alias: presence)

Validates that the specified value is not empty. It uses the `trim()` method to check if the value is a blank string, that is, a string that is either empty or consists of whitespace.

```
<Field name="login" type="text" label="Login" component={renderField} 
    validate={required()} />
```

The default error message is "is required". You can also pass custom message via the [message option](#common-validation-options).


### email

Validates that the specified value is a valid email address. It uses the internal `REG_EMAIL` regexp to check the value.

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

The default error message is "is not a number".


### date

Very simple date validator. Limited to year, month and day validation (but it should mostly match your needs). Feel free to use a date manipulation lib to write a better date validator (see [add a validator](#adding-a-validator)).

```
<Field name="date" type="text" label="Date" component={renderField} 
    validate={date({ format: 'mm/dd/yyyy' })} />
```

Accepts the following options:
* `format` - Specifies the format that should match the date string. Accepts only the current flags: `y`, `m` & `d`. The number of flags used represents the number of digits expected (e.g. `yyyy` expects 4 digits while `yy` expects 2). Format examples: `mm/dd/yyyy`, `dd/mm/yyyy`, `yyyy-mm-dd`, `mm/dd/yy`, `yyyy/mm`, `mm/dd`...
* `ymd` - Allows you to customize the format, to be more readable in case you're using i18n. For instance, you could use `{ format: 'jj/mm/aaaa', ymd: 'amj' }` for a French format.

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

There is also a `caseSensitive` option that you can use to define whether the confirmation constraint will be case sensitive or not. This option defaults to true.

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
const ALPHA_ERROR = <FormattedMessage id="form.errors.alpha"
      defaultMessage="Only allows letters">
 
<Field name="legacyCode" type="text" label="Legacy Code" component={renderField} 
    validate={format({ with: /^[a-z]+$/i, message: ALPHA_ERROR })} />
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

It can also receive an `accept` option, which determines the allowed values that will be considered as accepted. It defaults to ['1', 'true'] and can be easily changed (via the `msg` or `message` parameter).

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

There is also a `caseSensitive` option that you can use to define whether the match will be case sensitive or not. This option defaults to true.

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

There is also a `caseSensitive` option that you can use to define whether the match will be case sensitive or not. This option defaults to true.

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

Validates that the specified value is a valid URL. It uses the internal `REG_URL` regexp to check the value.

```
<Field name="url" type="text" label="URL" component={renderField} 
    validate={url()} />
```

The url validator has an option `protocol` (or its alias `protocols`) that receives the set of protocols that will be accepted. This option default to ['http', 'https', 'ftp'].

Examples
```
url({ protocol: 'http' })
url({ protocol: 'ftp' })
url({ protocols: ['http', 'https'] })
```

The default error message is "is not a valid URL".


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
const ALPHA_ERROR = <FormattedMessage id="form.errors.alpha"
      defaultMessage="Letters only">
 
format({ with: /^[a-z]+$/i, message: ALPHA_ERROR })
format({ with: /^[a-z]+$/i, message: { id: 'form.errors.alpha' } })
format({ with: /^[a-z]+$/i, message: 'form.errors.alpha' })
format({ with: /^[a-z]+$/i, message: { id: 'form.errors.alpha', defaultMessage: 'Letters only' } })
```

Or alternatively, if you don't care about i18n:

```
format({ with: /^[a-z]+$/i, message: 'Letters only' })
```

This will be wrapped in a FormattedMessage (with the message as id), will look for a message with this id and will finally fallback to the id.

[See all default messages](https://github.com/gtournie/redux-form-validators/blob/master/examples/src/locales/en.json).


### Conditional validation

#### Using a function with `if` and `unless`

Finally, it's possible to associate `if` and `unless` with a function which will be called. Using a function gives you the ability to write an inline condition instead of a separate method. This option is best suited for one-liners.

```
<Field name="surname" type="text" label="Surname" component={renderField} 
    validate={presence({ if: (value, values) => { return '' !== values.name } })} />
```


### Adding a validator

```
const ALPHA_ERROR = <FormattedMessage id="form.errors.alpha"
      defaultMessage="Letters only">

const alphaValidator = addValidator({
  defaultMessage: ALPHA_ERROR,
  validator:  function(options, value, allValues) {
    return (options.lowerCase ? /^[a-z]+$/ : /^[a-z]+$/i).test(value);
  }
})

<Field name="name" type="text" label="Name" component={renderField} 
    validate={alphaValidator({ lowerCase: true, allowBlank: true })} />
```

`defaultMessage` accepts a String, a Hash or a [FormattedMessage](https://github.com/yahoo/react-intl/wiki/Components#string-formatting-components). See the `message` option. Its default value is `is not valid`;

> Note: you'll still be able to use the common options (`message` & `allowBlank`) and the conditional validation (`if` and `unless`);






