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
  import Glance from "../components/Glance";
  import JumboNews from "../components/JumboNews";
  import MiniProductCard from "../components/MiniProductCard";
  import NewsCard from "../components/NewsCard";
  import ProductCard from "../components/ProductCard";
  
  const items = [
    "item 1",
    "item 2",
    "item 3",
    "item 4",
    "item 5",
    "item 6",
    "item 7",
    "item 8",
    "item 9",
    "item 10",
  ];
  
  const AR: FC = () => {
    const [firstHalf, setFirstHalf] = useState<any>([]);
    const [products, setProducts] = useState<any[]>();
    const [newsItems, setNewsItems] = useState<any[]>();
    const [enabledButton, setEnabledButton] = useState<boolean[]>([false, false, true]);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
  
    const addItems = () => {
      const productItems: Array<any> = [];
      for (let i = 0; i < 3; i++) {
        productItems.push(
          <Stack
            direction="row"
            spacing={3}
            display="flex"
            justifyContent="center"
          >
            <ProductCard name={""} img={""} id="" rating={0}/>
            <ProductCard name={""} img={""} id="" rating={0}/>
            <ProductCard name={""} img={""} id="" rating={0}/>
            <ProductCard name={""} img={""} id="" rating={0}/>
          </Stack>
        );
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
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
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
        items.map((item, index) => {
          if (countToTwo == 0 && !row) {
            color = 'linear-gradient(to bottom, #cdcccf, #ababab)'
          } else if (countToTwo == 1 && !row) {
            color = 'linear-gradient(to right bottom, #7d7d7d, #4d4d4d)'
          } else if (countToTwo == 0 && row) {
            color = 'linear-gradient(to right bottom, #7d7d7d, #4d4d4d)'
          } else if (countToTwo == 1 && row) {
            color = 'linear-gradient(to bottom, #cdcccf, #ababab)'
          }
          itemArray.push(
            <Grid item xs={12} md={6} sx={{ background: color }}>
              <MiniProductCard key={item} />
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
        items.map((item, index) => {
          color = index % 2 ? 'linear-gradient(to right bottom, #7d7d7d, #4d4d4d)' : 'linear-gradient(to bottom, #cdcccf, #ababab)';
          itemArray.push(
            <Grid item xs={12} md={6} sx={{ background: color }}>
              <MiniProductCard key={item} />
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
      separateTheItems();
      addItems();
      addNewsItems();
    }, [items, matches]);
  
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
        <Stack
          direction="column"
          spacing={4}
          sx={{ width: { xl: 1500, lg: 1200, md: 800, sm: 600 } }}
        >
          <Box>
            <Box>
              <Typography variant="h2">Augmented Reality (AR)</Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
              <Typography>
                AR has been a staple of science fiction for decades but not until now has it become something attainable.
                AR is only in its infancy but already people are thrilled at the possibilities it presents. Not limited to entertainment
                or gaming, it offers a lot of utility in daily situations as well as helping those with impairments or diabilities.
                AR represents a completely new reality that we can all inhabit and still engage with the world around us. It enhances
                what we already have and only time will tell what can be done with it.
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
                sx={{ "&:hover": { transform: "none" } }}
                variant={enabledButton[0] == true ? "contained" : "outlined"}
                onClick={() => sortButtonHandler(0)}
              >
                Highest First
              </Button>
              <Button
                sx={{ "&:hover": { transform: "none" } }}
                variant={enabledButton[1] == true ? "contained" : "outlined"}
                onClick={() => sortButtonHandler(1)}
              >
                Lowest First
              </Button>
              <Button
                sx={{ "&:hover": { transform: "none" } }}
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
            sx={{ display: "flex", justifyContent: "space-evenly"}}
          >
            {firstHalf.map((item: any) => {
              return item;
            })}
          </Grid>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Pagination count={4} />
          </Box>
          
          <Carousel sx={{ width: "100%" }} index={4} animation="slide">
            {newsItems}
          </Carousel>
        </Stack>
      </Box>
    );
  };
  
  export default AR;
  