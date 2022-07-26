import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import image from "../assets/img/nexaprismLogoSmall.png";
import RatingBig from "./RatingBig";
import RatingSmall from "./RatingSmall";
import ReviewMedium from "./ReviewMedium";
import { Link } from "react-router-dom";


function ProductCard(props: {
  img: string;
  name: string;
  id: string;
  rating: number;
  mainTag: string;
  tags: string[];
}) {
  return (
    <Box
      sx={{
        maxHeight: 275,
        maxWidth: 250,
        width: { sm: 150, md: 250, lg: 275 },
      }}
    >
      <CardActionArea
        sx={{ borderRadius: 5, boxShadow: 6 }}
        component={Link}
        to={"/product/" + props.id}
      >
        <Card sx={{ borderRadius: 5 }}>
          <Box sx={{ maxHeight: 200, position: "relative" }}>
            <CardMedia sx={{ height: 200, zIndex: 0 }} image={props.img}>
              <Box
              sx={{
                position: "absolute",
                justifyContent: "center",
                width: "100%",
                bottom: 0,
                height: 75,
                pl: { sm: 1, md: 2, lg: 3 },
              }}
              >
              <Chip label={props.mainTag} size="small" />
              </Box>
              
              <Box
                id="productCardMask"
                sx={{
                  position: "absolute",
                  justifyContent: "center",
                  width: "100%",
                  bottom: 0,
                  height: 70,
                  pl: { sm: 1, md: 2, lg: 3 },
                  backgroundColor: "black",
                }}
              >
                <Typography sx={{pt: 3}}fontSize={{ sm: 18, md: 22, lg: 25 }} color="white">
                  {props.name}
                </Typography>
              </Box>
            </CardMedia>
          </Box>
          <Divider />
          <Stack
            direction="row"
            sx={{
              height: 75,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RatingSmall value={props.rating} />
            <Box
              overflow="hidden"
              sx={{ display: { sm: "none", md: "block" } }}
            >
              {props.tags.slice(0, 4).map((tag) => (
                <Chip label={tag} key={tag} sx={{ height: 15, m: 0.15 }} />
              ))}
            </Box>
          </Stack>
        </Card>
      </CardActionArea>
    </Box>
  );
}

export default ProductCard;
