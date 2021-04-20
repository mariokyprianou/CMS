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
  TextField,
} from 'react-admin';
import { LocalisedTextField } from 'Components/Fields';

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
          <TextField resource={resource} source="weekNumber" sortable={false} />
          <FunctionField
            source="workout"
            label="resources.workout.fields.name"
            sortable={false}
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
            resource={resource}
            source="exercises"
            sortable={false}
            render={(record) =>
              record.workout &&
              record.workout.exercises &&
              record.workout.exercises.length
            }
          />
          <FunctionField
            sortable={false}
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
