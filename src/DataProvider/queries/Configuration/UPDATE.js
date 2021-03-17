/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 15:37:12 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';
import uploadFile from 'DataProvider/queries/FileUpload/UPLOAD_FILE';
import { onboardingScreens } from 'utils/choices';

export const updateConfigurationMutation = gql`
  mutation UpdateConfiguration($input: ConfigurationInput) {
    data: updateConfiguration(input: $input) {
      localisations {
        language
        termsAndConditions
        privacyPolicy
        onboardings {
          orderIndex
          title
          description
          image {
            key
            url
          }
        }
        notifications {
          type
          title
          body
        }
      }
    }
  }
`;

export default async ({ client, params }) => {
  try {
    for (let j = 0; j < params.data.localisations.length; j++) {
      const localisation = params.data.localisations[j];
      for (let i = 0; i < onboardingScreens.length; i++) {
        const onboardingScreen = onboardingScreens[i].id;
        const onboardingImg = localisation[`image_${onboardingScreen}`];
        if (onboardingImg && onboardingImg.hasOwnProperty('rawFile')) {
          // handle image uploads
          const uploadRequest = await uploadFile({
            client,
            file: onboardingImg,
          });
          localisation[`image_${onboardingScreen}_key`] = uploadRequest.key;
        } else if (onboardingImg && onboardingImg.hasOwnProperty('key')) {
          // just pass on the current image
          localisation[`image_${onboardingScreen}_key`] = onboardingImg.key;
        }
      }
    }

    // unflatten the notification and onboardings arrays
    var formattedParams = params.data.localisations.map((localisation) => {
      return {
        language: localisation.language,
        termsAndConditions: localisation.termsAndConditions,
        privacyPolicy: localisation.privacyPolicy,
        onboardings: [
          {
            orderIndex: 0,
            title: localisation.title_onboarding0,
            description: localisation.description_onboarding0,
            image: localisation.image_onboarding0_key,
          },
          {
            orderIndex: 1,
            title: localisation.title_onboarding1,
            description: localisation.description_onboarding1,
            image: localisation.image_onboarding1_key,
          },
          {
            orderIndex: 2,
            title: localisation.title_onboarding2,
            description: localisation.description_onboarding2,
            image: localisation.image_onboarding2_key,
          },
          {
            orderIndex: 3,
            title: localisation.title_onboarding3,
            description: localisation.description_onboarding3,
            image: localisation.image_onboarding3_key,
          },
        ],
        notifications: [
          {
            type: 'THREE_DAYS_WITHOUT_TRAINING',
            title: localisation.body_THREE_DAYS_WITHOUT_TRAINING,
            body: localisation.title_THREE_DAYS_WITHOUT_TRAINING,
          },
          {
            type: 'TWO_WEEKS_WITHOUT_OPENING_APP',
            title: localisation.body_TWO_WEEKS_WITHOUT_OPENING_APP,
            body: localisation.title_TWO_WEEKS_WITHOUT_OPENING_APP,
          },
          {
            type: 'SEVEN_DAYS_WITHOUT_LOGGING_CHALLENGE',
            title: localisation.body_SEVEN_DAYS_WITHOUT_LOGGING_CHALLENGE,
            body: localisation.title_SEVEN_DAYS_WITHOUT_LOGGING_CHALLENGE,
          },
          {
            type: 'NEW_TRAINER_ADDED',
            title: localisation.body_NEW_TRAINER_ADDED,
            body: localisation.title_NEW_TRAINER_ADDED,
          },
          {
            type: 'NEW_CHALLENGE_ADDED',
            title: localisation.body_NEW_CHALLENGE_ADDED,
            body: localisation.title_NEW_CHALLENGE_ADDED,
          },
          {
            type: 'END_OF_COMPLETED_WORKOUT_WEEK',
            title: localisation.body_END_OF_COMPLETED_WORKOUT_WEEK,
            body: localisation.title_END_OF_COMPLETED_WORKOUT_WEEK,
          },
        ],
      };
    });

    const result = await client.mutate({
      mutation: updateConfigurationMutation,
      variables: {
        input: {
          localisations: formattedParams,
        },
      },
    });

    return result;
  } catch (e) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const [error] = e.graphQLErrors;
      const message = error.message;
      throw new Error(message);
    }
    throw e;
  }
};
