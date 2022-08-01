import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import Glance from "../components/Glance";
import JumboNews from "../components/JumboNews";
import MiniProductCard from "../components/MiniProductCard";
import NewsCard from "../components/NewsCard";
import ProductCard from "../components/ProductCard";
import { selectIsLoading, setIsLoading } from "../store/app/appReducer";
import {
  useGetArticlesMainTag,
  useGetLatestArticleByTag,
} from "../store/article/hooks";
import { Article } from "../store/article/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetProductsMainTag } from "../store/product/hooks";
import { Product } from "../store/product/types";
import { metaverseDescription, arDescription, vrDescription } from "../store/app/constants";

const Metaverses: FC = () => {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const [pageDescription, setPageDescription] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("");
  const [firstHalf, setFirstHalf] = useState<any>([]);
  const [products, setProducts] = useState<any[]>();
  const [newsItems, setNewsItems] = useState<any[]>();
  const [reload, setReload] = useState<boolean>(true);
  const [latestNews, setLatestNews] = useState<Article>({
    id: "",
    title: "",
    author: "",
    content: "",
    mainTag: "",
    tags: [""],
    createdAt: "",
    updatedAt: "",
    imgUrl: "",
  });
  const [enabledButton, setEnabledButton] = useState<boolean[]>([
    false,
    false,
    true,
  ]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const metaverseProducts = useGetProductsMainTag(category);
  const metaverseArticles = useGetArticlesMainTag(category);
  const isLoading = useAppSelector(selectIsLoading);

  const buttonStyles = {
    "&:hover": { transform: "none" },
  };

  const getProducts = async () => {
    dispatch(setIsLoading(true));
    return metaverseProducts;
  };

  const getArticles = async () => {
    dispatch(setIsLoading(true));
    return metaverseArticles;
  };

  // const getLatestArticle = async () => {
  //   return latestMetaArticle;
  // }

  const makeCarouselPage = (
    index: number,
    products: Product[],
    pageSize: number
  ) => {
    let page: any[] = [];
    for (let i = 0; i < pageSize; i++) {
      if (index > products.length - 1) {
        break;
      }
      page.push(
        <ProductCard
          key={index}
          name={products[index].name}
          img={"http://localhost:3080/" + products[index].imgUrl}
          id={products[index].id}
          rating={products[index].rating}
          mainTag={products[index].mainTag}
          tags={products[index].tags}
        />
      );
      index++;
    }
    return page;
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

  const addItems = (allProducts: Product[]) => {
    const products = allProducts.slice(0, 11);
    const productItems: Array<any> = [];
    let page: any[] = [];
    let cardCount = 0;
    let carouselSize = matches ? 4 : 3;
    let carouselPageCount = matches ? 2 : 3;
    for (let i = 0; i < carouselPageCount; i++) {
      page = makeCarouselPage(cardCount, products, carouselSize);
      productItems.push(
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
      if (cardCount > products.length) {
        break;
      }
      page = [];
    }
    setProducts(productItems);
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

  const separateTheItems = (products: Product[]) => {
    let itemArray: any = [];
    let color = "white";
    if (matches) {
      let row = false;
      let countToTwo = 0;
      products.map((product, index) => {
        if (countToTwo == 0 && !row) {
          color = "linear-gradient(to bottom, #cdcccf, #ababab)";
        } else if (countToTwo == 1 && !row) {
          color = "linear-gradient(to right bottom, #7d7d7d, #4d4d4d)";
        } else if (countToTwo == 0 && row) {
          color = "linear-gradient(to right bottom, #7d7d7d, #4d4d4d)";
        } else if (countToTwo == 1 && row) {
          color = "linear-gradient(to bottom, #cdcccf, #ababab)";
        }
        itemArray.push(
          <Grid
            key={product.name}
            item
            xs={12}
            md={6}
            sx={{ background: color }}
          >
            <MiniProductCard
              id={product.id}
              name={product.name}
              rating={product.rating}
            />
          </Grid>
        );
        if (!row && countToTwo == 1) {
          row = true;
        } else if (row && countToTwo == 1) {
          row = false;
        }
        countToTwo++;
        countToTwo = countToTwo > 1 ? 0 : countToTwo;
      });
    } else {
      products.map((product, index) => {
        color =
          index % 2
            ? "linear-gradient(to right bottom, #7d7d7d, #4d4d4d)"
            : "linear-gradient(to bottom, #cdcccf, #ababab)";
        itemArray.push(
          <Grid
            key={product.name}
            item
            xs={12}
            md={6}
            sx={{ background: color }}
          >
            <MiniProductCard
              id={product.id}
              name={product.name}
              rating={product.rating}
            />
          </Grid>
        );
      });
    }
    setFirstHalf(itemArray);
  };

  const sortButtonHandler = (index: number) => {
    let variantArray = [false, false, false];
    variantArray[index] = true;
    setEnabledButton(variantArray);
  };

  useEffect(() => {
    const getData = async () => {
      const metaProdData = await getProducts();
      const metaArtData = await getArticles();
      //const metaNewsArt = await getLatestArticle();
      setLatestNews(metaArtData.returnedArticles[0]);
      addItems(metaProdData.prodArray);
      addNewsItems(metaArtData.returnedArticles);
      //console.log(metaNewsArt);
      separateTheItems(metaProdData.prodArray);
      dispatch(setIsLoading(false));
      console.log(metaProdData)
    };
    getData();
    if(category == "AR") {
      setPageTitle("Augmented Reality (AR)");
      setPageDescription(arDescription);
    } else if (category == "VR") {
      setPageTitle("Virtual Reality (VR)");
      setPageDescription(vrDescription);
    } else {
      setPageTitle("The Metaverse");
      setPageDescription(metaverseDescription);
    }
    setTimeout(() => {
      setReload(false);
    }, 1500);
  }, [reload, matches, category]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
      <Stack
        direction="column"
        spacing={4}
        sx={{ width: { xl: 1500, lg: 1200, md: 800, sm: 600 } }}
      >
        <Box>
          <Box>
            <Typography variant="h2">{pageTitle}</Typography>
          </Box>
          <Box sx={{ pb: 2 }}>
            <Typography>
              {pageDescription}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Stack
            direction="row"
            sx={{
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
              <JumboNews
                title={latestNews.title}
                mainTag={latestNews.mainTag}
                tags={latestNews.tags}
                id={latestNews.id}
                imgUrl={latestNews.imgUrl}
              />
            </Box>

            <Box
              sx={{
                display: { md: "none", sm: "none", lg: "flex", xl: "flex" },
                width: "25%",
              }}
            >
              <Glance createdAt={latestNews.createdAt} content={latestNews.content}/>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h3">Most Recent</Typography>
        </Box>
        <Box sx={{ height: "275px", width: "auto" }}>
          <Carousel
            sx={{ width: "100%" }}
            index={4}
            animation="slide"
            navButtonsAlwaysVisible={true}
          >
            {products}
          </Carousel>
        </Box>
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-evenly", pt: 2 }}
        >
          <Typography variant="h5">Sort By:</Typography>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              sx={buttonStyles}
              variant={enabledButton[0] == true ? "contained" : "outlined"}
              onClick={() => sortButtonHandler(0)}
            >
              Highest First
            </Button>
            <Button
              sx={buttonStyles}
              variant={enabledButton[1] == true ? "contained" : "outlined"}
              onClick={() => sortButtonHandler(1)}
            >
              Lowest First
            </Button>
            <Button
              sx={buttonStyles}
              variant={enabledButton[2] == true ? "contained" : "outlined"}
              onClick={() => sortButtonHandler(2)}
            >
              Most Recent
            </Button>
          </ButtonGroup>
        </Stack>
        <Grid
          container
          direction="row"
          sx={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {firstHalf.map((item: any) => {
            return item;
          })}
        </Grid>

        <Carousel sx={{ width: "100%" }} index={4} animation="slide">
          {newsItems}
        </Carousel>
      </Stack>
    </Box>
  );
};

export default Metaverses;