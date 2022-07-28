import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import RatingSmall from "./RatingSmall";

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
      <Typography>{name}</Typography>
    </Stack>
  );
};

export default MiniProductCard;
