/*
 * Jira Ticket:
 * Created Date: Thu, 20th Feb 2020, 17:29:01 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { createMuiTheme } from '@material-ui/core/styles';

const colors = {
  darkBlueGrey: '#243f56',
  brownishGrey: '#707070',
  paleGrey: '#f7f8f9',
  veryLightPinkGrey: '#ededed',
  niceBlue: '#127abe',
  white: '#FFFFFF',
  green: '#159900',
  darkenedGreen: '#008000',
  red: '#C60000',
  darkenedRed: '#AD0000',
  darkTurquoise: '#218891',
  turquoise: '#2AADB9',
  lightGrey: '#e1e1e1',
  midGrey: '#A9A9A9',
  navy: '#25455A',
  darkNavy: '#1f3a4c',
};

const defaultTheme = createMuiTheme({
  button: {
    color: colors.white,
    backgroundColor: colors.navy,
    '&:hover': {
      background: colors.darkNavy,
    },
    '&:disabled': {
      color: colors.white,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: colors.darkBlueGrey,
    },
    secondary: {
      main: colors.darkBlueGrey,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  toolbar: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default defaultTheme;

const darkTheme = {
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: colors.darkBlueGrey,
    },
    background: {
      default: '#313131',
    },
  },
};

export { colors, darkTheme, defaultTheme as lightTheme };
