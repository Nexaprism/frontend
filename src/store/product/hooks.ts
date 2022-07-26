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
      prodArray = resData.data.getProductsMainTag.products;
      prodNum = resData.data.getProductsMainTag.totalProducts;
    });
  return {prodArray, prodNum}
};
