/*
 * Jira Ticket: PDL-362
 * Created Date: Wed, 25th Nov 2020, 11:04:32 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import Details from './Tabs/Details';

const ProgrammeCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <Details />
      </SimpleForm>
    </Create>
  );
};

export default ProgrammeCreate;
