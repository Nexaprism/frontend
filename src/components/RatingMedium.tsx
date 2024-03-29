import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import {FC, useEffect, useState} from 'react';



function RatingMedium(props: CircularProgressProps & { value: number; }) {
    const [ratingColor, setRatingColor] = useState<string>("#02a5db"); //blue
    const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.between("xs", "sm"));

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
    }, [props.value])
    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {isXS ? (
                <CircularProgress variant="determinate" size={100} sx={{color: `${ratingColor}`}} {...props} />
            ) : (
                <CircularProgress variant="determinate" size={150} sx={{color: `${ratingColor}`}} {...props} />
            )}
            
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
                }}
            >
                <Typography
                    sx={{fontSize: {xs: "3em", sm: "4em"}}}
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}`}</Typography>
                
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            </Box>
            
        </Box>
    );
}

export default RatingMedium;