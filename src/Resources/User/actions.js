/*
 * Jira Ticket:
 * Created Date: Mon, 23rd Nov 2020, 16:08:54 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { ExportButton } from 'react-admin';

// TODO: Add action to Export Button
// https://thedistance.atlassian.net/wiki/spaces/PDL/pages/2026242085/2.1+User+Management
// A csv report can be exported from the user list which will comprise the following columns:

// First Name
// Last Name
// Email
// Gender
// Date of Birth
// Country
// Region
// Email Marketing Preferences
// Subscriber Status
// Subscription Start Date
// Registration Date
// Billing cadence (yearly/monthly)

const UserAction = (props) => {
  return <ExportButton />;
};

export default UserAction;
