/*
 * Jira Ticket: PDL-275
 * Created Date: Tue, 24th Nov 2020, 15:16:36 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  SelectField,
  FunctionField,
} from 'react-admin';
import { LocalisedTextField, PercentageTextField } from 'Components/Fields';
import ProgrammeAction from './actions';
import ProgrammeFilter from './filters';
import { programmeEnvironmentChoices } from 'utils/choices';

const ProgrammeList = (props) => (
  <List
    {...props}
    title="resources.programme.titles.programmeManagement"
    actions={<ProgrammeAction />}
    filters={<ProgrammeFilter />}
  >
    <Datagrid>
      <LocalisedTextField
        parent="trainer"
        source="name"
        language="en"
        sortable={false}
        textVisibleLength="100px"
        label="resources.programme.fields.trainerName"
      />
      <FunctionField
        source="fitness"
        render={(record) => <PercentageTextField value={record.fitness} />}
      />
      <FunctionField
        source="muscle"
        render={(record) => <PercentageTextField value={record.muscle} />}
      />
      <FunctionField
        source="fatLoss"
        label="resources.programme.fields.fatLoss"
        render={(record) => <PercentageTextField value={record.fatLoss} />}
      />
      <SelectField source="environment" choices={programmeEnvironmentChoices} />
      <TextField source="subscribers" />
      <EditButton />
    </Datagrid>
  </List>
);

export default ProgrammeList;
