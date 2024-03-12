import { createTheme } from '@mui/material/styles';

const theme  = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '2.625rem',
      fontWeight: 700
    }
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        em, .italic {
          font-variation-settings: "slnt" -10;
        }
      `
    }
  }
});

export default theme;