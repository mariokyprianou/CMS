/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 12:24:33 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import i18nProvider from 'i18n';
import { isNewPasswordRequired } from 'utils/auth';

const { translate } = i18nProvider;

export const forceChangePassword = async ({ cognitoUser, password }) => {
  const user = await Auth.completeNewPassword(cognitoUser, password);
  return user;
};

export const requestPasswordReset = async (email) => {
  return Auth.forgotPassword(email.trim()).then((data) => {
    return data;
  });
};

export const submitNewPassword = async (email, verificationCode, password) => {
  return Auth.forgotPasswordSubmit(
    email.trim(),
    verificationCode.trim(),
    password
  )
    .then((data) => {
      return data;
    })
    .catch((err) => Promise.reject(err));
};

export const redirectOnLogin = async ({ redirect, user, errorMsg }) => {
  if (user instanceof CognitoUser) {
    return redirect('/');
  }
  throw new Error(`${errorMsg}: ${user}`);
};

export const getPermissions = async () => {
  let permissions = await JSON.parse(localStorage.getItem('permissions'));
  return permissions;
};

// don't request the users permissions in checkAuth- happens too often
export const checkAuth = () => {
  return Auth.currentSession()
    .then((session) => {
      if (!session) {
        return Promise.reject(translate('error.userNotLoggedIn'));
      }
      return session;
    })
    .catch((error) => {
      return Promise.reject(null);
    });
};

export const login = async (params) => {
  if (params instanceof CognitoUser) {
    return params;
  }

  const { error } = params;
  if (error) {
    return Promise.reject(error);
  }

  const { username, password } = params;
  const user = await Auth.signIn(username.trim(), password).catch((error) => {
    if (
      error.code === 'NotAuthorizedException' ||
      error.code === 'UserNotFoundException'
    ) {
      if (error.message.includes('Incorrect username or password')) {
        return Promise.reject(translate('error.auth.invalidCredentials'));
      } else {
        return Promise.reject(translate('error.auth.unableToLogin'));
      }
    }
    return Promise.reject(error);
  });

  // Reject with the user if new password is required to allow change in login flow
  if (isNewPasswordRequired(user)) {
    return Promise.reject(user);
  }

  return user;
};

export const logout = () => {
  return Auth.signOut({ global: true }).catch((error) => {
    if (process.env.NODE_ENV === 'development')
      console.error('Logout error:', error);
    return Auth.signOut();
  });
};
