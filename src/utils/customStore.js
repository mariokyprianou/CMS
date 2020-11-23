/*
 * Jira Ticket:
 * Created Date: Mon, 12th Aug 2019, 10:46:47 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import {
  adminReducer,
  adminSaga,
  defaultI18nProvider,
  USER_LOGOUT,
} from 'react-admin';

export default ({
  authProvider,
  dataProvider,
  customReducers = {},
  customSagas = [],
  i18nProvider = defaultI18nProvider,
  initialState,
  history,
}) => {
  const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    ...customReducers,
  });

  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all(
      [adminSaga(dataProvider, authProvider, i18nProvider), ...customSagas].map(
        fork
      )
    );
  };
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    resettableAppReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, routerMiddleware(history)),
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
  sagaMiddleware.run(saga);
  return store;
};
