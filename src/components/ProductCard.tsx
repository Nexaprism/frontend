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
import { FC } from "react";
import image from "../assets/img/nexaprismLogoSmall.png";
import RatingBig from "./RatingBig";
import RatingSmall from "./RatingSmall";
import ReviewMedium from "./ReviewMedium";

const product = {
  title: "Decentraland",
  mainTag: "metaverse",
  tags: ["web3", "crypto", "VR", "game", "DAO", "decentralized"],
  rating: 84,
};

const ProductCard: FC = () => {
  return (
    <Box sx={{ maxHeight: 275, maxWidth: 250 }}>
      <CardActionArea sx={{ borderRadius: 5 }}>
        <Card sx={{ borderRadius: 5 }}>
          <Box sx={{ maxHeight: 200, position: "relative" }}>
            <CardMedia sx={{ height: 200 }} image={image} />
            <Box sx={{ position: "absolute", bottom: 20, pl: 3}}>
              <Chip label={product.mainTag} />
              <Typography variant='h5'>
                {product.title}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Stack
            direction="row"
            sx={{
              height: 75,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <RatingSmall value={product.rating} />
            <Box overflow="hidden" >
              {product.tags.map((tag) => (
                <Chip label={tag} sx={{ height: 15, m: 0.15 }} />
              ))}
            </Box>
          </Stack>
        </Card>
      </CardActionArea>
    </Box>
  );
};

export default ProductCard;