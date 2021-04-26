/*
 * Created Date: Fri, 23rd Apr 2021, 10:06:04 am
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

const OnDemandWorkoutAction = (props) => {
  const { className, exporter, filters, maxResults, ...rest } = props;
  const { basePath } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      <CreateButton basePath={basePath} />
    </TopToolbar>
  );
};

export default OnDemandWorkoutAction;
