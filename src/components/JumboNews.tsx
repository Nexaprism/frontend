import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import image from "../assets/img/largeImage.jpeg";

const JumboNews: FC<{
  title: string;
  mainTag: string;
  tags: string[];
  imgUrl: string;
  id: string;
}> = ({title, mainTag, tags, imgUrl, id}) => {
  return (
    <Box
      component={Link}
      to={"/article/" + id}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 350, md: 550, lg: 400 },
        backgroundSize: "cover",
        backgroundImage: `url(${"http://localhost:3080/" + imgUrl})`,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        boxShadow: 6,
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
        <Typography
          fontSize={{ sm: 30, md: 40, lg: 50 }}
          sx={{ color: "white" }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "white" }}>
          Learn More
        </Typography>
        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Chip label={tag} key={tag} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default JumboNews;
