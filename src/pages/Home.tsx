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
  const [big, setBig] = useState<any[]>();
  const [small, setSmall] = useState<any[]>();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const addItems = () => {
    const lessItems: Array<any> = [];
    const moreItems: Array<any> = [];

    for (let i = 0; i < 3; i++) {
      lessItems.push(
        <Stack
          direction="row"
          spacing={3}
          display="flex"
          justifyContent="center"
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
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
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Stack>
      );
    }
    setSmall(lessItems);
    setBig(moreItems);
  };

  useEffect(() => {
    addItems();
  }, [ matches]);

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
            { big}
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
            { big}
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
            { big}
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
