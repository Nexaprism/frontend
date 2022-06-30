import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Glance from "../components/Glance";
import JumboNews from "../components/JumboNews";
import ProductCard from "../components/ProductCard";

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
  const [items, setItems] = useState<any[]>();

  const addItems = () => {
    const newsItems: Array<any> = [];
    for (let i = 0; i < 3; i++) {
      newsItems.push(
        <Stack direction="row" spacing={3} display='flex' justifyContent='center'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Stack>
      );
    }
    setItems(newsItems);
  };

  useEffect(() => {
    addItems();
  });

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
            backgroundColor: "red",
            maxHeight: { xs: 350, md: 550, lg: 400 },
            width: "100%",
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
        <Box sx={{ height: "275px", width: "auto"}}>
          <Carousel sx={{ width: "100%" }} index={4} animation="slide" navButtonsAlwaysVisible={true}>
            {items}
          </Carousel>
        </Box>
        <Typography variant="h3">Most Popular</Typography>
        <Box sx={{  height: "275px", width: "auto" }}>
        <Carousel sx={{ width: "100%" }} index={4} animation="slide" navButtonsAlwaysVisible={true}>
            {items}
          </Carousel>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h3">What's Hot</Typography>
        </Box>

        <Box sx={{  height: "275px", width: "auto" }}>
        <Carousel sx={{ width: "100%" }} index={4} animation="slide" navButtonsAlwaysVisible={true}>
            {items}
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
