/*
 * Jira Ticket:
 * Created Date: Wed, 20th Jan 2021, 18:37:04 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const getOneOnDemandWorkoutQuery = gql`
  query OnDemandWorkout($id: ID!) {
    data: OnDemandWorkout(id: $id) {
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
        exercise {
          id
          localisations {
            language
            name
            coachingTips
          }
        }
        localisations {
          language
          coachingTips
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
