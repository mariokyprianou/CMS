/*
 * Jira Ticket:
 * Created Date: Wed, 20th Jan 2021, 12:03:57 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import uploadFile from './UPLOAD_FILE';

export const updateExerciseMutation = gql`
  mutation UpdateExercise(
    $id: ID!
    $exercise: ExerciseInput!
    $localisations: [ExerciseLocalisationInput!]
  ) {
    data: updateExercise(
      id: $id
      exercise: $exercise
      localisations: $localisations
    ) {
      id
      localisations {
        language
        name
        coachingTips
      }
      weight
      video
      videoEasy
      videoEasiest
      category {
        id
        name
      }
      trainer
    }
  }
`;

export default async ({ client, params }) => {
  const exerciseParams = {
    weight: params.data.weight,
    trainerId: params.data.trainer,
    categoryId: params.data.exerciseCategory,
  };
  try {
    if (params.data.video && params.data.video.hasOwnProperty('rawFile')) {
      const responseFile = await uploadFile({
        client,
        file: params.data.video,
      });
      exerciseParams.videoKey = responseFile.key;
    } else {
      exerciseParams.videoKey = params.data.video && params.data.video.key;
    }
    if (
      params.data.videoEasy &&
      params.data.videoEasy.hasOwnProperty('rawFile')
    ) {
      const responseFile = await uploadFile({
        client,
        file: params.data.videoEasy,
      });
      exerciseParams.videoKeyEasy = responseFile.key;
    } else {
      exerciseParams.videoKeyEasy =
        params.data.videoEasy && params.data.videoEasy.key;
    }
    if (
      params.data.videoEasiest &&
      params.data.videoEasiest.hasOwnProperty('rawFile')
    ) {
      const responseFile = await uploadFile({
        client,
        file: params.data.videoEasiest,
      });
      exerciseParams.videoKeyEasiest = responseFile.key;
    } else {
      exerciseParams.videoKeyEasiest =
        params.data.videoEasiest && params.data.videoEasiest.key;
    }

    const result = await client.mutate({
      mutation: updateExerciseMutation,
      variables: {
        ...params.data,
        exercise: exerciseParams,
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
