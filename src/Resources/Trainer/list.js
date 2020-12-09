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
import { actionButtonStyles, longTextStyles } from 'styles';

const TrainerList = (props) => {
  const classes = actionButtonStyles();
  const textTitleClasses = longTextStyles();

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
          classes={textTitleClasses}
          language="en"
          sortable={false}
          label="resources.trainer.fields.name"
        />
        <EditButton className={classes.floatRight} />
      </Datagrid>
    </List>
  );
};

export default TrainerList;
