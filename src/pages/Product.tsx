import {
  Alert,
  alpha,
  Box,
  Button,
  Chip,
  Grid,
  Input,
  Slider,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Slide,
  AlertColor,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import DescriptionBox from "../components/DescriptionBox";
import DetailBox from "../components/DetailBox";
import NewsCard from "../components/NewsCard";
import RatingBig from "../components/RatingBig";
import ReviewCard from "../components/ReviewCard";
import Carousel from "react-material-ui-carousel";
import { SlideProps } from "@mui/material/Slide";
import RatingSmall from "../components/RatingSmall";
import RatingMedium from "../components/ReviewMedium";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectIsLoading,
  selectIsLoggedIn,
  setIsLoading,
} from "../store/app/appReducer";
import {
  selectToken,
  selectUserId,
  selectUsername,
} from "../store/user/userReducer";
import { useParams } from "react-router-dom";
import { Product } from "../store/product/types";
import { Article } from "../store/article/types";
import { useGetProductQuery } from "../store/product/hooks";
import { useGetAllArticlesQuery } from "../store/article/hooks";
import { useReviews } from "../store/review/hooks";

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

const ProductPage: FC = () => {
  const [sliderValue, setSliderValue] = useState<number | string>(0);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<AlertColor>("error");
  const [newsItems, setNewsItems] = useState<any[]>();
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
    reviews: [],
  });
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userId = useAppSelector(selectUserId);
  const token = useAppSelector(selectToken);
  const isLoading = useAppSelector(selectIsLoading);
  const { id } = useParams();
  const findProducts = useGetProductQuery(id);
  const articles = useGetAllArticlesQuery();
  const reviewFunc = useReviews();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const acctLink = <a href="/account">My Profile</a>;
  const editReviewMsg = (
    <Typography>
      You have already submitted a review. Edit or delete your review before
      submitting another. You can find your reviews at the "{acctLink}" page.
    </Typography>
  );

  type TransitionProps = Omit<SlideProps, "direction">;

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
  }

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
    setSliderValue(Number(newValue));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleSnackClose = () => {
    setOpen(false);
  };

  const getProduct = async () => {
    dispatch(setIsLoading(true));
    return findProducts;
  };

  const correctDates = (product: Product | undefined) => {
    if (product) {
      let updatedProduct = product;
      product.reviews.map((r, index) => {
        if (r.user._id == userId) {
          setHasReviewed(true);
        }
        let date = new Date(r.createdAt);
        updatedProduct.reviews[index].createdAt = date.toLocaleDateString();
      });
      return updatedProduct;
    } else {
      return null;
    }
  };

  const getArticles = async () => {
    return articles;
  };

  const makeNewsCarouselPage = (
    index: number,
    articles: Article[],
    pageSize: number
  ) => {
    let page: any[] = [];
    for (let i = 0; i < pageSize; i++) {
      if (index > articles.length - 1) {
        break;
      }
      page.push(
        <NewsCard
          key={index}
          title={articles[index].title}
          image={"http://localhost:3080/" + articles[index].imgUrl}
          id={articles[index].id}
          content={articles[index].content}
          date={articles[index].updatedAt}
        />
      );
      index++;
    }
    return page;
  };

  const addNewsItems = (allArticles: Article[]) => {
    const articles = allArticles.slice(0, 11);
    const articleItems: Array<any> = [];
    let page: any[] = [];
    let cardCount = 0;
    let carouselSize = matches ? 4 : 3;
    let carouselPageCount = matches ? 2 : 3;
    for (let i = 0; i < carouselPageCount; i++) {
      page = makeNewsCarouselPage(cardCount, articles, carouselSize);
      articleItems.push(
        <Stack
          key={i}
          direction="row"
          spacing={3}
          display="flex"
          justifyContent="center"
        >
          {page.map((card) => {
            return card;
          })}
        </Stack>
      );
    }
    setNewsItems(articleItems);
  };

  const submitReviewHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const feedback = await reviewFunc.submit(
      sliderValue,
      reviewContent,
      id,
      token
    );
    if (feedback.success) {
      setAlertStatus("success");
      setMessage(feedback.message);
      setOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 6500);
    } else {
      setAlertStatus("error");
      setMessage(feedback.message);
      setOpen(true);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      const productData: Product | undefined = await getProduct();
      const artData: Article[] | undefined = await getArticles();
      const dateCorrectedProduct = correctDates(productData);
      if (dateCorrectedProduct) {
        setProduct(dateCorrectedProduct);
      }
      addNewsItems(artData);
    };
    getData();
    dispatch(setIsLoading(false));
  }, [isLoading]);

  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      <Box
        id="jumbo"
        sx={{
          zIndex: -1,
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
              fontSize: { lg: "6.5em", sm: "6em", xs: "5em" },
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
      <Box
        position="relative"
        sx={{ top: { lg: -100 }, bottom: { md: 300, sm: 300, xs: 300 } }}
      >
        {product == undefined
          ? ""
          : product.tags.map((t) => (
              <Chip sx={{ m: 1, zIndex: 12, boxShadow: 4 }} label={t} key={t} />
            ))}
      </Box>
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
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleSnackClose}
              TransitionComponent={TransitionUp}
            >
              <Alert onClose={handleSnackClose} severity={alertStatus}>
                {message}
              </Alert>
            </Snackbar>
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
                <Box
                  sx={{ display: isLoggedIn && hasReviewed ? "flex" : "none" }}
                >
                  {editReviewMsg}
                </Box>
                <Stack direction="row" spacing={2}>
                  <Slider
                    aria-label="Your Rating:"
                    value={Number(sliderValue)}
                    getAriaValueText={valuetext}
                    color="secondary"
                    onChange={handleSliderChange}
                    disabled={!isLoggedIn || hasReviewed}
                  />
                  <Input
                    value={sliderValue}
                    size="small"
                    onChange={handleInputChange}
                    disabled={!isLoggedIn || hasReviewed}
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
                  disabled={!isLoggedIn || hasReviewed}
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
                  disabled={(!isValid && !isLoggedIn) || hasReviewed}
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
              {product && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                    key={index}
                  >
                    <ReviewCard
                      id={review._id}
                      rating={review.rating}
                      user={review.user}
                      content={review.content}
                      date={review.createdAt}
                      prodId={review.productId}
                    />
                  </Grid>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="h3">No reviews yet</Typography>
                </Box>
              )}
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
              {newsItems}
            </Carousel>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductPage;
