/*
 * Jira Ticket: PDL-365
 * Created Date: Mon, 30th Nov 2020, 14:56:49 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Create, SimpleForm } from 'react-admin';
import HelpMeChooseForm from './form';

const HelpMeChooseCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <HelpMeChooseForm />
      </SimpleForm>
    </Create>
  );
};

export default HelpMeChooseCreate;
