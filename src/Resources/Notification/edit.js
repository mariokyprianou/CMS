/*
 * Jira Ticket:
 * Created Date: Wed, 9th Dec 2020, 15:13:10 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, Tab, TabbedShowLayout } from 'react-admin';
import SendNotification from './Tabs/SendNotification';
import PreviousNotifications from './Tabs/PreviousNotifications';

const resource = 'notification';

const SanitiziedForm = ({ saving, save, ...props }) => {
  return (
    <TabbedShowLayout {...props}>
      <Tab label={`resources.${resource}.tabs.send`}>
        <SendNotification />
      </Tab>
      <Tab {...props} label={`resources.${resource}.tabs.previous`}>
        <PreviousNotifications {...props} />
      </Tab>
    </TabbedShowLayout>
  );
};

// TODO: Turn notifications into a list view with create (revoke button in list) - see updated FDs
const NotificationsPage = (props) => {
  return (
    // mix the Edit and show layout to achieve form per tab
    <Edit basePath={`/${resource}`} resource={resource} id="1" {...props}>
      <SanitiziedForm />
    </Edit>
  );
};

export default NotificationsPage;
