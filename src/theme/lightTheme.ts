import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: "#63006e",
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
        }
      }
});

export default lightTheme;