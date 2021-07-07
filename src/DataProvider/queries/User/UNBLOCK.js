/*
 * Created Date: Wed, 7th Jul 2021, 16:27:49 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const unblockUserMutation = gql`
  mutation UnblockUser($id: ID!) {
    data: unblockUser(id: $id) {
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

export default async ({ client, params }) => {
  try {
    const result = await client.mutate({
      mutation: unblockUserMutation,
      fetchPolicy: 'no-cache',
      variables: {
        id: params.id,
      },
    });
    return result.data;
  } catch (e) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const [error] = e.graphQLErrors;
      const message = error.message;
      throw new Error(message);
    }
    throw e;
  }
};
