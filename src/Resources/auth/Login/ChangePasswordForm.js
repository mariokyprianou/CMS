/*
 * Jira Ticket:
 * Created Date: Thu, 9th Jan 2020, 10:12:08 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
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
import { validatePassword } from 'utils/auth';

const ChangePasswordForm = withStyles(styles)((props) => {
  const { requestChangePassword } = props;
  const translate = useTranslate();
  const [isLoading, setLoading] = useState(false);

  return (
    <Form
      validate={(values) => {
        return validatePassword(values, { translate });
      }}
      onSubmit={(values) => {
        return requestChangePassword(values, setLoading);
      }}
      {...props}
    >
      {({ classes, handleSubmit, submitting }) => (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={classes.form}>
            <p>{translate('authentication.forceChangePassword.cardContent')}</p>
            <div className={classes.input}>
              <PasswordField
                isFormLoading={isLoading || submitting}
                fieldComponent={renderInput}
              />
            </div>
          </div>
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
                translate('authentication.forceChangePassword.submit')
              )}
            </Button>
          </CardActions>
        </form>
      )}
    </Form>
  );
});

ChangePasswordForm.propTypes = {
  classes: PropTypes.object,
  requestChangePassword: PropTypes.func.isRequired,
};

ChangePasswordForm.defaultProps = {
  classes: null,
};

export default ChangePasswordForm;
