/*
 * Created Date: Thu, 18th Mar 2021, 17:52:37 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const updateUserMutation = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    data: updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      country {
        id
      }
      region {
        id
      }
      timeZone
      currentTrainingProgramme {
        id
      }
      emailMarketing
      subscription {
        isActive
        platform
        startedAt
        expiresAt
      }
      currentWeek
      previousTrainers
      deviceLimit
    }
  }
`;

export const updateUserEmailMutation = gql`
  mutation updateEmail($id: ID!, $email: EmailAddress!) {
    data: updateEmail(id: $id, email: $email) {
      id
      email
    }
  }
`;

export default async ({ client, params }) => {
  try {
    if (params.data.email !== params.previousData.email) {
      // update the email
      await client.mutate({
        mutation: updateUserEmailMutation,
        variables: {
          id: params.id,
          email: params.data.email,
        },
      });
    }

    var updateUserParams = {
      firstName: params.data.firstName,
      lastName: params.data.firstName,
      country: params.data.country.id,
      currentWeek: params.data.currentWeek,
      region:
        params.data.country.id === process.env.REACT_APP_INDIA_ID
          ? params.data.region.id
          : null, // only send a region if country was India
      timezone: params.data.timeZone,
      deviceLimit: params.data.deviceLimit,
    };

    if (
      params.data.deviceLimitEnabled !== params.previousData.deviceLimitEnabled
    ) {
      var date = new Date();
      if (params.data.deviceLimitEnabled) {
        // set the device limit to 30 days in the future (can't change device for 30 days)
        date.setDate(date.getDate() + 30);
      } else {
        // admin has disabled the limit, so users can change their devices
        // set the time to the past
        date.setDate(date.getDate() - 30);
      }
      var dateString = date.toISOString();
      updateUserParams['deviceLimit'] = dateString;
    }

    const result = await client.mutate({
      mutation: updateUserMutation,
      variables: {
        id: params.id,
        input: updateUserParams,
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
