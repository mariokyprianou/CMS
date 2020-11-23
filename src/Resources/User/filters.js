/*
 * Jira Ticket:
 * Created Date: Mon, 23rd Nov 2020, 15:50:38 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput, SelectInput } from 'react-admin';
import { subscriptionPlatformChoices } from 'utils/choices';

// TODO: SelectInput on the isSubscribed should be a multi choice like Yes, No, 'empty'.
// https://thedistance.atlassian.net/wiki/spaces/PDL/pages/2026242085/2.1+User+Management
// The following columns will be filterable:

// Email
// Country
// Marketing Preferences
// Subscriber Status

const UserFilter = (props) => {
  return (
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
};

export default UserFilter;
