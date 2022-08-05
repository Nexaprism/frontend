import { createTheme } from "@mui/material";

const lightTheme = createTheme({
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
        mode: 'light',
        primary: {
          main: "#201438",
        },
        info: {
          main: "#FFF"
        }
      },
      typography: {
        fontFamily: "Questrial",
        button: {
          fontFamily: 'Lexend'
        }
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              transition: "transform 0.15s ease-in-out",
              '&:hover': {
                transform: "scale3d(1.2, 1.2, 1)"
              },
            }
          }
        },
        MuiCard: {
          styleOverrides: {
            root: {
              background: 'linear-gradient(to bottom, #cdcccf, #ababab)'
            }
          }
        },
        MuiChip: {
          styleOverrides: {
            root: {
              background: 'linear-gradient(to right bottom, #ede65f, #eda65f)'
            }
          }
        },
        MuiLink: {
          styleOverrides: {
            root: {
              color: 'black',
              '&:hover': {
                color: '#201438'
              },
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
                color: "#a480ed"
              }
            },
            track: {
              backgroundColor: "#FFF",
              ".Mui-checked.Mui-checked + &": {
                opacity: 0.5,
                backgroundColor: "#a480ed"
              }
            }
          }
        }
      }
});

export default lightTheme;