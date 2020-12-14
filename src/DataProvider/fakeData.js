/*
 * Jira Ticket: PDL-269, PDL-270
 * Created Date: Mon, 23rd Nov 2020, 14:24:39 pm
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

export default {
  user: [
    {
      id: '1',
      firstName: 'Logan',
      lastName: 'Schowalter',
      email: 'logan@grr.la',
      country: 'UK',
      region: null,
      timeZone: 'UTC +2',
      canChangeDevice: true,
      subscription: {
        isSubscribed: false,
        platform: null,
      },
      previousTrainers: ['2'],
      currentTrainerProgram: {
        id: '1',
        currentWeek: 1,
      },
    },
    {
      id: '2',
      firstName: 'Gabby',
      lastName: 'Doodoo',
      email: 'gabby@grr.la',
      country: 'UK',
      region: null,
      timeZone: 'UTC +0',
      canChangeDevice: false,
      subscription: {
        isSubscribed: true,
        platform: 'IOS',
      },
      currentTrainerProgram: {},
      previousTrainers: [],
    },
    {
      id: '3',
      firstName: 'Brod',
      lastName: 'Greenwood',
      email: 'brod@grr.la',
      country: 'India',
      region: 'Goa',
      timeZone: 'UTC +1',
      canChangeDevice: false,
      subscription: {
        isSubscribed: false,
        platform: 'ANDROID',
      },
      currentTrainerProgram: {
        id: '1',
        currentWeek: 1,
      },
      previousTrainers: [],
    },
    {
      id: '4',
      firstName: 'Fran',
      lastName: 'Smith',
      email: 'fran@grr.la',
      country: 'India',
      region: null,
      timeZone: 'UTC +0',
      canChangeDevice: true,
      subscription: {
        isSubscribed: true,
        platform: 'IOS',
      },
      currentTrainerProgram: {
        id: '1',
        currentWeek: 1,
      },
      previousTrainers: [],
    },
  ],
  administrator: [
    {
      id: '1',
      name: 'Bob Daltry',
      email: 'bob@grr.la',
    },
    {
      id: '2',
      name: 'Cynthia Pleasant',
      email: 'cynthia@grr.la',
    },
  ],
  trainer: [
    {
      id: '1',
      localisations: [
        {
          language: 'en',
          name: 'Katrina',
        },
        {
          language: 'hi',
          name: 'कैटरिना',
        },
        {
          language: 'ur',
          name: 'کترینہ',
        },
      ],
    },
    {
      id: '2',
      localisations: [
        {
          language: 'en',
          name: 'Donald',
        },
        {
          language: 'hi',
          name: 'डोनाल्ड',
        },
        {
          language: 'ur',
          name: 'ڈونلڈ',
        },
      ],
    },
    {
      id: '3',
      localisations: [
        {
          language: 'en',
          name: 'Bilal',
        },
        {
          language: 'hi',
          name: 'बिलाल',
        },
        {
          language: 'ur',
          name: 'بلال',
        },
      ],
    },
  ],
  programme: [
    {
      id: '1',
      environment: 'HOME', // HOME / GYM
      subscribers: 2,
      stats: {
        fitness: 99,
        muscle: 30,
        fatLoss: 55,
      },
      trainer: {
        id: '1',
        localisations: [
          {
            language: 'en',
            name: 'Katrina',
          },
          {
            language: 'hi',
            name: 'कैटरिना',
          },
          {
            language: 'ur',
            name: 'کترینہ',
          },
        ],
      },
      images: [
        {
          id: '1',
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ZT6uWI65XnbMMN7xXpecVtb5NMKlVbim_A&usqp=CAU',
        },
      ],
      shareMediaImages: [
        {
          id: '1',
          type: 'PROGRAMME_START', // PROGRAMME_START / WEEK_COMPLETE / CHALLENGE_COMPLETE / PROGRESS
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifuo_v_EVyiH06ZwBNa6jQ_ZNL4naJ-liXg&usqp=CAU',
          textColour: '#dad',
        },
      ],
      localisations: [
        {
          id: '1',
          locale: 'en',
          description: '(E) Train with your icon, Katrina!',
        },
        {
          id: '2',
          locale: 'hi',
          description: '(H) Train with your icon, Katrina!',
        },
        {
          id: '3',
          locale: 'ur',
          description: '(U) Train with your icon, Katrina!',
        },
      ],
    },
    {
      id: '2',
      environment: 'GYM', // HOME / GYM
      subscribers: 2,
      stats: {
        fitness: 99,
        muscle: 30,
        fatLoss: 55,
      },
      trainer: {
        id: '1',
        localisations: [
          {
            language: 'en',
            name: 'Katrina',
          },
          {
            language: 'hi',
            name: 'कैटरिना',
          },
          {
            language: 'ur',
            name: 'کترینہ',
          },
        ],
      },
      images: [
        {
          id: '1',
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ZT6uWI65XnbMMN7xXpecVtb5NMKlVbim_A&usqp=CAU',
        },
      ],
      shareMediaImages: [
        {
          id: '1',
          type: 'PROGRAMME_START', // PROGRAMME_START / WEEK_COMPLETE / CHALLENGE_COMPLETE / PROGRESS
          url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifuo_v_EVyiH06ZwBNa6jQ_ZNL4naJ-liXg&usqp=CAU',
          textColour: '#dad',
        },
      ],
      localisations: [
        {
          id: '1',
          locale: 'en',
          description: '(E) Train with your icon, Katrina!',
        },
        {
          id: '2',
          locale: 'hi',
          description: '(H) Train with your icon, Katrina!',
        },
        {
          id: '3',
          locale: 'ur',
          description: '(U) Train with your icon, Katrina!',
        },
      ],
    },
  ],
  challenge: [
    {
      id: '1',
      type: 'COUNTDOWN',
      localisations: [
        {
          id: '1',
          locale: 'en',
          name: '(E) 50 x Squats',
          description: '(E) Do 50 squats in 1 minute',
          fieldLabel: '(E) field label here',
        },
        {
          id: '2',
          locale: 'hi',
          name: '(H) 50 x Squats',
          description: '(H) Do 50 squats in 1 minute',
          fieldLabel: '(H) field label here',
        },
        {
          id: '3',
          locale: 'ur',
          name: '(U) 50 x Squats',
          description: '(U) Do 50 squats in 1 minute',
          fieldLabel: '(U) field label here',
        },
      ],
    },
  ],
  exerciseCategory: [
    {
      id: '1',
      name: 'Lunges',
    },
    {
      id: '2',
      name: 'Squats',
    },
    {
      id: '3',
      name: 'Bicep Curls',
    },
  ],
  exercise: [
    {
      id: '1',
      isWeight: false,
      category: {
        id: '2',
        name: 'Squats',
      },
      videos: [
        {
          id: '1',
          url: 'https://www.google.co.uk',
          difficulty: 'HARD',
        },
        {
          id: '2',
          url: 'https://www.google.co.uk',
          difficulty: 'MEDIUM',
        },
        {
          id: '3',
          url: 'https://www.google.co.uk',
          difficulty: 'EASY',
        },
      ],
      localisations: [
        {
          id: '1',
          locale: 'en',
          name: '(E) Squats',
          coachingTips: "(E) Let's got for it!",
        },
        {
          id: '2',
          locale: 'hi',
          name: '(H) Squats',
          coachingTips: "(H) Let's got for it!",
        },
        {
          id: '3',
          locale: 'ur',
          name: '(U) Squats',
          coachingTips: "(U) Let's got for it!",
        },
      ],
    },
    {
      id: '2',
      isWeight: true,
      category: {
        id: '3',
        name: 'Bicep Curls',
      },
      videos: [
        {
          id: '1',
          url: 'https://www.google.co.uk',
          difficulty: 'EASY',
        },
        {
          id: '2',
          url: 'https://www.google.co.uk',
          difficulty: 'MEDIUM',
        },
        {
          id: '3',
          url: 'https://www.google.co.uk',
          difficulty: 'HARD',
        },
      ],
      localisations: [
        {
          id: '1',
          locale: 'en',
          name: '(E) Bicep Curls',
          coachingTips: "(E) Let's got for it!",
        },
        {
          id: '2',
          locale: 'hi',
          name: '(H) Bicep Curls',
          coachingTips: "(H) Let's got for it!",
        },
        {
          id: '3',
          locale: 'ur',
          name: '(U) Bicep Curls',
          coachingTips: "(U) Let's got for it!",
        },
      ],
    },
  ],
  feedback: [
    {
      id: '1',
      trainerName: 'Julia',
      week: 1,
      programme: 'Home',
      workoutName: 'Bend & Snap',
      emojis: ['😊'],
      userEmail: 'barry.white@grr.la',
      timeTaken: 60,
      workoutIntensity: 33,
      date: '2020-11-30',
    },
  ],
  configuration: [
    {
      id: '1',
      localisations: [
        {
          language: 'en',
          termAndConditions: 'Terms and Conditions',
          privacyPolicy: 'Privacy Policy',
          onboarding: [
            {
              id: '1',
              text: 'Welcome Onboarding 1',
              image: 'https://www.google.co.uk/images',
            },
            {
              id: '2',
              text: 'Welcome Onboarding 2',
              image: 'https://www.google.co.uk/images',
            },
          ],
          notifications: [
            {
              id: '1',
              type: '?',
              title: 'Title',
              body: 'Body',
            },
            {
              id: '2',
              type: '?',
              title: 'Title',
              body: 'Body',
            },
          ],
        },
        {
          language: 'hi',
          termAndConditions: 'नियम और शर्',
          privacyPolicy: 'गोपनीयता नीति',
          onboarding: [
            {
              id: '1',
              text: 'Welcome Onboarding 1',
              image: 'https://www.google.co.uk/images',
            },
            {
              id: '2',
              text: 'Welcome Onboarding 2',
              image: 'https://www.google.co.uk/images',
            },
          ],
          notifications: [
            {
              id: '1',
              type: '?',
              title: 'Title',
              body: 'Body',
            },
            {
              id: '2',
              type: '?',
              title: 'Title',
              body: 'Body',
            },
          ],
        },
        {
          language: 'ur',
          termAndConditions: 'شرائط و ضوابط',
          privacyPolicy: 'رازداری کی پالیسی',
          onboardings: [
            {
              orderIndex: 1,
              title: 'Welcome Onboarding 1',
              description: 'This is the text for the onboarding screen 1',
              image: 'https://www.google.co.uk/images',
            },
            {
              orderIndex: 2,
              title: 'Welcome Onboarding 2',
              description: 'This is the text for the onboarding screen 2',
              image: 'https://www.google.co.uk/images',
            },
          ],
          notifications: [
            {
              type: '?',
              title: 'Title',
              body: 'Body',
            },
            {
              type: '?',
              title: 'Title',
              body: 'Body',
            },
          ],
        },
      ],
    },
  ],
  helpMeChoose: [
    {
      id: '1',
      questions: [
        {
          id: '1',
          localisations: [
            {
              id: '1',
              locale: 'en',
              question: 'What exercise do you like doing?',
              answer1: 'People watching',
              answer2: 'Reading exercise books',
              answer3: 'Day dreaming',
              answer4: 'Twerking',
            },
            {
              id: '2',
              locale: 'hi',
              question: 'What exercise do you like doing?',
              answer1: 'People watching',
              answer2: 'Reading exercise books',
              answer3: 'Day dreaming',
              answer4: 'Twerking',
            },
            {
              id: '3',
              locale: 'ur',
              question: 'What exercise do you like doing?',
              answer1: 'People watching',
              answer2: 'Reading exercise books',
              answer3: 'Day dreaming',
              answer4: 'Twerking',
            },
          ],
          trainerScores: [
            {
              id: '1',
              answer1: 10,
              answer2: 20,
              answer3: 30,
              answer4: 40,
              trainer: {
                id: '1',
                localisations: [
                  {
                    id: '1',
                    locale: 'en',
                    name: '(E) Katrina',
                  },
                  {
                    id: '2',
                    locale: 'hi',
                    name: '(H) Katrina',
                  },
                  {
                    id: '3',
                    locale: 'ur',
                    name: '(U) Katrina',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  workout: [
    {
      id: '1',
      additionalInfo: 'Additional workout info',
      overviewImage: 'https://www.google.co.uk/images',
      week: 1,
      localisations: [
        {
          id: '1',
          locale: 'en',
          name: '(E) Fun workout',
        },
        {
          id: '2',
          locale: 'hi',
          name: '(H) Fun workout',
        },
        {
          id: '3',
          locale: 'ur',
          name: '(U) Fun workout',
        },
      ],
      programme: {
        id: '1',
        type: 'HOME', // HOME / GYM
        subscribers: 2,
        stats: {
          fitness: 99,
          muscle: 30,
          fatLoss: 55,
        },
        trainer: {
          id: '1',
          localisations: [
            {
              id: '1',
              locale: 'en',
              name: '(E) Katrina',
            },
            {
              id: '2',
              locale: 'hi',
              name: '(H) Katrina',
            },
            {
              id: '3',
              locale: 'ur',
              name: '(U) Katrina',
            },
          ],
        },
        images: [
          {
            id: '1',
            url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ZT6uWI65XnbMMN7xXpecVtb5NMKlVbim_A&usqp=CAU',
          },
        ],
        shareMediaImages: [
          {
            id: '1',
            type: 'PROGRAMME_START', // PROGRAMME_START / WEEK_COMPLETE / CHALLENGE_COMPLETE / PROGRESS
            url:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQifuo_v_EVyiH06ZwBNa6jQ_ZNL4naJ-liXg&usqp=CAU',
            textColour: '#dad',
          },
        ],
        localisations: [
          {
            id: '1',
            locale: 'en',
            description: '(E) Train with your icon, Katrina!',
          },
          {
            id: '2',
            locale: 'hi',
            description: '(H) Train with your icon, Katrina!',
          },
          {
            id: '3',
            locale: 'ur',
            description: '(U) Train with your icon, Katrina!',
          },
        ],
      },
      exercises: [
        {
          id: '1',
          type: 'REPETITIONS', // REPETITIONS || TIME_INTERVAL
          exercise: {
            id: '1',
            isWeight: false,
            category: {
              id: '2',
              name: 'Squats',
            },
            videos: [
              {
                id: '1',
                url: 'https://www.google.co.uk',
                difficulty: 'HARD',
              },
              {
                id: '2',
                url: 'https://www.google.co.uk',
                difficulty: 'MEDIUM',
              },
              {
                id: '3',
                url: 'https://www.google.co.uk',
                difficulty: 'EASY',
              },
            ],
            localisations: [
              {
                id: '1',
                locale: 'en',
                name: '(E) Squats',
                coachingTips: "(E) Let's got for it!",
              },
              {
                id: '2',
                locale: 'hi',
                name: '(H) Squats',
                coachingTips: "(H) Let's got for it!",
              },
              {
                id: '3',
                locale: 'ur',
                name: '(U) Squats',
                coachingTips: "(U) Let's got for it!",
              },
            ],
          },
        },
      ],
    },
  ],
};
