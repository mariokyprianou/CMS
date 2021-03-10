/*
 * Jira Ticket:
 * Created Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import uploadFile from './UPLOAD_FILE';

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
  // placeholder array
  params.data.imagesToUpload = [];
  try {
    if (params.data.images && params.data.images.length > 0) {
      for (let i = 0; i < params.data.images.length; i++) {
        const image = params.data.images[i];
        if (image.hasOwnProperty('rawFile')) {
          const responseFile = await uploadFile({
            client,
            file: image,
          });
          params.data.imagesToUpload.push({
            imageKey: responseFile.key,
            orderIndex: i,
          });
        }
      }
    }
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
          localisations: params.data.localisations,
          images: params.data.imagesToUpload,
        },
      },
    });

    console.log('result: ', result);
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
