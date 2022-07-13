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
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectIsLoggedIn } from "../store/app/appReducer";
import { selectToken, selectUsername } from "../store/user/userReducer";

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
  const [reviewContent, setReviewContent] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const token = useAppSelector(selectToken);
  const username = useAppSelector(selectUsername);


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

  const checkValid = (text: string) => {
    if (reviewContent === '' || text === '' || reviewContent.length < 10) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const submitReviewHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const graphqlQuery = {
      query: `
        mutation {
          createReview(reviewInput: {
            rating: "${Number(sliderValue)}", 
            content: "${reviewContent}", 
            date: "${today}",
          }) {
            _id
            user {
              username
            }
          }
        }
      `
    };
    fetch("http://localhost:3080/graphql", {
      method: "POST",
      headers: {
        "Authorization": 'Bearer ' + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        //error handling
        if(resData.errors && resData.errors[0].status === 422) {
          console.log(resData);
          throw new Error(
            "Validation failed. Could not authenticate user"
          )
        }
        if(resData.errors) {
          console.log(resData);
          throw new Error('Review creation failed');
        }
        //passed errors, set states & dispatching logic here
        console.log(resData);
        //@dev TO DO:
        //reroute user to the page they are currently on to refresh it
      })
      .catch(err => {
        console.log(err);
      })
  }

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
          component="form"
          onSubmit={submitReviewHandler}
            sx={{ display: "flex", justifyContent: "center", width: "100%", pt: 5, pb: 5 }}
          >
            
            <Stack direction="row" spacing={8} width="80%" alignItems="center">
              <Box>
                <RatingMedium value={Number(sliderValue)} />
              </Box>
              <Stack direction="column" spacing={2} width="100%">
              <Typography sx={{display: isLoggedIn ? "none" : "flex"}}>Log in or sign up to submit your own review</Typography>
                <Stack direction="row" spacing={2}>
                  <Slider
                    aria-label="Your Rating:"
                    value={Number(sliderValue)}
                    getAriaValueText={valuetext}
                    color="secondary"
                    onChange={handleSliderChange}
                    disabled={!isLoggedIn}
                  />
                  <Input
                    value={sliderValue}
                    size="small"
                    onChange={handleInputChange}
                    disabled={!isLoggedIn}
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
                  disabled={!isLoggedIn}
                  variant="filled"
                  placeholder="What do you think?..."
                  id="validation-outlined-input"
                  onChange={(e) => {setReviewContent(e.target.value); checkValid(e.target.value);}}
                  sx={multilineStyles}
                />
                <Button sx={buttonStyles} disabled={!isValid && !isLoggedIn} type="submit">Submit</Button>
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
                  <ReviewCard rating={review} user="username" content="great content here" date="4/20/2022" />
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
