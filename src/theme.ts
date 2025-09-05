import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F5F6FA',
      paper: '#fff',
    },
    text: {
      primary: '#202224',
    },
    primary: {
      main: '#F24360',
    },
  },
});


export default lightTheme; 