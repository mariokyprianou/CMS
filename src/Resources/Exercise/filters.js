/*
 * Jira Ticket: PDL-130
 * Created Date: Mon, 30th Nov 2020, 10:19:07 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, SelectInput, TextInput } from 'react-admin';
import { LocalisedReferenceInput } from 'Components/Inputs';

const ExerciseFilter = (props) => {
  const { resource } = props;
  return (
    <Filter {...props}>
      <LocalisedReferenceInput
        resource={resource}
        reference="trainer"
        source="trainer"
        perPage={1000}
        sort={{ field: 'name', order: 'ASC' }}
        allowEmpty={true}
      >
        <SelectInput />
      </LocalisedReferenceInput>
      <TextInput source="name" />
    </Filter>
  );
};

export default ExerciseFilter;
