import { Box, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";


const Glance: FC<{ createdAt: string; content: string }> = ({
  createdAt,
  content,
}) => {
    const [contentStr, setContentStr] = useState<string>("");
    const [readableDate, setReadableDate] = useState<string>("");
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
        const date = new Date(createdAt);
        setReadableDate(date.toLocaleDateString());
        setTimeout(() => {
            setReload(false);
          }, 1500);
    }, [reload, content])

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h3">At a glance:</Typography>
        <Box display="flex" justifyContent="flex-end">
        <Typography variant="caption">{readableDate}</Typography>
        </Box>
       
        <Typography textOverflow="ellipsis" variant="body2">
          {contentStr}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Glance;
