import { Box, Paper, Stack, styled, Typography } from '@mui/material';
import {FC} from 'react';


const details = {
    name: 'Decentraland',
    coin: 'MANA',
    chain: 'Ethereum',
    launchDate: '02/20/2020',
    tech: 'NFTs, VR',
    governance: 'DAO',
    marketCap: '1.089B'
}


const DetailBox: FC = () => {
    const Item = styled('div')(({ theme }) => ({
        //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        backgroundColor: 'transparent',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        display: 'inline-flex'
      }));

    return (
        <Stack direction="column" sx={{mt: 5, pl: 3}}>
            <Typography variant='h5' sx={{textDecoration: 'underline', pl: 1}}>Details: </Typography>
            <Stack spacing={0} direction='column' justifyContent='center'>
                <Item><Typography variant='body2' sx={{fontWeight: 600, pr: 1}}>Name:</Typography>{details.name}</Item>
                <Item><Typography variant='body2' sx={{fontWeight: 600, pr: 1}}>Blockchain:</Typography>{details.chain}</Item>
                <Item><Typography variant='body2' sx={{fontWeight: 600, pr: 1}}>Crypto token:</Typography>{details.coin}</Item>
                <Item><Typography variant='body2' sx={{fontWeight: 600, pr: 1}}>Current Market Cap:</Typography>{details.marketCap}</Item>
                <Item><Typography variant='body2' sx={{fontWeight: 600, pr: 1}}>Launch Date:</Typography>{details.launchDate}</Item>
                <Item><Typography variant='body2' sx={{fontWeight: 600, pr: 1}}>Tech:</Typography>{details.tech}</Item>
                <Item><Typography variant='body2' sx={{fontWeight: 600, pr: 1}}>Governance:</Typography>{details.governance}</Item>
            </Stack>
            
        </Stack>
    )
}

export default DetailBox;