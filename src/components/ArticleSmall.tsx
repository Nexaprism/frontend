import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const ArticleSmall: FC<{
  title: string;
  mainTag: string;
  tags: string[];
  imgUrl: string;
  id: string;
}> = ({ title, mainTag, tags, imgUrl, id }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  return (
    <Box
      component={Link}
      to={"/article/" + id}
      sx={{
        position: "relative",
        width: "100%",
        height: "24vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${`${API_ENDPOINT}` + imgUrl})`,
        borderRadius: 2,
        boxShadow: 6
      }}
    >
      <Box
        className="jumboNewsMask"
        sx={{
          backgroundColor: "black",
          width: "100%",
          height: "10rem",
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
            fontSize={{ sm: "1em", md: "1.25em", lg: "1.5em" }}
            sx={{ color: "white" }}
          >
            {title}
          </Typography>

          <Typography fontSize={{ sm: "0.7em", md: "0.8em", lg: "0.9em" }} sx={{ color: "white" }}>
            Learn More
          </Typography>
          <Stack direction="row" spacing={1} sx={{display: {xs: "none", md: "flex"}}}>
            {tags.map((tag, index) => {
                return (index < 3 ? (<Chip label={tag} key={tag}/>) : null)
                }
              
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ArticleSmall;
