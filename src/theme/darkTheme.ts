import { createTheme } from "@mui/material";

/**
 * logo - Jura
 * buttons - Lexend
 * text - questrial
 * 
 */


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
          default: '#1e1f1f',
        }
      },
      typography: {
        fontFamily: 'Questrial',
        button: {
          fontFamily: 'Lexend'
        }
      }
});

export default darkTheme;