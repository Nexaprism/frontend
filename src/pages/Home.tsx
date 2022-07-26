import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Glance from "../components/Glance";
import JumboNews from "../components/JumboNews";
import ProductCard from "../components/ProductCard";
import { Product } from "../store/product/types";

/**
 * big jumbo carousel of news w/ featured articles on the side (hidden on mobile)
 *
 * most recently added
 *
 * most popular (best review, and quantity of reviews factored in i.e. high score with more reviews has a higher weight)
 *
 * what's hot (most reviews in a 3 day period)
 *
 * latest news articles
 *
 */

const Home: FC = () => {
  const [big, setBig] = useState<any[]>();
  const [small, setSmall] = useState<any[]>();
  const [prodList, setProdList] = useState<any[]>([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const getProducts = async () => {
    let productList: Product[] = [];
    const graphqlQuery = {
      query: `
      {
        products {
            products {
                _id
                name
                imgUrl
                rating
                mainTag
                tags
                createdAt
                updatedAt
            }
        }
      }
        `,
    };
    fetch("http://localhost:3080/graphql", {
      method: "POST",
      headers: {
        //Authorization: "Bearer " + token,
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
        resData.data.products.products.map((product: any) => {
          let newProd: any = {
            imgUrl: product.imgUrl,
            name: product.name,
            id: product._id,
            rating: product.rating,
            mainTag: product.mainTag,
            tags: product.tags
          };
          productList.push(newProd);
        });
        setProdList(productList);
        addItems(productList);

      });
  };

  const addItems = (products: Product[]) => {
    const lessItems: Array<any> = [];
    const moreItems: Array<any> = [];

    for (let i = 0; i < 3; i++) {
      lessItems.push(
        <Stack
          direction="row"
          spacing={3}
          display="flex"
          justifyContent="center"
          key={i}
        >
          <ProductCard
            name={products[0].name}
            img={"http://localhost:3080/" + products[0].imgUrl}
            id={products[0].id}
            rating={products[0].rating}
            mainTag={products[0].mainTag}
            tags={products[0].tags}
          />
          <ProductCard
            name={products[1].name}
            img={"http://localhost:3080/" + products[1].imgUrl}
            id={products[1].id}
            rating={products[1].rating}
            mainTag={products[1].mainTag}
            tags={products[1].tags}
          />
          <ProductCard
            name={products[2].name}
            img={"http://localhost:3080/" + products[2].imgUrl}
            id={products[2].id}
            rating={products[2].rating}
            mainTag={products[2].mainTag}
            tags={products[2].tags}
          />
        </Stack>
      );
    }
    for (let i = 0; i < 3; i++) {
      moreItems.push(
        <Stack
          direction="row"
          spacing={3}
          display="flex"
          justifyContent="center"
          key={i}
        >
          <ProductCard
            name={products[0].name}
            img={"http://localhost:3080/" + products[0].imgUrl}
            id={products[0].id}
            rating={products[0].rating}
            mainTag={products[0].mainTag}
            tags={products[0].tags}
          />
          <ProductCard
            name={products[1].name}
            img={"http://localhost:3080/" + products[1].imgUrl}
            id={products[1].id}
            rating={products[1].rating}
            mainTag={products[1].mainTag}
            tags={products[1].tags}
          />
          <ProductCard
            name={products[2].name}
            img={"http://localhost:3080/" + products[2].imgUrl}
            id={products[2].id}
            rating={products[2].rating}
            mainTag={products[2].mainTag}
            tags={products[2].tags}
          />
          <ProductCard
            name={products[3].name}
            img={"http://localhost:3080/" + products[3].imgUrl}
            id={products[3].id}
            rating={products[3].rating}
            mainTag={products[3].mainTag}
            tags={products[3].tags}
          />
        </Stack>
      );
    }
    setSmall(lessItems);
    setBig(moreItems);
  };

  useEffect(() => {
    getProducts();
  }, [matches]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        direction="column"
        spacing={3}
        sx={{ width: { xl: 1500, lg: 1200, md: 800, sm: 600 } }}
      >
        <Stack
          direction="row"
          sx={{
            maxHeight: { xs: 350, md: 550, lg: 400 },
            width: "100%",
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: { sm: "100%", md: "100%", lg: "75%", xl: "75%" },
            }}
          >
            <JumboNews />
          </Box>

          <Box
            sx={{
              display: { md: "none", sm: "none", lg: "flex", xl: "flex" },
              width: "25%",
            }}
          >
            <Glance />
          </Box>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h3">Most Recent</Typography>
        </Box>
        <Box sx={{ height: "275px", width: "auto" }}>
          <Carousel
            sx={{ width: "100%" }}
            index={4}
            animation="slide"
            navButtonsAlwaysVisible={true}
          >
            {big}
          </Carousel>
        </Box>
        <Typography variant="h3">Most Popular</Typography>
        <Box sx={{ height: "275px", width: "auto" }}>
          <Carousel
            sx={{ width: "100%" }}
            index={4}
            animation="slide"
            navButtonsAlwaysVisible={true}
          >
            {big}
          </Carousel>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h3">What's Hot</Typography>
        </Box>

        <Box sx={{ height: "275px", width: "auto" }}>
          <Carousel
            sx={{ width: "100%" }}
            index={0}
            animation="slide"
            navButtonsAlwaysVisible={true}
          >
            {big}
          </Carousel>
        </Box>
        <Typography variant="h3">Latest News</Typography>
        <Box sx={{ backgroundColor: "orange", height: "200px", width: "auto" }}>
          Latest News articles
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
