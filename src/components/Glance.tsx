import { Box, Stack, Typography } from '@mui/material';
import {FC} from 'react';

const newsStory = {
    title: "Decentraland breaks $1 billion USD",
    content: "Decentraland's main currency, MANA, recently broke a major milestone this Tuesday. The burgeoning metaverse's token just surpassed a market cap of $1 billion USD valuation.",
    date: "04/27/2021",
    author: "Josh Kroslowitz"
}

const Glance: FC = () => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2}}>
            <Stack direction='column'>
            <Typography variant='h3'>At a glance:</Typography>
            <Typography variant='caption'>{newsStory.date}</Typography>
            <Typography textOverflow='ellipsis' variant='body2'>{newsStory.content}</Typography>
            </Stack>
        </Box>
    )
}

export default Glance;