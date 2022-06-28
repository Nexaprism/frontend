import { Box, Typography } from '@mui/material';
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import {FC, useEffect, useState} from 'react';



function RatingBig(props: CircularProgressProps & { value: number; }) {
    const [ratingColor, setRatingColor] = useState<string>("#02a5db"); //blue

    const findRatingColor = (value: number): string => {
        let color = "";
        if (value >= 77) {
            color = "#35db02"; //green
        } else if (value >= 33 && value < 77) {
            color = "#db9702"; //orange
        } else {
            color = "#db0202"; //red
        }

        return color;
    }

    useEffect(() => {
        setRatingColor(findRatingColor(props.value))
    }, [])
    return (
        <Box sx={{ position: 'relative', p: 3 }}>
            <CircularProgress variant="determinate" size={250} sx={{color: `${ratingColor}`}} {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pb: 3
                }}
            >
                <Typography
                    variant="h1"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}`}</Typography>
                
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Typography>Average User Score</Typography>
            </Box>
            
        </Box>
    );
}

export default RatingBig;