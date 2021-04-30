/*
 * Jira Ticket:
 * Created Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import uploadFile from 'DataProvider/queries/FileUpload/UPLOAD_FILE';

export const createChallengeMutation = gql`
  mutation CreateChallenge($input: CreateChallengeInput!) {
    data: createChallenge(input: $input) {
      id
      type
      duration
      unitType
      image {
        key
        url
      }
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
    if (params.data.image && params.data.image.hasOwnProperty('rawFile')) {
      const uploadRequest = await uploadFile({
        client,
        file: params.data.image,
        purpose: 'challenge-img',
      });
      params.data.imageKey = uploadRequest.key;
    } else {
      params.data.imageKey = params.data.image && params.data.image.key;
    }

    const result = await client.mutate({
      mutation: createChallengeMutation,
      variables: {
        input: {
          id: params.data.id,
          trainingProgrammeId: params.data.trainingProgrammeId,
          type: params.data.type,
          imageKey: params.data.imageKey,
          localisations: params.data.localisations,
          duration:
            params.data.type === 'COUNTDOWN' ? params.data.duration : null,
          unitType:
            params.data.type !== 'STOPWATCH' ? params.data.unitType : null,
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
