/*
 * Jira Ticket: PDL-276
 * Created Date: Mon, 30th Nov 2020, 15:53:27 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  EditButton,
  FunctionField,
  List,
  Datagrid,
  SelectField,
  TextField,
} from 'react-admin';
import WorkoutAction from './actions';
import WorkoutFilter from './filters';
import { LocalisedTextField } from 'Components/Fields';
import { programmeEnvironmentChoices } from 'utils/choices';

const WorkoutList = (props) => (
  <List {...props} actions={<WorkoutAction />} filters={<WorkoutFilter />}>
    <Datagrid>
      <LocalisedTextField
        parentPath="programme.trainer"
        source="name"
        language="en"
        label="resources.trainer.fields.name"
        textVisibleLength="100px"
      />
      <TextField source="week" />
      <LocalisedTextField
        source="name"
        language="en"
        label="resources.workout.fields.name"
        textVisibleLength="200px"
      />
      <FunctionField
        source="exercises"
        render={(record) => record.exercises.length}
      />
      <SelectField
        source="programme.environment"
        choices={programmeEnvironmentChoices}
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default WorkoutList;
