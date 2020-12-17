/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 15:37:12 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export const updateConfigurationMutation = gql`
  mutation UpdateConfiguration(
    $language: String!
    $termsAndConditions: String!
    $privacyPolicy: String!
    $onboardings: [OnboardingInput!]
    $notifications: [NotificationInput!]
  ) {
    data: updateConfiguration(
      language: language
      termsAndConditions: termsAndConditions
      privacyPolicy: privacyPolicy
      onboardings: onboardings
      notifications: notifications
    ) {
      localisations {
        language
        termsAndConditions
        privacyPolicy
        onboardings {
          orderIndex
          title
          description
          image
        }
        notifications {
          type
          title
          body
        }
      }
    }
  }
`;

export default async ({ client, params }) => {
  try {
    // TODO: unflatted the notification and onboardings arrays
    console.log('params: ', params.data.localisations);
    // merged localisations
    // get current localisation state
    var formattedParams = { ...params.data.localisations };
    // update the values with

    // const result = await client.query({
    //   query: updateConfigurationMutation,
    //   fetchPolicy: 'no-cache',
    // });
    // return result;
    return;
  } catch (e) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const [error] = e.graphQLErrors;
      const message = error.message;
      throw new Error(message);
    }
    throw e;
  }
};
