import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  Pagination,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User } from "../store/user/userTypes";
import {
  selectAvatar,
  selectEmail,
  selectToken,
  selectUserId,
  selectUsername,
  setAvatar,
  setEmail,
  setToken,
  setUserId,
  setUsername,
} from "../store/user/userReducer";
import triangle1 from "../assets/img/triangle1.png";
import triangle2 from "../assets/img/triangle2.png";
import triangle3 from "../assets/img/triangle3.png";
import { selectIsLoading, setIsLoading, setIsLoggedIn } from "../store/app/appReducer";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useAvatarUpdate } from "../store/user/hooks";
/**
 * Account details:
 * (age of account "member since", number of reviews, username, email, avatar)
 * edit account details button
 *
 * list of reviews, each with "edit" button
 *
 *
 */

//const reviews = [20, 58, 99, 74, 88, 84, 71, 15, 100, 48];

const Profile: FC = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [creationDate, setCreationDate] = useState<string | undefined>("");
  const [page, setPage] = useState<number>(1);
  const isLoading = useAppSelector(selectIsLoading);
  const [reload, setReload] = useState<boolean>();
  const [user, setUser] = useState<User | undefined>({
    id: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    reviews: [],
  });
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);
  const email = useAppSelector(selectEmail);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useGetUserQuery(userId, token);
  const updateAvatarFunc = useAvatarUpdate();


  const buttonStyles = {
    color: "white",
    background: "linear-gradient(to bottom, #bf1aed, #201438)",
    "&:hover": {
      background: "#cc7be3",
      transform: "none",
    },
    mr: 4,
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    marginLeft: 1,
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
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

  const findUserSince = () => {
    if (creationDate) {
      const userDate = new Date(creationDate);
      const year = userDate.getFullYear();
    const month = userDate.getMonth() + 1;
    const day = userDate.getDate();
    const convertedDate = month.toString() + "/" + day.toString() + "/" + year.toString();
    return convertedDate;
    }
  }

  const logout = () => {
    dispatch(setUserId(""));
    dispatch(setUsername(""));
    dispatch(setToken(""));
    dispatch(setEmail(""));
    dispatch(setAvatar(""));
    dispatch(setIsLoggedIn(false));
    navigate("/");
  };

  const chooseAvatar = (image: string) => {
    setReload(!reload);
    setIsLoading(true);
    if (userId && email && token) {
      updateAvatarFunc(image, userId, email, token!);
    }
    dispatch(setAvatar(image));
    
  };

  const handlePageChange = (event: ChangeEvent<any>, value: number) => {
    event.preventDefault();
    console.log("page is " + value);
    setPage(value);
  };

  const getUser = async () => {
    dispatch(setIsLoading(true));
    return userData
  };

  const getReviews = () => {
    const graphqlQuery = {
      query: `
      {
        reviews(page: ${page}) {
            reviews {
                _id
                content
                user {
                    username
                }
                rating
                createdAt
            }
        totalReviews
        }
      }
        `,
    };
    fetch("http://localhost:3080/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          console.log(resData);
          throw new Error("Fetching reviews failed");
        }
        setReviews(resData.data.reviews.reviews);
      });
  };

  const addReviews = () => {
    let reviewArray = [];
    if(user) {
      for (let i = 0; i < 3; i++) {
        reviewArray.push(
          <Grid
                item
                xs={12}
                md={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
          <ReviewCard
            rating={65}
            user={user}
            content={"sample content"}
            date={creationDate!}
          />
          </Grid>
        )
      }
    }
    
    setReviews(reviewArray);
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getUser();
      setUser(data.user);
      setCreationDate(data.createdAt);
      console.log(data)
      setIsLoading(false);
    };
    getData();
    addReviews();
    //getReviews();
    findUserSince();
    setTimeout(() => {
      setReload(false);
    }, 1500);
    setIsLoading(false);
  }, [ reload, page]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
      <Stack direction="column" width="100%" spacing={2}>
        <Typography variant="h2">Account details</Typography>
        <Divider />
        <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
          <Avatar sx={{ height: 115, width: 115 }} src={user == undefined ? "none" : user.avatar} />
          <Typography fontSize={22} sx={{ fontWeight: 600 }}>
            {user == undefined ? "none": user.username}
          </Typography>
        </Stack>
        <Typography>Choose an avatar</Typography>
        <Stack direction="row" spacing={3}>
          <Box component="a" onClick={() => chooseAvatar(triangle1)}>
            <img src={triangle1} height="100" />
          </Box>
          <Box component="a" onClick={() => chooseAvatar(triangle2)}>
            <img src={triangle2} height="100" />
          </Box>
          <Box component="a" onClick={() => chooseAvatar(triangle3)}>
            <img src={triangle3} height="100" />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Email:</Typography>
          <Typography>{user == undefined ? "none" : user.email}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Member since:</Typography>
          <Typography>{findUserSince()}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Number of reviews:</Typography>
          <Typography>{user == undefined ? 0 : user.reviews.length}</Typography>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button sx={buttonStyles}>Edit Profile</Button>
          <Button sx={buttonStyles} onClick={logout}>Logout</Button>
        </Box>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          sx={{ display: "flex", alignItems: "center", pt: 3 }}
        >
          <Box
            sx={{ justifyContent: "flex-start", minWidth: 280, width: "50%" }}
          >
            <Typography variant="h3">Your reviews:</Typography>
          </Box>

          <Box sx={{ justifyContent: "flex-end", width: "50%" }}>
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

        <Divider />
        <Grid container spacing={3}>
          {/* 
          {reviews.map((review: any) => (
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ReviewCard
                rating={review.rating}
                user={review.user.username}
                content={review.content}
                date={review.createdAt}
              />
            </Grid>
            ))}
          */}
          {reviews}
          
          
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={4} page={page} onChange={handlePageChange} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Profile;
