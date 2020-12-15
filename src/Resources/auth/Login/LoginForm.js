/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 11:01:36 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const LoginForm = withStyles(styles)((props) => {
  const { requestLogin } = props;
  const translate = useTranslate();
  const [isLoading, setLoading] = useState(false);

  return (
    <Form
      validate={(values) => {
        const errors = {};
        if (!values.username)
          errors.username = translate('ra.validation.required');
        if (!values.password)
          errors.password = translate('ra.validation.required');
        return errors;
      }}
      onSubmit={(values) => {
        requestLogin(values, setLoading);
      }}
      {...props}
    >
      {({ classes, handleSubmit, submitting }) => (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                id="username"
                name="username"
                label={translate('authentication.login.username')}
                render={renderInput}
                disabled={isLoading || submitting}
              />
            </div>
            <div className={classes.input}>
              <PasswordField
                isFormLoading={isLoading || submitting}
                fieldComponent={renderInput}
              />
            </div>
          </div>
          <CardActions>
            <Link className={classes.forgotpassword} to="/forgotPassword">
              {translate('authentication.login.forgotPassword')}
            </Link>
          </CardActions>
          <CardActions>
            <Button
              type="submit"
              disabled={isLoading}
              variant="text"
              className={classes.button}
            >
              {isLoading ? (
                <CircularProgress
                  size={25}
                  thickness={3}
                  className={classes.loadingIndicator}
                />
              ) : (
                translate('authentication.login.submit')
              )}
            </Button>
          </CardActions>
        </form>
      )}
    </Form>
  );
});

LoginForm.propTypes = {
  classes: PropTypes.object,
  requestLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  classes: null,
};

export default LoginForm;
