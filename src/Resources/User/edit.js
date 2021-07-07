/*
 * Jira Ticket: PDL-270
 * Created Date: Mon, 23rd Nov 2020, 14:24:39 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import {
  BooleanInput,
  Edit,
  FormDataConsumer,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
  useTranslate,
} from 'react-admin';
import { useForm } from 'react-final-form';
import { TextField as MuiTextField } from '@material-ui/core';
import { NoScrollNumberInput as NumberInput } from 'Components/Inputs';
import { ActionButton } from 'Components/Buttons';
import { makeStyles } from '@material-ui/core/styles';
import {
  LocalisedReferenceInput,
  LocalisedReferenceArrayInput,
} from 'Components/Inputs';
import { columnStyles } from 'styles';
import {
  subscriptionPlatformChoices,
  subscriptionChoices,
  allTimeZones,
  programmeEnvironmentChoices,
  booleanTranslatedChoices,
} from 'utils/choices';
import { nonNegativeNonZeroInt, isValidEmail } from 'utils/validation';
import useDataProviderWrapper from 'hooks/dataProviderWrapper';

const nonNegativeNonZeroIntValidation = [required(), nonNegativeNonZeroInt];
const emailValidation = [required(), isValidEmail];

const useStyles = makeStyles({
  root: {
    marginBottom: 20,
  },
});

const SanitizedForm = ({ basePath, classes, ...props }) => {
  const notify = useNotify();
  const translate = useTranslate();
  const callToDataProvider = useDataProviderWrapper();
  const form = useForm();
  const { id, resource, record } = props;
  const selectClasses = useStyles(props);
  const [isLoading, setLoading] = useState(false);

  const helperString = (formData) => {
    if (formData && formData.deviceLimitEnabled) {
      // device limit is enabled (no changing of device for 30 days)
      var countDown = new Date();
      if (!record.deviceLimitEnabled) {
        return 'notification.user.deviceLimitEnabled';
      } else {
        // current limit
        var countDown = new Date(record.deviceLimit);
        return translate('notification.user.currentLimit', { countDown });
      }
    } else {
      // device limit disabled - user will be able to switch
      return 'notification.user.deviceLimitDisabled';
    }
  };

  const unblockUser = () => {
    try {
      setLoading(true); //disable the Unblock User button
      return callToDataProvider({
        type: 'UNBLOCK',
        resource: 'user',
        payload: { id },
        onSuccess: ({ data }) => {
          form.change('isBlocked', data.isBlocked);
          setLoading(false);
        },
        onFailure: (_) => {
          setLoading(false);
        },
      });
    } catch (error) {
      return notify(
        error.message,
        'warning',
        error.payload,
        error.undoable,
        error.timeout
      );
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <TextInput
          resource={resource}
          source="firstName"
          validate={required()}
        />
        <TextInput
          resource={resource}
          source="lastName"
          validate={required()}
        />
        <TextInput
          resource={resource}
          multiline
          source="email"
          validate={emailValidation}
        />
        <ReferenceInput
          resource={resource}
          reference="country"
          source="country.id"
          perPage={500}
          sort={{ field: 'name', order: 'ASC' }}
        >
          <SelectInput optionText="country" />
        </ReferenceInput>
        <SelectInput
          resource={resource}
          source="timeZone"
          choices={allTimeZones}
          validate={required()}
        />
      </div>
      <div className={classes.column}>
        <LocalisedReferenceInput
          resource={resource}
          source="currentTrainingProgramme.id"
          reference="programme"
          localisationsPath="trainer.localisations"
          additionalChoices={programmeEnvironmentChoices}
          additionalChoiceComparisonField="environment"
          validate={required()}
          disabled={true}
        >
          <SelectInput />
        </LocalisedReferenceInput>
        <NumberInput
          resource={resource}
          source="currentWeek"
          validate={nonNegativeNonZeroIntValidation}
        />
        <LocalisedReferenceArrayInput
          language="en"
          source="previousTrainers"
          reference="trainer"
          disabled
          resource={resource}
        >
          <SelectArrayInput />
        </LocalisedReferenceArrayInput>
        <SelectInput
          resource={resource}
          source="emailMarketing"
          choices={booleanTranslatedChoices}
          disabled
        />
        <FormDataConsumer>
          {({ formData }) => (
            <BooleanInput
              resource={resource}
              source="deviceLimitEnabled"
              helperText={helperString(formData)}
            />
          )}
        </FormDataConsumer>
      </div>
      <div className={classes.column}>
        <FormDataConsumer>
          {({ formData }) =>
            formData.subscription ? (
              <>
                <SelectInput
                  resource={resource}
                  source="subscription.isActive"
                  choices={subscriptionChoices}
                  disabled={true}
                />
                <SelectInput
                  resource={resource}
                  source="subscription.platform"
                  choices={subscriptionPlatformChoices}
                  disabled={true}
                />
              </>
            ) : (
              <MuiTextField
                label={translate('resources.user.fields.subscription.isActive')}
                value={translate('choices.subscription.noSub')}
                disabled={true}
                className={selectClasses.root}
                variant="filled"
                margin="dense"
              />
            )
          }
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData }) => (
            <BooleanInput
              resource={resource}
              source="isManuallySubscribed"
              className={selectClasses.root}
              helperText={translate(
                'resources.user.fields.isManuallySubscribedHelperText',
                {
                  action: formData.isManuallySubscribed
                    ? translate('actions.subscription.deactivate')
                    : translate('actions.subscription.activate'),
                }
              )}
            />
          )}
        </FormDataConsumer>
        <FormDataConsumer>
          {({ formData }) => (
            <ActionButton
              label={'resources.user.actions.unblockUser'}
              disabled={!(formData.isBlocked && !isLoading)}
              onClick={() => unblockUser()}
            />
          )}
        </FormDataConsumer>
      </div>
    </div>
  );
};

const UserEdit = (props) => {
  const classes = columnStyles();
  return (
    <Edit mutationMode="pessimistic" {...props}>
      <SimpleForm>
        <SanitizedForm classes={classes} {...props} />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
