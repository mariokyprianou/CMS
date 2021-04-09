/*
 * Created Date: Fri, 9th Apr 2021, 11:33:39 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import { convertBytes } from 'utils';

const onDropRejected = ({ files, translate, notify, maxFileSize }) => {
  const reasons = [];
  files.forEach((file) => {
    if (file.size > maxFileSize) {
      reasons.push(
        translate('error.fileUpload.fileTooBig', {
          filename: file.name,
          maxSize: convertBytes(maxFileSize, 1),
        })
      );
    } else {
      reasons.push(
        translate('error.fileUpload.unknownRejection', {
          filename: file.name,
        })
      );
    }
  });
  return notify(reasons.join(', ').toString(), 'warning');
};

export default onDropRejected;
