import { createTheme } from "@mui/material";

/**
 * logo - Jura
 * buttons - Lexend
 * text - questrial
 *
 */

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1f1f",
    },
    primary: {
      main: "#1e1f1f",
    },
  },
  typography: {
    fontFamily: "Questrial",
    button: {
      fontFamily: "Lexend",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.15s ease-in-out",
          '&:hover': {
            transform: "scale3d(1.2, 1.2, 1)"
          },
          color: 'white',
        },
        contained: {
          backgroundColor: "purple"
        },
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to bottom, #989799, #6a6a6b)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right bottom, #4849b8, #6248b8)'
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    }
  }
});

export default darkTheme;
