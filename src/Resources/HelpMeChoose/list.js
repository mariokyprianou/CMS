/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 10:40:04 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Datagrid, EditButton, List, NumberField } from 'react-admin';
import { LocalisedTextField } from 'Components/Fields';

const HelpMeChooseList = (props) => {
  return (
    <List bulkActionButtons={false} exporter={false} {...props}>
      <Datagrid>
        <LocalisedTextField source="question" language="en" sortable={false} />
        <NumberField source="orderIndex" sortable={false} />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default HelpMeChooseList;
