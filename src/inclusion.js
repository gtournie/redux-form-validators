import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage, prepare, DEFAULT_ALLOW_BLANK } from './helpers';


export default function inclusion({ 'in': inc, within, message, msg, 'if': ifCond, unless, allowBlank=DEFAULT_ALLOW_BLANK }) {
  msg = formatMessage(msg || message);

  within = [].concat(within || inc).map(String);
  return prepare(ifCond, unless, allowBlank, function(value) {
    if (within.indexOf(value) < 0) {
      return msg || (<FormattedMessage id="form.errors.inclusion" defaultMessage="is not included in the list" />);
    }
  });
}
