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
  ReferenceField,
} from 'react-admin';
import WorkoutAction from './actions';
import WorkoutFilter from './filters';
import { LocalisedTextField } from 'Components/Fields';
import { programmeEnvironmentChoices } from 'utils/choices';

const EnvironmentSelect = (props) => {
  // for some reason the values were not being translated when using the SelectField directly
  // i.e. showing 'choices.programmeEnvironment.home' rather than 'HOME' etc
  const { record } = props;
  return (
    <SelectField
      record={record}
      source="environment"
      choices={programmeEnvironmentChoices}
    />
  );
};

const WorkoutList = (props) => (
  <List
    {...props}
    actions={<WorkoutAction />}
    filters={<WorkoutFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <ReferenceField
        label="resources.trainer.fields.name"
        source="trainingProgrammeId"
        reference="programme"
      >
        <LocalisedTextField
          parentPath="trainer"
          source="name"
          language="en"
          label="resources.trainer.fields.name"
          textVisibleLength="100px"
        />
      </ReferenceField>
      <TextField source="weekNumber" />
      <FunctionField
        source="workout"
        label="resources.workout.fields.name"
        render={(record) => (
          <LocalisedTextField
            record={record.workout}
            source="name"
            language="en"
            label="resources.workout.fields.name"
            textVisibleLength="200px"
          />
        )}
      />
      <FunctionField
        source="exercises"
        render={(record) =>
          (record.workout.exercises && record.workout.exercises.length) || 0
        }
      />
      <ReferenceField
        label="resources.programme.fields.environment"
        source="trainingProgrammeId"
        reference="programme"
      >
        <EnvironmentSelect />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export default WorkoutList;
