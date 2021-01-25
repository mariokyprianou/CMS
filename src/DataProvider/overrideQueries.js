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
  if (resource === 'Programme' && type === 'GET_LIST') {
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
};
