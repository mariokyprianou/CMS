/*
 * Jira Ticket: PDL-276
 * Created Date: Mon, 30th Nov 2020, 15:56:55 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, NumberInput, SelectInput, TextInput } from 'react-admin';
import { LocalisedReferenceInput } from 'Components/Inputs';
import { programmeEnvironmentChoices } from 'utils/choices';

const WorkoutFilter = (props) => {
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
      <NumberInput source="week" />
      <TextInput source="name" />
      {/* TODO: Check if this shoudld be programme ID or environment */}
      {/* <LocalisedReferenceInput
        resource={resource}
        source="programme"
        reference="programme"
        localisationsPath="trainer.localisations"
        additionalChoices={programmeEnvironmentChoices}
        additionalChoiceComparisonField="environment"
        resource={resource}
      >
        <SelectInput />
      </LocalisedReferenceInput> */}
      <SelectInput source="programme" choices={programmeEnvironmentChoices} />
    </Filter>
  );
};

export default WorkoutFilter;
