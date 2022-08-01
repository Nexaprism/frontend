import { Box, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

const newsStory = {
  title: "Decentraland breaks $1 billion USD",
  content:
    "Decentraland's main currency, MANA, recently broke a major milestone this Tuesday. The burgeoning metaverse's token just surpassed a market cap of $1 billion USD valuation.",
  date: "04/27/2021",
  author: "Josh Kroslowitz",
};

const Glance: FC<{ createdAt: string; content: string }> = ({
  createdAt,
  content,
}) => {
    const [contentStr, setContentStr] = useState<string>("");
    const [reload, setReload] = useState<boolean>(true);

    const createContentString = () => {
        
        if(content) {
        const contentString = content.slice(0, 299);
        //console.log(content)
        setContentStr(contentString + "...");
        }
        
    }

    useEffect(() => {
        createContentString()
        setTimeout(() => {
            setReload(false);
          }, 1500);
    }, [reload])

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Stack direction="column">
        <Typography variant="h3">At a glance:</Typography>
        <Typography variant="caption">{createdAt}</Typography>
        <Typography textOverflow="ellipsis" variant="body2">
          {contentStr}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Glance;
