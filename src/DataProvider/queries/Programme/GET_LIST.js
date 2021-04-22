/*
 * Jira Ticket:
 * Created Date: Tue, 19th Jan 2021, 17:15:00 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const getListProgrammesQuery = gql`
  query allProgrammes(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: SortOrder
    $filter: ProgrammeFilter
  ) {
    items: allProgrammes(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
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
    total: _allProgrammesMeta(
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
