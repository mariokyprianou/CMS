/*
 * Created Date: Thu, 11th Mar 2021, 10:10:58 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import gql from 'graphql-tag';
import axios from 'axios';

const uploadMediaMutation = gql`
  mutation UploadMedia($input: UploadMediaInput!) {
    data: uploadMedia(input: $input) {
      key
      uploadUrl
      contentType
    }
  }
`;

export default async ({ client, file }) => {
  const now = new Date();
  const isoString = now.toISOString();

  const uploadRequest = await client.mutate({
    mutation: uploadMediaMutation,
    variables: {
      input: {
        contentType: file.rawFile.type,
        key: `${isoString}_${file.rawFile.name}`, // isotimestamp_filename
      },
    },
  });
  const response = uploadRequest.data.data;
  await axios.put(response.uploadUrl, file.rawFile, {
    headers: {
      'Content-Type': response.contentType,
    },
  });
  return response;
};
