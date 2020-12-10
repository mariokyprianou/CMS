/*
 * Jira Ticket: PDL-270
 * Created Date: Mon, 23rd Nov 2020, 14:24:39 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {
  BooleanInput,
  Edit,
  FormDataConsumer,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useTranslate,
} from 'react-admin';
import { columnStyles } from 'styles';
import { getLocalisedFieldByLanguage } from 'utils';
import {
  programmeEnvironmentChoices,
  subscriptionPlatformChoices,
  countryChoices,
  regionChoices,
  timeZoneChoices,
} from 'utils/choices';

const TrainerChoices = ({
  choices,
  language = 'en',
  localisedFieldSource,
  ...props
}) => {
  const enChoices = choices.map((choice) => {
    return {
      ...choice,
      enName: getLocalisedFieldByLanguage({
        language,
        localisations: choice.localisations,
        source: localisedFieldSource,
      }),
    };
  });
  return (
    <SelectArrayInput {...props} optionText="enName" choices={enChoices} />
  );
};

const ProgrammeChoices = ({
  choices,
  language = 'en',
  localisedFieldSource,
  ...props
}) => {
  const { translate } = props;
  const trainerProgrammeChoices = choices.map((choice) => {
    return {
      ...choice,
      programmeName: `${getLocalisedFieldByLanguage({
        language,
        localisations: choice.trainer.localisations,
        source: localisedFieldSource,
      })} - ${translate(
        programmeEnvironmentChoices
          .filter((programmeEnv) => programmeEnv.id === choice.environment)
          .map((env) => env.name)[0]
      )}`,
    };
  });
  return (
    <SelectInput
      {...props}
      optionText="programmeName"
      choices={trainerProgrammeChoices}
    />
  );
};

const SanitizedForm = ({ basePath, classes, translate, ...props }) => {
  const { resource } = props;
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
        <TextInput resource={resource} source="email" validate={required()} />
        {/* TODO: probably needs to be a referenceinput */}
        <SelectInput
          resource={resource}
          source="country"
          choices={countryChoices}
          validate={required()}
        />
        <FormDataConsumer>
          {({ formData }) =>
            formData.country === 'India' && (
              // TODO: probably needs to be a referenceinput
              <SelectInput
                resource={resource}
                source="region"
                choices={regionChoices}
                validate={required()}
              />
            )
          }
        </FormDataConsumer>
        <BooleanInput
          resource={resource}
          label="resources.user.fields.subscription.isSubscribed"
          source="subscription.isSubscribed"
          disabled
        />
        <SelectInput
          resource={resource}
          label="resources.user.fields.subscription.platform"
          source="subscription.platform"
          choices={subscriptionPlatformChoices}
        />
      </div>
      <div className={classes.column}>
        {/* TODO: may need to support empty values */}
        <ReferenceInput
          resource={resource}
          source="currentTrainerProgram.id"
          reference="programme"
          validate={required()}
        >
          <ProgrammeChoices
            langauge="en"
            localisedFieldSource="name"
            translate={translate}
          />
        </ReferenceInput>
        {/* TODO: add currentWeek validation, int > 0 */}
        <NumberInput
          resource={resource}
          source="currentTrainerProgram.currentWeek"
          validate={required()}
          min={1}
        />
        <ReferenceArrayInput
          resource={resource}
          reference="trainer"
          source="previousTrainers"
          disabled
        >
          <TrainerChoices langauge="en" localisedFieldSource="name" />
        </ReferenceArrayInput>
        <BooleanInput resource={resource} source="canChangeDevice" />
        {/* TODO: probably needs to be a referenceinput */}
        <SelectInput
          resource={resource}
          source="timeZone"
          choices={timeZoneChoices}
          validate={required()}
        />
      </div>
    </div>
  );
};

const UserEdit = (props) => {
  const classes = columnStyles();
  const translate = useTranslate();
  return (
    <Edit {...props}>
      <SimpleForm>
        <SanitizedForm classes={classes} translate={translate} />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
