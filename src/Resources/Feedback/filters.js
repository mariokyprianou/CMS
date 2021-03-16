/*
 * Jira Ticket: PDL-301
 * Created Date: Mon, 30th Nov 2020, 11:55:05 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { Filter, TextInput, NumberInput, SelectInput } from 'react-admin';
import { LocalisedReferenceInput } from 'Components/Inputs';
import { allFeedbackEmojis } from 'utils/choices';

const FeedbackFilter = (props) => {
  const { resource } = props;
  return (
    <Filter {...props}>
      <LocalisedReferenceInput
        resource={resource}
        reference="trainer"
        source="trainerId"
        perPage={1000}
        sort={{ field: 'name', order: 'ASC' }}
        allowEmpty={true}
      >
        <SelectInput />
      </LocalisedReferenceInput>
      <TextInput source="programme" />
      <TextInput source="workoutName" />
      <SelectInput source="emoji" choices={allFeedbackEmojis} />
      <NumberInput source="timeTaken" />
      <NumberInput source="feedbackIntensity" />
      <TextInput source="date" />
    </Filter>
  );
};

export default FeedbackFilter;
