/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 15:39:42 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import {
  Button,
  CardActions,
  CircularProgress,
  withStyles,
} from '@material-ui/core';
import {
  PasswordField,
  renderFormFieldInput as renderInput,
} from '@thedistance/the-core-cms-module-authentication-amplify';
import { formStyles as styles } from 'styles';
import { validateEmail, validateCodePassword } from 'utils/auth';

export const RequestResetPassword = withStyles(styles)((props) => {
  const { requestReset } = props;
  const translate = useTranslate();
  const [isLoading, setLoading] = useState(false);

  return (
    <Form
      validate={(values) => {
        return validateEmail(values, { translate });
      }}
      onSubmit={(values) => {
        requestReset(values, setLoading);
      }}
      {...props}
    >
      {({ classes, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                id="email"
                name="email"
                label={translate('authentication.forgotPassword.email')}
                render={renderInput}
                disabled={isLoading || submitting}
              />
            </div>
            <p className={classes.input}>
              {translate('authentication.forgotPassword.cardContent')}
            </p>
          </div>
          <CardActions>
            <Button
              type="submit"
              color="primary"
              disabled={isLoading}
              className={classes.button}
            >
              {isLoading ? (
                <CircularProgress
                  size={25}
                  thickness={3}
                  className={classes.loadingIndicator}
                />
              ) : (
                translate('authentication.forgotPassword.submit')
              )}
            </Button>
          </CardActions>
        </form>
      )}
    </Form>
  );
});

export const RequestChangePassword = withStyles(styles)((props) => {
  const { requestChangePassword } = props;
  const translate = useTranslate();
  const [isLoading, setLoading] = useState(false);

  return (
    <Form
      validate={(values) => {
        return validateCodePassword(values, { translate });
      }}
      onSubmit={(values) => {
        requestChangePassword(values, setLoading);
      }}
      {...props}
    >
      {({ classes, handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                id="verificationCode"
                name="verificationCode"
                label={translate(
                  'authentication.changePassword.verificationCode'
                )}
                render={renderInput}
                disabled={isLoading || submitting}
              />
            </div>
            <p className={classes.input}>
              {translate('authentication.changePassword.cardContent')}
            </p>
            <div className={classes.input}>
              <PasswordField
                isFormLoading={isLoading || submitting}
                fieldComponent={renderInput}
                label={translate('authentication.changePassword.newPassword')}
              />
            </div>
          </div>
          <CardActions>
            <Button
              type="submit"
              color="primary"
              disabled={isLoading}
              className={classes.button}
            >
              {isLoading && <CircularProgress size={25} thickness={2} />}
              {translate('authentication.changePassword.submit')}
            </Button>
          </CardActions>
        </form>
      )}
    </Form>
  );
});

RequestResetPassword.propTypes = {
  classes: PropTypes.object,
  requestReset: PropTypes.func.isRequired,
};

RequestResetPassword.defaultProps = {
  classes: null,
};

RequestChangePassword.propTypes = {
  classes: PropTypes.object,
  requestChangePassword: PropTypes.func.isRequired,
};

RequestChangePassword.defaultProps = {
  classes: null,
};
