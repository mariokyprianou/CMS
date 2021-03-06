/*
 * Jira Ticket: PDL-273
 * Created Date: Tue, 24th Nov 2020, 13:03:10 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput } from 'react-admin';

const TrainerFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" label="resources.trainer.fields.name" />
  </Filter>
);

export default TrainerFilter;
