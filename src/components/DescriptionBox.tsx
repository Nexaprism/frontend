import { Box, Link, Stack, styled, Typography } from "@mui/material";
import { FC } from "react";

const DescriptionBox: FC<{
  description: string;
  company: string;
  developers: string[];
  url: string;
}> = ({ description, company, developers, url }) => {
  const Item = styled("div")(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    backgroundColor: "transparent",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.primary,
    display: "inline-flex",
  }));

  return (
    <Box>
      <Stack>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 1 }}
          >
            Description:
          </Typography>
          {description}
        </Item>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 2 }}
          >
            Company:
          </Typography>
          {company}
        </Item>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 1 }}
          >
            Developers:
          </Typography>
          {developers.map((name, index) => {
            if(index !== developers.length -1){
              return name + ", "
            } else {
              return name
            }
            })}
        </Item>
        <Item>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, textDecoration: "underline", pr: 1 }}
          >
            URL:
          </Typography>
          <Link href={url} target="_blank">
            {url}
          </Link>
        </Item>
      </Stack>
    </Box>
  );
};

export default DescriptionBox;
