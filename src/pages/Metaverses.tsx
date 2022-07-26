import { jsx } from "@emotion/react";
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
import { FC, JSXElementConstructor, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { JsxElement } from "typescript";
import Glance from "../components/Glance";
import JumboNews from "../components/JumboNews";
import MiniProductCard from "../components/MiniProductCard";
import NewsCard from "../components/NewsCard";
import ProductCard from "../components/ProductCard";
import { setIsLoading } from "../store/app/appReducer";
import { useAppDispatch } from "../store/hooks";
import { useGetProductsMainTag } from "../store/product/hooks";
import { Product } from "../store/product/types";

const Metaverses: FC = () => {
  const dispatch = useAppDispatch();
  const [firstHalf, setFirstHalf] = useState<any>([]);
  const [products, setProducts] = useState<any[]>();
  const [newsItems, setNewsItems] = useState<any[]>();
  const [enabledButton, setEnabledButton] = useState<boolean[]>([
    false,
    false,
    true,
  ]);
  const [prodList, setProdList] = useState<Product[]>([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const metaverseProducts = useGetProductsMainTag("metaverse");

  const buttonStyles = {
    "&:hover": { transform: "none" },
  };

  const getProducts = async () => {
    dispatch(setIsLoading(true));
    return metaverseProducts;
    // let productList: Product[] = [];
    // const graphqlQuery = {
    //   query: `
    //   {
    //     products {
    //         products {
    //             name
    //             imgUrl
    //             rating
    //             mainTag
    //             tags
    //             createdAt
    //             updatedAt
    //         }
    //     }
    //   }
    //     `,
    // };
    // fetch("http://localhost:3080/graphql", {
    //   method: "POST",
    //   headers: {
    //     //Authorization: "Bearer " + token,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(graphqlQuery),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     if (resData.errors) {
    //       console.log(resData);
    //       throw new Error("Fetching products failed");
    //     }
    //     resData.data.products.products.map((product: any) => {
    //       let newProd: Product = {
    //         id: product._id,
    //         company: product.company,
    //         blockchain: product.blockchain,
    //         marketCap: product.marketCap,
    //         token: product.token,
    //         description: product.description,
    //         launchDate: product.launchDate,
    //         imgUrl: product.imgUrl,
    //         name: product.name,
    //         createdAt: product.createdAt,
    //         updatedAt: product.updatedAt,
    //         governance: product.governance,
    //         url: product.url,
    //         developers: product.developers,
    //         rating: product.rating,
    //         mainTag: product.mainTag,
    //         tags: product.tags,
    //       };
    //       productList.push(newProd);
    //     });
    //     setProdList(productList);
    //     addItems(productList);
    //     console.log(resData.data.products);
    //   });
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

  const addItems = (allProducts: Product[]) => {
    const products = allProducts.slice(0, 11);
    const productItems: Array<any> = [];
    let page: any[] = [];
    let cardCount = 0;
    let carouselSize = matches ? 4 : 3;
    let carouselPageCount = matches ? 2 : 3;
    console.log(products);

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
      if(cardCount > products.length) {break}
      page = [];
    }
    setProducts(productItems);
  };

  const addNewsItems = () => {
    const news: Array<any> = [];
    for (let i = 0; i < 3; i++) {
      news.push(
        <Stack
          direction="row"
          spacing={3}
          display="flex"
          justifyContent="center"
        >
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
        </Stack>
      );
    }
    setNewsItems(news);
  };

  const separateTheItems = () => {
    let itemArray: any = [];
    let color = "white";
    if (matches) {
      let row = false;
      let countToTwo = 0;
      prodList.map((product, index) => {
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
          <Grid item xs={12} md={6} sx={{ background: color }}>
            <MiniProductCard
              key={index}
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
      prodList.map((product, index) => {
        color =
          index % 2
            ? "linear-gradient(to right bottom, #7d7d7d, #4d4d4d)"
            : "linear-gradient(to bottom, #cdcccf, #ababab)";
        itemArray.push(
          <Grid item xs={12} md={6} sx={{ background: color }}>
            <MiniProductCard
              key={index}
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
      setProdList(metaProdData.prodArray);
      addItems(metaProdData.prodArray);
    };
    getData();
    //getProducts();
    separateTheItems();
    //addItems();
    addNewsItems();
    dispatch(setIsLoading(false));
    console.log(matches);
  }, [matches]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
      <Stack
        direction="column"
        spacing={4}
        sx={{ width: { xl: 1500, lg: 1200, md: 800, sm: 600 } }}
      >
        <Box>
          <Box>
            <Typography variant="h2">The Metaverse</Typography>
          </Box>
          <Box sx={{ pb: 2 }}>
            <Typography>
              The metaverse is a catch-all phrase for just about anything
              related to nascent technology and how we plan to interact with it.
              Is it VR? Is it AR? Is it web3? Is it all of those? For now the
              definition of the metaverse remains foggy, but ultimately it will
              be up to us to decide what it is and isn't and starts when we get
              together and make more content. What better place to consider all
              that than right here, at the nexaprism.
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
