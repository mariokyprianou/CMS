/*
 * Jira Ticket: PDL-364
 * Created Date: Mon, 30th Nov 2020, 13:33:21 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { ForgotPassword } from 'Resources/auth';
import ConfigurationPage from 'Resources/Configuration/edit';

export default [
  <Route
    exact
    path="/forgotPassword"
    render={(props) => <ForgotPassword {...props} />}
    noLayout
  />,
  <Route
    exact
    path="/Configuration"
    render={(props) => <ConfigurationPage {...props} />}
  />,
];
