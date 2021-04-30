/*
 * Jira Ticket:
 * updated Date: Tue, 26th Jan 2021, 11:21:03 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import uploadFile from 'DataProvider/queries/FileUpload/UPLOAD_FILE';

export const updateProgrammeMutation = gql`
  mutation UpdateProgramme($id: ID!, $programme: ProgrammeInput!) {
    data: updateProgramme(id: $id, programme: $programme) {
      id
      trainer {
        id
        localisations {
          language
          name
        }
      }
      environment
      subscribers
      images {
        url
        orderIndex
      }
      shareMediaImages {
        id
        type
        localisations {
          language
          url
          colour
        }
      }
      localisations {
        language
        description
      }
      weeksAvailable
      status
      fatLoss
      fitness
      muscle
      wellness
    }
  }
`;

export default async ({ client, params }) => {
  try {
    // trainer images
    if (params.data.images && params.data.images.length > 0) {
      for (let i = 0; i < params.data.images.length; i++) {
        const image = params.data.images[i];
        if (image.hasOwnProperty('rawFile')) {
          const uploadRequest = await uploadFile({
            client,
            file: image,
            purpose: 'programme-img',
          });
          params.data.images[i].imageKey = uploadRequest.key;
          params.data.images[i].orderIndex = i; // add the order index
          // tidy up unwanted uploaded file props
          delete params.data.images[i].img;
          delete params.data.images[i].rawFile;
        }
        // tidy up the params
        delete params.data.images[i].url;
      }
    }

    // reset the share media images array
    params.data.shareMediaImages = [];

    // handle the share media images
    const programmeStartImageLocalisations = [];
    // programme start images and their localisations
    if (params.data.programmeStartImages) {
      for (
        let i = 0;
        i < params.data.programmeStartImages.localisations.length;
        i++
      ) {
        const localisation = params.data.programmeStartImages.localisations[i];
        if (localisation && localisation.image.hasOwnProperty('rawFile')) {
          const uploadRequest = await uploadFile({
            client,
            file: localisation.image,
            purpose: 'programme-img',
          });
          programmeStartImageLocalisations.push({
            language: localisation.language,
            imageKey: uploadRequest.key,
            colour: 'WHITE', // no colour to set - mock to satisfy backend db requirement
          });
        } else if (localisation) {
          programmeStartImageLocalisations.push({
            language: localisation.language,
            imageKey: localisation.imageKey,
            colour: 'WHITE', // no colour to set - mock to satisfy backend db requirement
          });
        }
      }
    }

    if (programmeStartImageLocalisations.length > 0) {
      // add the localised programme start images:
      const startImageParams = {
        id:
          params.data.programmeStartImages &&
          params.data.programmeStartImages.id,
        type: 'PROGRAMME_START',
        localisations: programmeStartImageLocalisations,
      };
      if (
        params.data.programmeStartImages &&
        params.data.programmeStartImages.id
      ) {
        startImageParams['id'] = params.data.programmeStartImages.id;
      }
      params.data.shareMediaImages.push(startImageParams);
    }

    // handle the week complete, challenge complete and progress images
    const weekCompleteNames = [
      'weekComplete0',
      'weekComplete1',
      'weekComplete2',
    ];
    const challengeCompleteNames = ['challengeComplete0', 'challengeComplete1'];
    const progressNames = ['progress0'];

    // workout complete images
    for (let i = 0; i < weekCompleteNames.length; i++) {
      const weekCompleteImageLocalisations = [];
      const shareMediaName = weekCompleteNames[i];
      const shareMedia = params.data[`${shareMediaName}`];
      if (
        shareMedia &&
        shareMedia.image &&
        shareMedia.image.hasOwnProperty('rawFile')
      ) {
        const uploadRequest = await uploadFile({
          client,
          file: shareMedia.image,
          purpose: 'programme-img',
        });
        weekCompleteImageLocalisations.push({
          language: 'en', // no localisation in the CMS form so mock it
          imageKey: uploadRequest.key,
          colour: shareMedia.colour,
        });
      } else if (shareMedia) {
        weekCompleteImageLocalisations.push({
          language: 'en', // no localisation in the CMS form so mock it
          imageKey: shareMedia.image.imageKey,
          colour: shareMedia.colour,
        });
      }
      if (weekCompleteImageLocalisations.length > 0) {
        params.data.shareMediaImages.push({
          id: shareMedia && shareMedia.id,
          type: 'WEEK_COMPLETE',
          localisations: weekCompleteImageLocalisations,
        });
      }
    }

    // challenge complete images
    for (let i = 0; i < challengeCompleteNames.length; i++) {
      const challengeCompleteImageLocalisations = [];
      const shareMediaName = challengeCompleteNames[i];
      const shareMedia = params.data[`${shareMediaName}`];
      if (shareMedia && shareMedia.image.hasOwnProperty('rawFile')) {
        const uploadRequest = await uploadFile({
          client,
          file: shareMedia.image,
          purpose: 'programme-img',
        });
        challengeCompleteImageLocalisations.push({
          language: 'en', // no localisation in the CMS form so mock it
          imageKey: uploadRequest.key,
          colour: shareMedia.colour,
        });
      } else if (shareMedia) {
        challengeCompleteImageLocalisations.push({
          language: 'en', // no localisation in the CMS form so mock it
          imageKey: shareMedia.image.imageKey,
          colour: shareMedia.colour,
        });
      }
      if (challengeCompleteImageLocalisations.length > 0) {
        params.data.shareMediaImages.push({
          id: shareMedia && shareMedia.id,
          type: 'CHALLENGE_COMPLETE',
          localisations: challengeCompleteImageLocalisations,
        });
      }
    }

    // progress image
    for (let i = 0; i < progressNames.length; i++) {
      const progressImageLocalisations = [];
      const shareMediaName = progressNames[i];
      const shareMedia = params.data[`${shareMediaName}`];
      if (shareMedia && shareMedia.image.hasOwnProperty('rawFile')) {
        const uploadRequest = await uploadFile({
          client,
          file: shareMedia.image,
          purpose: 'programme-img',
        });
        progressImageLocalisations.push({
          language: 'en', // no localisation in the CMS form so mock it
          imageKey: uploadRequest.key,
          colour: shareMedia.colour,
        });
      } else if (shareMedia) {
        progressImageLocalisations.push({
          language: 'en', // no localisation in the CMS form so mock it
          imageKey: shareMedia.image.imageKey,
          colour: shareMedia.colour,
        });
      }
      if (progressImageLocalisations.length > 0) {
        params.data.shareMediaImages.push({
          id: shareMedia && shareMedia.id,
          type: 'PROGRESS',
          localisations: progressImageLocalisations,
        });
      }
    }

    const result = await client.mutate({
      mutation: updateProgrammeMutation,
      variables: {
        id: params.data.id,
        programme: {
          environment: params.data.environment,
          status: params.data.status,
          muscle: params.data.muscle,
          fatLoss: params.data.fatLoss,
          fitness: params.data.fitness,
          wellness: params.data.wellness,
          trainerId: params.data.trainer.id,
          images: params.data.images,
          localisations: params.data.localisations,
          shareMediaImages: params.data.shareMediaImages,
          weeksAvailable: params.data.weeksAvailable,
        },
      },
    });

    return result.data;
  } catch (e) {
    if (e.graphQLErrors && e.graphQLErrors.length) {
      const [error] = e.graphQLErrors;
      const message = error.message;
      throw new Error(message);
    }
    throw e;
  }
};
