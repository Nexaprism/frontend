import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  InputBase,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FC, useEffect, useState } from "react";
import JumboNews from "../components/JumboNews";
import SmallNewsCard from "../components/SmallNewsCard";
import NewsCard from "../components/NewsCard";
import Carousel from "react-material-ui-carousel";
import mainLogo from "../assets/img/largeImage.jpeg";

/**
 * NOTE: articles should be listed as # days/weeks/months/years ago
 *
 * jumbo news
 *
 * sidebar with articles from other websites
 *
 * editors pick
 *
 * most recent
 *
 * on the pulse (news about what the state of the market is like)
 *
 * coming soon (products that are still in development)
 *
 * search by tag bar
 *
 */

const News: FC = () => {
  const [items, setItems] = useState<any[]>();

  const addItems = () => {
    const newsItems: Array<any> = [];
    for (let i = 0; i < 3; i++) {
      newsItems.push(
        <Stack direction="row" spacing={3}>
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
          <NewsCard image={""} content={""} title={""} date={""} id={""} />
        </Stack>
      );
    }
    setItems(newsItems);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    marginLeft: 1,
    width: "100%",
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  useEffect(() => {
    window.scrollTo(0, 0)
    addItems();
  });

  return (
    <Box sx={{ pl: 10, pr: 10, pt: 5 }}>
      <Stack direction="column" spacing={3}>
        <Typography variant="h2">News</Typography>
        <Divider />
        <JumboNews />
        <Typography variant="h3">Editor's Picks</Typography>
        <Stack direction="row" width="100%" sx={{ display: "flex" }}>
          <Stack
            direction="row"
            sx={{
              height: 300,
              width: "65%",
              backgroundSize: "cover",
              backgroundImage: `url(${mainLogo})`,
              display: "flex",
              justifyContent: "flex-end",
              mr: 2,
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography fontSize={20}>Here's the title</Typography>
            </Box>
          </Stack>
          <Stack direction="column" spacing={2} sx={{ width: "35%" }}>
            <Stack
              direction="row"
              sx={{
                height: 142,
                backgroundSize: "cover",
                backgroundImage: `url(${mainLogo})`,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ p: 1 }}>
                <Typography fontSize={12}>Here's the title</Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                height: 142,
                backgroundSize: "cover",
                backgroundImage: `url(${mainLogo})`,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ p: 1 }}>
                <Typography fontSize={12}>Here's the title</Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Box>
          <Typography variant="h3" sx={{ pb: 3 }}>
            Most Recent
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SmallNewsCard />
            <SmallNewsCard />
            <SmallNewsCard />
            <Link>
              <Typography variant="h5">Find more...</Typography>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Typography
            variant="h3"
            sx={{ pb: 3, display: "flex", justifyContent: "flex-end" }}
          >
            On The Pulse
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SmallNewsCard />
            <SmallNewsCard />
            <SmallNewsCard />
            <Link>
              <Typography variant="h5">Find more...</Typography>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h3" sx={{ pb: 3 }}>
            Coming Soon...
          </Typography>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SmallNewsCard />
            <SmallNewsCard />
            <SmallNewsCard />
            <Link>
              <Typography variant="h5">Find more...</Typography>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Typography
            variant="h3"
            sx={{ pb: 3, display: "flex", justifyContent: "flex-end" }}
          >
            From around the web
          </Typography>
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

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            pr: 2,
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
      </Stack>
    </Box>
  );
};

export default News;
