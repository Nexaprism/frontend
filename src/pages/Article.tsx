import { Box, Chip, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import image from "../assets/img/largeImage.jpeg";
import { useParams } from "react-router-dom";
import { useArticleQuery } from "../store/article/hooks";
import { Article } from "../store/article/types";
import { useAppDispatch } from "../store/hooks";
import { setIsLoading } from "../store/app/appReducer";


const ArticlePage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
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

  const findDate = (article: any) => {
    if (article) {
      const userDate = new Date(article);
      const year = userDate.getFullYear();
      const month = userDate.getMonth() + 1;
      const day = userDate.getDate();
      const result =
        month.toString() + "/" + day.toString() + "/" + year.toString();
      return result;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    const getData = async () => {
      const data = await getArticle();
      setArticle(data.returnedArticle);
      const date = findDate(data.createdDate);
      setCreationDate(date);
    };
    getData();
    
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
                <Chip key={tag} label={tag} sx={{ maxWidth: 80, maxHeight: 20 }} />
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
