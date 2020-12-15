/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 11:01:36 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import defaultTheme from 'ra-ui-materialui/lib/defaultTheme';
import { Notification } from 'ra-ui-materialui/lib/layout';
import { useLogin, useNotify, useRedirect, useTranslate } from 'react-admin';
import classnames from 'classnames';
import { Avatar, Card } from '@material-ui/core';
import { Lock as LockIcon } from '@material-ui/icons';
import {
  forceChangePassword,
  redirectOnLogin,
} from 'AuthProvider/amplifyHandlers';
import { isNewPasswordRequired } from 'utils/auth';
import LoginForm from './LoginForm';
import ChangePasswordForm from './ChangePasswordForm';
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
  ...rest
}) => rest;

const Login = withStyles(styles)(
  ({ classes, className, overridePasswordValidation, loginIcon, ...rest }) => {
    const [step, setStep] = useState('login');
    const [cognitoUser, setCognitoUser] = useState(null);
    const raLogin = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();
    const translate = useTranslate();

    const handleChangePassword = (auth, setLoading) => {
      setLoading(true);
      return forceChangePassword({
        cognitoUser,
        ...auth,
      })
        .then((user) => {
          // request the users org roles
          redirectOnLogin({
            user,
            redirect,
            errorMsg: translate('error.auth.passwdChangeUnsuccessful'),
          });
        })
        .catch((error) => {
          setLoading(false);
          return notify(
            translate('error.auth.passwdChangeUnsuccessful'),
            'warning'
          );
        });
    };

    const handleLogin = async (auth, setLoading) => {
      setLoading(true);
      return raLogin(auth)
        .then((user) => {
          if (window.location.pathname === '/login') {
            return redirectOnLogin({
              user,
              redirect,
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          // Check that the error isn't due to new password required
          if (isNewPasswordRequired(error)) {
            setCognitoUser(error);
            setStep('change_password');
            return;
          }
          return notify(error, 'warning');
        });
    };

    return (
      <div
        className={classnames(classes.main, className)}
        {...sanitizeRestProps(rest)}
      >
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              {loginIcon || <LockIcon />}
            </Avatar>
          </div>
          {step === 'login' ? (
            <LoginForm requestLogin={handleLogin} />
          ) : step === 'change_password' ? (
            <ChangePasswordForm requestChangePassword={handleChangePassword} />
          ) : null}
        </Card>
        <Notification />
      </div>
    );
  }
);

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  theme: PropTypes.object,
};

Login.defaultProps = {
  className: null,
  classes: null,
  meta: null,
  theme: defaultTheme,
};

export default Login;
