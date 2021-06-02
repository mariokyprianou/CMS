/*
 * Jira Ticket:
 * Created Date: Wed, 20th Jan 2021, 18:37:04 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const getListOnDemandWorkoutsQuery = gql`
  query allOnDemandWorkouts(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: SortOrder
    $filter: OnDemandWorkoutFilterInput
  ) {
    items: allOnDemandWorkouts(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
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
    total: _allOnDemandWorkoutsMeta(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      count
    }
  }
`;
