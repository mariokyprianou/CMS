/*
 * Jira Ticket:
 * Created Date: Wed, 16th Dec 2020, 10:40:18 am
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, { Fragment, useEffect, useState } from 'react';
import {
  required,
  NumberInput,
  TextInput,
  useNotify,
  useTranslate,
} from 'react-admin';
import useDataProviderWrapper from 'hooks/dataProviderWrapper';
import LocalisedComponentCloner from 'Components/LocalisedComponentCloner';
import { programmeEnvironmentChoices } from 'utils/choices';
import { getLocalisedFieldByLanguage } from 'utils';
import { nonNegativeInt } from 'utils/validation';
import { columnStyles } from 'styles';

const orderIndexValidation = [required(), nonNegativeInt];

const HelpMeChooseForm = (props) => {
  const { resource } = props;
  const translate = useTranslate();
  const classes = columnStyles();
  const callToDataProvider = useDataProviderWrapper();
  const notify = useNotify();
  const [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    const getTrainers = () => {
      return callToDataProvider({
        type: 'GET_LIST',
        resource: 'programme',
        payload: {
          pagination: { page: 1, perPage: 1000 },
          sort: { field: 'name', order: 'DESC' },
        },
        onSuccess: (result) => {
          if (isSubscribed) {
            setProgrammes([...result.data]);
          }
        },
      }).catch((error) => notify(error.message, 'warning'));
    };
    getTrainers();
    return () => (isSubscribed = false);
  }, [callToDataProvider, notify]);

  return (
    <Fragment>
      <NumberInput
        resource={resource}
        source="orderIndex"
        validate={orderIndexValidation}
      />
      {/* Questions */}
      <div>{translate(`resources.${resource}.fields.questions`)}</div>
      <LocalisedComponentCloner
        fullWidth
        component={<TextInput multiline validate={required()} />}
        source="question"
        resource={resource}
      />
      {/* Answers */}
      <div>{translate(`resources.${resource}.fields.answers`)}</div>
      <div className={classes.root}>
        <div className={classes.column}>
          <LocalisedComponentCloner
            fullWidth
            component={<TextInput validate={required()} />}
            source="answer1"
            resource={resource}
          />
        </div>
        <div className={classes.column}>
          <LocalisedComponentCloner
            fullWidth
            component={<TextInput validate={required()} />}
            source="answer2"
            resource={resource}
          />
        </div>
        <div className={classes.column}>
          <LocalisedComponentCloner
            fullWidth
            component={<TextInput validate={required()} />}
            source="answer3"
            resource={resource}
          />
        </div>
        <div className={classes.column}>
          <LocalisedComponentCloner
            fullWidth
            component={<TextInput validate={required()} />}
            source="answer4"
            resource={resource}
          />
        </div>
      </div>
      {/* Trainer Programme Scores */}
      {programmes.map((programme) => {
        return (
          <Fragment key={programme.id}>
            <div>
              {translate(`resources.${resource}.fields.trainerScores`, {
                trainerName: getLocalisedFieldByLanguage({
                  source: 'name',
                  localisations: programme.trainer.localisations,
                }),
                programmeEnv: translate(
                  programmeEnvironmentChoices.find(
                    (choice) => choice.id === programme.environment
                  ).name
                ),
              })}
            </div>
            <div className={classes.root}>
              <div className={classes.column}>
                <NumberInput
                  source={`${programme.id}_answer1Score`}
                  label={`resources.${resource}.fields.answer1Score`}
                  min={0}
                  max={100}
                  validate={required()}
                />
              </div>
              <div className={classes.column}>
                <NumberInput
                  label={`resources.${resource}.fields.answer2Score`}
                  source={`${programme.id}_answer2Score`}
                  min={0}
                  max={100}
                  validate={required()}
                />
              </div>
              <div className={classes.column}>
                <NumberInput
                  label={`resources.${resource}.fields.answer3Score`}
                  source={`${programme.id}_answer3Score`}
                  min={0}
                  max={100}
                  validate={required()}
                />
              </div>
              <div className={classes.column}>
                <NumberInput
                  label={`resources.${resource}.fields.answer4Score`}
                  source={`${programme.id}_answer4Score`}
                  min={0}
                  max={100}
                  validate={required()}
                />
              </div>
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};
export default HelpMeChooseForm;
