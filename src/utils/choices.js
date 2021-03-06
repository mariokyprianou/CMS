/*
 * Jira Ticket:
 * Created Date: Thu, 12th Nov 2020, 13:25:28 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import feedbackEmojis from './emojis';
import timezones from './timezones';
import emojiDictionary from 'emoji-dictionary';

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

const subscriptionStatusBooleanTranslatedChoices = [
  {
    id: true,
    name: 'choices.subscription.active',
  },
  {
    id: false,
    name: 'choices.subscription.expired',
  },
];

const subscriptionPlatformChoices = [
  {
    id: 'GOOGLE_PLAY',
    name: 'choices.subscriptionPlatform.android',
  },
  {
    id: 'APP_STORE',
    name: 'choices.subscriptionPlatform.ios',
  },
  {
    id: 'MANUAL_OVERRIDE',
    name: 'choices.subscriptionPlatform.manual',
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

const publishStatusChoices = [
  { id: 'PUBLISHED', name: 'choices.publishStatus.published' },
  { id: 'DRAFT', name: 'choices.publishStatus.draft' },
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
    name: 'choices.challenge.type.countdown',
  },
  {
    id: 'STOPWATCH',
    name: 'choices.challenge.type.stopwatch',
  },
  {
    id: 'OTHER',
    name: 'choices.challenge.type.other',
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

const notificationTypeChoices = [
  {
    id: 'THREE_DAYS_WITHOUT_TRAINING',
    name: 'choices.notificationType.threeDaysNoTraining',
  },
  {
    id: 'TWO_WEEKS_WITHOUT_OPENING_APP',
    name: 'choices.notificationType.twoWeeksNoActivity',
  },
  {
    id: 'SEVEN_DAYS_WITHOUT_LOGGING_CHALLENGE',
    name: 'choices.notificationType.sevenDaysNoLogging',
  },
  {
    id: 'NEW_TRAINER_ADDED',
    name: 'choices.notificationType.newTrainer',
  },
  {
    id: 'NEW_CHALLENGE_ADDED',
    name: 'choices.notificationType.newChallenge',
  },
  {
    id: 'END_OF_COMPLETED_WORKOUT_WEEK',
    name: 'choices.notificationType.endOfWorkoutWeek',
  },
];

const onboardingScreens = [
  {
    id: 'onboarding0',
    name: 'choices.onboardingscreens.title1',
  },
  {
    id: 'onboarding1',
    name: 'choices.onboardingscreens.title2',
  },
  {
    id: 'onboarding2',
    name: 'choices.onboardingscreens.title3',
  },
  {
    id: 'onboarding3',
    name: 'choices.onboardingscreens.title4',
  },
];

const intensityChoices = [
  {
    id: 'LOW',
    name: 'choices.intensity.low',
  },
  {
    id: 'MOD',
    name: 'choices.intensity.mod',
  },
  {
    id: 'HIGH',
    name: 'choices.intensity.high',
  },
];

const exerciseTypeChoices = [
  {
    id: 'REPS',
    name: 'choices.exerciseType.reps',
  },
  {
    id: 'TIME',
    name: 'choices.exerciseType.time',
  },
];

const subscriptionChoices = [
  {
    id: 'true',
    name: 'choices.subscription.active',
  },
  {
    id: 'false',
    name: 'choices.subscription.expired',
  },
];

const challengeUnitTypeChoices = [
  {
    id: 'WEIGHT',
    name: 'choices.challenge.unitType.weight',
  },
  {
    id: 'REPS',
    name: 'choices.challenge.unitType.reps',
  },
  {
    id: 'DISTANCE',
    name: 'choices.challenge.unitType.distance',
  },
];

const feedbackIntensityChoices = [
  {
    id: '1,5',
    name: 'choices.feedback.intensity.oneToFive',
  },
  {
    id: '5,10',
    name: 'choices.feedback.intensity.fiveToTen',
  },
  {
    id: '10,15',
    name: 'choices.feedback.intensity.tenToFifteen',
  },
  {
    id: '15,20',
    name: 'choices.feedback.intensity.fifteenToTwenty',
  },
];

const allTimeZones = timezones.map((timeZone) => {
  return { id: timeZone, name: timeZone };
});

const allFeedbackEmojis = feedbackEmojis.map((emoji) => {
  return {
    id: emoji,
    name: emojiDictionary.getUnicode(emoji.replace(/-/g, '_')),
  };
});

export {
  booleanTranslatedChoices,
  subscriptionPlatformChoices,
  programmeEnvironmentChoices,
  textColourChoices,
  challengeTypeChoices,
  exerciseVideoDifficultyChoices,
  localeChoices,
  notificationTypeChoices,
  publishStatusChoices,
  intensityChoices,
  exerciseTypeChoices,
  onboardingScreens,
  allTimeZones,
  subscriptionChoices,
  challengeUnitTypeChoices,
  allFeedbackEmojis,
  feedbackIntensityChoices,
  subscriptionStatusBooleanTranslatedChoices,
};
