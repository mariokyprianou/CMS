/*
 * Jira Ticket: PDL-269
 * Created Date: Mon, 23rd Nov 2020, 14:24:39 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  SelectField,
  EditButton,
} from 'react-admin';
import { subscriptionPlatformChoices } from 'utils/choices';
import UserAction from './actions';
import UserFilter from './filters';

const UserList = (props) => (
  <List filters={<UserFilter />} actions={<UserAction />} {...props}>
    <Datagrid>
      <TextField source="givenName" />
      <TextField source="familyName" />
      <TextField source="email" />
      <TextField source="country" />
      <TextField source="region" />
      <BooleanField source="subscription.isSubscribed" />
      <SelectField
        source="subscription.platform"
        choices={subscriptionPlatformChoices}
      />
      <EditButton />
    </Datagrid>
  </List>
);

export default UserList;
