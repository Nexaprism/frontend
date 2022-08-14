export const useReviews = () => {
  return {
    delete: async (id: string, token: string) => {
      let feedback = {
        success: false,
        message: "",
      };
      const graphqlQuery = {
        query: `
                mutation {
                    deleteReview(id: "${id}")
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
            //throw new Error("Validation failed. Could not authenticate user");
            feedback.message = "Validation failed. Could not authenticate user";
            return feedback;
          }
          if (resData.errors) {
            console.log(resData);
            //throw new Error("Review deletion failed");
            feedback.message = "Review deletion failed";
            return feedback;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      feedback.success = true;
      feedback.message = "Review deleted successfully!";
      return feedback;
    },

    update: async (
      id: string,
      rating: number,
      content: string,
      token: string,
      prodId: string
    ) => {
      let feedback = {
        success: false,
        message: "",
      };
      const graphqlQuery = {
        query: `
                mutation {
                    updateReview(id: "${id}", reviewInput: {
                        rating: "${rating}",
                        content: "${content}",
                        productId: "${prodId}",
                    }) {
                        _id
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
            //throw new Error("Validation failed. Could not authenticate user");
            feedback.message = "Validation failed. Could not authenticate user";
            return feedback;
          }
          if (resData.errors) {
            console.log(resData);
            //throw new Error("Review update failed");
            feedback.message = "Review update failed";
            return feedback;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      feedback.success = true;
      feedback.message = "Review updated successfully!";
      return feedback;
    },

    submit: async (
      sliderValue: string | number,
      reviewContent: string,
      id: string | undefined,
      token: string | null
    ) => {
      let feedback = {
        success: false,
        message: "",
      };
      const graphqlQuery = {
        query: `
                    mutation {
                      createReview(reviewInput: {
                        rating: "${Number(sliderValue)}", 
                        content: "${reviewContent}", 
                        productId: "${id}",
                      }) {
                        _id
                        user {
                          username
                        }
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
            feedback.message = "Validation failed. Could not authenticate user";
            return feedback;
          }
          if (resData.errors) {
            console.log(resData);
            throw new Error("Review creation failed");
            feedback.message = "Review creation failed";
            return feedback;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      feedback.success = true;
      feedback.message = "Review submitted successfully!";
      return feedback;
    },
    getByUser: async (token: string, userId: string, page: number) => {
        let reviews: any = [];
        let totReviews: number = 0;
        const graphqlQuery = {
          query: `
              {
                getUserReviews(userId: "${userId}", page: ${page}) {
                    reviews {
                        _id
                        content
                        user {
                            _id
                            username
                        }
                        rating
                        productId
                        productName
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
                productName: r.productName,
                user: { username: r.user.username, _id: r.user._id },
                productId: r.productId,
                createdAt: new Date(r.createdAt).toLocaleDateString(),
              };
              reviews.push(newRev);
            });
            totReviews = resData.data.getUserReviews.totalReviews;
          });
        return {reviews, totReviews};
      },
  };
};
