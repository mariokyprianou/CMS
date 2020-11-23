/*
 * Jira Ticket:
 * Created Date: Thu, 26th Mar 2020, 12:41:55 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Title, useAuthenticated, useTranslate } from 'react-admin';
import { Button } from '@material-ui/core';
import { ErrorOutline, History } from '@material-ui/icons';
import classnames from 'classnames';
import { accessDeniedStyles } from 'styles';
import { goBack } from 'utils';

const NotFound = props => {
  const { className, classes: classesOverride, title, ...rest } = props;
  const classes = accessDeniedStyles(props);
  const translate = useTranslate();
  useAuthenticated();
  return (
    <div
      className={classnames(classes.container, className)}
      {...sanitizeRestProps(rest)}
    >
      <Title defaultTitle={title} title={translate('ra.page.not_found')} />
      <div className={classes.message}>
        <ErrorOutline className={classes.icon} />
        <h1>{translate('ra.page.not_found')}</h1>
        <div>{translate('ra.message.not_found')}.</div>
      </div>
      <div className={classes.toolbar}>
        <Button variant="contained" icon={<History />} onClick={goBack}>
          {translate('ra.action.back')}
        </Button>
      </div>
    </div>
  );
};

const sanitizeRestProps = ({
  staticContext,
  history,
  location,
  match,
  ...rest
}) => rest;

NotFound.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  title: PropTypes.string,
  location: PropTypes.object,
};

export default NotFound;
