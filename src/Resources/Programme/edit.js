/*
 * Jira Ticket: PDL-362
 * Created Date: Wed, 25th Nov 2020, 11:04:32 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Edit, TabbedForm, FormTab } from 'react-admin';
import Details from './Tabs/Details';
import Workouts from './Tabs/Workouts';
import Exercises from './Tabs/Exercises';
import Challenges from './Tabs/Challenges';
import ShareMedia from './Tabs/ShareMedia';

const ProgrammeEdit = (props) => {
  const { resource } = props;
  return (
    <Edit {...props}>
      <TabbedForm>
        <FormTab label={`resources.${resource}.tabs.details`}>
          <Details />
        </FormTab>
        <FormTab label={`resources.${resource}.tabs.workouts`}>
          <Workouts />
        </FormTab>
        <FormTab label={`resources.${resource}.tabs.exercises`}>
          <Exercises />
        </FormTab>
        <FormTab label={`resources.${resource}.tabs.challenges`}>
          <Challenges />
        </FormTab>
        <FormTab label={`resources.${resource}.tabs.shareMedia`}>
          <ShareMedia />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default ProgrammeEdit;
