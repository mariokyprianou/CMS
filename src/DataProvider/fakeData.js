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
          name: 'Katrina E',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: 'Katrina H',
        },
        {
          id: '3',
          locale: 'Urdu',
          name: 'Katrina U',
        },
      ],
    },
    {
      id: '2',
      localisations: [
        {
          id: '1',
          locale: 'English',
          name: 'Donald E',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: 'Donald H',
        },
        {
          id: '3',
          locale: 'Urdu',
          name: 'Donald U',
        },
      ],
    },
    {
      id: '3',
      localisations: [
        {
          id: '1',
          locale: 'English',
          name: 'Bilal E',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: 'Bilal H',
        },
        {
          id: '3',
          locale: 'Urdu',
          name: 'Bilal U',
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
            name: 'Katrina E',
          },
          {
            id: '2',
            locale: 'Hindi',
            name: 'Katrina H',
          },
          {
            id: '3',
            locale: 'Urdu',
            name: 'Katrina U',
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
          language: 'en',
          description: 'Train with your icon, Katrina!',
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
          name: '50 x Squats E',
          description: 'Do 50 squats in 1 minute',
          fieldLabel: 'field label here',
        },
        {
          id: '2',
          locale: 'Hindi',
          name: '50 x Squats H',
          description: 'Do 50 squats in 1 minute',
          fieldLabel: 'field label here',
        },
        {
          id: '3',
          locale: 'Urdu',
          name: '50 x Squats U',
          description: 'Do 50 squats in 1 minute',
          fieldLabel: 'field label here',
        },
      ],
    },
  ],
};
