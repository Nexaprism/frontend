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
import SkeletonReview from "../components/SkeletonReview";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User } from "../store/user/userTypes";
import {
  selectAvatar,
  selectEmail,
  setAvatar,
  setEmail,
  setToken,
  setUserId,
  setUsername,
} from "../store/user/userReducer";
import triangle1 from "../assets/img/triangle1.png";
import triangle2 from "../assets/img/triangle2.png";
import triangle3 from "../assets/img/triangle3.png";
import {
  selectIsLoading,
  selectIsLoggedIn,
  setIsLoading,
  setIsLoggedIn,
} from "../store/app/appReducer";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useAvatarUpdate } from "../store/user/hooks";
import { useReviews } from "../store/review/hooks";

const Profile: FC = () => {
  const [reviewItems, setReviewItems] = useState<any[]>([]);
  const [skeleGrid, setSkeleGrid] = useState<any[]>([]);
  const [creationDate, setCreationDate] = useState<string | undefined>("");
  const [page, setPage] = useState<number>(1);
  const isLoading = useAppSelector(selectIsLoading);
  const [reload, setReload] = useState<boolean>();
  const [reviewCount, setReviewCount] = useState<number>(24);
  const [user, setUser] = useState<User | undefined>({
    _id: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    reviews: [],
  });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const email = useAppSelector(selectEmail);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useGetUserQuery(userId, token);
  const userReviewFunc = useReviews();
  const updateAvatarFunc = useAvatarUpdate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
      const convertedDate =
        month.toString() + "/" + day.toString() + "/" + year.toString();
      return convertedDate;
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
    return userData;
  };

  const getUserReviewData = async () => {
    dispatch(setIsLoading(true));
    let data;
    if (token && userId) {
      data = await userReviewFunc.getByUser(token, userId, page);
      setReviewItems(data.reviews)
    }
    
    return data;
  };

  const makeSkeleGrid = () => {
    let returnedArr = [];
    for(let i = 0; i < 6; i++) {
      returnedArr.push(
        <Grid
          key={i}
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <SkeletonReview />
        </Grid>
      );
    };
    //setSkeleGrid(returnedArr);
    return returnedArr;
  };

  const addReviews = (reviews: any[]) => {
    let reviewArray: any[] = [];
    if(reviews.length === 0) {
      reviewArray.push(
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h2">
            No reviews yet.
          </Typography>
        </Grid>
      );
    } else {
      reviews.map((review: any, index: number) => {
        reviewArray.push(
          <Grid
            key={index}
            item
            xs={12}
            md={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ReviewCard
              id={review.id}
              rating={review.rating}
              content={review.content}
              date={review.createdAt}
              user={review.user}
              prodName={review.productName}
              prodId={review.productId}
            />
          </Grid>
        );
      });
    }
    

    setReviewItems(reviewArray);
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    //auto logs out the user if their token has expired
    const expiryDate = localStorage.getItem("expiryDate");
    if (expiryDate) {
      const currentTime = new Date().getTime();
      const expiryTime = Date.parse(expiryDate);
      if (currentTime > expiryTime) {
        console.log(isLoggedIn);
        logout();
        navigate("/");
      }
    }

    const getData = async () => {
      const data = await getUser();
      setUser(data.user);
      setCreationDate(data.createdAt);
      if (data.user) {
        const reviewData = await getUserReviewData();
        if (reviewData) {
          //setReviewItems(reviewData.reviews);
          addReviews(reviewData.reviews);
          setReviewCount(reviewData.totReviews);
        }
      }
    };
    getData();
    findUserSince();
    console.log(reviewItems)
    dispatch(setIsLoading(false));
    setTimeout(() => {
      setReload(false);
    }, 1500);
  }, [reload, page]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
      <Stack direction="column" width="100%" spacing={2}>
        <Typography variant="h2">Account details</Typography>
        <Divider />
        <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{ height: 115, width: 115 }}
            src={user == undefined ? "none" : user.avatar}
          />
          <Typography fontSize={22} sx={{ fontWeight: 600 }}>
            {user == undefined ? "none" : user.username}
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
          <Button sx={buttonStyles} onClick={logout}>
            Logout
          </Button>
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
          {isLoading ? makeSkeleGrid() : reviewItems}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.round(reviewCount / 6)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Profile;
