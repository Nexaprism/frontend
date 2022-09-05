import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const SmallNewsCard: FC<{
  mainTag: string;
  date: string;
  title: string;
  imgUrl: string;
  id: string;
}> = ({ mainTag, date, title, imgUrl, id }) => {
  const navigate = useNavigate();
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  return (
    <Card sx={{ maxWidth: 800, maxHeight: 225, width: "100%" }}>
      <CardActionArea onClick={() => navigate("/article/" + id)}>
        <Stack direction="row">
          <Stack
            direction="column"
            width="60%"
            spacing={1}
            sx={{ display: "flex", pl: 2, pt: 1 }}
            position="relative"
          >
            <Typography
              sx={{ wordWrap: "break-word", m: 1.5 }}
              fontSize={{ sm: 23, md: 28, lg: 28 }}
            >
              {title}
            </Typography>
            <Chip label={mainTag} sx={{ maxWidth: 100 }} />

            <Box
              position="absolute"
              sx={{ bottom: 30, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="caption" sx={{pb: 2}}>{date}</Typography>
              <Link>Read more...</Link>
            </Box>
          </Stack>
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "15rem",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(${`${API_ENDPOINT}` + imgUrl})`,
              }}
            />
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default SmallNewsCard;
