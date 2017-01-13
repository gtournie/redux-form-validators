import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage, prepare, isNumber, trunc, DEFAULT_ALLOW_BLANK } from './helpers';


export default function numericality({
      int, integer,
      even,
      odd,
      '=': equal, equalTo,
      '!=': diff, otherThan,
      '>': greater, greaterThan,
      '<': less, lessThan,
      '>=': greaterOrEqual, greaterThanOrEqualTo,
      '<=': lessOrEqual, lessThanOrEqualTo,
      message, msg,
      'if': ifCond, unless,
      allowBlank=DEFAULT_ALLOW_BLANK
    }={}) {

  msg            = formatMessage(msg || message);

  int            = int || integer;
  equal          = isNumber(equal)          ? equal          : equalTo;
  diff           = isNumber(diff)           ? diff           : otherThan;
  greater        = isNumber(greater)        ? greater        : greaterThan;
  less           = isNumber(less)           ? less           : lessThan;
  greaterOrEqual = isNumber(greaterOrEqual) ? greaterOrEqual : greaterThanOrEqualTo;
  lessOrEqual    = isNumber(lessOrEqual)    ? lessOrEqual    : lessThanOrEqualTo;

  return prepare(ifCond, unless, allowBlank, function(value) {
    if (!isNumber(value)) {
      return msg || (<FormattedMessage id="form.errors.notANumber" defaultMessage="is not a number" />);
    }
    if (int && (+value % 1)) {
      return msg || (<FormattedMessage id="form.errors.notANumber" />);
    }
    if (isNumber(equal) && +value !== +equal) {
      return msg || (
        <FormattedMessage id="form.errors.equalTo"
          defaultMessage="must be equal to {count, number}"
          values={{ count: equal }} />
      );
    }
    if (isNumber(diff) && +value === +diff) {
      return msg || (
        <FormattedMessage id="form.errors.otherThan"
          defaultMessage="must be other than {count, number}"
          values={{ count: diff }} />
      );
    }
    if (isNumber(greater) && +value <= +greater) {
      return msg || (
        <FormattedMessage id="form.errors.greaterThan"
          defaultMessage="must be greater than {count, number}"
          values={{ count: greater }} />
      );
    }
    if (isNumber(greaterOrEqual) && +value < +greaterOrEqual) {
      return msg || (
        <FormattedMessage id="form.errors.greaterThanOrEqualTo"
          defaultMessage="must be greater than or equal to {count, number}"
          values={{ count: greaterOrEqual }} />
      );
    }
    if (isNumber(less) && +value >= +less) {
      return msg || (
        <FormattedMessage id="form.errors.lessThan"
          defaultMessage="must be less than {count, number}"
          values={{ count: less }} />
      );
    }
    if (isNumber(lessOrEqual) && +value > +lessOrEqual) {
      return msg || (
        <FormattedMessage id="form.errors.lessThanOrEqualTo"
          defaultMessage="must be less than or equal to {count, number}"
          values={{ count: lessOrEqual }} />
      );
    }
    if (even && (trunc(+value) % 2)) {
      return msg || (<FormattedMessage id="form.errors.even" defaultMessage="must be even" />);
    }
    if (odd && !(trunc(+value) % 2)) {
      return msg || (<FormattedMessage id="form.errors.odd" defaultMessage="must be odd" />);
    }
  });
}


