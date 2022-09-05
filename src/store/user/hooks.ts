import { useAppDispatch } from "../hooks";
import { User } from "./userTypes";
import {
  setAvatar,
  setEmail,
  setToken,
  setUserId,
  setUsername,
} from "./userReducer";
import { setIsLoggedIn } from "../app/appReducer";
import { useState } from "react";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export const useGetUserQuery = async (
  userId: string | null,
  token: string | null
) => {
  let createdAt: string | undefined;
  let user: User | undefined;
  const graphqlQuery = {
    query: `
        {
          user(id: "${userId}") {
              user {
                username
                email
                password
                avatar
                reviews {
                  _id
                }
              }
              createdAt
              updatedAt
            }
        }
          `,
  };
  await fetch(`${API_ENDPOINT}graphql`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      if (resData.errors) {
        console.log(resData);
        throw new Error("Fetching user failed");
      }
      const userData = resData.data.user.user;
      let currentUser: User = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        avatar: userData.avatar,
        reviews: userData.reviews == undefined ? [] : userData.reviews,
      };
      createdAt = resData.data.user.createdAt;
      user = currentUser;
    });

  return { user: user, createdAt: createdAt };
};

export const useAvatarUpdate = () => {
  const returnedFunction = async (
    image: string,
    userId: string,
    email: string,
    token: string
  ) => {
    const graphqlQuery = {
      query: `
                mutation {
                  updateUserAvatar(id: "${userId}", userInput: {
                    email: "${email}",
                    avatar: "${image}",
                  }) {
                    _id
                    avatar
                  }
                }
                `,
    };
    await fetch(`${API_ENDPOINT}graphql`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
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
          throw new Error("Validation failed. Could not authenticate user");
        }
        if (resData.errors) {
          console.log(resData);
          throw new Error("Review creation failed");
        }
        //console.log(resData.data);
        //dispatch(setAvatar(image));
      });
  };
  return returnedFunction;
};

export const useUserFunc = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>();
  let feedback = {
    success: false,
    message: "",
  };
  return {
    login: async (email: string, password: string) => {
      const graphqlQuery = {
        query: `
                              {
                                  login(email: "${email}", password: "${password}") {
                                      token
                                      userId
                                      username
                                      email
                                      avatar
                                  }
                              }
                          `,
      };
      await fetch(`${API_ENDPOINT}graphql`, {
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
            const msg = resData.errors[0].message;
            feedback.message = "Validation failed. " + msg;
            return feedback;
          }
          if (resData.errors) {
            const msg = resData.errors[0].message;
            feedback.message = "Login failed. " + msg;
            return feedback;
          }
          //success, dispatches and setStates
          setUserData(resData.data.login);
          const data = resData.data.login;
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
          feedback.message = `Login successful! Welcome back, ${data.username}`;
          feedback.success = true;
        })
        .catch((err) => {
          console.log(err);
        });
      return feedback;
    },
    signUp: async (email: string, username: string, password: string) => {
      const graphqlQuery = {
        query: `
              mutation {
                createUser(userInput: {
                  email: "${email}", 
                  username: "${username}", 
                  password: "${password}", 
                }) {
                  _id
                  username
                }
              }
            `,
      };
      await fetch(`${API_ENDPOINT}graphql`, {
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
            const msg = resData.errors[0].message;
            feedback.message = "Validation failed. " + msg;
            return feedback;
          }
          if (resData.errors) {
            console.log(resData);
            const msg = resData.errors[0].message;
            feedback.message = "Account creation failed. " + msg;
            return feedback;
          }
          setUserData(resData.data.createUser);
          feedback.message = "Account creation successful! Please login.";
          feedback.success = true;
        })
        .catch((err) => {
          console.log(err);
        });
      return feedback;
    },
    update: async (
      userId: string,
      email: string,
      username: string,
      password: string,
      avatar: string,
      token: string, 
    ) => {
      const graphqlQuery = {
        query: `
                mutation {
                updateUser(id: "${userId}", userInput: {
                    email: "${email}",
                    avatar: "${avatar}",
                    username: "${username}",
                    password: "${password}",
                }) {
                    _id
                    avatar
                }
            }
            `,
      };
      await fetch(`${API_ENDPOINT}graphql`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
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
            throw new Error("Validation failed. Could not authenticate user");
          }
          if (resData.errors) {
            console.log(resData);
            throw new Error("Review creation failed");
          }
        });
    },
    data: userData,
  };
};
