/*
 * Created Date: Fri, 23rd Apr 2021, 10:06:04 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {
  EditButton,
  FunctionField,
  List,
  Datagrid,
  ReferenceField,
} from 'react-admin';
import OnDemandWorkoutAction from './actions';
import { LocalisedTextField } from 'Components/Fields';

const OnDemandWorkoutList = (props) => (
  <List
    {...props}
    actions={<OnDemandWorkoutAction />}
    bulkActionButtons={false}
    title="resources.onDemandWorkout.titles.onDemandListTitle"
  >
    <Datagrid>
      <ReferenceField
        label="resources.trainer.fields.name"
        source="programme"
        reference="programme"
        sortable={false}
      >
        <LocalisedTextField
          parentPath="trainer"
          source="name"
          language="en"
          label="resources.trainer.fields.name"
          textVisibleLength="100px"
        />
      </ReferenceField>
      <LocalisedTextField
        source="name"
        language="en"
        label="resources.onDemandWorkout.fields.name"
        textVisibleLength="200px"
      />
      <FunctionField
        source="exercises"
        sortable={false}
        render={(record) => (record.exercises && record.exercises.length) || 0}
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default OnDemandWorkoutList;
