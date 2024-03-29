import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  OutlinedInput,
  Pagination,
  Stack,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
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
import {
  useGetUserQuery,
  useAvatarUpdate,
  useUserFunc,
} from "../store/user/hooks";
import { useReviews } from "../store/review/hooks";
import { selectTheme } from "../store/theme/themeReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile: FC = () => {
  const [reviewItems, setReviewItems] = useState<any[]>([]);
  const [creationDate, setCreationDate] = useState<string | undefined>("");
  const [page, setPage] = useState<number>(1);
  const [chosenAvatar, setChosenAvatar] = useState<number>(0);
  const [checkedPassword, setCheckedPassword] = useState<string>("");
  const [passError, setPassError] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
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
  const userFuncs = useUserFunc();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const theme = useAppSelector(selectTheme);
  const avatar = useAppSelector(selectAvatar);


  const buttonStyles = {
    display: isEdit ? "none" : "flex",
    color: "white",
    background: "linear-gradient(to bottom, #bf1aed, #201438)",
    "&:hover": {
      background: "#cc7be3",
      transform: "none",
    },
    mr: 4,
  };
  const submitButtonStyles = {
    display: isEdit ? "flex" : "none",
    color: "white",
    background: "linear-gradient(to bottom, #bf1aed, #201438)",
    "&:hover": {
      background: "#cc7be3",
      transform: "none",
    },
    mr: 4,
  };
  const cancelButtonStyles = {
    display: isEdit ? "flex" : "none",
    color: "white",
    backgroundColor: "#bd1e1e",
    "&:hover": {
      backgroundColor: "#ed4e42",
      transform: "none",
    },
    mr: 4,
  };

  const visibilityStyles = {
    color: theme == "light" ? "gray" : "white"
  }

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

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handlePageChange = (event: ChangeEvent<any>, value: number) => {
    event.preventDefault();
    console.log("page is " + value);
    setPage(value);
  };

  const handleEditUser = async () => {
    setReload(!reload);
    dispatch(setIsLoading(true));
    if(user) {
      const result = await bcrypt.compare(checkedPassword, user.password);
      if (!result) {
        console.log("incorrect password entered");
        return
      }
      if(newPassword === "") {
        setNewPassword(checkedPassword);
      } 
    }
    console.log(email);
    let image;
    if (user && chosenAvatar === 0) {
      image = user.avatar;
    } else if (chosenAvatar === 1) {
      image = triangle1;
    } else if (chosenAvatar === 2) {
      image = triangle2;
    } else {
      image = triangle3;
    }
    if (userId && email && token && newUsername) {
      userFuncs.update(userId, email, newUsername, newPassword, image, token);
      console.log("update submitted: " + newUsername);
    }
    localStorage.setItem("avatar", image);
    await dispatch(setAvatar(image));
    setIsEdit(false);
    setTimeout(() => {
      window.location.reload();
    }, 1100)
    
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
      setReviewItems(data.reviews);
    }

    return data;
  };

  const makeSkeleGrid = () => {
    let returnedArr = [];
    for (let i = 0; i < 6; i++) {
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
    }
    return returnedArr;
  };

  const addReviews = (reviews: any[]) => {
    let reviewArray: any[] = [];
    if (reviews.length === 0) {
      reviewArray.push(
        <Grid
          key={"no_reviews"}
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography sx={{display: "flex", justifyContent: "center", fontSize: {xs: "2em", sm: "3em"}}}>No reviews yet.</Typography>
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
              key={review.id}
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
        setNewUsername(data.user.username);
        setNewPassword(data.user.password);
        const reviewData = await getUserReviewData();
        if (reviewData) {
          addReviews(reviewData.reviews);
          setReviewCount(reviewData.totReviews);
        }
      }
    };
    getData();
    findUserSince();
    dispatch(setIsLoading(false));
  }, [reload, page, avatar]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: {xs:4, sm: 8} }}>
      <Stack direction="column" width="100%" spacing={2}>
        <Typography sx={{fontSize: {xs: "2em", sm: "3em", display: "flex", justifyContent: "center"}}}>Account details</Typography>
        <Divider />
        <Stack direction={{xs: "column", sm: "row"}} spacing={4} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{ height: 115, width: 115 }}
            src={user == undefined ? "none" : user.avatar}
          />
          <Box sx={{ display: isEdit ? "flex" : "none", flexDirection: "row" }}>
            <Typography>Choose username: </Typography>
            <TextField
              placeholder={user ? user.username : ""}
              onChange={(e) => setNewUsername(e.target.value)}
              sx={{
                ml: 2,
                backgroundColor: theme == "dark" ? "#424242" : "white",
              }}
            />
          </Box>
          <Box sx={{ display: isEdit ? "flex" : "none", flexDirection: "row" }}>
            <Typography>Enter previous password: </Typography>
            <OutlinedInput
            sx={{
              ml: 2,
              backgroundColor: theme == "dark" ? "#424242" : "white",
            }}
            required
            error={passError}
            type={showPass ? "text" : "password"}
            onChange={(e) => setCheckedPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e: React.SyntheticEvent) =>
                    e.preventDefault()
                  }
                  edge="end"
                >
                  {showPass ? <VisibilityOff sx={visibilityStyles} /> : <Visibility sx={visibilityStyles} />}
                </IconButton>
              </InputAdornment>
            }
            />
          </Box>
          <Box sx={{ display: isEdit ? "flex" : "none", flexDirection: "row" }}>
            <Typography>Enter new password: </Typography>
            <OutlinedInput
            sx={{
              ml: 2,
              backgroundColor: theme == "dark" ? "#424242" : "white",
            }}
            required
            error={passError}
            type={showPass ? "text" : "password"}
            onChange={(e) => setNewPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e: React.SyntheticEvent) =>
                    e.preventDefault()
                  }
                  edge="end"
                >
                  {showPass ? <VisibilityOff  sx={visibilityStyles} /> : <Visibility sx={visibilityStyles} />}
                </IconButton>
              </InputAdornment>
            }
            />
          </Box>

          <Typography
            fontSize={22}
            sx={{ fontWeight: 600, display: isEdit ? "none" : "flex" }}
          >
            {user == undefined ? "none" : user.username}
          </Typography>
        </Stack>
        <Box sx={{ display: isEdit ? "flex" : "none", width: "100%", flexDirection: {xs: "column", sm: "row"} }}>
          <Typography sx={{width: {xs: "100%", sm: "auto"}}}>Choose an avatar</Typography>
          <Stack direction="row" spacing={3} sx={{ ml:{xs: 0, sm: 3}, width: {xs: "100%", sm: "auto"}}}>
            <Box
              sx={{
                border: chosenAvatar === 1 ? "1px dashed red" : "none",
                backgroundImage: `url(${triangle1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: {xs: 50, sm: 100},
                width: {xs: 50, sm: 100},
              }}
              onClick={() => setChosenAvatar(1)}
            />
            <Box
              sx={{
                border: chosenAvatar === 2 ? "1px dashed red" : "none",
                backgroundImage: `url(${triangle2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: {xs: 50, sm: 100},
                width: {xs: 50, sm: 100},
              }}
              onClick={() => setChosenAvatar(2)}
            />
            <Box
              sx={{
                border: chosenAvatar === 3 ? "1px dashed red" : "none",
                backgroundImage: `url(${triangle3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: {xs: 50, sm: 100},
                width: {xs: 50, sm: 100},
              }}
              onClick={() => setChosenAvatar(3)}
            />
          </Stack>
        </Box>

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
          <Button sx={submitButtonStyles} onClick={handleEditUser}>
            Submit changes
          </Button>
          <Button sx={cancelButtonStyles} onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
          <Button sx={buttonStyles} onClick={() => setIsEdit(true)}>
            Edit Profile
          </Button>
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
