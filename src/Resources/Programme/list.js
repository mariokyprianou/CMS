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
import ProgrammeActions from './actions';
import ProgrammeFilter from './filters';
import { programmeEnvironmentChoices } from 'utils/choices';
import { PercentageTextField } from 'Components/Fields';

const ProgrammeList = (props) => (
  <List
    {...props}
    title="resources.programme.titles.programmeManagement"
    actions={<ProgrammeActions />}
    filters={<ProgrammeFilter />}
  >
    <Datagrid>
      <TextField
        source="trainer.localisations[0].name"
        label="resources.programme.fields.name"
      />
      <FunctionField
        source="stats.fitness"
        label="resources.programme.fields.fitness"
        render={(record) => (
          <PercentageTextField value={record.stats.fitness} />
        )}
      />
      <FunctionField
        source="stats.muscle"
        label="resources.programme.fields.muscle"
        render={(record) => <PercentageTextField value={record.stats.muscle} />}
      />
      <FunctionField
        source="stats.fatLoss"
        label="resources.programme.fields.fatLoss"
        render={(record) => (
          <PercentageTextField value={record.stats.fatLoss} />
        )}
      />
      <SelectField source="type" choices={programmeEnvironmentChoices} />
      <TextField
        source="subscribers"
        label="resources.programme.fields.currentSubscribers"
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default ProgrammeList;
