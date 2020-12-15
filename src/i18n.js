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
        'Please enter your email address above. You will receive an email with a code that you can redeem to reset your password.',
      verification: 'Verification Code',
      verificationCardContent:
        'We just sent you an email with a verification code attached. Please enter this here and type your new password below to reset.',
      newPassword: 'New Password',
    },
    changePassword: {
      password: 'Password',
      submit: 'Change password',
      cardContent: 'Please change your password to continue signing in.',
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
        weekCompleteImage: 'Week Complete Image',
        challengeCompleteImage: 'Challenge Complete Image',
        progressImage: 'Progress Image',
        trainerName: 'Trainer',
        trainer: {
          id: 'Trainer',
        },
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
      },
    },
    exercise: {
      name: 'Exercise |||| Exercises',
      titles: {
        exerciseManagement: 'Exercise Management',
      },
      fields: {
        trainer: 'Trainer',
        name: 'Name',
        nameEnglish: 'Name (English)',
        nameHindi: 'Name (Hindi)',
        nameUrdu: 'Name (Urdu)',
        coachingTipsEnglish: 'Coaching Tips (English)',
        coachingTipsHindi: 'Coaching Tips (Hindi)',
        coachingTipsUrdu: 'Coaching Tips (Urdu)',
        videoHard: 'Main Video',
        videoMedium: 'Easy Video',
        videoEasy: 'Easier Video',
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
      fields: {},
    },
    workout: {
      name: 'Workout |||| Workouts',
      titles: {
        workoutManagement: 'Workout Management',
      },
      fields: {},
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
  },
  error: {
    generic: 'Oops! Something went wrong. Please try again',
    permissions: {
      title: 'Access Denied',
      header: 'You do not have the required permissions to view this page',
      subtitle: 'Contact your administrator for necessary permissions',
    },
  },
};

const i18nProvider = polyglotI18nProvider((locale) => englishMessages, 'en', {
  allowMissing: true,
});

export { englishMessages };

export default i18nProvider;
