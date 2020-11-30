/*
 * Jira Ticket: PDL-364
 * Created Date: Mon, 30th Nov 2020, 13:29:46 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  fetchStart,
  fetchEnd,
  SimpleForm,
  useDataProvider,
  useNotify,
} from 'react-admin';

const ConfigurationPage = (props) => {
  const resource = 'Configuration';
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { staticContext, ...customProps } = {
    resource,
    basePath: `/${resource}`,
    ...props,
  };
  const toolbarProps = {
    dataProvider,
    dispatch,
    fetchStart,
    fetchEnd,
    notify,
  };

  return (
    <SimpleForm
      // toolbar={<ConfigToolbar {...toolbarProps} />}
      {...customProps}
    >
      {/* TODO: Show the Resource on the left hand side and then show the
      contents for the screen. See FDs for design
      (https://thedistance.atlassian.net/wiki/spaces/PDL/pages/2026373158/2.6+Configuration) */}
    </SimpleForm>
  );
};

export default ConfigurationPage;
