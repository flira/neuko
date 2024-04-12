import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '2.625rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700
    },
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        em, .italic {
          font-variation-settings: "slnt" -10;
        }
        [aria-label*="Breadcrump"] .MuiBox-root::before{
          content: "chevron_right";
          direction: ltr;
          display: inline-block;
          font-size: 2.5em;
          font-style: normal;
          font-weight: normal;
          letter-spacing: normal;
          line-height: 1;
          text-transform: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          white-space: nowrap;
          word-wrap: normal;
          -moz-font-feature-settings: liga;
          -moz-osx-font-smoothing: grayscale;
          font-family: Material Symbols Rounded;
        }
      `
    }
  }
});

export default theme;