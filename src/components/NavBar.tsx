import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { selectTheme, setTheme } from "../store/theme/themeReducer";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { styled, alpha, useTheme } from "@mui/material/styles";
import mainLogo from "../assets/img/nexLogo13.png";

/**
 *
 * needs a search modal when in mobile mode instead of leaving the search bar up there
 *
 *
 */

const NavBar: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const themeFromStore = useAppSelector(selectTheme);
  const themeObj = useTheme();
  const dispatch = useAppDispatch();

  const AcctLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: themeFromStore == "light" ? "black" : "white",
    "&:visited": {
      color: "primary",
    },
  }));

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

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleButtonClick = () => {
    setAnchorElNav(null);
  };

  const handleThemeClick = () => {
    if (themeFromStore == "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  const pages = ["metaverses", "ar", "vr", "news", "crypto", "shop"];
  const settings = ["My Profile", "Sign Up", "Log In"];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, pt: 1 }}>
            <img src={mainLogo} height="50px" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Jura",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              width: "100%",
            }}
          >
            nexaprism
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} component={Link} to={"/" + page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/**
           *
           * //responsive menu split
           */}
          <Box sx={{ display: { xs: "flex", md: "none" }, pt: 1 }}>
            <img src={mainLogo} height="50px" />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Jura",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            nexaprism
          </Typography>
          <Box sx={{ display: { sm: "none", md: "flex" }, pr: 2 }}>
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

          <Box
            justifyContent="right"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, pr: 2 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={"/" + page}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={handleThemeClick}
              sx={{ p: 0, color: "white" }}
            >
              {themeFromStore == "dark" ? <Brightness7Icon /> : <BedtimeIcon />}
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 0, pl: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                backgroundColor: `${themeObj.palette.primary}`,
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <AcctLink to={"/account"}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">My Account</Typography>
                </MenuItem>
              </AcctLink>
              <AcctLink to={"/signup"}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Sign Up</Typography>
                </MenuItem>
              </AcctLink>
              <AcctLink to={"/login"}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Log In</Typography>
                </MenuItem>
              </AcctLink>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
