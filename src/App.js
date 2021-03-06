/*
 * Jira Ticket:
 * Created Date: Mon, 4th Mar 2019, 15:23:29 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment, useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history';
import { createStore } from './utils';
import i18nProvider from './i18n';
import { CircularProgress } from '@material-ui/core';
import authProvider from 'AuthProvider';
import buildProvider from 'DataProvider';
import defaultTheme, { darkTheme, lightTheme } from 'theme';
import Layout from 'Layout';
import { Login } from 'Layout/Auth';
import { appStyles } from 'styles';
import defaultMessages from 'ra-language-english';
import customRoutes from 'routes';
// Resources
import {
  Administrator,
  Challenge,
  Configuration,
  Country,
  Exercise,
  ExerciseCategory,
  Feedback,
  HelpMeChoose,
  // Notification,
  Programme,
  Region,
  Trainer,
  User,
  WorkoutWeek,
  OnDemandWorkout,
  WorkoutTag,
} from 'Resources';

const history = createHistory();
const stage = process.env.AWS_BRANCH;
const commit = process.env.AWS_COMMIT_ID;

const App = () => {
  const classes = appStyles();
  const [dataProvider, setDataProvider] = useState(null);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const customReducers = {};

    const initialiseApp = async () => {
      return buildProvider().then((dataProvider) => {
        const store = createStore({
          authProvider: authProvider,
          dataProvider,
          history,
          customReducers,
          i18nProvider: () => defaultMessages,
          initialState: {},
        });
        window.__getStore = () => store;
        setDataProvider(() => dataProvider);
        return setStore(store);
      });
    };
    initialiseApp();
  }, []);

  if (!dataProvider || !store) {
    return (
      <div className={classes.loading}>
        {'Loading...'}
        <CircularProgress size={60} className={classes.circularProgress} />
      </div>
    );
  }

  return (
    <Provider store={store}>
      <Fragment>
        <Admin
          history={history}
          authProvider={authProvider}
          dataProvider={dataProvider}
          title="Power - Admin"
          loginPage={Login}
          layout={Layout}
          i18nProvider={i18nProvider}
          theme={defaultTheme} //comment this out if using ra-enterprise Admin component
          lightTheme={lightTheme}
          darkTheme={darkTheme}
          customRoutes={customRoutes}
        >
          {/* permissions prop will contain an array of permissions from the AuthProvider e.g. ["SUPER"] */}
          {(permissions) => [
            <Resource {...User} />,
            <Resource {...Administrator} />,
            <Resource {...Trainer} />,
            <Resource {...Programme} />,
            <Resource {...WorkoutWeek} />,
            <Resource {...ExerciseCategory} />,
            <Resource {...Exercise} />,
            <Resource {...Configuration} />,
            <Resource {...HelpMeChoose} />,
            // <Resource {...Notification} />, //TODO: add back in when notifications are ready
            <Resource {...Feedback} />,
            <Resource {...Challenge} />,
            <Resource {...Country} />,
            <Resource {...Region} />,
            <Resource {...OnDemandWorkout} />,
            <Resource {...WorkoutTag} />,
          ]}
        </Admin>
        {/* footer to display branch and commit id in Amplify for test purposes */}
        {stage &&
        !(
          stage.startsWith('prod') ||
          stage === 'master' ||
          stage === 'client-staging'
        ) ? (
          <div className={classes.devCommit}>
            {stage} {commit.substring(0, 4)}
          </div>
        ) : null}
      </Fragment>
    </Provider>
  );
};

export default App;
