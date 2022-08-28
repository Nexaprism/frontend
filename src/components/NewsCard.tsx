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

const NewsCard: FC<{
  image: string;
  title: string;
  content: string;
  date: string;
  id: string;
}> = ({ image, title, content, date, id }) => {
  

  return (
    <Card
      sx={{
        width: { lg: "40rem", md: "35rem", sm: "30rem", xs: "28rem" },
        minWidth: {xs: "10rem"},
        maxHeight: 500,
        textDecoration: "none",
      }}
      component={Link}
      to={"/article/" + id}
    >
      <CardMedia component="img" height="225" image={image} />
      <CardContent>
        <Box sx={{ height: "4rem" }}>
          <Typography
            gutterBottom
            sx={{ wordWrap: "break-word" }}
            fontSize={{ sm: "1.1em", md: "1.3em", lg: "1.5em" }}
            component="div"
          >
            {title}
          </Typography>
        </Box>

        <Divider sx={{m: 2}}/>
        <Box
          component="div"
          sx={{
            height: "4rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap={true}
          >
            {content}
          </Typography>
        </Box>
        <Box sx={{ height: "1rem"}}>
          <Typography variant="caption" color="text.secondary">
            {new Date(date).toLocaleDateString()}
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
