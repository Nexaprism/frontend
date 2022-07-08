import { Box, Chip, Link, Stack, Typography } from "@mui/material";
import { FC } from "react";
import image from "../assets/img/largeImage.jpeg";

const newsStory = {
  title: "Decentraland breaks $1 billion USD",
  content:
    "Decentraland's main currency, MANA, recently broke a major milestone this Tuesday. The burgeoning metaverse's token just surpassed a market cap of $1 billion USD valuation.",
  date: "04/27/2021",
  author: "Josh Kroslowitz",
  mainTag: "metaverse",
  tags: ["VR", "game", "web3"],
};

const JumboNews: FC = () => {
  return (
    <Box
      component={Link}
      href="#"
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 350, md: 550, lg: 400 },
        backgroundSize: "cover",
        backgroundImage: `url(${image})`,
      }}
    >
      <Stack
        direction="column"
        sx={{
          position: "absolute",
          top: { xs: "50%", sm: "50%", md: "60%" },
          left: "5%",
        }}
      >
        <Typography fontSize={ {sm: 30, md: 40, lg: 50}} sx={{ color: "white" }}>
          {newsStory.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "white" }}>
          Learn More
        </Typography>
        <Stack direction="row" spacing={1}>
          {newsStory.tags.map((tag) => (
            <Chip label={tag} key={tag} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default JumboNews;
