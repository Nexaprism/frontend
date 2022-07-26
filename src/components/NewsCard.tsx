import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/img/nexaprismLogoSmall.png";

const newsStory = {
  title: "Decentraland breaks $1 billion USD",
  content:
    "Decentraland's main currency, MANA, recently broke a major milestone this Tuesday. The burgeoning metaverse's token just surpassed a market cap of $1 billion USD valuation.",
  date: "04/27/2021",
  author: "Josh Kroslowitz",
};

const NewsCard: FC<{
  image: string;
  title: string;
  content: string;
  date: string;
  id: string;
}> = ({ image, title, content, date, id }) => {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500, minWidth: 190, textDecoration: "none" }}
    component={Link}
        to={"/article/" + id}
    >
      <CardMedia
        component="img"
        height="225"
        image={image}
      />
      <CardContent>
        <Typography
          gutterBottom
          fontSize={{ sm: 20, md: 20, lg: 25 }}
          component="div"
        >
          {title}
        </Typography>
        <Divider />
        <Box
          component="div"
          sx={{
            height: { sm: 75, md: 80, lg: 90 },
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            noWrap={true}
          >
            {content}
          </Typography>
        </Box>
        <Box sx={{ height: { sm: 10, md: 15, lg: 20 } }}>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
