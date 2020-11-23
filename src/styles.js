import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import theme, { colors } from 'theme';

export const appStyles = makeStyles({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '20%',
    marginLeft: '50%',
  },
  circularProgress: {
    color: 'rgb(60, 70, 87)',
  },
  devCommit: {
    position: 'sticky',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    padding: 6,
    backgroundColor: '#efefef',
    textAlign: 'center',
  },
});

export const columnStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '20vw',
    height: '50%',
    marginRight: 25,
  },
  columnImage: {
    marginTop: -24,
  },
});

export const toolbarStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteButton: {
    color: theme.palette.error.main,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
}));

export const defaultButton = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  icon: {
    fontSize: 18,
  },
}));

export const authFormStyles = () => ({
  form: {
    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: '1em',
    width: '90%',
    lineHeight: 'normal',
  },
  button: {
    display: 'flex',
    marginLeft: '7.5%',
    width: '85%',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: '3%',
    fontSize: 16,
    ...theme.button,
  },
  loadingIndicator: {
    color: colors.turquoise,
  },
  forgotpassword: {
    display: 'flex',
    fontWeight: 'bold',
    marginLeft: '7.5%',
    width: '85%',
    color: colors.turquoise,
    textDecoration: 'none',
    '&:hover': {
      color: colors.darkTurquoise,
    },
  },
});

export const authPageStyles = () => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: colors.lightGrey,
  },
  card: {
    width: 550,
    marginTop: '6em',
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: '2%',
  },
});

export const authDialogStyles = () => ({
  root: {
    margin: 0,
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: colors.grey,
  },
  dialogActionsRoot: {
    margin: 0,
    padding: 8,
  },
  dialogContentRoot: {
    padding: 16,
  },
  loadingIndicator: {
    color: colors.turquoise,
  },
  termsWindow: {
    whiteSpace: 'pre-wrap',
    width: '550px',
    overflow: 'auto',
  },
});

export const menuStyles = makeStyles({
  root: {
    marginLeft: 16,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '0.5em',
    [theme.breakpoints.only('xs')]: {
      marginTop: 0,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '1.5em',
    },
  },
});

export const appBarStyles = makeStyles({
  appBar: {
    height: 50,
    display: 'flex',
  },
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  select: {
    minWidth: 120,
    color: colors.white,
    borderColor: colors.white,
    '&:before': {
      borderColor: colors.white,
    },
    '&:after': {
      borderColor: colors.white,
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before': {
      borderColor: colors.white,
    },
  },
  icon: {
    fill: colors.white,
  },
});
