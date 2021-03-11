/*
 * Jira Ticket:
 * updated Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import uploadFile from 'DataProvider/queries/FileUpload/UPLOAD_FILE';

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
    // trainer images
    if (params.data.images && params.data.images.length > 0) {
      for (let i = 0; i < params.data.images.length; i++) {
        const image = params.data.images[i];
        if (image.hasOwnProperty('rawFile')) {
          const uploadRequest = await uploadFile({
            client,
            file: image,
          });
          params.data.images[i].imageKey = uploadRequest.key;
          params.data.images[i].orderIndex = i; // add the order index
          // tidy up unwanted uploaded file props
          delete params.data.images[i].img;
          delete params.data.images[i].rawFile;
        }
        // tidy up the params
        delete params.data.images[i].url;
      }
    }
    // TODO: Shared Media - needs discussion with backend
    const result = await client.mutate({
      mutation: updateProgrammeMutation,
      variables: {
        id: params.data.id,
        programme: {
          environment: params.data.environment,
          status: params.data.status,
          muscle: params.data.muscle,
          fatLoss: params.data.fatLoss,
          fitness: params.data.fitness,
          trainerId: params.data.trainer.id,
          images: params.data.images,
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
