import { Box, Skeleton, Stack } from "@mui/material";
import { FC } from "react";

const SkeletonReview: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 400,
      }}
    >
      <Box sx={{pr: 2}}>
        <Skeleton variant="circular" width={80} height={80} />
      </Box>
      <Stack spacing={2}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width={210} height={60} />
      </Stack>
    </Box>
  );
};

export default SkeletonReview;
