/*
 * Jira Ticket: PDL-276
 * Created Date: Mon, 30th Nov 2020, 15:53:27 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import WorkoutAction from './actions';
import WorkoutFilter from './filters';

// TODO: Update sources and labels to match the data structure in fakeData.
const WorkoutList = (props) => (
  <List {...props} actions={<WorkoutAction />} filters={<WorkoutFilter />}>
    <Datagrid>
      <TextField source="trainer" />
      <TextField source="week" />
      <TextField source="name" />
      <TextField source="exercise" />
      <TextField source="programme" />
      <EditButton />
    </Datagrid>
  </List>
);

export default WorkoutList;
