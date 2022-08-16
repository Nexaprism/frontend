import {
  Alert,
  AlertColor,
  alpha,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Slide,
  SlideProps,
  Snackbar,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assets/img/nexLogo13.png";
import logoLight from "../assets/img/nexLogoLight.png";
import { setIsLoggedIn } from "../store/app/appReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/themeReducer";
import generator from "generate-password-ts";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setToken, setUserId, setUsername, setEmail, setAvatar } from "../store/user/userReducer";
import { useUserFunc } from "../store/user/hooks";

const SignUp: FC = () => {
  const theme = useAppSelector(selectTheme);
  const [emailLocal, setEmailLocal] = useState<string>("");
  const [usernameLocal, setUsernameLocal] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<AlertColor>("error");
  const userFuncs = useUserFunc();
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
    backgroundColor: theme == "dark" ? "#424242" : "white"
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

  const generatePassword = () => {
    const password = generator.generate({
      numbers: true,
      symbols: true,
      exclude: `"`,
    });
    setPassword(password);
    checkValid(password);
    return password;
  };

  const checkValid = (text: string) => {
    if (
      usernameLocal === "" ||
      password === "" ||
      emailLocal === "" ||
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

  const logout = () => {
    dispatch(setUserId(""));
    dispatch(setUsername(""));
    dispatch(setToken(""));
    dispatch(setEmail(""));
    dispatch(setAvatar(""));
    dispatch(setIsLoggedIn(false));
  };

  const signUpHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const feedback = await userFuncs.signUp(emailLocal, usernameLocal, password);
    setMessage(feedback.message);
    if(feedback.success) {
      setAlertStatus("success");
      setOpen(true);
      setTimeout(() => {
        navigate("/login");
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
      <Box component="form" noValidate onSubmit={signUpHandler}>
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
              src={theme === "light" ? logoLight : logoDark}
              height="175px"
              width="175px"
            />
          </Box>

          <Typography fontSize={25}>Create a new account</Typography>
          <FormControl sx={{ display: "flex", width: "100%" }}>
            <Typography>Email:</Typography>
            <TextField
            sx={fieldStyles}
              onChange={(e) => {
                setEmailLocal(e.target.value);
                checkValid(e.target.value);
              }}
            />
            <Typography>Username:</Typography>
            <TextField
            sx={fieldStyles}
              onChange={(e) => {
                setUsernameLocal(e.target.value);
                checkValid(e.target.value);
              }}
            />
            <Typography>Password: must be 6 characters or longer</Typography>
            <OutlinedInput
              required
              sx={fieldStyles}
              error={passError}
              type={showPass ? "text" : "password"}
              value={password}
              //helperText={
              //passError ? "Password must be 6 characters or longer" : ""
              //}
              onChange={(e) => {
                setPassword(e.target.value);
                checkValid(e.target.value);
                passwordHint();
              }}
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
            <Button
              onClick={generatePassword}
              sx={{ "&:hover": { transform: "none" } }}
            >
              Suggest strong password
            </Button>
            <Stack spacing={3} sx={{ pt: 2 }}>
              <Button type="submit" disabled={!isValid} sx={buttonStyles}>
                Submit
              </Button>
              <Divider textAlign="center">OR</Divider>
              <Button component={Link} to="/login" sx={buttonStyles}>
                Log In
              </Button>
            </Stack>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUp;
