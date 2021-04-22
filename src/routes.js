/*
 * Jira Ticket: PDL-364
 * Created Date: Mon, 30th Nov 2020, 13:33:21 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ForgotPassword } from 'Layout/Auth';
import ConfigurationPage from 'Resources/Configuration/edit';
import NotificationPage from 'Resources/Notification/edit';

export default [
  <Route
    key="forgotPassword"
    exact
    noLayout
    path="/forgotPassword"
    render={(props) => <ForgotPassword {...props} />}
  />,
  <Route
    path="/configuration"
    render={(props) => <ConfigurationPage {...props} />}
  />,
  <Route
    path="/notification"
    render={(props) => <NotificationPage {...props} />}
  />,
  <Route exact path="/challenge" render={() => <Redirect to="/programme" />} />,
  <Route path="/region" render={() => <Redirect to="/" />} />,
  <Route path="/country" render={() => <Redirect to="/" />} />,
];
