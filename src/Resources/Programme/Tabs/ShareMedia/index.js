/*
 * Jira Ticket: PDL-362
 * Created Date: Wed, 25th Nov 2020, 12:24:11 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import { columnStyles } from 'styles';

const ShareMediaTab = () => {
  const classes = columnStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.column}>TODO: Working in Progress</div>
        <div className={classes.column}>TODO: Working in Progress</div>
      </div>
    </Fragment>
  );
};

export default ShareMediaTab;
