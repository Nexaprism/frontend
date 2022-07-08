import {
  alpha,
  Box,
  Button,
  Grid,
  Input,
  Slider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import DescriptionBox from "../components/DescriptionBox";
import DetailBox from "../components/DetailBox";
import NewsCard from "../components/NewsCard";
import RatingBig from "../components/RatingBig";
import ReviewCard from "../components/ReviewCard";
import Carousel from "react-material-ui-carousel";
import RatingSmall from "../components/RatingSmall";
import RatingMedium from "../components/ReviewMedium";

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
  const [sliderValue, setSliderValue] = useState<
    number | string | Array<number | string>
  >(0);

  const multilineStyles = {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  }

  const buttonStyles= {
    color: 'white',
    background: 'linear-gradient(to bottom, #bf1aed, #201438)',
    "&:hover": {
      background: "#cc7be3",
      transform: "none"
    },
  }

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(event.target.value === "" ? "" : Number(event.target.value));
  };

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
      {/* description */}
      <Stack direction="column" sx={{ display: "flex", alignItems: "center"}}>
        <Box sx={{ width: { xl: 1500, lg: 1200, md: 800, sm: 600 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
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

          {/* your rating */}
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%", pt: 5, pb: 5 }}
          >
            <Stack direction="row" spacing={8} width="80%" alignItems="center">
              <Box>
                <RatingMedium value={Number(sliderValue)} />
              </Box>
              <Stack direction="column" spacing={2} width="100%">
                <Stack direction="row" spacing={2}>
                  <Slider
                    aria-label="Your Rating:"
                    value={Number(sliderValue)}
                    getAriaValueText={valuetext}
                    color="secondary"
                    onChange={handleSliderChange}
                  />
                  <Input
                    value={sliderValue}
                    size="small"
                    onChange={handleInputChange}
                    //onBlur={handleBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 100,
                      type: "number",
                      "aria-labelledby": "input-slider",
                    }}
                    sx={{ minWidth: 45}}
                  />
                </Stack>

                <TextField
                  multiline
                  rows={5}
                  required
                  variant="filled"
                  placeholder="What do you think?..."
                  id="validation-outlined-input"
                  sx={multilineStyles}
                />
                <Button sx={buttonStyles}>Submit</Button>
              </Stack>
            </Stack>
          </Box>

          {/* ratings grid */}
          <Box
            sx={{
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
              height: "575px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
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
