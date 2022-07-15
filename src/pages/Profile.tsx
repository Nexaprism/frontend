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
import { useAppSelector } from "../store/hooks";
import { selectToken } from "../store/user/userReducer";

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

const user = {
  name: "CitizenSnipz",
  email: "joshkroz@gmail.com",
  created: "06/27/2022",
  totalReviews: 112,
};

const Profile: FC = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const token = useAppSelector(selectToken);

  const buttonStyles = {
    color: "white",
    background: "linear-gradient(to bottom, #bf1aed, #201438)",
    "&:hover": {
      background: "#cc7be3",
      transform: "none",
    },
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

  const handlePageChange = (event: ChangeEvent<any>, value: number) => {
    event.preventDefault();
    console.log("page is " + value);
    setPage(value);
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
        setTotalReviews(resData.data.reviews.totalReviews);
      });
  };

  useEffect(() => {
    getReviews();
  }, [page]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
      <Stack direction="column" width="100%" spacing={2}>
        <Typography variant="h2">Account details</Typography>
        <Divider />
        <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
          <Avatar sx={{ height: 115, width: 115 }}>CS</Avatar>
          <Typography fontSize={22} sx={{ fontWeight: 600 }}>
            {user.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Email:</Typography>
          <Typography>{user.email}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Member since:</Typography>
          <Typography>{user.created}, 1 month, 22 days</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography sx={{ fontWeight: 600 }}>Number of reviews:</Typography>
          <Typography>{user.totalReviews}</Typography>
        </Stack>
        <Box>
          <Button sx={buttonStyles}>Edit Profile</Button>
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
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination count={4} page={page} onChange={handlePageChange} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Profile;
