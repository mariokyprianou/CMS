/*
 * Jira Ticket:
 * Created Date: Mon, 25th Jan 2021, 17:42:14 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import cloneDeep from 'lodash.clonedeep';
import uploadFile from 'DataProvider/queries/FileUpload/UPLOAD_FILE';

export const createOnDemandWorkoutMutation = gql`
  mutation CreateOnDemandWorkout($workout: CreateOnDemandWorkoutInput) {
    data: createOnDemandWorkout(workout: $workout) {
      id
      tagIds
      isContinuous
      overviewImage {
        key
        url
      }
      intensity
      duration
      localisations {
        language
        name
      }
      exercises {
        setType
        sets {
          setNumber
          quantity
          restTime
        }
        localisations {
          language
          coachingTips
        }
        exercise {
          id
          localisations {
            language
            name
            coachingTips
          }
        }
        orderIndex
      }
      programme {
        id
        trainer {
          id
          localisations {
            language
            name
          }
        }
        environment
      }
    }
  }
`;

export default async ({ client, params }) => {
  try {
    if (
      params.data.overviewImage &&
      params.data.overviewImage.hasOwnProperty('rawFile')
    ) {
      const uploadRequest = await uploadFile({
        client,
        file: params.data.overviewImage,
        purpose: 'ondemandworkout-img',
      });
      params.data.overviewImageKey = uploadRequest.key;
    }

    // assign setNumber to each set in each exercise (use array index pos)
    for (let i = 0; i < params.data.exercises.length; i++) {
      const exercise = cloneDeep(params.data.exercises[i]);
      params.data.exercises[i].orderIndex = i;
      params.data.exercises[i].exercise = exercise.exercise.id;
      // cleanup the autogenerated fields
      delete params.data.exercises[i].setsIds;
      delete params.data.exercises[i]['exercise.id'];
      delete params.data.exercises[i].exercise.localisationsIds;
      // add the languages to the data as we had to simplify the workout form for performance reasons
      if (params.data.exercises[i].localisations[0])
        params.data.exercises[i].localisations[0].language = 'en';
      if (params.data.exercises[i].localisations[1])
        params.data.exercises[i].localisations[1].language = 'hi';
      if (params.data.exercises[i].localisations[2])
        params.data.exercises[i].localisations[2].language = 'ur';
      for (let j = 0; j < params.data.exercises[i].sets.length; j++) {
        params.data.exercises[i].sets[j].setNumber = j; // 0-index
      }
    }

    const result = await client.mutate({
      mutation: createOnDemandWorkoutMutation,
      variables: {
        workout: {
          isContinuous: params.data.isContinuous,
          localisations: params.data.localisations,
          intensity: params.data.intensity,
          duration: params.data.duration,
          exercises: params.data.exercises,
          programme: params.data.programme.id,
          tagIds: params.data.tagIds,
          orderIndex: 0, // fake it - graphql validation (order index not used on On Demand Workouts)
          overviewImageKey: params.data.overviewImageKey,
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
