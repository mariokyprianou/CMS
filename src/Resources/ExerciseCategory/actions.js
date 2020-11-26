/*
 * Jira Ticket: PDL-128
 * Created Date: Thu, 26th Nov 2020, 12:29:58 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { cloneElement } from 'react';
import {
  useListContext,
  TopToolbar,
  CreateButton,
  sanitizeListRestProps,
} from 'react-admin';

const ExerciseCategoryActions = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const {
    resource,
    displayedFilters,
    filterValues,
    showFilter,
    basePath,
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
      <CreateButton basePath={basePath} />
    </TopToolbar>
  );
};

export default ExerciseCategoryActions;
