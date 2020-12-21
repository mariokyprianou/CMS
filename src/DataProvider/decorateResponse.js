/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:14:54 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

export default ({ type, resource, result }) => {
  // override results returned from backend here, e.g. create required field names
  if (resource === 'Configuration') {
    result.data.id = 'configuration'; // fake the ID
    for (let i = 0; i < result.data.data.localisations.length; i++) {
      const localisation = result.data.data.localisations[i];
      // loop through the notifications and flatten
      for (let j = 0; j < localisation.notifications.length; j++) {
        const notification = localisation.notifications[j];
        localisation[`title_${notification.type}`] = notification.title;
        localisation[`body_${notification.type}`] = notification.body;
      }
      // loop through the onboarding screens and flatten
      for (let k = 0; k < localisation.onboardings.length; k++) {
        const onboarding = localisation.onboardings[k];
        localisation[`title_onboarding${onboarding.orderIndex}`] =
          onboarding.title;
        localisation[`description_onboarding${onboarding.orderIndex}`] =
          onboarding.description;
        localisation[`image_onboarding${onboarding.orderIndex}`] =
          onboarding.image;
      }
    }
  }
  if (
    resource === 'HmcQuestion' &&
    type === 'GET_ONE' &&
    result &&
    result.data
  ) {
    for (let i = 0; i < result.data.programmeScores.length; i++) {
      const programmeScore = result.data.programmeScores[i];
      // loop through the programme scores and flatten
      result.data[`${programmeScore.trainingProgrammeId}_answer1Score`] =
        programmeScore.answer1Score;
      result.data[`${programmeScore.trainingProgrammeId}_answer2Score`] =
        programmeScore.answer2Score;
      result.data[`${programmeScore.trainingProgrammeId}_answer3Score`] =
        programmeScore.answer3Score;
      result.data[`${programmeScore.trainingProgrammeId}_answer4Score`] =
        programmeScore.answer4Score;
    }
  }
  return result;
};
