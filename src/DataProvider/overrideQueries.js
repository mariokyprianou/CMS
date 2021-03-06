/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:14:54 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import * as Query from './queries';

export default ({ type, resource, params, builtQuery }) => {
  // override ra-data-graphql-simple predicted queries here e.g.
  if (
    resource === 'Programme' &&
    (type === 'GET_LIST' || type === 'GET_MANY')
  ) {
    return Query.getListProgrammesQuery;
  }
  if (resource === 'WorkoutWeek') {
    if (type === 'GET_ONE') {
      return Query.getOneWorkoutWeekQuery;
    }
    if (type === 'GET_LIST') {
      return Query.getListWorkoutWeeksQuery;
    }
  }
  if (resource === 'OnDemandWorkout') {
    if (type === 'GET_ONE') {
      return Query.getOneOnDemandWorkoutQuery;
    }
    if (type === 'GET_LIST') {
      return Query.getListOnDemandWorkoutsQuery;
    }
  }
  if (resource === 'User') {
    if (type === 'GET_ONE') {
      return Query.getOneUserQuery;
    }
  }
  if (resource === 'WorkoutTag') {
    if (type === 'CREATE') {
      return Query.createWorkoutTagMutation;
    }
  }
};
