/*
 * Created Date: Wed, 14th Apr 2021, 11:54:46 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const getListFeedbacksQuery = gql`
  query allFeedbacks(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: FeedbackFilter
  ) {
    items: allFeedbacks(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      id
      date
      emojis
      environment
      timeTaken
      trainerName
      userEmail
      week
      workoutIntensity
      workoutName
    }
    total: _allFeedbacksMeta(
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

export default async ({ client, params }) => {
  try {
    const result = await client.query({
      query: getListFeedbacksQuery,
      variables: {
        page: params.pagination.page > 0 ? params.pagination.page - 1 : 0, // no negative pages
        perPage: params.pagination.perPage,
        sortField: params.sort.field,
        sortOrder: params.sort.order,
        filter: params.filter,
      },
    });

    return { data: result.data.items, total: result.data.total.count }; // formatted for expected list response
  } catch (e) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const [error] = e.graphQLErrors;
      const message = error.message;
      throw new Error(message);
    }
    throw e;
  }
};
