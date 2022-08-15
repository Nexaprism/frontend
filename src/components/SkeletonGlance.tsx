import { Box, Skeleton } from '@mui/material';
import {FC} from 'react';


const SkeletonGlance: FC = () => {


    return (
        <Box width="100%" sx={{m: 2}}>
            <Skeleton variant="rectangular" width="100%" height="15vh"sx={{mb: 4}}/>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </Box>
    )
}

export default SkeletonGlance;