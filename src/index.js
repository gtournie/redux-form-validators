import React from 'react';
import { FormattedMessage } from 'react-intl';

export const ACCEPT = ['1', 'true'];
export const DEFAULT_ALLOW_BLANK = false;

export const REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export const REG_URL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;


const INVALID_MSG = (<FormattedMessage id="form.errors.invalid" defaultMessage="is invalid" />);

// To be extractable by react-intl
let emailError = (<FormattedMessage id="form.errors.email" defaultMessage="is not a valid email" />);
let urlError = (<FormattedMessage id="form.errors.url" defaultMessage="is not a valid URL" />);


// TODO:
// credit card
// Case sensitive for confirmation, content, acceptance, inclusion, exclusion
// Format: without option
// Length: 'in'
// Numericality: other_than

export function addValidator({ validator, defaultMessage, defaultMsg }) {
  defaultMsg = _formatMessage(defaultMsg || defaultMessage) || INVALID_MSG;

  return function(options={}) {
    options = Object.assign({}, options);
    let blankAllowed = (null == options.allowBlank ? DEFAULT_ALLOW_BLANK : options.allowBlank);
    delete options.allowBlank;

    let msg = _formatMessage(options.msg || options.message) || defaultMsg;

    return _prepare(options.if, options.unless, blankAllowed, function(value, allValues) {
      if (!validator(options, value, allValues)) {
        return msg;
      }
    });
  };
}

export function presence({ message, msg, 'if': ifCond, unless }={}) {
  msg = _formatMessage(msg || message)
    || <FormattedMessage id="form.errors.presence" defaultMessage="is required" />;

  return _prepare(ifCond, unless, false, function(value) {
    if (!value.trim()) {
      return msg;
    }
  });
}
export const required = presence;


export function absence({ message, msg, 'if': ifCond, unless }={}) {
  msg = _formatMessage(msg || message)
    || <FormattedMessage id="form.errors.absence" defaultMessage="must be blank" />;

  return _prepare(ifCond, unless, false, function(value) {
    if (value.trim()) {
      return msg;
    }
  });
}

export function acceptance({ accept=ACCEPT, message, msg, 'if': ifCond, unless }={}) {
  msg = _formatMessage(msg || message)
     || <FormattedMessage id="form.errors.acceptance" defaultMessage="must be accepted" />;

  accept = [].concat(accept).map(String);

  return _prepare(ifCond, unless, false, function(value) {
    if (accept.indexOf(value) < 0) {
      return msg;
    }
  });
}

export function length({
      '=': equal, is,
      max, maximum,
      min, minimum,
      message, msg,
      'if': ifCond, unless,
      allowBlank=DEFAULT_ALLOW_BLANK
    }) {
  msg   = _formatMessage(msg || message);

  min   = _isNumber(min)   ? min   : minimum;
  max   = _isNumber(max)   ? max   : maximum;
  equal = _isNumber(equal) ? equal : is;

  return _prepare(ifCond, unless, allowBlank, function(value) {
    if (_isNumber(equal) && value.length !== +equal) {
      return msg || (
        <FormattedMessage id="form.errors.wrongLength"
          defaultMessage="is the wrong length (should be {count, number} {count, plural, one {character} other {characters}})"
          values={{ count: equal }} />
      );
    }
    if (_isNumber(max) && value.length > +max) {
      return msg || (
        <FormattedMessage id="form.errors.tooLong"
          defaultMessage="is too long (maximum is {count, number} {count, plural, one {character} other {characters}})"
          values={{ count: max }} />
      );
    }
    if (_isNumber(min) && value.length < +min) {
      return msg || (
        <FormattedMessage id="form.errors.tooShort"
          defaultMessage="is too short (minimum is {count, number} {count, plural, one {character} other {characters}})"
          values={{ count: min }} />
      );
    }
  });
}

export function numericality({
      int, integer,
      even,
      odd,
      '=': equal, equalTo,
      '>': greater, greaterThan,
      '<': less, lessThan,
      '>=': greaterOrEqual, greaterThanOrEqualTo,
      '<=': lessOrEqual, lessThanOrEqualTo,
      message, msg,
      'if': ifCond, unless,
      allowBlank=DEFAULT_ALLOW_BLANK
    }={}) {

  msg            = _formatMessage(msg || message);

  int            = int || integer;
  equal          = _isNumber(equal)          ? equal          : equalTo;
  greater        = _isNumber(greater)        ? greater        : greaterThan;
  less           = _isNumber(less)           ? less           : lessThan;
  greaterOrEqual = _isNumber(greaterOrEqual) ? greaterOrEqual : greaterThanOrEqualTo;
  lessOrEqual    = _isNumber(lessOrEqual)    ? lessOrEqual    : lessThanOrEqualTo;

  return _prepare(ifCond, unless, allowBlank, function(value) {
    if (!_isNumber(value)) {
      return msg || (<FormattedMessage id="form.errors.notANumber" defaultMessage="is not a number" />);
    }
    if (int && (+value % 1)) {
      return msg || (<FormattedMessage id="form.errors.notANumber" />);
    }
    if (_isNumber(equal) && +value !== +equal) {
      return msg || (
        <FormattedMessage id="form.errors.equalTo"
          defaultMessage="must be equal to {count, number}"
          values={{ count: equal }} />
      );
    }
    if (_isNumber(greater) && +value <= +greater) {
      return msg || (
        <FormattedMessage id="form.errors.greaterThan"
          defaultMessage="must be greater than {count, number}"
          values={{ count: greater }} />
      );
    }
    if (_isNumber(greaterOrEqual) && +value < +greaterOrEqual) {
      return msg || (
        <FormattedMessage id="form.errors.greaterThanOrEqualTo"
          defaultMessage="must be greater than or equal to {count, number}"
          values={{ count: greaterOrEqual }} />
      );
    }
    if (_isNumber(less) && +value >= +less) {
      return msg || (
        <FormattedMessage id="form.errors.lessThan"
          defaultMessage="must be less than {count, number}"
          values={{ count: less }} />
      );
    }
    if (_isNumber(lessOrEqual) && +value > +lessOrEqual) {
      return msg || (
        <FormattedMessage id="form.errors.lessThanOrEqualTo"
          defaultMessage="must be less than or equal to {count, number}"
          values={{ count: lessOrEqual }} />
      );
    }
    if (even && (_trunc(+value) % 2)) {
      return msg || (<FormattedMessage id="form.errors.even" defaultMessage="must be even" />);
    }
    if (odd && !(_trunc(+value) % 2)) {
      return msg || (<FormattedMessage id="form.errors.odd" defaultMessage="must be odd" />);
    }
  });
}

export function confirmation({ field, fieldLabel, message, msg, 'if': ifCond, unless }) {
  msg = _formatMessage(msg || message);

  return _prepare(ifCond, unless, false, function(value, allValues) {
    if (value !== ('' + allValues[field])) {
      return msg || (
        <FormattedMessage id="form.errors.confirmation"
          defaultMessage="doesn't match `{fieldLabel}`"
          values={{ fieldLabel: fieldLabel || field }} />
      );
    }
  });
}

export function format({ 'with': wit, message, msg, 'if': ifCond, unless, allowBlank=DEFAULT_ALLOW_BLANK }) {
  msg = _formatMessage(msg || message);

  return _prepare(ifCond, unless, allowBlank, function(value) {
    if (!value.match(wit)) {
      return msg || INVALID_MSG;
    }
  });
}

export function email(options) {
  return _reg(options, REG_EMAIL, "form.errors.email");
}

export function url(options) {
  return _reg(options, REG_URL, "form.errors.url");
}

export function inclusion({ 'in': inc, within, message, msg, 'if': ifCond, unless, allowBlank=DEFAULT_ALLOW_BLANK }) {
  msg = _formatMessage(msg || message);

  within = [].concat(within || inc).map(String);
  return _prepare(ifCond, unless, allowBlank, function(value) {
    if (within.indexOf(value) < 0) {
      return msg || (<FormattedMessage id="form.errors.inclusion" defaultMessage="is not included in the list" />);
    }
  });
}

export function exclusion({ 'in': inc, within, message, msg, 'if': ifCond, unless, allowBlank=DEFAULT_ALLOW_BLANK }) {
  msg = _formatMessage(msg || message);
  within = [].concat(within || inc).map(String);

  return _prepare(ifCond, unless, allowBlank, function(value) {
    if (within.indexOf(value) >= 0) {
      return msg || (<FormattedMessage id="form.errors.exclusion" defaultMessage="is reserved" />);
    }
  });
}

export function content({
      inc, include,
      exc, exclude,
      message, msg,
      'if': ifCond, unless,
      allowBlank=DEFAULT_ALLOW_BLANK }={}
    ) {
  msg = _formatMessage(msg || message);

  inc = inc || include;
  exc = exc || exclude;

  return _prepare(ifCond, unless, allowBlank, function(value) {
    if (inc && value.indexOf(inc) < 0) {
      return msg || (
        <FormattedMessage id="form.errors.include"
          defaultMessage="should include `{value}`"
          values={{value: inc}} />
      );
    }
    if (exc && value.indexOf(exc) >= 0) {
      return msg || (
        <FormattedMessage id="form.errors.exclude"
          defaultMessage="should not include `{value}`"
          values={{value: exc}} />
      );
    }
  });
}

// private
function _reg(options, reg, messageId) {
  options = Object.assign({}, options);
  options.msg = options.msg || options.message || messageId;
  options.with = reg;
  return format(options);
}

function _prepare(ifCond, unlessCond, allowBlank, func) {
  return function(value='', allValues={}) {
    value = '' + value;
    if (allowBlank && !value.trim()) {
      return;
    }
    if (('function' !== typeof ifCond || ifCond(allValues, value)) &&
        ('function' !== typeof unlessCond || !unlessCond(allValues, value))) {
      return func(value, allValues);
    }
  }
}

function _trunc(num) {
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num);
}

function _isNumber(num) {
  return !isNaN(num) && '' !== ('' + num).trim();
}

function _formatMessage(msg) {
  if (null == msg) return null;
  return 'string' === typeof msg ? <FormattedMessage id={msg} /> : <FormattedMessage {...msg} />
}
