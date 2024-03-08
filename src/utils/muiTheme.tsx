import { createTheme } from '@mui/material/styles';

const theme  = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
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

export {theme};