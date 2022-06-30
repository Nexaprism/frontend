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
          }
        }
      }
    }
  }
});

export default darkTheme;
