/*
 * Jira Ticket:
 * Created Date: Wed, 3rd Feb 2021, 18:58:13 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {
  CognitoLogin,
  CognitoForgotPassword,
} from '@thedistance/the-core-cms-module-authentication-amplify';
import { withStyles } from '@material-ui/core/styles';
import theme from 'theme';

const pageStyles = () => ({
  button: { ...theme.button },
});

const Login = withStyles(pageStyles)(({ classes, ...props }) => {
  const { button } = classes;
  return (
    <CognitoLogin
      loginFormStyle={{ button }}
      passwordFormStyle={{ button }}
      {...props}
    />
  );
});

const ForgotPassword = withStyles(pageStyles)(({ classes, ...props }) => {
  const { button } = classes;
  return (
    <CognitoForgotPassword
      changePasswordFormStyle={{ button }}
      resetPasswordFormStyle={{ button }}
      {...props}
    />
  );
});

export { Login, ForgotPassword };
