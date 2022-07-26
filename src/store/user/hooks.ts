import { User } from "./userTypes";

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
        id: userData._id,
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
