import { Box, Card, CardActionArea, Chip, Link, Stack, Typography } from '@mui/material';
import {FC} from 'react';
import mainLogo from '../assets/img/nexaprismLogoSmall.png';

const newsStory = {
    title: "Decentraland breaks $1 billion USD",
    subHeading: "A new landmark for decentralized gaming. Will it last?",
    content: "Decentraland's main currency, MANA, recently broke a major milestone this Tuesday. The burgeoning metaverse's token just surpassed a market cap of $1 billion USD valuation.",
    date: "04/27/2021",
    author: "Josh Kroslowitz",
    mainTag: "metaverse",
    tags: ["VR", "game", "web3"]
}

const SmallNewsCard: FC = () => {

    return (
        <Card sx={{maxWidth: 800, maxHeight: 225, width: '100%'}}>
            <CardActionArea>
                <Stack direction="row" >
                    <Stack direction="column" width="60%" spacing={1} sx={{display: 'flex', pl: 2, pt: 1}}>
                        <Typography fontSize={{sm: 23, md: 28, lg: 28}}>{newsStory.title}</Typography>
                        <Typography fontSize={{sm: 16, md: 18, lg: 20}}>{newsStory.subHeading}</Typography>
                        <Chip label={newsStory.mainTag} sx={{maxWidth: 100}}/>
                        <Typography variant='caption'>{newsStory.date}</Typography>
                        <Link>Read more...</Link>
                    </Stack>
                    <Box sx={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'center'}}>
                        <img src={mainLogo} height="225px" />
                    </Box>
                </Stack>
            </CardActionArea>
        </Card>
            
        
    )
}

export default SmallNewsCard;