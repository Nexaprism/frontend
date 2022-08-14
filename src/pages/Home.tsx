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
import { selectIsLoading, setIsLoading } from "../store/app/appReducer";
import { useGetArticlesMostRecent } from "../store/article/hooks";
import { Article } from "../store/article/types";
import { useAppSelector } from "../store/hooks";
import { useGetProducts } from "../store/product/hooks";
import { Product } from "../store/product/types";

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
  const [prodList, setProdList] = useState<any[]>([]);
  const [mostRecentProd, setMostRecentProd] = useState<any[]>([]);
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
  const mostRecentArticles = useGetArticlesMostRecent();
  const getProductsFuncs = useGetProducts();
  const isLoading = useAppSelector(selectIsLoading);

  const getArticles = async () => {
    return mostRecentArticles;
  };

  const getMostRecentProd = async () => {
    const products = await (await getProductsFuncs).getByMostRecent();
    return products;
  }

  const getNewestProd = async () => {
    const products = await (await getProductsFuncs).getByNewest();
    return products;
  }

  const getPopularProd = async () => {
    const products = await (await getProductsFuncs).getByPopular();
    return products;
  }

  const getProducts = async () => {
    let productList: Product[] = [];
    const graphqlQuery = {
      query: `
      {
        products {
            products {
                _id
                name
                imgUrl
                rating
                mainTag
                tags
                createdAt
                updatedAt
            }
        }
      }
        `,
    };
    fetch("http://localhost:3080/graphql", {
      method: "POST",
      headers: {
        //Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          console.log(resData);
          throw new Error("Fetching products failed");
        }
        resData.data.products.products.map((product: any) => {
          let newProd: any = {
            imgUrl: product.imgUrl,
            name: product.name,
            id: product._id,
            rating: product.rating,
            mainTag: product.mainTag,
            tags: product.tags,
          };
          productList.push(newProd);
        });
        setProdList(productList);
        addItems(productList);
      });
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
    if(category == "recent") {
      setMostRecentCards(productItems);
    } else if (category == "newest") {
      setNewestCards(productItems);
    } else {
      setPopularCards(productItems);
    }
    
  }

  const addItems = (products: Product[]) => {
    const lessItems: Array<any> = [];
    const moreItems: Array<any> = [];

    for (let i = 0; i < 3; i++) {
      lessItems.push(
        <Stack
          direction="row"
          spacing={3}
          display="flex"
          justifyContent="center"
          key={i}
        >
          <ProductCard
            name={products[0].name}
            img={"http://localhost:3080/" + products[0].imgUrl}
            id={products[0].id}
            rating={products[0].rating}
            mainTag={products[0].mainTag}
            tags={products[0].tags}
          />
          <ProductCard
            name={products[1].name}
            img={"http://localhost:3080/" + products[1].imgUrl}
            id={products[1].id}
            rating={products[1].rating}
            mainTag={products[1].mainTag}
            tags={products[1].tags}
          />
          <ProductCard
            name={products[2].name}
            img={"http://localhost:3080/" + products[2].imgUrl}
            id={products[2].id}
            rating={products[2].rating}
            mainTag={products[2].mainTag}
            tags={products[2].tags}
          />
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
          key={i}
        >
          <ProductCard
            name={products[0].name}
            img={"http://localhost:3080/" + products[0].imgUrl}
            id={products[0].id}
            rating={products[0].rating}
            mainTag={products[0].mainTag}
            tags={products[0].tags}
          />
          <ProductCard
            name={products[1].name}
            img={"http://localhost:3080/" + products[1].imgUrl}
            id={products[1].id}
            rating={products[1].rating}
            mainTag={products[1].mainTag}
            tags={products[1].tags}
          />
          <ProductCard
            name={products[2].name}
            img={"http://localhost:3080/" + products[2].imgUrl}
            id={products[2].id}
            rating={products[2].rating}
            mainTag={products[2].mainTag}
            tags={products[2].tags}
          />
          <ProductCard
            name={products[3].name}
            img={"http://localhost:3080/" + products[3].imgUrl}
            id={products[3].id}
            rating={products[3].rating}
            mainTag={products[3].mainTag}
            tags={products[3].tags}
          />
        </Stack>
      );
    }
    setSmall(lessItems);
    setBig(moreItems);
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
    setIsLoading(true);
    const getData = async () => {
      const articleData = await getArticles();
      const recentProductsData = await getMostRecentProd();
      const newestProductsData = await getNewestProd();
      const popularProductsData = await getPopularProd();
      setArtList(articleData.returnedArticles);
      //setMostRecentProd(recentProductsData.prodArray);
      const latestNewsArticles = articleData.returnedArticles.slice(1, 12);
      addNewsItems(latestNewsArticles);
      addItemsToCarousel(recentProductsData.prodArray, "recent");
      addItemsToCarousel(newestProductsData.prodArray, "newest");
      addItemsToCarousel(popularProductsData.prodArray, "popular");
    };
    getData();
    getProducts();
    setIsLoading(false);
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
            <JumboNews
              title={artList[0].title}
              mainTag={artList[0].mainTag}
              tags={artList[0].tags}
              id={artList[0].id}
              imgUrl={artList[0].imgUrl}
            />
          </Box>

          <Box
            sx={{
              display: { md: "none", sm: "none", lg: "flex", xl: "flex" },
              width: "25%",
            }}
          >
            <Glance
              createdAt={artList[0].updatedAt}
              content={artList[0].content}
            />
          </Box>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h3">Recently Added</Typography>
        </Box>
        <Box sx={{ height: "275px", width: "auto" }}>
          <Carousel
            sx={{ width: "100%" }}
            index={4}
            animation="slide"
            navButtonsAlwaysVisible={true}
          >
            {mostRecentCards}
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
            {popularCards}
          </Carousel>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h3">Newest Releases</Typography>
        </Box>

        <Box sx={{ height: "275px", width: "auto" }}>
          <Carousel
            sx={{ width: "100%" }}
            index={0}
            animation="slide"
            navButtonsAlwaysVisible={true}
          >
            {newestCards}
          </Carousel>
        </Box>
        <Typography variant="h3">Latest News</Typography>
        <Carousel sx={{ width: "100%" }} index={4} animation="slide">
          {newsItems}
        </Carousel>
      </Stack>
    </Box>
  );
};

export default Home;
