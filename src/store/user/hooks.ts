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
  await fetch("http://localhost:3080/graphql", {
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
    await fetch("http://localhost:3080/graphql", {
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

export const useUserLogin = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<any>();
  return {
    login: async (email: string, password: string) => {
      console.log("Hook called!");
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
      await fetch("http://localhost:3080/graphql", {
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
          //@dev TO DO:
          //set auto logout here
          //setAutoLogout(remainingMilliseconds);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    data: userData,
  };

  //return data;
};
