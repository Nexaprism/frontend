import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assets/img/nexLogo13.png";
import logoLight from "../assets/img/nexLogoLight.png";
import { setIsLoggedIn } from "../store/app/appReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/themeReducer";
import { setAvatar, setEmail, setToken, setUserId, setUsername } from "../store/user/userReducer";

const LogIn: FC = () => {
  const theme = useAppSelector(selectTheme);
  const [emailField, setEmailField] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buttonStyles = {
    color: "white",
    background: "linear-gradient(to bottom, #bf1aed, #201438)",
    "&:hover": {
      background: "#cc7be3",
      transform: "none",
    },
    "&:disabled": {
      background: "gray",
    },
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleChange = (text: String) => {
    setPassword(text);
    console.log(password)
    checkValid(text);
  }

  const checkValid = (text: String) => {
    if (password === "" || emailField === "" || text === "" || password.length < 6) {
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

  const logInHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const graphqlQuery = {
      query: `
            {
                login(email: "${emailField}", password: "${password}") {
                    token
                    userId
                    username
                    email
                    avatar
                }
            }
        `,
    };
    fetch("http://localhost:3080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        //error handling
        if (resData.errors && resData.errors[0].status === 422) {
          console.log(resData);
          throw new Error(
            "Validation failed. Account already exists with that email address."
          );
        }
        if (resData.errors) {
          throw new Error("user login failed");
        }
        //success, dispatches and setStates
        const data = resData.data.login;
        console.log(data);
        dispatch(setIsLoggedIn(true));
        dispatch(setToken(data.token));
        dispatch(setUsername(data.username));
        dispatch(setUserId(data.userId));
        dispatch(setEmail(data.email));
        dispatch(setAvatar(data.avatar));
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("avatar", data.avatar);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        //@dev TO DO:
        //set auto logout here
        //setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
      });
      navigate("/");
  };


  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
              onChange={(e) => {
                setEmailField(e.target.value);
                checkValid(e.target.value);
              }}
            />
            <Typography>Password:</Typography>
            <OutlinedInput
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
