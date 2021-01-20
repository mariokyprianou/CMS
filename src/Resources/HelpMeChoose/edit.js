/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 10:40:07 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import HelpMeChooseForm from './form';

const HelpMeChooseEdit = (props) => {
  return (
    <Edit redirect={false} undoable={false} {...props}>
      <SimpleForm subscription={{ silent: true }}>
        <HelpMeChooseForm />
      </SimpleForm>
    </Edit>
  );
};

export default HelpMeChooseEdit;
