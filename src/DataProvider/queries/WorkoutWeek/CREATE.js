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

export const createWorkoutWeekMutation = gql`
  mutation CreateWorkoutWeek($workout: WorkoutInput) {
    data: createWorkoutWeek(workout: $workout) {
      id
      weekNumber
      orderIndex
      programme {
        id
        trainer {
          id
        }
      }
      workout {
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
      }
      trainingProgrammeId
    }
  }
`;

export default async ({ client, params }) => {
  try {
    if (
      params.data.workout.overviewImage &&
      params.data.workout.overviewImage.hasOwnProperty('rawFile')
    ) {
      const uploadRequest = await uploadFile({
        client,
        file: params.data.workout.overviewImage,
        purpose: 'workoutweek-img',
      });
      params.data.workout.overviewImageKey = uploadRequest.key;
    }

    // assign setNumber to each set in each exercise (use array index pos)
    for (let i = 0; i < params.data.workout.exercises.length; i++) {
      const exercise = cloneDeep(params.data.workout.exercises[i]);
      params.data.workout.exercises[i].orderIndex = i;
      params.data.workout.exercises[i].exercise = exercise.exercise.id;
      // cleanup the autogenerated fields
      delete params.data.workout.exercises[i].setsIds;
      delete params.data.workout.exercises[i]['exercise.id'];
      delete params.data.workout.exercises[i].exercise.localisationsIds;
      // add the languages to the data as we had to simplify the workout form for performance reasons
      if (params.data.workout.exercises[i].localisations[0])
        params.data.workout.exercises[i].localisations[0].language = 'en';
      if (params.data.workout.exercises[i].localisations[1])
        params.data.workout.exercises[i].localisations[1].language = 'hi';
      if (params.data.workout.exercises[i].localisations[2])
        params.data.workout.exercises[i].localisations[2].language = 'ur';
      for (let j = 0; j < params.data.workout.exercises[i].sets.length; j++) {
        params.data.workout.exercises[i].sets[j].setNumber = j; // 0-index
      }
    }

    const result = await client.mutate({
      mutation: createWorkoutWeekMutation,
      variables: {
        workout: {
          isContinuous: params.data.workout.isContinuous,
          localisations: params.data.workout.localisations,
          intensity: params.data.workout.intensity,
          duration: params.data.workout.duration,
          exercises: params.data.workout.exercises,
          programme: params.data.trainingProgrammeId,
          weekNumber: params.data.weekNumber,
          orderIndex: params.data.orderIndex,
          overviewImageKey: params.data.workout.overviewImageKey,
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
