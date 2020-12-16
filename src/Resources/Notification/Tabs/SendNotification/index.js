/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 12:11:44 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';

const SendNotificationTab = (props) => {
  return (
    <SimpleForm>
      <TextInput source="message" />
    </SimpleForm>
  );
};
export default SendNotificationTab;
