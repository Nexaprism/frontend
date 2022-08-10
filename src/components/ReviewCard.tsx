import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  Input,
  Modal,
  Rating,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectToken, selectUserId } from "../store/user/userReducer";
import RatingBig from "./RatingBig";
import RatingMedium from "./ReviewMedium";
import { User } from "../store/user/userTypes";
import { useReviews } from "../store/review/hooks";
import { selectIsLoggedIn } from "../store/app/appReducer";

const ReviewCard: FC<{
  id: string;
  user: User;
  content: string;
  date: string;
  rating: number;
  prodId: string;
}> = ({ id, user, content, date, rating, prodId }) => {
  const userId = useAppSelector(selectUserId);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number | string>(rating);
  const [newReviewContent, setNewReviewContent] = useState<string>(content);
  const [reload, setReload] = useState<boolean>(true);
  const reviewFuncs = useReviews();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const token = useAppSelector(selectToken);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(Number(newValue));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleSubmitEdit = () => {
    //fetch update logic here
    if (token) {
      reviewFuncs.update(id, Number(sliderValue), newReviewContent, token, prodId);
    }

    setOpenEdit(!openEdit);
  };

  const handleDelete = () => {
    // fetch delete logic here
    console.log(id);
    if (token) {
      reviewFuncs.delete(id, token);
      setOpenDelete(!openDelete);
    } else {
      alert("Review deletion failed. Please login and try again");
    }
  };

  const redButtonStyle = {
    "&:hover": { transform: "none" },
    color: "#db0202",
  };

  const greenButtonStyle = {
    "&:hover": { transform: "none" },
    color: "#35db02",
  };

  const editBox = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };

  useEffect(() => {
    console.log("prodId is " + prodId)
    if (!user) {
      setTimeout(() => {
        setReload(!reload);
      }, 1500);
    }
  }, [reload]);

  return (
    <Card
      sx={{
        minWidth: 400,
        maxHeight: 200,
        display: "flex",
        borderRadius: 5,
        boxShadow: 3,
      }}
    >
      {/*For Edits */}
      <Modal open={openEdit} onClose={handleOpenEdit}>
        <Stack sx={editBox} direction="column" spacing={3}>
          <Typography>Edit your review</Typography>
          <Stack direction="row" spacing={2}>
            <Slider
              aria-label="Your Rating:"
              value={Number(sliderValue)}
              getAriaValueText={valuetext}
              color="secondary"
              onChange={handleSliderChange}
              disabled={!isLoggedIn}
            />
            <Input
              value={sliderValue}
              size="small"
              onChange={handleInputChange}
              disabled={!isLoggedIn}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
              sx={{ minWidth: 45 }}
            />
          </Stack>
          <TextField
            multiline
            defaultValue={content}
            onChange={(e) => {
              setNewReviewContent(e.target.value);
            }}
          />
          <Stack
            direction="row"
            spacing={8}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button sx={redButtonStyle} onClick={handleOpenEdit}>
              Cancel
            </Button>
            <Button sx={greenButtonStyle} onClick={handleSubmitEdit}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Modal>
      {/* For deletions*/}
      <Dialog open={openDelete} onClose={handleOpenDelete}>
        <Stack
          direction="column"
          spacing={4}
          sx={{
            minHeight: 100,
            minWidth: 300,
            display: "flex",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Typography>Are you sure you want to delete?</Typography>
          <Stack
            direction="row"
            spacing={8}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              sx={{ "&:hover": { transform: "none" } }}
              onClick={handleOpenDelete}
            >
              Cancel
            </Button>
            <Button sx={redButtonStyle} onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Dialog>
      <CardActionArea sx={{ display: "flex", p: 2 }} component="a">
        <Box sx={{ width: "50%" }}>
          <RatingMedium value={rating} />
        </Box>
        <CardContent sx={{ width: "50%" }}>
          <Stack
            direction="column"
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {content}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 10, pt: 3 }}>
              {date}
            </Typography>
            <Stack
              direction="row"
              sx={{
                display: user._id == userId ? "flex" : "none",
                justifyContent: "center",
                height: 50,
                pt: 4,
              }}
            >
              <Button onClick={handleOpenEdit} sx={{ display: "flex" }}>
                Edit
              </Button>
              <Button onClick={handleOpenDelete} sx={{ color: "#db0202" }}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ReviewCard;
