import { Box, Link, Stack, styled, Typography } from "@mui/material";
import { FC } from "react";

const description = {
  description:
    "Decentraland aims to be the first complete digital simulacrum of the real world. The quintessential metaverse, citizens create an avatar and purchase or sell digital goods using a native currency, MANA. Citizens can even use MANA to buy LAND, NFTs that represent digital real estate. Some of these LAND sales have reached astronomical values, in fact, many plots of land far exceed the value of land in the real world.",
  company: "Metaverse Holdings Ltd.",
  developers: "Esteban Ordano, Airel Meilich, Yemel Jardi, Manuel Araoz",
  url: "https://decentraland.org",
};

const DescriptionBox: FC = () => {
  const Item = styled("div")(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundColor: "transparent",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.primary,
    display: "inline-flex",
  }));

  return (
    <Box>
      <Stack>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 1 }}
          >
            Description:
          </Typography>
          {description.description}
        </Item>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 2 }}
          >
            Company:
          </Typography>
          {description.company}
        </Item>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 1 }}
          >
            Developers:
          </Typography>
          {description.developers}
        </Item>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 1 }}
          >
            URL:
          </Typography>
          <Link href={description.url} target="_blank">{description.url}</Link>
        </Item>
      </Stack>
    </Box>
  );
};

export default DescriptionBox;
