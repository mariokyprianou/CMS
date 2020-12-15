/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 16:26:47 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

export const nonNegativeNonZeroInt = (num = 0) => {
  if (num !== null) {
    if (Number.isInteger(num)) {
      if (num <= 0) {
        return 'validation.positivieNonZeroInt';
      }
    } else {
      return 'validation.notAnInt';
    }
  } else {
    return 'ra.validation.required';
  }
};

export const nonNegativeInt = (num) => {
  if (num !== null) {
    if (Number.isInteger(num)) {
      if (num < 0) {
        return 'validation.positivieInt';
      }
    } else {
      return 'validation.notAnInt';
    }
  } else {
    return 'ra.validation.required';
  }
};
