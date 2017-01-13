import React from 'react';
import { FormattedMessage } from 'react-intl';
import { formatMessage, prepare } from './helpers';


export default function confirmation({ field, fieldLabel, message, msg, 'if': ifCond, unless }) {
  msg = formatMessage(msg || message);

  return prepare(ifCond, unless, false, function(value, allValues) {
    if (value !== ('' + allValues[field])) {
      return msg || (
        <FormattedMessage id="form.errors.confirmation"
          defaultMessage="doesn't match `{fieldLabel}`"
          values={{ fieldLabel: fieldLabel || field }} />
      );
    }
  });
}