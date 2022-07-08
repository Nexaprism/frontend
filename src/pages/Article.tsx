import { Box, Chip, Stack, Typography } from "@mui/material";
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

const Article: FC = () => {
  return (
    <Box sx={{ p: 10, display: "flex", justifyContent: "center" }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h2">{newsStory.title}</Typography>
        <Typography>{newsStory.date}</Typography>
        <Chip label={newsStory.mainTag} sx={{maxWidth: 100}} />
        <Box>
            {newsStory.tags.map(tag => <Chip label={tag} sx={{maxWidth: 80, maxHeight: 20}} />)}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 350, md: 550, lg: 550 },
            backgroundSize: "cover",
            backgroundImage: `url(${image})`,
          }}
        />
        <Box>
            <Typography>{newsStory.content}</Typography>
        </Box>
        
      </Stack>
    </Box>
  );
};

export default Article;
