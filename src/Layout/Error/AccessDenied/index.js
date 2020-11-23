/*
 * Jira Ticket:
 * Created Date: Thu, 26th Mar 2020, 11:00:37 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Title, useAuthenticated, useTranslate } from 'react-admin';
import { Lock } from '@material-ui/icons';
import classnames from 'classnames';
import { accessDeniedStyles } from 'styles';

const AccessDenied = props => {
  const { className, classes: classesOverride, title, ...rest } = props;
  const classes = accessDeniedStyles(props);
  const translate = useTranslate();
  useAuthenticated();
  return (
    <div
      className={classnames(classes.container, className)}
      {...sanitizeRestProps(rest)}
    >
      <Title title={translate('error.permissions.title')} />
      <div className={classes.message}>
        <Lock className={classes.icon} />
        <h1>{translate('error.permissions.header')}</h1>
        <div>{translate('error.permissions.subtitle')}</div>
      </div>
    </div>
  );
};

const sanitizeRestProps = ({
  staticContext,
  history,
  location,
  match,
  hasCreate,
  basePath,
  hasList,
  hasShow,
  hasEdit,
  ...rest
}) => rest;

AccessDenied.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  title: PropTypes.string,
  location: PropTypes.object,
};

export default AccessDenied;
