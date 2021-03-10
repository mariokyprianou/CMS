/*
 * Jira Ticket:
 * Created Date: Wed, 20th Jan 2021, 12:12:28 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import axios from 'axios';
// TODO: change to upload image
const requestVideoUploadMutation = gql`
  mutation RequestVideoUpload {
    data: requestVideoUpload {
      key
      url
    }
  }
`;

export default async ({ client, file }) => {
  console.log('file: ', file);
  const uploadRequest = await client.mutate({
    mutation: requestVideoUploadMutation,
    variables: {},
  });
  const response = uploadRequest.data.data;
  await axios.put(response.url, file.rawFile, {
    headers: {
      'Content-Type': file.contentType, // video mp4 only
    },
  });
  return response;
};
