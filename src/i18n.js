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
      name: 'User Management |||| User Management',
      fields: {
        givenName: 'First Name',
        familyName: 'Last Name',
        email: 'Email',
        country: 'Country',
        region: 'Region',
        timeZone: 'Time Zone',
        subscription: {
          isSubscribed: 'Marketing',
          platform: 'Subscriber',
        },
      },
    },
    administrator: {
      name: 'Admin Management |||| Admin Management',
      titles: {
        createAdministrator: 'Create Administrator',
      },
      fields: {
        name: 'Name',
        email: 'Email',
      },
    },
    trainer: {
      name: 'Trainer |||| Trainers',
      fields: {
        locale: 'Locale',
        name: 'Name',
        trainerEnglish: 'Trainer (English)',
        trainerHindi: 'Trainer (Hindi)',
        trainerUrdu: 'Trainer (Urdu)',
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
