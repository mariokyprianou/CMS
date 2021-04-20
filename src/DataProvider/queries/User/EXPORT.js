/*
 * Created Date: Tue, 20th Apr 2021, 11:47:33 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';

export const exportUsersMutation = gql`
  mutation ExportUsers {
    data: exportUsers {
      downloadUrl
    }
  }
`;

export default async ({ client }) => {
  try {
    const result = await client.mutate({
      mutation: exportUsersMutation,
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
