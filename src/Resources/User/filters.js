/*
 * Jira Ticket: PDL-270
 * Created Date: Mon, 23rd Nov 2020, 15:50:38 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput, SelectInput } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import {
  subscriptionPlatformChoices,
  booleanTranslatedChoices,
  subscriptionStatusBooleanTranslatedChoices,
} from 'utils/choices';

const UserFilter = withStyles({
  minWidth: { minWidth: 200 },
})(({ classes, ...props }) => (
  <Filter {...props}>
    <TextInput source="email" />
    <TextInput source="country" />
    <SelectInput source="emailMarketing" choices={booleanTranslatedChoices} />
    <SelectInput
      className={classes.minWidth}
      source="isSubscribed"
      choices={subscriptionStatusBooleanTranslatedChoices}
    />
    <SelectInput
      className={classes.minWidth}
      source="subscriptionPlatform"
      label="resources.user.fields.subscription.platform"
      choices={subscriptionPlatformChoices}
    />
  </Filter>
));

export default UserFilter;
