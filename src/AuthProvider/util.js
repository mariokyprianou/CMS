/*
 * Jira Ticket:
 * Created Date: Fri, 21st Feb 2020, 12:28:25 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

export const isNewPasswordRequired = (user = {}) =>
  user.challengeName === 'NEW_PASSWORD_REQUIRED';
