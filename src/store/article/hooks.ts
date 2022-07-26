import { Article } from "./types";

export const useArticleQuery = async (id?: string) => {
    let returnedArticle;
    const graphqlQuery = {
      query: `
        {
          article(id: "${id}") {
            _id
            title
            author
            content
            imgUrl
            mainTag
            tags
            updatedAt
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
        if (resData.errors) {
          console.log(resData);
          throw new Error("Fetching article failed");
        }
        returnedArticle = resData.data.article;
      });
    return returnedArticle;
  }

  export const useGetAllArticlesQuery = async () => {
    let returnedArticles: Article[] = [];
    const graphqlQuery = {
      query: `
        {
          articles {
            articles {
            _id
            title
            author
            content
            imgUrl
            mainTag
            tags
            updatedAt
            }
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
        if (resData.errors) {
          console.log(resData);
          throw new Error("Fetching product failed");
        }
        resData.data.articles.articles.map((article: any) => {
            let newArt: Article = {
              imgUrl: article.imgUrl,
              title: article.title,
              id: article._id,
              content: article.content,
              mainTag: article.mainTag,
              tags: article.tags,
              author: article.author,
              createdAt: article.createdAt,
              updatedAt: article.updatedAt
            };
            returnedArticles.push(newArt);
          });
      });
    return returnedArticles;
  }