/*
 * Jira Ticket: PDL-128
 * Created Date: Thu, 26th Nov 2020, 12:07:54 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import TrainerActions from './actions';
import TrainerFilter from './filters';

const ExerciseCategoryList = (props) => (
  <List
    {...props}
    title="resources.exerciseCategory.titles.exerciseCategoryManagement"
    actions={<TrainerActions />}
    filters={<TrainerFilter />}
  >
    <Datagrid>
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export default ExerciseCategoryList;
