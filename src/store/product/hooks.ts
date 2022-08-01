import { Product } from "./types";

interface ProductData {
  products: Product[];
  totalProducts: number;
}

export const useGetProductQuery = async (id?: string) => {
  let returnedProd: Product | undefined;
  const graphqlQuery = {
    query: `
        {
          product(id: "${id}") {
            name
            description
            developers
            token
            company
            governance
            launchDate
            url
            imgUrl
            blockchain
            marketCap
            rating
            mainTag
            tags
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
      returnedProd = resData.data.product;
    });
  return returnedProd;
};

export const useGetProductsMainTag = async (tag?: string) => {
  let prodArray: Product[] = [];
  let prodNum: number = 0;
  const graphqlQuery = {
    query: `
          {
            getProductsMainTag(tag: "${tag}") {
                products {
                    _id
                    name
                    description
                    developers
                    token
                    company
                    governance
                    launchDate
                    url
                    imgUrl
                    blockchain
                    marketCap
                    rating
                    mainTag
                    tags
                }
                totalProducts
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
        throw new Error("Fetching products failed");
      }
      resData.data.getProductsMainTag.products.map((p: any) => {
        let newProd: any = {
          id: p._id,
          name: p.name,
          mainTag: p.mainTag,
          tags: p.tags,
          governance: p.governance,
          blockchain: p.blockchain,
          description: p.description,
          marketCap: p.marketCap,
          imgUrl: p.imgUrl,
          url: p.url,
          rating: p.rating,
          company: p.company,
          token: p.token,
          launchDate: p.launchDate,
          develoeprs: p.developers,
        };
        prodArray.push(newProd);
      });
      prodNum = resData.data.getProductsMainTag.totalProducts;
    });
  return { prodArray, prodNum };
};

export const useGetProductsMostRecent = async () => {
  let prodArray: Product[] = [];
  let prodNum: number = 0;
  const graphqlQuery = {
    query: `
          {
            getProductsMostRecent {
                products {
                    _id
                    name
                    description
                    developers
                    token
                    company
                    governance
                    launchDate
                    url
                    imgUrl
                    blockchain
                    marketCap
                    rating
                    mainTag
                    tags
                }
                totalProducts
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
        throw new Error("Fetching products failed");
      }
      resData.data.getProductsMostRecent.products.map((p: any) => {
        let newProd: any = {
          id: p._id,
          name: p.name,
          mainTag: p.mainTag,
          tags: p.tags,
          governance: p.governance,
          blockchain: p.blockchain,
          description: p.description,
          marketCap: p.marketCap,
          imgUrl: p.imgUrl,
          url: p.url,
          rating: p.rating,
          company: p.company,
          token: p.token,
          launchDate: p.launchDate,
          develoeprs: p.developers,
        };
        prodArray.push(newProd);
      });
      prodNum = resData.data.getProductsMostRecent.totalProducts;
    });
  return { prodArray, prodNum };
};
