/*
 * Jira Ticket: PDL-130
 * Created Date: Mon, 30th Nov 2020, 08:45:30 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import ExerciseActions from './actions';
import ExerciseFilter from './filters';

const ExerciseList = (props) => (
  <List
    {...props}
    title="resources.exercise.titles.exerciseManagement"
    actions={<ExerciseActions />}
    filters={<ExerciseFilter />}
  >
    <Datagrid>
      <TextField
        // TODO: Trainer isn't in the Exercise schema nor could I find how a Trainer is associated to the Exercise object. See FDs: https://thedistance.atlassian.net/wiki/spaces/PDL/pages/2026078245/2.5.2+Exercises
        source="trainer"
        label="resources.exercise.fields.trainer"
      />
      <TextField
        source="localisations[0].name"
        label="resources.exercise.fields.name"
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default ExerciseList;
