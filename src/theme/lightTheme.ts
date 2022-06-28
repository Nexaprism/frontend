import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: "#63006e",
        },
      },
      typography: {
        button: {
          fontFamily: 'Lexend'
        }
      }
});

export default lightTheme;