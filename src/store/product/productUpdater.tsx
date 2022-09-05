import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { setAllTags, setProducts } from "./productReducer";
import { Product } from "./types";

const ProductUpdater: FC = (): null => {
    const dispatch = useAppDispatch();
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const getProducts = async () => {
    let foundProducts: Product[] = [];
    let foundTags: string[] = [];
    const graphqlQuery = {
      query: `
      {
        products {
            products {
                _id
                name
                tags
                mainTag
            }
        totalProducts
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
        if (resData.errors) {
          console.log(resData);
          throw new Error("Fetching products failed");
        }

        resData.data.products.products.map((p: any) => {
          foundProducts.push({ 
            id: p._id, 
            name: p.name,
            governance: "",
            blockchain: "",
            token: "",
            tags: p.tags,
            mainTag: p.mainTag,
            developers: [""],
            marketCap: "",
            company: "",
            description: "",
            imgUrl: "",
            url: "",
            launchDate: "",
            createdAt: "",
            updatedAt: "",
            rating: 0,
            reviews: [],
         });
         p.tags.map((t: string) => {
            if(!foundTags.includes(t)) {
                foundTags.push(t);
            }
         })
         if(!foundTags.includes(p.mainTag)) {
            foundTags.push(p.mainTag)
         }
        });
      });
    dispatch(setProducts(foundProducts));
    dispatch(setAllTags(foundTags));
  };

  useEffect(() => {
    getProducts()
  }, []);

  return null;
};

export default ProductUpdater;
