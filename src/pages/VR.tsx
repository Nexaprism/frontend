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
  
  const VR: FC = () => {
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
            <ProductCard name={""} img={""} id=""/>
            <ProductCard name={""} img={""} id=""/>
            <ProductCard name={""} img={""} id=""/>
            <ProductCard name={""} img={""} id=""/>
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
              <Typography variant="h2">Virtual Reality (VR)</Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
              <Typography>
                VR has come quite a ways in recent years. Once confined to large, bulky and expensive
                setups in malls and arcades, VR now fits in a single headset and is as expensive as most video game consoles.
                The software and games on VR are also improving, both in visual quality and content. A lot of major companies
                have pinned their futures on the coming success of VR and expect the average household to have a headset
                the way TVs invaded homes in the 50s.
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
  
  export default VR;
  