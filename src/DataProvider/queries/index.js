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

import getListFeedback from './Feedback/GET_LIST';
import exportFeedback from './Feedback/EXPORT';

import { getListProgrammesQuery } from './Programme/GET_LIST';
import createProgramme from './Programme/CREATE';
import updateProgramme from './Programme/UPDATE';

import { getOneWorkoutWeekQuery } from './WorkoutWeek/GET_ONE';
import { getListWorkoutWeeksQuery } from './WorkoutWeek/GET_LIST';

import createExercise from './Exercise/CREATE';
import updateExercise from './Exercise/UPDATE';

import createWorkoutWeek from './WorkoutWeek/CREATE';
import updateWorkoutWeek from './WorkoutWeek/UPDATE';

import createChallenge from './Challenge/CREATE';
import updateChallenge from './Challenge/UPDATE';

import { getOneUserQuery } from './User/GET_ONE';
import updateUser from './User/UPDATE';
import exportUsers from './User/EXPORT';

import { getOneOnDemandWorkoutQuery } from './OnDemandWorkout/GET_ONE';
import { getListOnDemandWorkoutsQuery } from './OnDemandWorkout/GET_LIST';
import createOnDemandWorkout from './OnDemandWorkout/CREATE';
import updateOnDemandWorkout from './OnDemandWorkout/UPDATE';

import { createWorkoutTagMutation } from './OnDemandTag/CREATE';

export {
  getOneConfig,
  updateConfig,
  updateHmcQuestion,
  createHmcQuestion,
  getListFeedback,
  exportFeedback,
  getListProgrammesQuery,
  getOneWorkoutWeekQuery,
  getListWorkoutWeeksQuery,
  createExercise,
  updateExercise,
  createWorkoutWeek,
  updateWorkoutWeek,
  createChallenge,
  updateChallenge,
  createProgramme,
  updateProgramme,
  getOneUserQuery,
  updateUser,
  exportUsers,
  getOneOnDemandWorkoutQuery,
  getListOnDemandWorkoutsQuery,
  createOnDemandWorkout,
  updateOnDemandWorkout,
  createWorkoutTagMutation,
};
