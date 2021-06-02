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
} from 'react-admin';
import { LocalisedTextField } from 'Components/Fields';

const ExerciseTab = (props) => {
  return (
    <Fragment>
      <ReferenceManyField
        reference="exercise"
        target="programmeId"
        pagination={<Pagination />}
        {...props}
      >
        <Datagrid>
          <LocalisedTextField
            parentPath="trainer"
            source="name"
            language="en"
            label="resources.exercise.fields.trainer"
            sortable={false}
          />
          <LocalisedTextField source="name" language="en" sortable={false} />
          <FunctionField
            render={(record) => (
              <EditButton
                to={{
                  pathname: `/exercise/${record.id}`,
                }}
              />
            )}
          />
        </Datagrid>
      </ReferenceManyField>
    </Fragment>
  );
};

export default ExerciseTab;
