/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:16:14 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

// export your custom queries from here
import getOneConfig from './Configuration/GET_ONE';
import updateConfig from './Configuration/UPDATE';

import updateHmcQuestion from './HmcQuestion/UPDATE';
import createHmcQuestion from './HmcQuestion/CREATE';

import exportFeedback from './Feedback/EXPORT';

import { getListProgrammesQuery } from './Programme/GET_LIST';

import createExercise from './Exercise/CREATE';
import updateExercise from './Exercise/UPDATE';

export {
  getOneConfig,
  updateConfig,
  updateHmcQuestion,
  createHmcQuestion,
  exportFeedback,
  getListProgrammesQuery,
  createExercise,
  updateExercise,
};
