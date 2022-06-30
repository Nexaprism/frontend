import { alpha, Box, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import DescriptionBox from "../components/DescriptionBox";
import DetailBox from "../components/DetailBox";
import NewsCard from "../components/NewsCard";
import RatingBig from "../components/RatingBig";
import ReviewCard from "../components/ReviewCard";
import Carousel from "react-material-ui-carousel";

/**
 * jumbo image
 *
 * big logo/header
 *
 * url links
 *
 * description
 *
 * list of currencies/cryptos
 *
 * rating
 *
 * company behind production
 *
 * names of developers
 *
 * technologies used (if any)
 *
 * tags/categories
 *
 */
const reviews = [20, 58, 99, 74, 88, 84, 71, 15, 100, 48];

const Product: FC = () => {
  const [items, setItems] = useState<any[]>();
  const theme = useTheme();

  const addItems = () => {
    const newsItems: Array<any> = [];
    for (let i = 0; i < 3; i++) {
      newsItems.push(
        <Stack direction="row" spacing={3}>
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </Stack>
      );
    }
    setItems(newsItems);
  };

  useEffect(() => {
    addItems();
  });

  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      <Box
        id="jumbo"
        sx={{
          width: "100%",
          height: "50vh",
          backgroundColor: "red",
          display: "flex",
        }}
      >
        <Typography variant="h1" sx={{ width: "75%" }}>
          Big Logo
        </Typography>
        <Box
          sx={{
            width: "25%",
            backgroundColor: alpha("#807e7c", 0.55),
            minWidth: "250px",
          }}
        >
          <DetailBox />
        </Box>
      </Box>
      <Stack direction='column' sx={{ display: 'flex', alignItems: 'center'}}>
        <Box sx={{width: {xl: 1500, lg: 1200, md: 800, sm: 600} }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            backgroundColor: "gray",
            height: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            <DescriptionBox />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <RatingBig value={84} />
          </Box>
        </Stack>

        <Box
          sx={{
            backgroundColor: "purple",
            height: "auto",
            flexGrow: 1,
            p: 3,
          }}
        >
          <Grid container spacing={3}>
            {reviews.map((review) => (
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ReviewCard rating={review} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            backgroundColor: "gray",
            height: "575px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2
          }}
        >
            <Carousel sx={{ width: "100%" }} index={4} animation="slide">
              {items}
            </Carousel>
        </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Product;
