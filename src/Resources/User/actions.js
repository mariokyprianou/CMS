/*
 * Jira Ticket: PDL-269
 * Created Date: Mon, 23rd Nov 2020, 16:08:54 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { cloneElement } from 'react';
import {
  useListContext,
  TopToolbar,
  ExportButton,
  sanitizeListRestProps,
} from 'react-admin';

// TODO: Add action to Export Button - this will be a custom request to the backend
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
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    resource,
    displayedFilters,
    filterValues,
    showFilter,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button',
        })}
      <ExportButton />
    </TopToolbar>
  );
};

export default UserAction;
