/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 15:13:10 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  Datagrid,
  EditButton,
  FunctionField,
  Pagination,
  ReferenceManyField,
  SelectField,
  TextField,
} from 'react-admin';
import { LocalisedTextField } from 'Components/Fields';
import { programmeEnvironmentChoices } from 'utils/choices';

const WorkoutTab = (props) => {
  const { resource } = props;
  return (
    <Fragment>
      <ReferenceManyField
        reference="workout"
        target="programmeId"
        pagination={<Pagination />}
        {...props}
      >
        <Datagrid>
          <LocalisedTextField
            parentPath="programme.trainer"
            source="name"
            language="en"
            label="resources.trainer.fields.name"
            textVisibleLength="100px"
          />
          <TextField resource={resource} source="week" />
          <LocalisedTextField
            source="name"
            language="en"
            label="resources.workout.fields.name"
            textVisibleLength="200px"
          />
          <FunctionField
            resource={resource}
            source="exercises"
            render={(record) => record.exercises.length}
          />
          <SelectField
            resource={resource}
            source="programme.environment"
            choices={programmeEnvironmentChoices}
          />
          <FunctionField
            render={(record) => (
              <EditButton
                to={{
                  pathname: `/workout/${record.id}`,
                }}
              />
            )}
          />
        </Datagrid>
      </ReferenceManyField>
    </Fragment>
  );
};

export default WorkoutTab;
