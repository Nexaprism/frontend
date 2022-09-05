import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

const JumboNews: FC<{
  title: string;
  mainTag: string;
  tags: string[];
  imgUrl: string;
  id: string;
}> = ({ title, mainTag, tags, imgUrl, id }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  useEffect(() => {
    console.log(imgUrl);
  })

  return (
    <Box
      component={Link}
      to={"/article/" + id}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 350, md: 550, lg: 400 },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${`${API_ENDPOINT}` + imgUrl})`,
        borderBottomLeftRadius: {xs: 0, sm: 20},
        borderBottomRightRadius: {xs: 0, sm: 20},
        boxShadow: 6,
      }}
    >
      <Box
        className="jumboNewsMask"
        sx={{
          backgroundColor: "black",
          width: "100%",
          height: "15rem",
          position: "absolute",
          bottom: 0,
          borderBottomLeftRadius: {xs: 0, sm: 20},
          borderBottomRightRadius: {xs: 0, sm: 20},
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
    </Box>
  );
};

export default JumboNews;
