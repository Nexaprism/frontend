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
  Skeleton,
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
import RatingMedium from "../components/RatingMedium";
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
import { useGetArticle } from "../store/article/hooks";
import { useReviews } from "../store/review/hooks";
import SkeletonProduct from "../components/SkeletonProduct";
import SkeletonJumbo from "../components/SkeletonJumbo";
import SkeletonGlance from "../components/SkeletonGlance";


const ProductPage: FC = () => {
  const [sliderValue, setSliderValue] = useState<number | string>(0);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<AlertColor>("error");
  const [newsItems, setNewsItems] = useState<any[]>();
  const [product, setProduct] = useState<Product>({
    
  } as Product);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userId = useAppSelector(selectUserId);
  const token = useAppSelector(selectToken);
  const isLoading = useAppSelector(selectIsLoading);
  const { id } = useParams();
  const findProducts = useGetProductQuery(id);
  const getArticleFuncs = useGetArticle();
  const reviewFunc = useReviews();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const isXS = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isSM = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const acctLink = <a href="/account">My Profile</a>;
  const editReviewMsg = (
    <Typography>
      You have already submitted a review. Edit or delete your review before
      submitting another. You can find your reviews at the "{acctLink}" page.
    </Typography>
  );
  

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

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
    minWidth: {xs: 270, sm: 350},
  };

  const buttonStyles = {
    color: "white",
    background: "linear-gradient(to bottom, #a373f5, #4d2e82)",
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
    const data = await getArticleFuncs.getByMostRecent();
    return data;
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
          image={`${API_ENDPOINT}` + articles[index].imgUrl}
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
    let carouselSize = 2;
    let carouselPageCount = 4;
    if(isXS) {
      carouselSize = 2;
      carouselPageCount = 4;
    } else if (matches) {
      carouselSize = 4;
      carouselPageCount = 2;
    }
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
      cardCount += carouselSize;
      if (cardCount > articles.length) {
        break;
      }
      page = [];
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
      dispatch(setIsLoading(true));
      const productData: Product | undefined = await getProduct();
      const artData = await getArticles();
      const dateCorrectedProduct = correctDates(productData);
      if (dateCorrectedProduct) {
        setProduct(dateCorrectedProduct);
      }
      addNewsItems(artData.returnedArticles);
      dispatch(setIsLoading(false));
    };
    getData();
  }, []);

  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ width: "70%", m: 2 }}>
            <SkeletonJumbo />
          </Box>
          <Box sx={{ width: "30%", m: 2 }}>
            <SkeletonGlance />
          </Box>
        </Box>
      ) : (
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
            backgroundPosition: "center",
            backgroundImage:
              product == undefined
                ? "none"
                : `url(${`${API_ENDPOINT}` + product.imgUrl})`,
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
              width: {
                xl: "75%",
                lg: "75%",
                md: "100%",
                sm: "100%",
                xs: "100%",
              },
              backgroundColor: "black",
              height: {
                xl: "100%",
                lg: "100%",
                md: "75%",
                sm: "75%",
                xs: "75%",
              },
            }}
          >
            <Typography
              sx={{
                width: "75%",
                color: "white",
                fontSize: { lg: "6em", sm: "5.5em", xs: "5em" },
                pl: 4,
              }}
            >
              {product == undefined ? "temp" : product.name}
            </Typography>
          </Box>

          <Box
            sx={{
              width: {
                xl: "25%",
                lg: "25%",
                md: "100%",
                sm: "100%",
                xs: "100%",
              },
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
      )}

      {/* description */}
      <Box
        position="relative"
        sx={{ top: { lg: -100 }, bottom: { md: 300, sm: 300, xs: 300 } }}
      >
        {product.tags == undefined
          ? ""
          : product.tags.map((t) => (
              <Chip sx={{ m: 1, zIndex: 12, boxShadow: 4 }} label={t} key={t} />
            ))}
      </Box>
      <Stack direction="column" sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: { xl: 1500, lg: "75rem", md: "65rem", sm: 600, xs: 340 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              {isLoading || !product.description ? (
                <Box sx={{ width: "100%", m: 3 }}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", width: "100%" }}
                  />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                </Box>
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
              {isLoading ? (
                <Skeleton variant="circular" width={200} height={200} />
              ) : (
                <RatingBig value={product.rating} />
              )}
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
            <Stack direction={{xs: "column", sm: "row"}} spacing={8} width="80%" alignItems="center">
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
                <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
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
              {product.reviews && product.reviews.length > 0 ? (
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
            {isLoading ? (
              <Stack direction="row" spacing={3}>
                <SkeletonProduct />
                <SkeletonProduct />
                <SkeletonProduct />
                <SkeletonProduct />
              </Stack>
            ) : (
              <Carousel sx={{ width: "100%" }} index={4} animation="slide" navButtonsAlwaysVisible={true}>
                {newsItems}
              </Carousel>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductPage;
