/*
 * Jira Ticket: PDL-365
 * Created Date: Mon, 30th Nov 2020, 14:56:49 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { Fragment } from 'react';
import {
  ArrayInput,
  Create,
  required,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from 'react-admin';
import { columnStyles } from 'styles';

// TODO: Make it show, update Inputs
const HelpMeChooseCreate = (props) => {
  const classes = columnStyles();
  return (
    <Create {...props}>
      <SimpleForm>
        <ArrayInput source="helpMeChoose">
          <SimpleFormIterator>
            <Fragment>
              {/* 1st Row - Question (English / Hindi / Urdu) */}
              <div>Question</div>
              <div className={classes.root}>
                <div className={classes.column}>
                  <TextInput source="question" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="question" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="question" validate={required()} />
                </div>
              </div>

              {/* 2nd Row - Answer (English) */}
              <div>Answers</div>
              <div className={classes.root}>
                <div className={classes.column}>
                  <TextInput source="answer1" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer2" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer3" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer4" validate={required()} />
                </div>
              </div>
              {/* 3rd Row - Answer (Hindi) */}
              <div className={classes.root}>
                <div className={classes.column}>
                  <TextInput source="answer1" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer2" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer3" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer4" validate={required()} />
                </div>
              </div>
              {/* 4th Row - Answer (Urdu) */}
              <div className={classes.root}>
                <div className={classes.column}>
                  <TextInput source="answer1" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer2" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer3" validate={required()} />
                </div>
                <div className={classes.column}>
                  <TextInput source="answer4" validate={required()} />
                </div>
              </div>

              <div>Trainer Scores</div>
              {/* 5th Row - Trainer Scores */}
              <div className={classes.root}>
                <div className={classes.column}>
                  <NumberInput
                    source="answer1"
                    min={0}
                    max={100}
                    validate={required()}
                  />
                </div>
                <div className={classes.column}>
                  <NumberInput
                    source="answer2"
                    min={0}
                    max={100}
                    validate={required()}
                  />
                </div>
                <div className={classes.column}>
                  <NumberInput
                    source="answer3"
                    min={0}
                    max={100}
                    validate={required()}
                  />
                </div>
                <div className={classes.column}>
                  <NumberInput
                    source="answer4"
                    min={0}
                    max={100}
                    validate={required()}
                  />
                </div>
              </div>
              {/* TODO: need to repeat the 'Trainer Scores' section for each trainer */}
            </Fragment>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default HelpMeChooseCreate;
