import { Box, Paper, Stack, styled, Typography } from "@mui/material";
import { FC } from "react";

const DetailBox: FC<{
  token: string;
  blockchain: string;
  launchDate: string;
  governance: string;
  marketCap: string;
}> = ({ token, blockchain, launchDate, governance, marketCap }) => {
  const Item = styled("div")(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundColor: "transparent",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: "white",
    display: "inline-flex",
  }));

  return (
    <Stack direction="column" sx={{ mt: 5, pl: 3, display: "flex", alignItems: "center" }}>
      <Typography variant="h5" sx={{ textDecoration: "underline", pl: 1, color: "white" }}>
        Details:{" "}
      </Typography>
      <Stack spacing={0} direction="column" justifyContent="center">
        <Item>
          <Typography variant="body2" sx={{ fontWeight: 600, pr: 1 }}>
            Blockchain:
          </Typography>
          {blockchain}
        </Item>
        <Item>
          <Typography variant="body2" sx={{ fontWeight: 600, pr: 1 }}>
            Crypto token:
          </Typography>
          {token}
        </Item>
        <Item>
          <Typography variant="body2" sx={{ fontWeight: 600, pr: 1 }}>
            Current Market Cap:
          </Typography>
          {marketCap}
        </Item>
        <Item>
          <Typography variant="body2" sx={{ fontWeight: 600, pr: 1 }}>
            Launch Date:
          </Typography>
          {launchDate}
        </Item>
        <Item>
          <Typography variant="body2" sx={{ fontWeight: 600, pr: 1 }}>
            Governance:
          </Typography>
          {governance}
        </Item>
      </Stack>
    </Stack>
  );
};

export default DetailBox;
