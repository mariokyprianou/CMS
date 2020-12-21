/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 15:37:12 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import gql from 'graphql-tag';

export const updateHmcQuestionMutation = gql`
  mutation UpdateHmcQuestion($input: UpdateHmcQuestionInput!) {
    data: updateHmcQuestion(input: $input) {
      id
      orderIndex
      localisations {
        language
        question
        answer1
        answer2
        answer3
        answer4
      }
      programmeScores {
        trainingProgrammeId
        answer1Score
        answer2Score
        answer3Score
        answer4Score
      }
    }
  }
`;

export default async ({ client, params }) => {
  try {
    var formattedParams = {
      id: params.data.id,
      orderIndex: params.data.orderIndex,
      localisations: params.data.localisations,
      programmeScores: [],
    };

    // get the unique programme ids
    const allProgrammeIds = [
      ...new Set(
        Object.keys(params.data)
          .filter((key) => key.includes('answer'))
          .map(
            (key) => key.split('_')[0] // id of programme
          )
      ),
    ];

    // unflatten the programme scores array
    allProgrammeIds.forEach((programmeId) => {
      formattedParams.programmeScores.push({
        trainingProgrammeId: programmeId,
        answer1Score: params.data[`${programmeId}_answer1Score`],
        answer2Score: params.data[`${programmeId}_answer2Score`],
        answer3Score: params.data[`${programmeId}_answer3Score`],
        answer4Score: params.data[`${programmeId}_answer4Score`],
      });
    });

    const result = await client.mutate({
      mutation: updateHmcQuestionMutation,
      variables: {
        input: { ...formattedParams },
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
