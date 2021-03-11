/*
 * Jira Ticket:
 * Created Date: Wed, 20th Jan 2021, 18:37:04 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const getOneWorkoutWeekQuery = gql`
  query WorkoutWeek($id: ID!) {
    data: WorkoutWeek(id: $id) {
      id
      weekNumber
      orderIndex
      workout {
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
