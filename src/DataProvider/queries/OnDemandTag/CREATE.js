/*
 * Created Date: Fri, 23rd Apr 2021, 12:04:23 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */
import gql from 'graphql-tag';

export const createWorkoutTagMutation = gql`
  mutation CreateWorkoutTag($localisations: [WorkoutTagLocalisationInput!]!) {
    data: createWorkoutTag(localisations: $localisations) {
      id
      localisations {
        language
        name
      }
    }
  }
`;
