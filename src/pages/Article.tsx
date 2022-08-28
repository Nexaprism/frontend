import { Box, Chip, Link, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import image from "../assets/img/largeImage.jpeg";
import { useParams } from "react-router-dom";
import { useGetArticle } from "../store/article/hooks";
import { Article } from "../store/article/types";
import { useAppDispatch } from "../store/hooks";
import { setIsLoading } from "../store/app/appReducer";

const ArticlePage: FC = () => {
  const getArticleFuncs = useGetArticle();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [creationDate, setCreationDate] = useState<string | undefined>("");
  const [article, setArticle] = useState<Article | undefined>({} as Article);

  const getArticle = async () => {
    let articleData;
    if (id) {
      articleData = await getArticleFuncs.getById(id);
    }
    return articleData;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      dispatch(setIsLoading(true));
      let articleData;
      if (id) {
        articleData = await getArticleFuncs.getById(id);
      }
      if (articleData && articleData.createdDate) {
        setArticle(articleData.returnedArticle);
        setCreationDate(new Date(articleData.createdDate).toLocaleDateString());
      }

      dispatch(setIsLoading(false));
    };
    getData();
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
          {article && article.tags
            ? article.tags.map((tag) => (
                <Chip key={tag} label={tag} sx={{ maxHeight: 20, m: 0.5 }} />
              ))
            : null}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">Original article:</Typography>
          {article ? (
            <Link href={article.url} target="_blank">
              <Typography>{article.url}</Typography>
            </Link>
          ) : null}
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 350, md: 550, lg: 550 },
            backgroundSize: "cover",
            backgroundImage: `url(${
              article == undefined
                ? "none"
                : "http://localhost:3080/" + article.imgUrl
            })`,
          }}
        />
        <Box>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            {article == undefined ? "temp" : article.content}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ArticlePage;
