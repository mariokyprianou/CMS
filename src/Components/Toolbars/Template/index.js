/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 16:25:56 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Toolbar } from 'react-admin';
import { toolbarStyles } from 'styles';

const CustomToolbar = (props) => {
  const { hasList, hasShow, hasEdit, hasCreate, ...rest } = props;
  const classes = toolbarStyles();
  return <Toolbar className={classes.root} {...rest} />;
};

export default CustomToolbar;
