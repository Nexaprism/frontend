import { Box, Typography } from '@mui/material';
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import {FC, useEffect, useState} from 'react';



function RatingSmall(props: CircularProgressProps & { value: number; }) {
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
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress variant="determinate" size={50} sx={{color: `${ratingColor}`}} {...props} />
            </Box>
            
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}`}</Typography>
                
            </Box>
        </Box>
    );
}

export default RatingSmall;