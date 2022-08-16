import { Box, Skeleton } from '@mui/material';
import {FC} from 'react';


const SkeletonMiniProduct: FC = () => {


    return (
        <Box sx={{ height: 80, width: "100%" }}>
            <Skeleton variant="rectangular" width="100%" height="8vh"sx={{mb: 4}}/>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="80%" />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="30%"/>
        </Box>
    )
}

export default SkeletonMiniProduct;