import {
  alpha,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
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
import { useUserLogin } from "../store/user/hooks";

const SignUp: FC = () => {
  const theme = useAppSelector(selectTheme);
  const [emailLocal, setEmailLocal] = useState<string>("");
  const [usernameLocal, setUsernameLocal] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const loginFunc = useUserLogin();
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

  const signUpHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const graphqlQuery = {
      query: `
        mutation {
          createUser(userInput: {
            email: "${emailLocal}", 
            username: "${usernameLocal}", 
            password: "${password}", 
          }) {
            _id
            username
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
          console.log(resData);
          throw new Error("Account creation failed");
        }
        //passed errors, set states & dispatching logic here
        console.log(resData);
        logout();
      })
      .catch((err) => {
        console.log(err);
      });
      alert("Account creation successful! Please login");
      navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
              onChange={(e) => {
                setEmailLocal(e.target.value);
                checkValid(e.target.value);
              }}
            />
            <Typography>Username:</Typography>
            <TextField
              onChange={(e) => {
                setUsernameLocal(e.target.value);
                checkValid(e.target.value);
              }}
            />
            <Typography>Password: must be 6 characters or longer</Typography>
            <OutlinedInput
              required
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
