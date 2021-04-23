/*
 * Created Date: Fri, 23rd Apr 2021, 10:30:58 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import { List, Datagrid, EditButton } from 'react-admin';
import WorkoutTagActions from './actions';
import { LocalisedTextField } from 'Components/Fields';

const WorkoutTagList = (props) => {
  return (
    <List
      {...props}
      actions={<WorkoutTagActions />}
      bulkActionButtons={false}
      title="resources.workoutTag.titles.onDemandListTitle"
    >
      <Datagrid>
        <LocalisedTextField source="name" language="en" sortable={false} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default WorkoutTagList;
