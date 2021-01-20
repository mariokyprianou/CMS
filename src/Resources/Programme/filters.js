/*
 * Jira Ticket: PDL-275
 * Created Date: Tue, 24th Nov 2020, 15:19:06 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, SelectInput } from 'react-admin';
import { LocalisedReferenceInput } from 'Components/Inputs';
import { programmeEnvironmentChoices } from 'utils/choices';

const ProgrammeFilter = (props) => {
  const { resource } = props;
  return (
    <Filter {...props}>
      <LocalisedReferenceInput
        resource={resource}
        reference="trainer"
        source="trainerId"
        perPage={1000}
        sort={{ field: 'name', order: 'ASC' }}
        allowEmpty={true}
      >
        <SelectInput />
      </LocalisedReferenceInput>
      <SelectInput source="environment" choices={programmeEnvironmentChoices} />
    </Filter>
  );
};

export default ProgrammeFilter;
