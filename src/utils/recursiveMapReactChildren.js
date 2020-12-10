/*
 * Jira Ticket:
 * Created Date: Tue, 24th Nov 2020, 17:44:42 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

function recursiveMap(children, fn, sourcesToSkipRecursion = []) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (
      child.props.children &&
      !sourcesToSkipRecursion.includes(child.props.source)
    ) {
      child = React.cloneElement(child, {
        children: recursiveMap(
          child.props.children,
          fn,
          sourcesToSkipRecursion
        ),
      });
    }

    return fn(child);
  });
}

export default recursiveMap;
