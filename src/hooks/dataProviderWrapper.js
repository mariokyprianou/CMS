/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 16:40:42 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { useMemo } from 'react';
import { fetchEnd, fetchStart, useDataProvider, useNotify } from 'react-admin';
import { useDispatch } from 'react-redux';

const useDataProviderWrapper = () => {
  const dataProvider = useDataProvider();
  const dispatch = useDispatch();
  const notify = useNotify();

  const dataProviderWrapperProxy = useMemo(
    () => async ({ type, resource, payload, onSuccess, onFailure }) => {
      //   begin the call to the dataprovider
      dispatch(fetchStart());
      return dataProvider(type, resource, payload)
        .then((result) => {
          dispatch(fetchEnd());
          if (onSuccess) return onSuccess(result);
        })
        .catch((error) => {
          console.error('[DataProviderWrapper]', error);
          dispatch(fetchEnd());
          if (onFailure) onFailure(error);
          if (error.graphQLError) {
            const {
              extensions: { code },
              message,
            } = error.graphQLErrors[0];
            if (code !== 'INTERNAL_SERVER_ERROR') {
              return notify(message, 'warning');
            }
          }
          return notify('error.generic', 'warning');
        });
    },
    [dataProvider, dispatch]
  );
  return dataProviderWrapperProxy;
};

export default useDataProviderWrapper;
