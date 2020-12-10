/*
 * Jira Ticket:
 * Created Date: Thu, 12th Nov 2020, 13:25:28 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

// all choices available throughout the app
const booleanTranslatedChoices = [
  {
    id: true,
    name: 'choices.booleanTranslated.true',
  },
  {
    id: false,
    name: 'choices.booleanTranslated.false',
  },
];

const subscriptionPlatformChoices = [
  {
    id: 'ANDROID',
    name: 'choices.subscriptionPlatform.android',
  },
  {
    id: 'IOS',
    name: 'choices.subscriptionPlatform.ios',
  },
];

const programmeEnvironmentChoices = [
  {
    id: 'HOME',
    name: 'choices.programmeEnvironment.home',
  },
  {
    id: 'GYM',
    name: 'choices.programmeEnvironment.gym',
  },
];

// TODO: comes form the backend as County resource
const countryChoices = [
  {
    id: 'UK',
    name: 'UK',
  },
  {
    id: 'India',
    name: 'India',
  },
];

// TODO: comes form the backend as Region resource
const regionChoices = [
  {
    id: 'Assam',
    name: 'Assam',
  },
  {
    id: 'Bihar',
    name: 'Bihar',
  },
  {
    id: 'Goa',
    name: 'Goa',
  },
];

// TODO: comes form the backend as TimeZone resource
const timeZoneChoices = [
  {
    id: 'UTC +0',
    name: 'UTC +0',
  },
  {
    id: 'UTC +1',
    name: 'UTC +1',
  },
  {
    id: 'UTC +2',
    name: 'UTC +2',
  },
  {
    id: 'UTC +3',
    name: 'UTC +3',
  },
];

const textColourChoices = [
  {
    id: 'WHITE',
    name: 'choices.textColour.white',
  },
  {
    id: 'BLACK',
    name: 'choices.textColour.black',
  },
];

const challengeTypeChoices = [
  {
    id: 'COUNTDOWN',
    name: 'choices.challengeType.countdown',
  },
  {
    id: 'STOPWATCH',
    name: 'choices.challengeType.stopwatch',
  },
  {
    id: 'OTHER',
    name: 'choices.challengeType.other',
  },
];

const exerciseVideoDifficultyChoices = [
  {
    id: 'EASY',
    name: 'choices.exerciseVideoDifficulty.easy',
  },
  {
    id: 'MEDIUM',
    name: 'choices.exerciseVideoDifficulty.medium',
  },
  {
    id: 'HARD',
    name: 'choices.exerciseVideoDifficulty.hard',
  },
];

const localeChoices = [
  {
    id: 'ENGLISH',
    name: 'English',
  },
  {
    id: 'HINDI',
    name: 'Hindi',
  },
  {
    id: 'URDU',
    name: 'Urdu',
  },
];

const workoutExerciseTypeChoices = [
  {
    id: 'REPETITIONS',
    name: 'choices.workoutExerciseType.repetitions',
  },
  {
    id: 'TIME_INTERVAL',
    name: 'choices.workoutExerciseType.timeInterval',
  },
];

export {
  booleanTranslatedChoices,
  subscriptionPlatformChoices,
  programmeEnvironmentChoices,
  countryChoices,
  regionChoices,
  timeZoneChoices,
  textColourChoices,
  challengeTypeChoices,
  exerciseVideoDifficultyChoices,
  localeChoices,
  workoutExerciseTypeChoices,
};
