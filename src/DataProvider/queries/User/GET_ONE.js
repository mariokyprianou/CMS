/*
 * Created Date: Thu, 18th Mar 2021, 17:52:37 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const getOneUserQuery = gql`
  query User($id: ID!) {
    data: User(id: $id) {
      id
      firstName
      lastName
      email
      country {
        id
      }
      timeZone
      currentTrainingProgramme {
        id
      }
      isManuallySubscribed
      emailMarketing
      subscription {
        isActive
        platform
        startedAt
        expiresAt
      }
      isBlocked
      currentWeek
      previousTrainers
      deviceLimit
    }
  }
`;
