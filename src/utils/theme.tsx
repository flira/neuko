import { createTheme } from '@mui/material/styles';

/**
 * Tema do MUI para o NeuKo.
 */
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
        ol {
          padding-inline-start: 0;
          width: 100%;
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
        @keyframes keypress {
          0% {
            transform: scale(1) translateY(0)
          }
          75% {
            transform: scale(.9) translateY(3px)
          }
          100% {
            transform: scale(1) translateY(0)
          }
        }
        @keyframes textcursor {
          0%, 49% {
            opacity: 0
          }
          50%, 100% {
            opacity: 1
          }
        }
      `
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          transition: "unset"
        },
        circle: {
          transition: "unset"
        }
      }
    }
  }
});

export default theme;