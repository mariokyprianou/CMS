/*
 * Jira Ticket: PDL-273
 * Created Date: Tue, 24th Nov 2020, 13:00:28 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { List, Datagrid, EditButton } from 'react-admin';
import TrainerAction from './actions';
import TrainerFilter from './filters';
import { LocalisedTextField } from 'Components/Fields';

const TrainerList = (props) => {
  return (
    <List
      {...props}
      title="resources.trainer.titles.trainerManagement"
      actions={<TrainerAction />}
      filters={<TrainerFilter />}
    >
      <Datagrid>
        <LocalisedTextField
          source="name"
          language="en"
          label="resources.trainer.fields.name"
        />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default TrainerList;
