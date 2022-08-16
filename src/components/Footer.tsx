import { Box, Divider, Grid, Link, Stack, Typography, useTheme } from "@mui/material";
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
  const themeFromStore = useAppSelector(selectTheme);


  return (
    <Box
      style={{
        bottom: 0,
        height: "40vh",
        width: "100%",
        color: "inherit",
        backgroundColor: themeFromStore == "light" ? "#4d2e82" : "#242424",
      }}
      sx={{ pl: 5, pt: 2.5, display: "flex", justifyContent: "center", boxShadow: 6 }}
    >
      <Stack direction="column" justifyContent="center" spacing={5}>
        <Stack direction="row" spacing={5} justifyContent="center">
          <Link href="https://www.facebook.com/nexaprism" rel="noopener" target="_blank" sx={{color: 'white'}}>
            <FacebookIcon />
          </Link>
          <Link href="https://twitter.com/nexaprism" rel="noopener" target="_blank" color="inherit" sx={{color: 'white'}}>
            <TwitterIcon />
          </Link>
          <Link href="https://www.reddit.com/r/nexaprism/" rel="noopener" target="_blank" color="inherit" sx={{color: 'white'}}>
            <RedditIcon />
          </Link>

          <img
            src={discordLogoDark}
            height={25}
            width={25}
          />
        </Stack>
        <Stack direction="row" spacing={4} justifyContent="center">
          <Link href="" underline="hover" sx={{color: 'white'}}>
            About
          </Link>
          <Divider orientation='vertical' color="white"/>
          <Link href="mailto:nexaprism@gmail.com" underline="hover" sx={{color: 'white'}}>
          Contact Us
          </Link>

        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ pr: 2 }} color="white">Site by CitizenSnipz</Typography>
          <Link href="https://github.com/citizensnipz" target="_blank" sx={{color: 'white'}}>
            <GitHubIcon />
          </Link>
        </Box>
        <Box color="white" sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
          <CopyrightIcon />
          <Typography variant="caption" color='white' sx={{pl: 1}}>
            2022 nexaprism, All rights reserved
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
