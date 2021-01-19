/*
 * Jira Ticket:
 * Created Date: Tue, 19th Jan 2021, 12:13:59 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const exportFeedbackMutation = gql`
  mutation ExportFeedback {
    data: exportFeedback
  }
`;

export default async ({ client }) => {
  try {
    const result = await client.mutate({
      mutation: exportFeedbackMutation,
      fetchPolicy: 'no-cache',
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
