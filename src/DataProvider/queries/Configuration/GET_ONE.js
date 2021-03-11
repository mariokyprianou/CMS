/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 15:37:12 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export const getOneConfigQuery = gql`
  query Configuration {
    data: Configuration {
      localisations {
        language
        termsAndConditions
        privacyPolicy
        onboardings {
          orderIndex
          title
          description
          image {
            key
            url
          }
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

export default async ({ client }) => {
  try {
    const result = await client.query({
      query: getOneConfigQuery,
      fetchPolicy: 'no-cache',
    });
    return result;
  } catch (e) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const [error] = e.graphQLErrors;
      const message = error.message;
      throw new Error(message);
    }
    throw e;
  }
};
