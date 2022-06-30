import { Box, Typography } from '@mui/material';
import {FC} from 'react';
import image from "../assets/img/largeImage.jpeg"



const JumboNews: FC = () => {
    return (
        <Box sx={{display: 'flex', alignItems: 'flex-end', width: '100%', height: {xs: 350, md: 550, lg: 400}, backgroundSize: 'cover', backgroundImage: `url(${image})`}}>
            <Typography variant='h2'>Title Goes Here</Typography>
        </Box>
    )
}

export default JumboNews;