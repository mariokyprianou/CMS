/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:55:05 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  // DateInput,
  Filter,
  // TextInput,
  NumberInput,
  SelectInput,
} from 'react-admin';
// import { LocalisedReferenceInput } from 'Components/Inputs';
import {
  allFeedbackEmojis,
  // programmeEnvironmentChoices
} from 'utils/choices';

const FeedbackFilter = (props) => {
  const { resource } = props;
  return (
    <Filter {...props}>
      {/* TODO: Add back in or remove commented out filters once backend confirmed the filters it can do */}
      {/* <LocalisedReferenceInput
        resource={resource}
        reference="trainer"
        source="trainerId"
        perPage={1000}
        sort={{ field: 'name', order: 'ASC' }}
        allowEmpty={true}
      >
        <SelectInput />
      </LocalisedReferenceInput> */}
      {/* <SelectInput source="environment" choices={programmeEnvironmentChoices} /> */}
      {/* <NumberInput source="week" /> */}
      {/* <TextInput source="workoutName" /> */}
      <SelectInput source="emoji" choices={allFeedbackEmojis} />
      {/* <TextInput source="user" /> */}
      <NumberInput source="timeTaken" />
      <NumberInput source="feedbackIntensity" />
      {/* <DateInput source="dateTo" /> */}
      {/* <DateInput source="dateFrom" /> */}
    </Filter>
  );
};

export default FeedbackFilter;
