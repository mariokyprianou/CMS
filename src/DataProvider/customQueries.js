/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:14:54 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import * as Query from './queries';
import decorateResponse from './decorateResponse';

export default async ({ type, resource, params, client }) => {
  var result;
  if (resource === 'Configuration') {
    if (type === 'GET_ONE') {
      result = await Query.getOneConfig({ client, params });
    }
    if (type === 'UPDATE' || type === 'CREATE') {
      result = await Query.updateConfig({ client, params });
    }
  }
  if (resource === 'HmcQuestion') {
    if (type === 'CREATE') {
      result = await Query.createHmcQuestion({ client, params });
    }
    if (type === 'UPDATE') {
      result = await Query.updateHmcQuestion({ client, params });
    }
  }
  if (resource === 'Feedback') {
    if (type === 'EXPORT') {
      result = await Query.exportFeedback({ client, params });
    }
    if (type === 'GET_LIST') {
      result = await Query.getListFeedback({ client, params });
    }
  }
  if (resource === 'Exercise') {
    if (type === 'CREATE') {
      result = await Query.createExercise({ client, params });
    }
    if (type === 'UPDATE') {
      result = await Query.updateExercise({ client, params });
    }
  }
  if (resource === 'WorkoutWeek') {
    if (type === 'CREATE') {
      result = await Query.createWorkoutWeek({ client, params });
    }
    if (type === 'UPDATE') {
      result = await Query.updateWorkoutWeek({ client, params });
    }
  }
  if (resource === 'Challenge') {
    if (type === 'CREATE') {
      result = await Query.createChallenge({ client, params });
    }
    if (type === 'UPDATE') {
      result = await Query.updateChallenge({ client, params });
    }
  }
  if (resource === 'Programme') {
    if (type === 'CREATE') {
      result = await Query.createProgramme({ client, params });
    }
    if (type === 'UPDATE') {
      result = await Query.updateProgramme({ client, params });
    }
  }
  if (resource === 'User') {
    if (type === 'UPDATE') {
      result = await Query.updateUser({ client, params });
    }
    if (type === 'EXPORT') {
      result = await Query.exportUsers({ client, params });
    }
    if (type === 'UNBLOCK') {
      result = await Query.unblockUser({ client, params });
    }
  }
  if (resource === 'OnDemandWorkout') {
    if (type === 'CREATE') {
      result = await Query.createOnDemandWorkout({ client, params });
    }
    if (type === 'UPDATE') {
      result = await Query.updateOnDemandWorkout({ client, params });
    }
  }

  return decorateResponse({
    type,
    resource,
    result,
  });
};
