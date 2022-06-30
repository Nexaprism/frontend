import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import Glance from "../components/Glance";
import JumboNews from "../components/JumboNews";

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
            backgroundColor: "red",
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
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Typography variant="h3">Most Recent</Typography>
        </Box>
        
        <Box sx={{ backgroundColor: "purple", height: "275px", width: "auto" }}>
          Most recently added carousel
        </Box>
        <Typography variant='h3'>Most Popular</Typography>
        <Box sx={{ backgroundColor: "blue", height: "275px", width: "auto" }}>
          Most popular carousel
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Typography variant='h3'>What's Hot</Typography>
        </Box>
        
        <Box sx={{ backgroundColor: "green", height: "275px", width: "auto" }}>
          What's Hot carousel
        </Box>
        <Typography variant='h3'>Latest News</Typography>
        <Box sx={{ backgroundColor: "orange", height: "200px", width: "auto" }}>
          Latest News articles
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
