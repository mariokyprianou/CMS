/*
 * Jira Ticket: PDL-130
 * Created Date: Mon, 30th Nov 2020, 08:45:30 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, EditButton } from 'react-admin';
import ExerciseActions from './actions';
import ExerciseFilter from './filters';
import { LocalisedTextField } from 'Components/Fields';

const ExerciseList = (props) => (
  <List
    {...props}
    title="resources.exercise.titles.exerciseManagement"
    actions={<ExerciseActions />}
    filters={<ExerciseFilter />}
  >
    <Datagrid>
      <LocalisedTextField
        parentPath="trainer"
        source="name"
        language="en"
        sortable={false}
        textVisibleLength="100px"
      />
      <LocalisedTextField
        source="name"
        language="en"
        sortable={false}
        textVisibleLength="100px"
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default ExerciseList;
