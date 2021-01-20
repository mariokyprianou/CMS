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
        region: 'Region',
        timeZone: 'Time Zone',
        previousTrainers: 'Previous Trainers',
        canChangeDevice: '30-day Device Limit',
        subscription: {
          isSubscribed: 'Email Marketing Preference',
          platform: 'Subscriber Status',
        },
        currentTrainerProgram: {
          id: 'Current Programme',
          currentWeek: 'Current Week',
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
        workoutIntensity: 'Workout Intensity',
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
        duration: 'Duration (Minutes)',
        overviewImage: 'Workout Header Image (Optional)',
        additionalTrainerInfo: 'Additional Trainer Info',
        setType: 'Set Type',
        restTime: 'Rest Time (Optional)',
        set: 'Set',
        exercise: 'Exercise *',
        work: 'Work',
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
    challengeType: {
      countdown: 'Countdown',
      stopwatch: 'Stopwatch',
      other: 'Other',
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
  },
  notification: {
    auth: {
      passwdResetSent: 'Reset password request sent',
      passwdChanged: 'Password changed successfully',
    },
  },
  error: {
    generic: 'Oops! Something went wrong. Please try again',
    auth: {
      invalidCredentials:
        'The email and password combination is not recognised. Please re-enter and try again.',
      passwdChangeUnsuccessful: 'Password change unsuccessful',
      resetPwdFailure: 'Unable to reset password: %{errMsg}',
      unableToLogin: 'Unable to login. Please try again',
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
