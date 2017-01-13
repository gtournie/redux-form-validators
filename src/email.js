import React from 'react';
import { FormattedMessage } from 'react-intl';
import { regFormat } from './helpers';

export var REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

// To be extracted by react-intl
let EMAIL_ERROR = (<FormattedMessage id="form.errors.email" defaultMessage="is not a valid email" />);

export default function email(options) {
  return regFormat(options, REG_EMAIL, "form.errors.email");
}