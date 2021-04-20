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
  ReferenceField,
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
    bulkActionButtons={false}
  >
    <Datagrid>
      <ReferenceField
        label="resources.programme.fields.trainerName"
        source="trainer.id"
        reference="trainer"
        sortable={false}
      >
        <LocalisedTextField
          source="name"
          language="en"
          sortable={false}
          textVisibleLength="150px"
          label="resources.programme.fields.trainerName"
        />
      </ReferenceField>
      <FunctionField
        source="fitness"
        render={(record) => <PercentageTextField value={record.fitness} />}
        sortable={false}
      />
      <FunctionField
        source="muscle"
        render={(record) => <PercentageTextField value={record.muscle} />}
        sortable={false}
      />
      <FunctionField
        source="fatLoss"
        label="resources.programme.fields.fatLoss"
        render={(record) => <PercentageTextField value={record.fatLoss} />}
        sortable={false}
      />
      <SelectField
        source="environment"
        choices={programmeEnvironmentChoices}
        sortable={false}
      />
      <TextField source="subscribers" sortable={false} />
      <EditButton />
    </Datagrid>
  </List>
);

export default ProgrammeList;
