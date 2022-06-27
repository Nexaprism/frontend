import { Box, Grid, Link, Typography } from '@mui/material';
import {FC} from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from "@mui/icons-material/Copyright";



const Footer: FC = () => {

    return (
        <Box style={{
            position: "fixed",
            bottom: 0,
            height: "4em",
            background: "#000000",
            width: "100%",
            color: "gray",
          }}
          sx={{ pl: 5, pt: 2.5 }}>
            <Grid container >
        <Grid item sx={{ display: "flex", flexGrow: 1 }}>
          <CopyrightIcon />

          <Typography fontFamily='Prompt' >2022 nexaprism</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "flex-end", pr: 3 }}>
            <Typography fontFamily='Prompt' >
                Site by Josh Kroslowitz
            </Typography>
        </Grid>
        <Grid item sx={{ display: "flex", justifyContent: "flex-end", pr: 3 }}>
            <Link href='https://github.com/citizensnipz' color='inherit'>
                <GitHubIcon />
            </Link>
        </Grid>
      </Grid>
            
        </Box>
    )
}

export default Footer;