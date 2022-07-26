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
import {
  selectIsLoading,
  selectIsLoggedIn,
  setIsLoading,
} from "../store/app/appReducer";
import { selectToken, selectUsername } from "../store/user/userReducer";
import { User } from "../store/user/userTypes";
import image from "../assets/img/largeImage.jpeg";
import { useParams } from "react-router-dom";
import { Product } from "../store/product/types";
import { Article } from "../store/article/types";
import { useGetProductQuery } from "../store/product/hooks";
import { useGetAllArticlesQuery } from "../store/article/hooks";

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

const user: User = {
  username: "awesomeguy",
  id: "1660642",
  reviews: ["good", "bad", "ok"],
  avatar: "picture here",
  email: "awesome@test.com",
  password: "password",
};

const ProductPage: FC = () => {
  const [items, setItems] = useState<any[]>();
  const [sliderValue, setSliderValue] = useState<
    number | string | Array<number | string>
  >(0);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>({
    name: "",
    imgUrl: "",
    description: "",
    url: "",
    company: "",
    developers: [""],
    launchDate: "",
    marketCap: "",
    token: "",
    governance: "",
    blockchain: "",
    createdAt: "",
    updatedAt: "",
    id: "",
    rating: 0,
    mainTag: "",
    tags: [""],
  });
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const token = useAppSelector(selectToken);
  const isLoading = useAppSelector(selectIsLoading);
  const { id } = useParams();
  const findProducts = useGetProductQuery(id);
  const articles = useGetAllArticlesQuery();

  const multilineStyles = {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
    minWidth: 350,
  };

  const buttonStyles = {
    color: "white",
    background: "linear-gradient(to bottom, #bf1aed, #201438)",
    "&:hover": {
      background: "#cc7be3",
      transform: "none",
    },
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  const checkValid = (text: string) => {
    if (reviewContent === "" || text === "" || reviewContent.length < 10) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const getProduct = async () => {
    dispatch(setIsLoading(true));
    return findProducts;
  };

  const getArticles = async () => {
    return articles;
  };

  const submitReviewHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const graphqlQuery = {
      query: `
        mutation {
          createReview(reviewInput: {
            rating: "${Number(sliderValue)}", 
            content: "${reviewContent}", 
            productId: "${id}",
          }) {
            _id
            user {
              username
            }
          }
        }
      `,
    };
    fetch("http://localhost:3080/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        //error handling
        if (resData.errors && resData.errors[0].status === 422) {
          console.log(resData);
          throw new Error("Validation failed. Could not authenticate user");
        }
        if (resData.errors) {
          console.log(resData);
          throw new Error("Review creation failed");
        }
        //passed errors, set states & dispatching logic here
        console.log(resData);
        //@dev TO DO:
        //reroute user to the page they are currently on to refresh it
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addItems = (articles: Article[]) => {
    const newsItems: Array<any> = [];
    console.log(articles)
    for (let i = 0; i < 3; i++) {
      newsItems.push(
        <Stack direction="row" spacing={3} key={i}>
          <NewsCard
            image={"http://localhost:3080/" + articles[0].imgUrl}
            content={articles[0].content}
            title={articles[0].title}
            date={articles[0].updatedAt}
            id={articles[0].id}
          />
          <NewsCard
            image={"http://localhost:3080/" + articles[1].imgUrl}
            content={articles[1].content}
            title={articles[1].title}
            date={articles[1].updatedAt}
            id={articles[1].id}
          />
          <NewsCard
            image={"http://localhost:3080/" + articles[0].imgUrl}
            content={articles[0].content}
            title={articles[0].title}
            date={articles[0].updatedAt}
            id={articles[0].id}
          />
          <NewsCard
            image={"http://localhost:3080/" + articles[1].imgUrl}
            content={articles[1].content}
            title={articles[1].title}
            date={articles[1].updatedAt}
            id={articles[1].id}
          />
        </Stack>
      );
    }
    setItems(newsItems);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    const getData = async () => {
      const data: Product | undefined = await getProduct();
      const artData: Article[] | undefined = await getArticles();
      setProduct(data);
      addItems(artData);
      console.log(artData);
    };
    getData();
    dispatch(setIsLoading(false));
  }, [isLoading]);

  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      <Box
        id="jumbo"
        sx={{
          width: "100%",
          height: {
            xl: "50vh",
            lg: "50vh",
            md: "80vh",
            sm: "80vh",
            xs: "80vh",
          },
          backgroundSize: "cover",
          backgroundImage:
            product == undefined
              ? "none"
              : `url(${"http://localhost:3080/" + product.imgUrl})`,
          display: "flex",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          },
          boxShadow: 6,
        }}
      >
        <Box
          id="detailBox"
          sx={{
            width: { xl: "75%", lg: "75%", md: "100%", sm: "100%", xs: "100%" },
            backgroundColor: "black",
            height: { xl: "100%", lg: "100%", md: "75%", sm: "75%", xs: "75%" },
          }}
        >
          <Typography
            sx={{
              width: "75%",
              color: "white",
              fontSize: { lg: "6.5em", sm: "6.5em", xs: "5em" },
              pl: 4,
            }}
          >
            {product == undefined ? "temp" : product.name}
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xl: "25%", lg: "25%", md: "100%", sm: "100%", xs: "100%" },
            backgroundColor: alpha("#807e7c", 0.55),
            minWidth: "250px",
          }}
        >
          <DetailBox
            token={product == undefined ? "temp" : product.token}
            blockchain={product == undefined ? "temp" : product.blockchain}
            governance={product == undefined ? "temp" : product.governance}
            marketCap={product == undefined ? "temp" : product.marketCap}
            launchDate={product == undefined ? "temp" : product.launchDate}
          />
        </Box>
      </Box>
      {/* description */}
      <Stack direction="column" sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: { xl: 1500, lg: 1200, md: 900, sm: 600 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              {product == undefined ? (
                ""
              ) : (
                <DescriptionBox
                  description={product.description}
                  company={product.company}
                  developers={product.developers}
                  url={product.url}
                />
              )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {!isLoading && product && product.rating > 0 ? (
                <RatingBig value={product.rating} />
              ) : null}
            </Box>
          </Stack>

          {/* your rating */}
          <Box
            component="form"
            onSubmit={submitReviewHandler}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              pt: 5,
              pb: 5,
            }}
          >
            <Stack direction="row" spacing={8} width="80%" alignItems="center">
              <Box>
                <RatingMedium value={Number(sliderValue)} />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    pt: 2,
                  }}
                >
                  <Typography>Your rating</Typography>
                </Box>
              </Box>
              <Stack direction="column" spacing={2} width="100%">
                <Typography sx={{ display: isLoggedIn ? "none" : "flex" }}>
                  Log in or sign up to submit your own review
                </Typography>
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
                    sx={{ minWidth: 45 }}
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
                  onChange={(e) => {
                    setReviewContent(e.target.value);
                    checkValid(e.target.value);
                  }}
                  sx={multilineStyles}
                />
                <Button
                  sx={buttonStyles}
                  disabled={!isValid && !isLoggedIn}
                  type="submit"
                >
                  Submit
                </Button>
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
              {reviews.map((review, index) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                  key={index}
                >
                  <ReviewCard
                    rating={review}
                    user={user}
                    content="great content here"
                    date="4/20/2022"
                  />
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

export default ProductPage;
