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

/**

<>
<NoSsr>
  <GoogleFontLoader fonts={[{ font: 'Sen', weights: [400, 800] }]} />
</NoSsr>
<Card className={styles.card}>
  <Box className={styles.main} minHeight={300} position={'relative'}>
    <CardMedia
      classes={mediaStyles}
      image={
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
      }
    />
    <div className={styles.content}>
      <div className={styles.tag}>Fashion</div>
      <Typography variant={'h2'} className={styles.title}>
        Diana Marvel Has a City Take on the Cowboy Boot
      </Typography>
    </div>
  </Box>
  <Row
    className={styles.author}
    m={0}
    p={3}
    pt={2}
    gap={2}
    bgcolor={'common.white'}
  >
    <Item>
      <Avatar
        className={styles.avatar}
        src={'https://i.pravatar.cc/300?img=13'}
      />
    </Item>
    <Info position={'middle'} useStyles={useNewsInfoStyles}>
      <InfoTitle>Nadine Petrolli</InfoTitle>
      <InfoSubtitle>Jul 20 | 2 Min Read</InfoSubtitle>
    </Info>
  </Row>
  <div className={styles.shadow} />
  <div className={`${styles.shadow} ${styles.shadow2}`} />
</Card>
</>
*/
