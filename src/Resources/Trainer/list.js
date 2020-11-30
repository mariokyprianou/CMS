/*
 * Jira Ticket: PDL-273
 * Created Date: Tue, 24th Nov 2020, 13:00:28 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import TrainerAction from './actions';
import TrainerFilter from './filters';

const TrainerList = (props) => (
  <List
    {...props}
    title="resources.trainer.titles.trainerManagement"
    actions={<TrainerAction />}
    filters={<TrainerFilter />}
  >
    <Datagrid>
      <TextField
        source="localisations[0].name"
        label="resources.trainer.fields.name"
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default TrainerList;
