import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Slide,
  SlideProps,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assets/img/nexLogo13.png";
import logoLight from "../assets/img/nexLogoLight.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/themeReducer";
import { useUserFunc } from "../store/user/hooks";


const LogIn: FC = () => {
  const theme = useAppSelector(selectTheme);
  const [emailField, setEmailField] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<AlertColor>("error");
  const loginFunc = useUserFunc();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buttonStyles = {
    color: "white",
    background: "linear-gradient(to bottom, #a373f5, #4d2e82)",
    "&:hover": {
      background: "#cc7be3",
      transform: "none",
    },
    "&:disabled": {
      background: "gray",
    },
  };

  const fieldStyles = {
    backgroundColor: theme == "dark" ? "#424242" : "white",
  };

  type TransitionProps = Omit<SlideProps, "direction">;

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
  }

  const handleSnackClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleChange = (text: string) => {
    setPassword(text);
    console.log(password);
    checkValid(text);
  };

  const checkValid = (text: string) => {
    if (
      password === "" ||
      emailField === "" ||
      text === "" ||
      password.length < 6
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const passwordHint = () => {
    if (password.length < 6) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  };

  const logInHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const feedback = await loginFunc.login(emailField, password);
    setMessage(feedback.message);
    if (feedback.success) {
      setAlertStatus("success");
      setOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 2000)
    } else {
      setOpen(true);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        TransitionComponent={TransitionUp}
      >
        <Alert onClose={handleSnackClose} severity={alertStatus}>
          {message}
        </Alert>
      </Snackbar>
      <Box component="form" onSubmit={logInHandler}>
        <Stack
          direction="column"
          sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}
        >
          <Box sx={{ animation: "spin 20s linear infinite" }}>
            <style>{`
            @keyframes spin {
                 0% { transform: rotate(360deg); }
                 100% { transform: rotate(0deg); }
            }
        `}</style>
            <img
              src={theme == "light" ? logoLight : logoDark}
              height="175px"
              width="175px"
            />
          </Box>

          <Typography fontSize={25}>Log in</Typography>
          <FormControl sx={{ display: "flex", width: "100%" }}>
            <Typography>Email:</Typography>
            <TextField
            sx={fieldStyles}
              onChange={(e) => {
                setEmailField(e.target.value);
                checkValid(e.target.value);
              }}
            />
            <Typography>Password:</Typography>
            <OutlinedInput
            sx={fieldStyles}
              required
              error={passError}
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkValid(e.target.value);
              }}
              onKeyDown={() => checkValid(password)}
              onKeyUp={() => checkValid(password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e: React.SyntheticEvent) =>
                      e.preventDefault()
                    }
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Stack spacing={3} sx={{ pt: 2 }}>
              <Button type="submit" disabled={!isValid} sx={buttonStyles}>
                Log In
              </Button>
              <Divider textAlign="center">OR</Divider>

              <Button component={Link} to="/signup" sx={buttonStyles}>
                Sign Up
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};

export default LogIn;
