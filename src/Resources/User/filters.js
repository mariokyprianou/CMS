/*
 * Jira Ticket: PDL-270
 * Created Date: Mon, 23rd Nov 2020, 15:50:38 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput, SelectInput } from 'react-admin';
import { subscriptionPlatformChoices } from 'utils/choices';

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput source="email" />
    <TextInput source="country" />
    <SelectInput source="subscription.isSubscribed" />
    <SelectInput
      source="subscription.platform"
      choices={subscriptionPlatformChoices}
    />
  </Filter>
);

export default UserFilter;
