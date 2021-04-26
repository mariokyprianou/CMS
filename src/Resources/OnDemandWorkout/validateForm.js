/*
 * Created Date: Thu, 22nd Apr 2021, 14:53:01 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

export default (values) => {
  const errors = {
    exercises: [{}],
  };
  if (values.isContinuous && values.exercises) {
    for (let i = 0; i < values.exercises.length; i++) {
      const exercise = values.exercises[i];
      // check that the exercise type is time based if it's continuous
      if (exercise) {
        errors.exercises.splice(i, 0, {
          sets: [],
        });
        if (exercise.setType && exercise.setType === 'REPS') {
          errors.exercises[i].setType =
            'error.form.workout.continuous.wrongsetType';
        }
        // check that there's only 1 set if it's continuous
        if (exercise.sets && exercise.sets.length > 1) {
          errors.exercises[i].sets['FINAL_FORM/array-error'] =
            'error.form.workout.continuous.oneSetPerExercise';
        }
      }
    }
  }
  return errors;
};
