import { styled, alpha } from "@mui/material/styles";
import { Box, Divider, InputBase, Link, Stack, Typography } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import {FC} from 'react';
import JumboNews from '../components/JumboNews';
import SmallNewsCard from "../components/SmallNewsCard";

/**
 * NOTE: articles should be listed as # days/weeks/months/years ago
 * 
 * jumbo news
 * 
 * sidebar with articles from other websites
 * 
 * editors pick
 * 
 * most recent
 * 
 * on the pulse (news about what the state of the market is like)
 * 
 * coming soon (products that are still in development)
 * 
 * search by tag bar
 * 
 */

const News: FC = () => {

    const Search = styled("div")(({ theme }) => ({
        position: "relative",
        marginLeft: 1,
        width: "100%",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(1),
          width: "auto",
        },
      }));
    
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create("width"),
          width: "100%",
          [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
              width: "20ch",
            },
          },
        },
      }));
    
      const SearchIconWrapper = styled("div")(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }));

    return (
        <Box sx={{}}>
            <Stack direction='column'>
                <Typography variant='h2'>News</Typography>
                <Divider />
                <JumboNews />
                <Typography variant="h3">Editor's Picks</Typography>
                <Stack direction="row">
                    <Box>
                        Big news here
                    </Box>
                    <Stack direction="column">
                        <Box>
                            small news 1
                        </Box>
                        <Box>
                            small news 2
                        </Box>
                    </Stack>
                </Stack>
                <Box>
                <Typography variant="h3">Most Recent</Typography>
                <Stack direction="column" spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
                    <SmallNewsCard />
                    <SmallNewsCard />
                    <SmallNewsCard />
                    <Link><Typography variant="h5">Find more...</Typography></Link>
                </Stack>
                </Box>
                <Box>
                <Typography variant="h3">On The Pulse</Typography>
                <Stack direction="column" spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
                    <SmallNewsCard />
                    <SmallNewsCard />
                    <SmallNewsCard />
                    <Link><Typography variant="h5">Find more...</Typography></Link>
                </Stack>
                </Box>
                <Box>
                <Typography variant="h3">Coming Soon...</Typography>
                <Stack direction="column">
                    List of news articles in "rows"
                </Stack>
                </Box>
                <Box>
                <Typography variant="h3">From around the web</Typography>
                <Stack direction="column">
                    List of news articles in "rows"
                </Stack>
                </Box>
                
                <Box sx={{ display: "flex", pr: 2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
                
            </Stack>
        </Box>
    )
}

export default News;