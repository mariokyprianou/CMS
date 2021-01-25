/*
 * Jira Ticket:
 * Created Date: Mon, 25th Jan 2021, 17:42:14 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const createWorkoutWeekMutation = gql`
  mutation CreateWorkoutWeek($workout: WorkoutInput) {
    data: createWorkoutWeek(workout: $workout) {
      id
      weekNumber
      orderIndex
      workout {
        overviewImage
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
      params.data.overviewImage &&
      params.data.overviewImage.hasOwnProperty('rawFile')
    ) {
      // TODO: handle overview image upload
      // const uploadRequest = await uploadFile(params.data.overviewImage);
      // params.data.overviewImageKey = uploadRequest.id;
    }

    // assign setNumber to each set in each exercise (use array index pos)
    for (let i = 0; i < params.data.workout.exercises.length; i++) {
      const exercise = params.data.workout.exercises[i];
      // cleanup the autogenerated fields
      delete params.data.workout.exercises[i].setsIds;
      delete params.data.workout.exercises[i]['exercise.id'];
      delete params.data.workout.exercises[i].exercise.localisationsIds;
      for (let j = 0; j < exercise.sets.length; j++) {
        exercise.sets[j].setNumber = j; // 0-index
      }
    }

    const result = await client.mutate({
      mutation: createWorkoutWeekMutation,
      variables: {
        workout: {
          localisations: params.data.workout.localisations,
          intensity: params.data.workout.intensity,
          duration: params.data.workout.duration,
          exercises: params.data.workout.exercises,
          programme: params.data.trainingProgrammeId,
          weekNumber: params.data.weekNumber,
          orderIndex: params.data.orderIndex,
          overviewImageKey: params.data.overviewImageKey,
        },
      },
    });

    return result;
  } catch (e) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const [error] = e.graphQLErrors;
      const message = error.message;
      throw new Error(message);
    }
    throw e;
  }
};
