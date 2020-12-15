/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 13:37:50 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

const checkPassword = (values, translate, errors = {}) => {
  if (values.password) {
    const newPassword = values.password;
    // contains special char?
    if (!new RegExp(/[^\dA-Z]/i).test(newPassword))
      errors.password = translate('validation.passwdSpecial');
    // contains number?
    if (!new RegExp(/\d/).test(newPassword))
      errors.password = translate('validation.passwdNumber');
    // contains lower case letter?
    if (!new RegExp(/[a-z]/).test(newPassword))
      errors.password = translate('validation.passwdLower');
    // contains upper case letter?
    if (!new RegExp(/[A-Z]/).test(newPassword))
      errors.password = translate('validation.passwdUpper');
    // is at least 8 chars long?
    if (newPassword.length < 8)
      errors.password = translate('validation.passwdMinLen');
    // is at most 99 chars long?
    if (newPassword.length > 99)
      errors.password = translate('validation.passwdMaxLen');
  } else {
    errors.password = translate('ra.validation.required');
  }
  return errors;
};

const checkEmail = (values, translate, errors = {}) => {
  if (values.email) {
    const { email } = values;
    if (
      !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, 'i').test(
        email.trim()
      )
    )
      errors.email = translate('validation.invalidEmail');
  } else {
    errors.email = translate('ra.validation.required');
  }
  return errors;
};

const checkCode = (values, translate, errors = {}) => {
  if (!values.verificationCode)
    errors.verificationCode = translate('ra.validation.required');
  return errors;
};

export const validatePassword = (values, props) => {
  const errors = {};
  const { translate } = props;
  return checkPassword(values, translate, errors);
};

export const validateCodePassword = (values, props) => {
  const errors = {};
  const { translate } = props;
  checkCode(values, translate, errors);
  checkPassword(values, translate, errors);
  return errors;
};

export const validateEmail = (values, props) => {
  const errors = {};
  const { translate } = props;
  return checkEmail(values, translate, errors);
};

export const isNewPasswordRequired = (user = {}) =>
  user.challengeName === 'NEW_PASSWORD_REQUIRED';
