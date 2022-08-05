import { createTheme } from "@mui/material";

/**
 * logo - Jura
 * buttons - Lexend
 * text - questrial
 *
 */

const darkTheme = createTheme({
  breakpoints: {
    values: {
      xl: 1536,
      lg: 1200,
      md: 1010,
      sm: 600,
      xs: 0
    }
  },
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
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#FFF"
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#808080"
          }
        },
        track: {
          backgroundColor: "#FFF",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.5,
            backgroundColor: "#808080"
          }
        }
      }
    }
  }
});

export default darkTheme;
