/*
 * Jira Ticket:
 * Created Date: Fri, 17th Jan 2020, 16:14:54 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { partition } from 'utils/helpers';

export default ({ type, resource, result }) => {
  // override results returned from backend here, e.g. create required field names
  if (resource === 'Configuration') {
    result.data.id = 'configuration'; // fake the ID
    let resultToParse = result.data.data;
    if (type === 'UPDATE') {
      resultToParse = result.data;
    }
    for (let i = 0; i < resultToParse.localisations.length; i++) {
      const localisation = resultToParse.localisations[i];
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
  if (resource === 'Programme') {
    if ((type === 'GET_ONE' || type === 'UPDATE') && result && result.data) {
      let resultToParse = result.data;
      const [programmeStartImages, otherImages] = partition(
        resultToParse.shareMediaImages,
        (shareImage) => shareImage.type === 'PROGRAMME_START'
      );
      // programme start images - take the first result
      resultToParse['programmeStartImages'] = programmeStartImages[0]; // 1 allowed
      if (resultToParse['programmeStartImages']) {
        resultToParse['programmeStartImages'].localisations.forEach(
          (localisation) => {
            localisation['image'] = {
              imageKey: localisation.imageKey,
              url: localisation.url,
            };
          }
        );
      } else {
        resultToParse['programmeStartImages'] = {
          localisations: [],
          type: 'PROGRAMME_START',
        };
      }

      // other images (non localised in the CMS UI)
      const weekCompleteImages = otherImages.filter(
        (image) => image.type === 'WEEK_COMPLETE'
      ); // up to 3
      const challengeImages = otherImages.filter(
        (image) => image.type === 'CHALLENGE_COMPLETE'
      ); // up to 2
      const progressImages = otherImages.filter(
        (image) => image.type === 'PROGRESS'
      ); // 1

      for (let i = 0; i < 3; i++) {
        const image = weekCompleteImages[i];
        resultToParse[`weekComplete${i}`] = null;
        if (image) {
          resultToParse[`weekComplete${i}`] = {
            id: image.id,
            image: {
              imageKey: image.localisations[0].imageKey,
              url: image.localisations[0].url,
            },
            colour: image.localisations[0].colour,
          };
        }
      }
      for (let i = 0; i < 2; i++) {
        const image = challengeImages[i];
        resultToParse[`challengeComplete${i}`] = null;
        if (image) {
          resultToParse[`challengeComplete${i}`] = {
            id: image.id,
            image: {
              imageKey: image.localisations[0].imageKey,
              url: image.localisations[0].url,
            },
            colour: image.localisations[0].colour,
          };
        }
      }
      for (let i = 0; i < 1; i++) {
        const image = progressImages[i];
        resultToParse[`progress${i}`] = null;
        if (image) {
          resultToParse[`progress${i}`] = {
            id: image.id,
            image: {
              imageKey: image.localisations[0].imageKey,
              url: image.localisations[0].url,
            },
            colour: image.localisations[0].colour,
          };
        }
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
  if (resource === 'User') {
    if ((type === 'GET_ONE' || type === 'UPDATE') && result) {
      result.data.subscription['type'] = 'AUTOMATIC'; //TODO: double check once subscription is done
      if (new Date(result.data.deviceLimit).getTime() > new Date().getTime()) {
        // add a flag to the user indicating they are unable to switch devices
        result.data['deviceLimitEnabled'] = true;
      } else {
        // add a flag to the user indicating they are able to switch devices
        result.data['deviceLimitEnabled'] = false;
      }
    }
  }
  return result;
};
