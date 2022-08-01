export const useGetUserReviews = async (token: string, userId: string) => {
  let reviews: any = [];
  let totReviews: number = 0;
  const graphqlQuery = {
    query: `
        {
          getUserReviews(userId: "${userId}") {
              reviews {
                  _id
                  content
                  user {
                      username
                  }
                  rating
                  createdAt
              }
          totalReviews
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
        throw new Error("Fetching reviews failed");
      }
      resData.data.getUserReviews.reviews.map((r: any) => {
        let newRev: any = {
          id: r._id,
          content: r.content,
          rating: r.rating,
          user: { username: r.user.username },
          createdAt: r.createdAt,
        };
        reviews.push(newRev);
      });
      totReviews = resData.data.getUserReviews.totalReviews;
    });
  return reviews;
};
