import { Box, Divider, Grid, Link, Stack, Typography } from "@mui/material";
import { FC } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import discordLogoLight from "../assets/img/discordLogo.svg";
import discordLogoDark from "../assets/img/discordLogoDark.png";
import { useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/theme/themeReducer";

const Footer: FC = () => {
  const theme = useAppSelector(selectTheme);

  return (
    <Box
      style={{
        bottom: 0,
        height: "30vh",
        width: "100%",
        color: "inherit",
      }}
      sx={{ pl: 5, pt: 2.5, display: "flex", justifyContent: "center" }}
    >
      <Stack direction="column" justifyContent="center" spacing={5}>
        <Stack direction="row" spacing={5} justifyContent="center">
          <Link href="https://www.facebook.com/nexaprism" rel="noopener" target="_blank" color="inherit">
            <FacebookIcon />
          </Link>
          <Link href="https://twitter.com/nexaprism" rel="noopener" target="_blank" color="inherit">
            <TwitterIcon />
          </Link>
          <Link href="https://www.reddit.com/r/nexaprism/" rel="noopener" target="_blank" color="inherit">
            <RedditIcon />
          </Link>

          <img
            src={theme == "light" ? discordLogoLight : discordLogoDark}
            height={25}
            width={25}
          />
        </Stack>
        <Stack direction="row" spacing={4} justifyContent="center">
          <Link href="" underline="hover" color="inherit">
            About
          </Link>
          <Divider orientation='vertical' />
          <Link href="mailto:nexaprism@gmail.com" underline="hover" color="inherit">
          Contact Us
          </Link>

        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ pr: 2 }}>Site by CitizenSnipz</Typography>
          <Link href="https://github.com/citizensnipz" target="_blank" color="inherit">
            <GitHubIcon />
          </Link>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
          <CopyrightIcon />
          <Typography variant="caption">
            2022 nexaprism, All rights reserved
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
