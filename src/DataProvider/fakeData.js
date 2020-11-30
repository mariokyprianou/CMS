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
      givenName: 'Logan',
      familyName: 'Schowalter',
      email: 'logan@grr.la',
      country: 'UK',
      region: '',
      timeZone: 'UTC +2',
      canChangeDevice: true,
      subscription: {
        isSubscribed: false,
        platform: null,
      },
    },
    {
      id: '2',
      givenName: 'Gabby',
      familyName: 'Doodoo',
      email: 'gabby@grr.la',
      country: 'UK',
      region: '',
      timeZone: 'UTC +0',
      canChangeDevice: false,
      subscription: {
        isSubscribed: true,
        platform: 'IOS',
      },
    },
    {
      id: '3',
      givenName: 'Brod',
      familyName: 'Greenwood',
      email: 'brod@grr.la',
      country: 'India',
      region: 'Goa',
      timeZone: 'UTC +1',
      canChangeDevice: false,
      subscription: {
        isSubscribed: false,
        platform: 'ANDROID',
      },
    },
    {
      id: '4',
      givenName: 'Fran',
      familyName: 'Smith',
      email: 'fran@grr.la',
      country: 'India',
      region: '',
      timeZone: 'UTC +0',
      canChangeDevice: true,
      subscription: {
        isSubscribed: true,
        platform: 'IOS',
      },
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
          id: '1',
          locale: 'English',
          name: '(E) Katrina',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: '(H) Katrina',
        },
        {
          id: '3',
          locale: 'Urdu',
          name: '(U) Katrina',
        },
      ],
    },
    {
      id: '2',
      localisations: [
        {
          id: '1',
          locale: 'English',
          name: '(E) Donald',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: '(H) Donald',
        },
        {
          id: '3',
          locale: 'Urdu',
          name: '(U) Donald',
        },
      ],
    },
    {
      id: '3',
      localisations: [
        {
          id: '1',
          locale: 'English',
          name: '(E) Bilal',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: '(H) Bilal',
        },
        {
          id: '3',
          locale: 'Urdu',
          name: '(U) Bilal',
        },
      ],
    },
  ],
  programme: [
    {
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
            locale: 'English',
            name: '(E) Katrina',
          },
          {
            id: '2',
            locale: 'Hindi',
            name: '(H) Katrina',
          },
          {
            id: '3',
            locale: 'Urdu',
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
          locale: 'English',
          description: '(E) Train with your icon, Katrina!',
        },
        {
          id: '2',
          locale: 'Hindi',
          description: '(H) Train with your icon, Katrina!',
        },
        {
          id: '3',
          locale: 'Urdu',
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
          locale: 'English',
          name: '(E) 50 x Squats',
          description: '(E) Do 50 squats in 1 minute',
          fieldLabel: '(E) field label here',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: '(H) 50 x Squats',
          description: '(H) Do 50 squats in 1 minute',
          fieldLabel: '(H) field label here',
        },
        {
          id: '3',
          locale: 'Urdu',
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
          locale: 'English',
          name: '(E) Squats',
          coachingTips: "(E) Let's got for it!",
        },
        {
          id: '2',
          locale: 'Hindi',
          name: '(H) Squats',
          coachingTips: "(H) Let's got for it!",
        },
        {
          id: '3',
          locale: 'Urdu',
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
          locale: 'English',
          name: '(E) Bicep Curls',
          coachingTips: "(E) Let's got for it!",
        },
        {
          id: '2',
          locale: 'Hindi',
          name: '(H) Bicep Curls',
          coachingTips: "(H) Let's got for it!",
        },
        {
          id: '3',
          locale: 'Urdu',
          name: '(U) Bicep Curls',
          coachingTips: "(U) Let's got for it!",
        },
      ],
    },
  ],
};
