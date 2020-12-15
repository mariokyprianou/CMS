/*
 * Jira Ticket: PDL-275
 * Created Date: Tue, 24th Nov 2020, 15:19:06 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, SelectInput, TextInput } from 'react-admin';
import { programmeEnvironmentChoices } from 'utils/choices';

const ProgrammeFilter = (props) => (
  <Filter {...props}>
    <TextInput source="trainer" />
    <SelectInput source="environment" choices={programmeEnvironmentChoices} />
  </Filter>
);

export default ProgrammeFilter;
