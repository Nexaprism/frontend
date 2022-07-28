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
          throw new Error("Fetching articles failed");
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

  export const useGetArticlesMainTag = async (tag?: string) => {
    let returnedArticles: Article[] = [];
    let totArticles: number = 0;
    const graphqlQuery = {
        query: `
          {
            getArticlesMainTag(tag: "${tag}") {
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
              totalArticles
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
            throw new Error("Fetching articles failed");
          }
          resData.data.getArticlesMainTag.articles.map((a: any) => {
            let newArt: any = {
                id: a._id,
                title: a.title,
                author: a.author,
                content: a.content,
                mainTag: a.mainTag,
                tags: a.tags,
                updatedAt: a.updatedAt,
                imgUrl: a.imgUrl,
            }
            returnedArticles.push(newArt);
          });
          totArticles = resData.data.getArticlesMainTag.totalArticles;
        });
        return {returnedArticles, totArticles};
  }

  export const useGetLatestArticleByTag = async (tag?: string) => {
    let returnedArticle;
    const graphqlQuery = {
        query: `
          {
            getLatestArticleByTag(tag: "${tag}") {
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
          returnedArticle = resData.data.getLatestArticleByTag;
        });
      return returnedArticle;
  }