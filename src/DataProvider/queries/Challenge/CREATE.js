/*
 * Jira Ticket:
 * Created Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const createChallengeMutation = gql`
  mutation CreateChallenge($input: CreateChallengeInput!) {
    data: createChallenge(input: $input) {
      id
      type
      duration
      unitType
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
    const result = await client.mutate({
      mutation: createChallengeMutation,
      variables: {
        input: {
          ...params.data,
          unitType: params.data.type === 'OTHER' ? params.data.unitType : null,
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
