/*
 * Jira Ticket:
 * Created Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const updateChallengeMutation = gql`
  mutation UpdateChallenge($input: UpdateChallengeInput!) {
    data: updateChallenge(input: $input) {
      id
      type
      duration
      localisations {
        language
        name
        fieldTitle
        fieldDescription
      }
    }
  }
`;

export default async ({ client, params }) => {
  try {
    // map the input fields to avoid adding autogen properties e.g. localisationsIds
    const result = await client.mutate({
      mutation: updateChallengeMutation,
      variables: {
        input: {
          id: params.data.id,
          duration: params.data.duration,
          type: params.data.type,
          localisations: params.data.localisations,
        },
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