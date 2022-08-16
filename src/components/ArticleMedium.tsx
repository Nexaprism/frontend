import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const ArticleMedium: FC<{
  title: string;
  mainTag: string;
  tags: string[];
  imgUrl: string;
  id: string;
}> = ({ title, mainTag, tags, imgUrl, id }) => {
  return (
    <Box
      component={Link}
      to={"/article/" + id}
      sx={{
        position: "relative",
        width: "100%",
        height: "50vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${"http://localhost:3080/" + imgUrl})`,
        borderRadius: 2,
        boxShadow: 6,
      }}
    >
      <Box
        className="jumboNewsMask"
        sx={{
          backgroundColor: "black",
          width: "100%",
          height: "13rem",
          position: "absolute",
          bottom: 0,
          borderRadius: 2
        }}
      >
        <Stack
          direction="column"
          sx={{
            position: "absolute",
            top: { xs: "40%", sm: "45%", md: "35%" },
            left: "5%",
          }}
        >
          <Typography
            fontSize={{ sm: "1.5em", md: "2em", lg: "2em" }}
            sx={{ color: "white" }}
          >
            {title}
          </Typography>
          
          <Typography gutterBottom fontSize={{sm: "1em", md: "1.2em"}} sx={{ color: "white" }}>
            Learn More
          </Typography>
          <Stack direction="row" spacing={1} sx={{display: {sm: "none", md: "flex"}}}>
            {tags.map((tag) => (
              <Chip label={tag} key={tag} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ArticleMedium;