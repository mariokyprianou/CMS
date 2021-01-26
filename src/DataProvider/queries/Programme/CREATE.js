/*
 * Jira Ticket:
 * Created Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const createProgrammeMutation = gql`
  mutation CreateProgramme($programme: ProgrammeInput!) {
    data: createProgramme(programme: $programme) {
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
      mutation: createProgrammeMutation,
      variables: {
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
