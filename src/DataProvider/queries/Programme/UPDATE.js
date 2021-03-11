/*
 * Jira Ticket:
 * updated Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const updateProgrammeMutation = gql`
  mutation UpdateProgramme($id: ID!, $programme: ProgrammeInput!) {
    data: updateProgramme(id: $id, programme: $programme) {
      id
      trainer {
        id
        localisations {
          language
          name
        }
      }
      environment
      subscribers
      images {
        url
        orderIndex
      }
      shareMediaImages {
        id
        type
        localisations {
          language
          url
          colour
        }
      }
      localisations {
        language
        description
      }
      status
      fatLoss
      fitness
      muscle
    }
  }
`;

export default async ({ client, params }) => {
  try {
    // TODO: handle trainer image uploads
    const result = await client.mutate({
      mutation: updateProgrammeMutation,
      variables: {
        id: params.data.id,
        programme: {
          // TODO: add the image ID
          environment: params.data.environment,
          status: params.data.status,
          muscle: params.data.muscle,
          fatLoss: params.data.fatLoss,
          fitness: params.data.fitness,
          trainerId: params.data.trainer.id,
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
