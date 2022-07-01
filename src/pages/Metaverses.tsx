import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import Glance from "../components/Glance";
import JumboNews from "../components/JumboNews";

const Metaverses: FC = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Stack direction="column" spacing={3}
        sx={{ width: { xl: 1500, lg: 1200, md: 800, sm: 600 } }}>
        <Box>
          <Box>
            <Typography variant="h2">The Metaverse</Typography>
          </Box>
          <Box>
            <Typography>
              The metaverse is a catch-all phrase for just about anything
              related to nascent technology and how we plan to interact with it.
              Is it VR? Is it AR? Is it web3? Is it all of those? For now the
              definition of the metaverse remains foggy, but ultimately it will
              be up to us to decide what it is and isn't and starts when we get
              together and make more content. What better place to consider all
              that than right here, at the nexaprism.
            </Typography>
          </Box>
          <Stack
          direction="row"
          sx={{
            backgroundColor: "red",
            maxHeight: { xs: 350, md: 550, lg: 400 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: { sm: "100%", md: "100%", lg: "75%", xl: "75%" },
            }}
          >
            <JumboNews />
          </Box>

          <Box
            sx={{
              display: { md: "none", sm: "none", lg: "flex", xl: "flex" },
              width: "25%",
            }}
          >
            <Glance />
          </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Metaverses;
