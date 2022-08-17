import {
  Box,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Glance from "../components/Glance";
import JumboNews from "../components/JumboNews";
import NewsCard from "../components/NewsCard";
import ProductCard from "../components/ProductCard";
import SkeletonGlance from "../components/SkeletonGlance";
import SkeletonJumbo from "../components/SkeletonJumbo";
import SkeletonProduct from "../components/SkeletonProduct";
import { selectIsLoading, setIsLoading } from "../store/app/appReducer";
import { useGetArticle } from "../store/article/hooks";
import { Article } from "../store/article/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetProducts } from "../store/product/hooks";
import { Product } from "../store/product/types";


const Home: FC = () => {
  const [mostRecentCards, setMostRecentCards] = useState<any>([]);
  const [newestCards, setNewestCards] = useState<any>([]);
  const [popularCards, setPopularCards] = useState<any>([]);
  const [artList, setArtList] = useState<any[]>([
    {
      title: "",
      tags: [""],
      mainTag: "",
      imgUrl: "",
    },
  ]);
  const [newsItems, setNewsItems] = useState<any[]>();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const getArticleFuncs = useGetArticle();
  const getProductsFuncs = useGetProducts();
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  const getArticles = async () => {
    const data = await getArticleFuncs.getByMostRecent();
    return data;
  };

  const getMostRecentProd = async () => {
    dispatch(setIsLoading(true));
    const products = await (await getProductsFuncs).getByMostRecent();
    return products;
  };

  const getNewestProd = async () => {
    dispatch(setIsLoading(true));
    const products = await (await getProductsFuncs).getByNewest();
    return products;
  };

  const getPopularProd = async () => {
    dispatch(setIsLoading(true));
    const products = await (await getProductsFuncs).getByPopular();
    return products;
  };

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

  const addItemsToCarousel = (products: Product[], category: string) => {
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
    if (category == "recent") {
      setMostRecentCards(productItems);
    } else if (category == "newest") {
      setNewestCards(productItems);
    } else {
      setPopularCards(productItems);
    }
  };

  const addNewsItems = (allArticles: Article[]) => {
    const articles = allArticles;
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
      cardCount += carouselSize;
      if (cardCount > articles.length) {
        break;
      }
      page = [];
    }
    setNewsItems(articleItems);
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

  useEffect(() => {
    
    const getData = async () => {
      dispatch(setIsLoading(true));
      const articleData = await getArticles();
      const recentProductsData = await getMostRecentProd();
      const newestProductsData = await getNewestProd();
      const popularProductsData = await getPopularProd();
      setArtList(articleData.returnedArticles);
      const latestNewsArticles = articleData.returnedArticles.slice(1, 12);
      addNewsItems(latestNewsArticles);
      addItemsToCarousel(recentProductsData.prodArray, "recent");
      addItemsToCarousel(newestProductsData.prodArray, "newest");
      addItemsToCarousel(popularProductsData.prodArray, "popular");
      dispatch(setIsLoading(false));
    };
    getData();
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
            {isLoading ? (
              <SkeletonJumbo />
            ) : (
              <JumboNews
                title={artList[0].title}
                mainTag={artList[0].mainTag}
                tags={artList[0].tags}
                id={artList[0].id}
                imgUrl={artList[0].imgUrl}
              />
            )}
          </Box>

          <Box
            sx={{
              display: { md: "none", sm: "none", lg: "flex", xl: "flex" },
              width: "25%",
            }}
          >
            {isLoading ? (
              <SkeletonGlance />
            ) : (
              <Glance
                createdAt={artList[0].updatedAt}
                content={artList[0].content}
              />
            )}
          </Box>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h3">Recently Added</Typography>
        </Box>
        <Box sx={{ height: "275px", width: "auto" }}>
          {isLoading ? (
            <Stack direction="row" spacing={3}>
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </Stack>
          ) : (
            <Carousel
              sx={{ width: "100%" }}
              index={4}
              animation="slide"
              navButtonsAlwaysVisible={true}
            >
              {mostRecentCards}
            </Carousel>
          )}
        </Box>
        <Typography variant="h3">Most Popular</Typography>
        <Box sx={{ height: "275px", width: "auto" }}>
          {isLoading ? (
            <Stack direction="row" spacing={3}>
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </Stack>
          ) : (
            <Carousel
              sx={{ width: "100%" }}
              index={4}
              animation="slide"
              navButtonsAlwaysVisible={true}
            >
              {popularCards}
            </Carousel>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h3">Newest Releases</Typography>
        </Box>

        <Box sx={{ height: "275px", width: "auto" }}>
          {isLoading ? (
            <Stack direction="row" spacing={3}>
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </Stack>
          ) : (
            <Carousel
              sx={{ width: "100%" }}
              index={0}
              animation="slide"
              navButtonsAlwaysVisible={true}
            >
              {newestCards}
            </Carousel>
          )}
        </Box>
        <Typography variant="h3">Latest News</Typography>
        {isLoading ? (
          <Stack direction="row" spacing={3}>
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
          </Stack>
        ) : (
          <Carousel sx={{ width: "100%", pb: 2 }} index={4} animation="slide">
            {newsItems}
          </Carousel>
        )}
      </Stack>
    </Box>
  );
};

export default Home;
