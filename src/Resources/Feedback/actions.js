/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:48:04 am
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

const FeedbackAction = (props) => {
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

export default FeedbackAction;
