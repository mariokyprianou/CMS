/*
 * Created Date: Fri, 23rd Apr 2021, 10:31:37 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {
  useListContext,
  TopToolbar,
  CreateButton,
  sanitizeListRestProps,
} from 'react-admin';

const supportedLanguages = process.env.REACT_APP_SUPPORTED_LANG.split(' ');

const WorkoutTagAction = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const { basePath } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
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

export default WorkoutTagAction;
