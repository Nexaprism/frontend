import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  Modal,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectUserId } from "../store/user/userReducer";
import RatingBig from "./RatingBig";
import RatingMedium from "./ReviewMedium";
import { User } from "../store/user/userTypes";

const review = {
  user: "Username",
  review:
    "It's a good game, I love playing as myself and I can do all the things I do in real life but digitally. It's great!",
  date: "06/24/2022",
};

interface ReviewCardProps {
  rating: number;
}

const ReviewCard: FC<{
  user: User;
  content: String;
  date: String;
  rating: number;
}> = ({ user, content, date, rating }) => {
  const userId = useAppSelector(selectUserId);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleSubmitEdit = () => {
    //fetch update logic here

    setOpenEdit(!openEdit);
  };

  const handleDelete = () => {
    // fetch delete logic here

    setOpenDelete(!openDelete);
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

  return (
    <Card
      sx={{
        minWidth: 400,
        maxHeight: 200,
        display: "flex",
        borderRadius: 5,
        boxShadow: 3
      }}
    >
      {/*For Edits */}
      <Modal open={openEdit} onClose={handleOpenEdit}>
        <Stack sx={editBox} direction="column" spacing={3}>
          <Typography>Edit your review</Typography>
          <TextField multiline defaultValue={content} />
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
            p: 4
          }}
        >
          <Typography>Are you sure you want to delete?</Typography>
          <Stack direction="row" spacing={8} sx={{display: "flex", justifyContent: "center"}}>
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
                display: "flex", //user._id.toString() == userId ? "flex" : "none",
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
