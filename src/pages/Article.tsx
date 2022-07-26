import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import image from "../assets/img/largeImage.jpeg";
import { useParams } from "react-router-dom";
import { useArticleQuery } from "../store/article/hooks";
import { Article } from "../store/article/types";
import { useAppDispatch } from "../store/hooks";
import { setIsLoading } from "../store/app/appReducer";

const newsStory = {
  title: "Decentraland breaks $1 billion USD",
  content:
    "Decentraland's main currency, MANA, recently broke a major milestone this Tuesday. The burgeoning metaverse's token just surpassed a market cap of $1 billion USD valuation.",
  date: "04/27/2021",
  author: "Josh Kroslowitz",
  mainTag: "metaverse",
  tags: ["VR", "game", "web3"],
};

const ArticlePage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  console.log(id);
  const articleData = useArticleQuery(id);
  const [creationDate, setCreationDate] = useState<string | undefined>("");
  const [article, setArticle] = useState<Article | undefined>({
    id: "",
    title: "",
    imgUrl: "",
    mainTag: "",
    tags: [""],
    author: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });

  const getArticle = async () => {
    dispatch(setIsLoading(true));
    return articleData;
  };

  const findDate = () => {
    if (article) {
      const userDate = new Date(article.updatedAt);
      const year = userDate.getFullYear();
      const month = userDate.getMonth() + 1;
      const day = userDate.getDate();
      const convertedDate =
        month.toString() + "/" + day.toString() + "/" + year.toString();
      return convertedDate;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    const getData = async () => {
      const data: Article | undefined = await getArticle();
      setArticle(data);
    };
    getData();
    const date = findDate();
    setCreationDate(date);
    setIsLoading(false);
  }, []);

  return (
    <Box sx={{ p: 10, display: "flex", justifyContent: "center" }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h2">
          {article == undefined ? "temp" : article.title}
        </Typography>
        <Typography>{article == undefined ? "temp" : creationDate}</Typography>
        <Chip
          label={article == undefined ? "temp" : article.mainTag}
          sx={{ maxWidth: 100 }}
        />
        <Box>
          {article
            ? article.tags.map((tag) => (
                <Chip label={tag} sx={{ maxWidth: 80, maxHeight: 20 }} />
              ))
            : null}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 350, md: 550, lg: 550 },
            backgroundSize: "cover",
            backgroundImage: `url(${
              article == undefined ? "none" : "http://localhost:3080/" + article.imgUrl
            })`,
          }}
        />
        <Box>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            {article == undefined
              ? "temp"
              : article.content}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ArticlePage;
