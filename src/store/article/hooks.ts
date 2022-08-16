import { Article } from "./types";

export const useGetArticle = () => {
  return {
    getById: async (id: string) => {
      let returnedArticle;
      let createdDate;
      let updatedDate;
      const graphqlQuery = {
        query: `
        {
          article(id: "${id}") {
            article {
                _id
            title
            author
            content
            imgUrl
            mainTag
            tags
            url
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
          returnedArticle = resData.data.article.article;
          createdDate = resData.data.article.createdAt;
          updatedDate = resData.data.article.updatedAt;
        });
      return { returnedArticle, createdDate, updatedDate };
    },
    getByPage: async (page: number) => {
      let returnedArticles: Article[] = [];
      let totalArticles = 0;
      const graphqlQuery = {
        query: `
        {
          articles(page: ${page}) {
            articles {
            _id
            title
            author
            content
            imgUrl
            mainTag
            tags
            url
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
          resData.data.articles.articles.map((article: any) => {
            let newArt: Article = {
              imgUrl: article.imgUrl,
              title: article.title,
              id: article._id,
              content: article.content,
              mainTag: article.mainTag,
              tags: article.tags,
              author: article.author,
              url: article.url,
              createdAt: article.createdAt,
              updatedAt: article.updatedAt,
            };
            returnedArticles.push(newArt);
          });
          totalArticles = resData.data.articles.totalArticles;
        });
      return {articles: returnedArticles, totalArticles: totalArticles};
    },
    getByMainTag: async (tag: string) => {
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
              url
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
              url: a.url,
            };
            returnedArticles.push(newArt);
          });
          totArticles = resData.data.getArticlesMainTag.totalArticles;
        });
      return { returnedArticles, totArticles };
    },
    getByMostRecent: async () => {
      let returnedArticles: Article[] = [];
      let totArticles: number = 0;
      const graphqlQuery = {
        query: `
          {
            getArticlesMostRecent {
              articles {
              _id
              title
              author
              content
              imgUrl
              mainTag
              tags
              url
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
          resData.data.getArticlesMostRecent.articles.map((a: any) => {
            let newArt: any = {
              id: a._id,
              title: a.title,
              author: a.author,
              content: a.content,
              mainTag: a.mainTag,
              tags: a.tags,
              updatedAt: a.updatedAt,
              imgUrl: a.imgUrl,
              url: a.url,
            };
            returnedArticles.push(newArt);
          });
          totArticles = resData.data.getArticlesMostRecent.totalArticles;
        });
      return { returnedArticles, totArticles };
    },
    getByLatest: async () => {},
  };
};
