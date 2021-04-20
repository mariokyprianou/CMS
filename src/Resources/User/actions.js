/*
 * Jira Ticket: PDL-269
 * Created Date: Mon, 23rd Nov 2020, 16:08:54 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { cloneElement } from 'react';
import { useListContext, TopToolbar, sanitizeListRestProps } from 'react-admin';
import { ActionButton } from 'Components/Buttons';
import { GetApp } from '@material-ui/icons';

const UserAction = (props) => {
  const { className, exporter, filters, maxResults, onClick, ...rest } = props;
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
      <ActionButton
        label={'ra.action.export'}
        variant="text"
        onClick={() => onClick(filterValues)}
        icon={<GetApp />}
      />
    </TopToolbar>
  );
};

export default UserAction;
