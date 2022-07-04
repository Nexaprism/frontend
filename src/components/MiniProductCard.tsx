import { Box, Stack, Typography } from '@mui/material';
import {FC} from 'react';
import RatingSmall from './RatingSmall';

const product = {
    title: "Decentraland",
    mainTag: "metaverse",
    tags: ["web3", "crypto", "VR", "game", "DAO", "decentralized"],
    rating: 84,
    ratingQuantity: 127,
  };

const MiniProductCard: FC = () => {

    return (
        <Stack direction="row" width="auto" sx={{display: 'flex', alignItems: 'center'}}>
            <RatingSmall value={product.rating} />
            <Typography>{product.title}</Typography>
            <Typography>Reviews: {product.ratingQuantity}</Typography>
        </Stack>
    )
}

export default MiniProductCard;