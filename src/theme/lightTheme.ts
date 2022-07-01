import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: "#201438",
        },
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
              }
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
        }
      }
});

export default lightTheme;