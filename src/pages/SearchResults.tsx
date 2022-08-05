import { Box, Divider, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Product } from "../store/product/types";

const SearchResults: FC = () => {
  const { tags } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [grid, setGrid] = useState<any>();

  const doSearch = async (value: string) => {
    let foundProducts: any[] = [];
    const graphqlQuery = {
      query: `
          {
            searchForProducts(filter: "${value}") {
              products {
                _id
                name
                tags
                mainTag
                rating
                imgUrl
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

        resData.data.searchForProducts.products.map((p: any) => {
          foundProducts.push({
            id: p._id,
            name: p.name,
            imgUrl: p.imgUrl,
            rating: p.rating,
            tags: p.tags,
            mainTag: p.mainTag,
          });
        });
      });
    setProducts(foundProducts);
    createGrid(foundProducts);
  };

  const createGrid = (products: Product[]) => {
    const url = "http://localhost:3080/";
    const productCardGrid = (
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {products.map((p) => {
          return (
            <Grid item sx={{flexGrow: 0}} key={p.id}>
              <ProductCard
                rating={p.rating}
                id={p.id}
                img={url + p.imgUrl}
                name={p.name}
                tags={p.tags}
                mainTag={p.mainTag}
              />
            </Grid>
          );
        })}
      </Grid>
    );

    setGrid(productCardGrid);
  };

  useEffect(() => {
    if (tags) {
      doSearch(tags);
    }
  }, [tags]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h1">Search Results</Typography>
      <Divider sx={{ mb: 5 }} />
      <Box sx={{}}>{grid}</Box>
    </Box>
  );
};

export default SearchResults;
