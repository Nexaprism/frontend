import { Box, Skeleton } from '@mui/material';
import {FC} from 'react';


const SkeletonJumbo: FC = () => {


    return (
        <Box sx={{height: { xs: 350, md: 550, lg: 400 }, width: "100%", m: 2}}>
            <Skeleton variant="rectangular" width="100%" height="12vh"sx={{mb: 2}}/>
            <Skeleton variant="rectangular" width="100%" height="25vh" />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </Box>
    )
}

export default SkeletonJumbo;