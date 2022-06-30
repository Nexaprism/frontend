import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { FC } from "react";
import RatingBig from "./RatingBig";
import RatingMedium from "./ReviewMedium";

const review = {
  user: "Username",
  review:
    "It's a good game, I love playing as myself and I can do all the things I do in real life but digitally. It's great!",
    date: '06/24/2022'
};

interface ReviewCardProps {
    rating: number;
}


const ReviewCard: FC<{rating: number}> = ({rating}) => {
  return (
    <Card sx={{ maxWidth: 450, minWidth: 350, maxHeight: 200, display: "flex", borderRadius: 5 }}>
      <CardActionArea sx={{display: 'flex'}}>
        <Box sx={{ width: '50%'}}>
          <RatingMedium value={rating} />
        </Box>
          <CardContent sx={{width: '50%' }}>
            <Typography gutterBottom variant="h5" component="div">
              {review.user}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div" sx={{pb: 2}}>
              {review.review}
            </Typography>
            <Typography variant='caption' color="text.secondary">
                {review.date}
            </Typography>
          </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ReviewCard;
