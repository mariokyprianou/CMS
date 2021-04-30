/*
 * Jira Ticket:
 * Created Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import uploadFile from 'DataProvider/queries/FileUpload/UPLOAD_FILE';

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
      weeksAvailable
      status
      fatLoss
      fitness
      muscle
      wellness
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
            purpose: 'programme-img',
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
    const result = await client.mutate({
      mutation: createProgrammeMutation,
      variables: {
        programme: {
          environment: params.data.environment,
          status: 'DRAFT', // do not trust UI - all created programmes are drafts until edited and share media added
          muscle: params.data.muscle,
          fatLoss: params.data.fatLoss,
          fitness: params.data.fitness,
          wellness: params.data.wellness,
          trainerId: params.data.trainer.id,
          images: params.data.images,
          weeksAvailable: params.data.weeksAvailable,
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
