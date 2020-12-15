/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 15:43:09 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRedirect } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import defaultTheme from 'ra-ui-materialui/lib/defaultTheme';
import { Notification } from 'ra-ui-materialui/lib/layout';
import { useNotify, useTranslate } from 'react-admin';
import classnames from 'classnames';
import { Card } from '@material-ui/core';
import {
  requestPasswordReset,
  submitNewPassword,
} from 'AuthProvider/amplifyHandlers';
import { RequestResetPassword, RequestChangePassword } from './forms';
import { pageStyles as styles } from 'styles';

const sanitizeRestProps = ({
  classes,
  className,
  location,
  title,
  array,
  theme,
  dispatch,
  staticContext,
  isLoading,
  ...rest
}) => rest;

const ForgotPassword = withStyles(styles)(({ classes, className, ...rest }) => {
  const [step, setStep] = useState('request');
  const redirect = useRedirect();
  const [userEmail, setEmail] = useState(null);
  const notify = useNotify();
  const translate = useTranslate();

  const handleRequest = (form, setLoading) => {
    setLoading(true);
    return requestPasswordReset(form.email)
      .then((result) => {
        notify(translate('notification.auth.passwdResetSent'), 'info'); // show a success message anyway for security
        setEmail(form.email);
        setLoading(false);
        return setStep('reset');
      })
      .catch((error) => {
        notify(translate('notification.auth.passwdResetSent'), 'info'); // show a success message anyway for security
        setEmail(form.email);
        setLoading(false);
        return setStep('reset');
      });
  };

  const handleResetPassword = (form, setLoading) => {
    return submitNewPassword(userEmail, form.verificationCode, form.password)
      .then((result) => {
        redirect('/login');
        return notify(translate('notification.auth.passwdChanged'), 'info');
      })
      .catch((error) => {
        setLoading(false);
        return notify(
          translate('error.auth.resetPwdFailure', { errMsg: error.message }),
          'warning'
        );
      });
  };

  return (
    <div
      className={classnames(classes.main, className)}
      {...sanitizeRestProps(rest)}
    >
      <Card className={classes.card}>
        {step === 'request' ? (
          <RequestResetPassword requestReset={handleRequest} />
        ) : step === 'reset' ? (
          <RequestChangePassword requestChangePassword={handleResetPassword} />
        ) : null}
      </Card>
      <Notification />
    </div>
  );
});

ForgotPassword.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  theme: PropTypes.object,
};

ForgotPassword.defaultProps = {
  className: null,
  classes: null,
  meta: null,
  theme: defaultTheme,
};

export default ForgotPassword;
