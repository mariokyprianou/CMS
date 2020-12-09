/*
 * Jira Ticket: PDL-273
 * Created Date: Tue, 24th Nov 2020, 13:02:20 pm
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

const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANG.split(' ');

const TrainerAction = (props) => {
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
      {/* Because of our special LocalisedCOmponentCloner, initialise the form via the button */}
      <CreateButton
        basePath={basePath}
        to={{
          pathname: `${basePath}/create`,
          state: {
            record: {
              localisations: supportedLanguages.map((language) => {
                return { language, name: null };
              }),
            },
          },
        }}
      />
    </TopToolbar>
  );
};

export default TrainerAction;
