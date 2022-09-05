import {
  AppBar,
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { Link, useNavigate } from "react-router-dom";
import { selectTheme, setTheme } from "../store/theme/themeReducer";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { styled, alpha, useTheme } from "@mui/material/styles";
import mainLogo from "../assets/img/nexLogo13.png";
import {
  selectAvatar,
  setAvatar,
  setEmail,
  setToken,
  setUserId,
  setUsername,
} from "../store/user/userReducer";
import { selectIsLoggedIn, setIsLoggedIn } from "../store/app/appReducer";
import { selectAllTags, selectProducts } from "../store/product/productReducer";
import { RootState } from "../store";
import { connect } from "react-redux";

/**
 *
 * needs a search modal when in mobile mode instead of leaving the search bar up there
 *
 *
 */
 const mapStateToProps = (state: RootState) => ({
  avatar: state.user.avatar
});

const NavBar: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState<string>();
  const [searchBy, setSearchBy] = useState<boolean>(false);
  const searchTags = useAppSelector(selectAllTags);
  const themeFromStore = useAppSelector(selectTheme);
  const searchProducts = useAppSelector(selectProducts);
  const [reload, setReload] = useState<boolean>(true);
  const themeObj = useTheme();
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(selectAvatar);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const AcctLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    color: themeFromStore == "light" ? "black" : "white",
    "&:visited": {
      color: "primary",
    },
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

  const handleSwitchChange = () => {
    setSearchBy(!searchBy);
  }

  const handleThemeClick = () => {
    if (themeFromStore == "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  };

  const logout = () => {
    dispatch(setUserId(""));
    dispatch(setUsername(""));
    dispatch(setToken(""));
    dispatch(setEmail(""));
    dispatch(setAvatar(""));
    dispatch(setIsLoggedIn(false));
    navigate("/");
  };

  const pages = [
    { link: "view/metaverse", name: "metaverses" },
    { link: "view/AR", name: "ar" },
    { link: "view/VR", name: "vr" },
    { link: "news", name: "news" },
  ];

  useEffect(() => {
    let productNames: string[] = [];
    searchProducts.map((p) => {
      productNames.push(p.name);
    })
    setOptions(productNames);
  }, [reload]);

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
                <MenuItem key={page.name} component={Link} to={"/" + page.link}>
                  <Typography textAlign="center">{page.name}</Typography>
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
          <Box sx={{ display: { xs: "none", md: "flex" }, pr: 2 }}>

            <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
              <Typography>Tag</Typography>
              <Switch size="small" onChange={handleSwitchChange} />
              <Typography>Name</Typography>
            </Box>

            <Autocomplete
              options={searchBy ? options : searchTags}
              value={value}
              getOptionLabel={(option: string) => option}
              onChange={(event, newValue) => {
                if (newValue) {
                  setInputValue(newValue);
                  navigate("/search/" + newValue);
                }
              }}
              onInputChange={(event, newValue) => {
                setInputValue(newValue);
              }}
              onKeyDown={(e) => {if(e.key == 'Enter') {navigate("/search/" + inputValue);}}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  SelectProps={{ ...params, style: { ...{ color: "white" } } }}
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    style: { ...{ color: "white" } },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: { ...{ color: "white" } },
                    disableUnderline: true,
                  }}
                  
                  sx={{
                    width: "12em",
                    height: "1em",
                    borderRadius: 2,
                    pb: 7,
                    backgroundColor: alpha(themeObj.palette.common.white, 0.15),
                    "&:hover": {
                      backgroundColor: alpha(
                        themeObj.palette.common.white,
                        0.25
                      ),
                    },
                  }}
                  label={searchBy ? "Search by name" : "Search by tag"}
                  variant="filled"
                />
              )}
            />
          </Box>

          <Box
            justifyContent="right"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, pr: 2 }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={"/" + page.link}
                sx={{
                  my: 2,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {page.name}
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
                <Avatar alt="" src={avatar} />
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
              {isLoggedIn ? (
                <AcctLink to={"/account"}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">My Account</Typography>
                  </MenuItem>
                </AcctLink>
              ) : null}
              {isLoggedIn ? null : (
                <AcctLink to={"/signup"}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Sign Up</Typography>
                  </MenuItem>
                </AcctLink>
              )}

              <AcctLink to={"/login"}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Log In</Typography>
                </MenuItem>
              </AcctLink>
              {isLoggedIn ? (
                <MenuItem onClick={logout}>
                  <Typography>Logout</Typography>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default connect(mapStateToProps)(NavBar);
