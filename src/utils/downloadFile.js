/*
 * Jira Ticket:
 * Created Date: Tue, 19th Jan 2021, 12:17:08 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

const downloadFile = ({ uri, filename }) => {
  let link = document.createElement('a');
  link.href = uri;
  link.target = '_blank';
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadFile;
