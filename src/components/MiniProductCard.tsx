import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import RatingSmall from "./RatingSmall";
import image from "../assets/img/largeImage.jpeg";

const MiniProductCard: FC<{ name: string; rating: number; id: string }> = ({
  name,
  rating,
  id,
}) => {
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    color: "black",
    textDecoration: "none",
  };
  return (
    <Stack
      component={Link}
      to={"/product/" + id}
      direction="row"
      width="auto"
      sx={containerStyles}
    >
      <RatingSmall value={rating} />
      <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
      <Typography>{name}</Typography>
      </Box>
      
    </Stack>
  );
};

export default MiniProductCard;
