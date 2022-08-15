import { Box, Skeleton } from '@mui/material';
import {FC} from 'react';


const SkeletonProduct: FC = () => {


    return (
        <Box sx={{width: { sm: 150, md: 250, lg: 275 }, height: 275}}>
           <Skeleton variant="rectangular" width="100%" height="20vh" sx={{mb: 2}}/>
           <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="80%" />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="30%"/>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="50%"/>
        </Box>
    )
}

export default SkeletonProduct;