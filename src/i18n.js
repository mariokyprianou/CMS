import polyglotI18nProvider from 'ra-i18n-polyglot';
import raEnglishMessages from 'ra-language-english';

const englishMessages = {
  ...raEnglishMessages,
  authentication: {
    login: {
      submit: 'Login',
      forgotPassword: 'Forgot password?',
      username: 'Username',
    },
    forgotPassword: {
      submit: 'Submit',
      email: 'Email',
      cardContent:
        'Please enter your email address above.\nYou will receive an email with a code that you can redeem to reset your password.',
      verification: 'Verification Code',
      verificationCardContent:
        'We just sent you an email with a verification code attached.\nPlease enter this here and type your new password below to reset.',
      newPassword: 'New Password',
    },
    changePassword: {
      password: 'Password',
      submit: 'Change password',
      cardContent: 'Please change your password to continue signing in.',
    },
    changePassword: {
      verificationCode: 'Verification Code',
      newPassword: 'New Password',
      cardContent:
        'We just sent you an email with a verification code attached.\nPlease enter this here and type your new password below to reset.',
      submit: 'Reset Password',
    },
    forceChangePassword: {
      cardContent: 'Please change your password to continue signing in.',
      submit: 'Change Password',
    },
  },
  resources: {
    user: {
      name: 'User |||| Users',
      titles: {
        userManagement: 'User Management',
      },
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        country: 'Country',
        country: {
          id: 'Country',
        },
        region: 'Region',
        region: {
          id: 'Region',
        },
        timeZone: 'Time Zone',
        previousTrainers: 'Previous Trainers',
        deviceLimitEnabled: '30-day Device Limit',
        subscription: {
          isSubscribed: 'Subscribed?',
          type: 'Subscription Type',
          emailMarketing: 'Email Marketing Preference',
          platform: 'Subscriber Platform',
        },
        currentWeek: 'Current Week',
        currentTrainingProgramme: {
          id: 'Current Programme',
          name: 'Current Programme',
        },
      },
    },
    administrator: {
      name: 'Administrator |||| Administrators',
      titles: {
        administratorManagement: 'Administrator Management',
        createAdministrator: 'Create Administrator',
      },
      fields: {
        name: 'Name',
        email: 'Email',
      },
    },
    trainer: {
      name: 'Trainer |||| Trainers',
      titles: {
        trainerManagement: 'Trainer Management',
      },
      fields: {
        locale: 'Locale',
        name: 'Trainer Name',
        trainerEnglish: 'Trainer (English)',
        trainerHindi: 'Trainer (Hindi)',
        trainerUrdu: 'Trainer (Urdu)',
        trainer: 'Trainer',
      },
    },
    programme: {
      name: 'Programme |||| Programmes',
      titles: {
        programmeManagement: 'Programme Management',
      },
      tabs: {
        details: 'Details',
        workouts: 'Workouts',
        exercises: 'Exercises',
        challenges: 'Challenges',
        shareMedia: 'Share Media',
      },
      fields: {
        name: 'Name',
        fitness: 'Fitness',
        muscle: 'Muscle',
        fatLoss: 'Fat Loss',
        wellness: 'Wellness',
        weeksAvailable: 'Number of Weeks Available',
        weeksAvailableHelperText: 'Display purposes only',
        environment: 'Environment',
        subscribers: 'Current Subscribers',
        trainerImages: 'Trainer Preview Images',
        description: 'Trainer Description',
        textColour: 'Text Colour',
        programmeStartImage: 'Programme Start Image',
        weekCompleteImage1: 'Week Complete - Image 1',
        weekCompleteImage2: 'Week Complete - Image 2',
        weekCompleteImage3: 'Week Complete - Image 3',
        challengeCompleteImage1: 'Challenge Complete - Image 1',
        challengeCompleteImage2: 'Challenge Complete - Image 2',
        progressImage: 'Progress Image',
        trainerName: 'Trainer',
        trainer: {
          id: 'Trainer',
        },
      },
    },
    challenge: {
      name: 'Challenge |||| Challenges',
      fields: {
        name: 'Challenge Name',
        fieldTitle: 'Challenge Field Title',
        fieldDescription: 'Challenge Description',
        unitType: 'Unit Type',
      },
    },
    exerciseCategory: {
      name: 'Exercise Category |||| Exercise Categories',
      titles: {
        exerciseCategoryManagement: 'Exercise Category Management',
      },
      fields: {
        name: 'Category Name',
      },
    },
    configuration: {
      name: 'Configuration',
      fields: {
        name: 'Category Name',
        termsAndConditions: 'Terms and Conditions',
        privacyPolicy: 'Privacy Policy',
        orderIndex: 'Order Index',
        title: 'Title',
        body: 'Body',
        description: 'Description',
        image: 'Onboarding Image',
        type: 'Notification Type',
        notifications: 'Notification Templates',
        onboardings: 'Onboarding Screens',
      },
    },
    exercise: {
      name: 'Exercise |||| Exercises',
      titles: {
        exerciseManagement: 'Exercise Management',
      },
      fields: {
        trainer: 'Trainer',
        trainerRequired: 'Trainer *',
        name: 'Name',
        weight: 'Weight',
        exerciseCategory: 'Exercise Category',
        category: {
          id: 'Exercise Category',
        },
        coachingTips: 'Coaching Tips',
        video: 'Main Video',
        videoEasy: 'Easier Video 1 (Optional)',
        videoEasiest: 'Easier Video 2 (Optional)',
      },
    },
    feedback: {
      name: 'Feedback |||| Workout Feedback',
      titles: {
        feedback: 'Feedback',
      },
      fields: {
        trainerName: 'Trainer',
        week: 'Week',
        workoutName: 'Session',
        programme: 'Programme',
        emojis: 'Emoji',
        userEmail: 'User',
        timeTaken: 'Time Taken',
        feedbackIntensity: 'Workout Intensity',
        workoutIntensity: 'Workout Intensity',
        dateTo: 'Date To',
        dateFrom: 'Date From',
      },
    },
    notification: {
      name: 'Notification |||| Notifications',
      titles: {
        notificationManagement: 'Notification Management',
      },
      fields: {},
    },
    helpMeChoose: {
      name: 'Help Me Choose |||| Help Me Choose',
      titles: {
        helpMeChooseManagement: 'Help Me Choose Management',
      },
      fields: {
        question: 'Question',
        orderIndex: 'Order Index',
        answer1: 'Answer 1',
        answer2: 'Answer 2',
        answer3: 'Answer 3',
        answer4: 'Answer 4',
        answer1Score: 'Answer 1 Score',
        answer2Score: 'Answer 2 Score',
        answer3Score: 'Answer 3 Score',
        answer4Score: 'Answer 4 Score',
        questions: 'Questions',
        answers: 'Answers',
        trainerScores: 'Trainer Scores (%{trainerName} - %{programmeEnv})',
      },
    },
    workout: {
      name: 'Workout |||| Workouts',
      titles: {
        workoutManagement: 'Workout Management',
      },
      fields: {
        trainer: 'Trainer',
        name: 'Workout Title',
        programme: {
          environment: 'Programme',
        },
        trainingProgrammeId: 'Training Programme',
        orderIndex: 'Order Index',
        workout: {
          duration: 'Duration (Minutes)',
          intensity: 'Intensity',
          exercises: 'Exercises *',
          overviewImage: 'Workout Header Image (Optional)',
          isContinuous: 'Continuous',
        },
        exercise: 'Exercise',
        exercises: 'Exercises',
        exerciseRequired: 'Exercise *',
        exercisesRequired: 'Exercises *',
        set: 'Set',
        sets: 'Sets',
        work: 'Work',
        setType: 'Set Type',
        additionalTrainerInfo: 'Additional Trainer Info',
        restTime: 'Rest Time (Optional)',
        weekNumber: 'Week',
      },
    },
  },
  choices: {
    booleanTranslated: {
      true: 'Yes',
      false: 'No',
    },
    subscriptionPlatform: {
      android: 'Android',
      ios: 'iOS',
      no: 'No',
    },
    programmeEnvironment: {
      home: 'Home',
      gym: 'Gym',
    },
    textColour: {
      white: 'White',
      black: 'Black',
    },
    challenge: {
      type: {
        countdown: 'Countdown',
        stopwatch: 'Stopwatch',
        other: 'Other',
      },
      unitType: {
        weight: 'Weight',
        reps: 'Reps',
        distance: 'Distance',
      },
    },
    exerciseVideoDifficulty: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    },
    workoutExerciseType: {
      repetitions: 'Repetitions',
      timeInterval: 'Time Interval',
    },
    publishStatus: {
      published: 'Published',
      draft: 'Draft',
    },
    intensity: {
      low: 'Low',
      mod: 'Moderate',
      high: 'High',
    },
    exerciseType: {
      reps: 'Repetitions',
      time: 'Time',
    },
    subscription: {
      auto: 'Automatic',
      manual: 'Manual',
    },
    notificationType: {
      threeDaysNoTraining: 'Trigger: 3 days without training',
      twoWeeksNoActivity: 'Trigger: 2 weeks without opening the app',
      sevenDaysNoLogging: 'Trigger: 7 days without logging a challenge',
      newTrainer: 'Trigger: New trainer added',
      newChallenge: 'Trigger: New challenge added',
      endOfWorkoutWeek: 'Trigger: At the end of every completed workout week',
    },
    onboardingscreens: {
      title1: 'Screen 1',
      title2: 'Screen 2',
      title3: 'Screen 3',
      title4: 'Screen 4',
    },
    feedback: {
      intensity: {
        oneToFive: '1 - 5',
        fiveToTen: '5 - 10',
        tenToFifteen: '10 - 15',
        fifteenToTwenty: '15 - 20',
      },
    },
  },
  notification: {
    auth: {
      passwdResetSent: 'Reset password request sent',
      passwdChanged: 'Password changed successfully',
    },
    user: {
      currentLimit: 'Device switching disabled until:  %{countDown}',
      deviceLimitEnabled: 'User will not be able to switch devices for 30 days',
      deviceLimitDisabled: 'User may switch devices',
    },
  },
  error: {
    accessDenied: 'Access Denied',
    generic: 'Oops! Something went wrong. Please try again',
    auth: {
      invalidCredentials:
        'The email and password combination is not recognised. Please re-enter and try again.',
      passwdChangeUnsuccessful: 'Password change unsuccessful',
      resetPwdFailure: 'Unable to reset password: %{errMsg}',
      unableToLogin: 'Unable to login. Please try again',
      accessDenied: 'You need to sign in to access that page',
    },
    permissions: {
      title: 'Access Denied',
      header: 'You do not have the required permissions to view this page',
      subtitle: 'Contact your administrator for necessary permissions',
    },
    form: {
      multiLang: {
        missingField:
          'The "%{source}" field is not complete for the %{language} translation',
        noLocalisations: 'Must have at least one defined localisation',
      },
      helpMeChoose: {
        missingTrainers: 'No Trainer Programmes found',
      },
      workout: {
        continuous: {
          oneSetPerExercise:
            'Only one set per exercise allowed for continuous workouts',
          wrongsetType: 'Only time based sets allowed for continuous workouts',
        },
      },
    },
    field: {
      image: {
        notFound: 'Image not found',
        maxFilesExceeded: 'No more than %{maxFiles} images allowed',
      },
      file: {
        notFound: 'File not found',
      },
    },
    fileUpload: {
      fileTooBig: 'File %{filename} is larger than %{maxSize}',
      fileWrongType:
        'File %{filename} is not one of accepted types %{allowedFileTypes}',
      unknownRejection: 'Unable to upload file %{filename}',
    },
  },
  validation: {
    passwdSpecial: 'Password must contain a special character',
    passwdNumber: 'Password must contain a number',
    passwdLower: 'Password must contain a lowercase character',
    passwdUpper: 'Password must contain an uppercase character',
    passwdMinLen: 'Password must be at least 8 characters',
    passwdMaxLen: 'Password must be no more than 99 characters',
    invalidEmail: 'Invalid email format',
    invalidPhone: 'Not a valid phone number of the form +17895551234',
    invalidUrl: 'Invalid URL format',
    notAnInt: 'Not an integer',
    positivieNonZeroInt: 'Please enter a number greater than 0',
    positivieInt: 'Please enter a positive integer',
  },
  util: {
    seconds: 'seconds',
    minutes: 'minutes',
    reps: 'repetitions',
  },
};

const i18nProvider = polyglotI18nProvider((locale) => englishMessages, 'en', {
  allowMissing: true,
});

export { englishMessages };

export default i18nProvider;
