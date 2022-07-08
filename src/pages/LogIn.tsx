import { Box, Button, Divider, FormControl, Stack, TextField, Typography } from '@mui/material';
import {FC} from 'react';
import { Link } from 'react-router-dom';
import logoDark from "../assets/img/nexLogo13.png";
import logoLight from "../assets/img/nexLogoLight.png"
import { useAppSelector } from '../store/hooks';
import { selectTheme } from '../store/theme/themeReducer';


const LogIn: FC = () => {
    const theme = useAppSelector(selectTheme);
    const buttonStyles= {
        color: 'white',
        background: 'linear-gradient(to bottom, #bf1aed, #201438)',
        "&:hover": {
          background: "#cc7be3",
          transform: "none"
        },
      }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <form>
      <Stack direction="column" sx={{display: 'flex', flexGrow: 1, alignItems: 'center'}}>
        <Box sx={{animation: "spin 20s linear infinite", }}>
        <style>{`
            @keyframes spin {
                 0% { transform: rotate(360deg); }
                 100% { transform: rotate(0deg); }
            }
        `}</style>
        <img src={theme == "light" ? logoLight : logoDark} height="175px" width="175px"/>
        </Box>
        
        <Typography fontSize={25}>Create a new account</Typography>
        <FormControl sx={{display: 'flex', width: '100%'}}>
          
            <Typography>Email:</Typography>
            <TextField />
            <Typography>Password:</Typography>
            <TextField type="password" />
            <Stack spacing={3} sx={{pt: 2}}>
            <Button type="submit" sx={buttonStyles}>
                Log In
              </Button>
              <Divider textAlign="center">OR</Divider>
              
              <Button component={Link} to="/signup" sx={buttonStyles}>Sign Up</Button>
            </Stack>
          
        </FormControl>
      </Stack>
      </form>
    </Box>
    )
}

export default LogIn;