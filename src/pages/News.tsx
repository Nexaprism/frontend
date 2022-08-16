import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  InputBase,
  Link,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, FC, useEffect, useState } from "react";
import JumboNews from "../components/JumboNews";
import SmallNewsCard from "../components/SmallNewsCard";
import { useGetArticle } from "../store/article/hooks";
import { selectIsLoading, setIsLoading } from "../store/app/appReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Article } from "../store/article/types";
import SkeletonJumbo from "../components/SkeletonJumbo";
import SkeletonMiniProduct from "../components/SkeletonMiniProduct";
import ArticleSmall from "../components/ArticleSmall";
import ArticleMedium from "../components/ArticleMedium";
import SkeletonProduct from "../components/SkeletonProduct";

type ArticleObj = {
  latest: Article;
  editPickMetaverse: Article;
  editPickVR: Article;
  editPickAR: Article;
};

const News: FC = () => {
  const getArticleFuncs = useGetArticle();
  const [page, setPage] = useState<number>(1);
  const [articleCount, setArticleCount] = useState<number>(0);
  const [mainArticles, setMainArticles] = useState<ArticleObj>();
  const [articleList, setArticleList] = useState<Article[]>();
  const [reload, setReload] = useState<boolean>();
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   marginLeft: 1,
  //   width: "100%",
  //   flexGrow: 1,
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: "inherit",
  //   "& .MuiInputBase-input": {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("sm")]: {
  //       width: "12ch",
  //       "&:focus": {
  //         width: "20ch",
  //       },
  //     },
  //   },
  // }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  const handlePageChange = (event: ChangeEvent<any>, value: number) => {
    event.preventDefault();
    dispatch(setIsLoading(true));
    setReload(true);
    setTimeout(() => {
      setReload(false);
    }, 2500);
    setPage(value);
  };

  const getMainTagArticles = async (tag: string) => {
    const data = await getArticleFuncs.getByMainTag(tag);
    return data;
  };

  const getArticlesByPage = async (requestedPage?: number) => {
    if (requestedPage) {
      return await getArticleFuncs.getByPage(1);
    }
    const data = await getArticleFuncs.getByPage(page);
    return data;
  };

  const handleMainArticles = (
    meta: Article[],
    vr: Article[],
    ar: Article[],
    latest: Article
  ) => {
    let tempArtObj = {} as ArticleObj;
    tempArtObj.latest = latest;
    tempArtObj.editPickMetaverse = meta[0];
    tempArtObj.editPickVR = vr[0];
    tempArtObj.editPickAR = ar[0];
    if (meta[0].id == latest.id) {
      tempArtObj.editPickMetaverse = meta[1];
    } else if (vr[0].id == latest.id) {
      tempArtObj.editPickVR = vr[1];
    } else if (ar[0].id == latest.id) {
      tempArtObj.editPickAR = ar[1];
    }
    setMainArticles(tempArtObj);
  };

  useEffect(() => {
    dispatch(setIsLoading(true));
    const getData = async () => {
      const metaArts = await getMainTagArticles("metaverse");
      const vrArts = await getMainTagArticles("VR");
      const arArts = await getMainTagArticles("AR");
      const mostRecentArtData = await getArticlesByPage(1);
      const currentArticles = await getArticlesByPage();
      setArticleCount(mostRecentArtData.totalArticles);
      setArticleList(currentArticles.articles);
      handleMainArticles(
        metaArts.returnedArticles,
        vrArts.returnedArticles,
        arArts.returnedArticles,
        mostRecentArtData.articles[0]
      );
    };
    getData();
    dispatch(setIsLoading(false));
  }, [reload, page]);

  return (
    <Box sx={{ pl: 10, pr: 10, pt: 5 }}>
      <Stack direction="column" spacing={3}>
        <Typography variant="h2">News</Typography>
        <Divider />
        {isLoading || mainArticles == undefined ? (
          <SkeletonJumbo />
        ) : (
          <JumboNews
            title={mainArticles.latest.title}
            mainTag={mainArticles.latest.mainTag}
            tags={mainArticles.latest.tags}
            id={mainArticles.latest.id}
            imgUrl={mainArticles.latest.imgUrl}
          />
        )}
        <Box sx={{ p: 2 }}>
          <Typography variant="h3">Editor's Picks</Typography>
          <Divider />
        </Box>

        <Stack direction="row" width="100%" sx={{ display: "flex" }}>
          <Stack
            direction="row"
            sx={{
              width: "65%",
              display: "flex",
              justifyContent: "flex-end",
              mr: 2,
            }}
          >
            {isLoading || mainArticles == undefined ? (
              <Box sx={{ mr: 5, width: "55%" }}>
                <SkeletonProduct />
              </Box>
            ) : (
              <ArticleMedium
                title={mainArticles.editPickMetaverse.title}
                mainTag={mainArticles.editPickMetaverse.mainTag}
                tags={mainArticles.editPickMetaverse.tags}
                id={mainArticles.editPickMetaverse.id}
                imgUrl={mainArticles.editPickMetaverse.imgUrl}
              />
            )}
          </Stack>
          {isLoading || mainArticles == undefined ? (
            <Stack direction="column" spacing={17} sx={{ width: "45%", ml: 5 }}>
              <SkeletonMiniProduct />
              <SkeletonMiniProduct />
            </Stack>
          ) : (
            <Stack direction="column" spacing={2} sx={{ width: "35%" }}>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <ArticleSmall
                  title={mainArticles.editPickVR.title}
                  mainTag={mainArticles.editPickVR.mainTag}
                  imgUrl={mainArticles.editPickVR.imgUrl}
                  id={mainArticles.editPickVR.id}
                  tags={mainArticles.editPickVR.tags}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <ArticleSmall
                  title={mainArticles.editPickAR.title}
                  mainTag={mainArticles.editPickAR.mainTag}
                  imgUrl={mainArticles.editPickAR.imgUrl}
                  id={mainArticles.editPickAR.id}
                  tags={mainArticles.editPickAR.tags}
                />
              </Box>
            </Stack>
          )}
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              p: 2,
            }}
          >
            <Typography variant="h3" sx={{ pb: 3 }}>
              Get Up To Date
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Divider />
            </Box>
          </Box>

          {(isLoading || reload) ? (
            <Stack
              direction="column"
              spacing={10}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "80%",
                height: "100vh",
              }}
            >
              <SkeletonMiniProduct />
              <SkeletonMiniProduct />
              <SkeletonMiniProduct />
              <SkeletonMiniProduct />
              <SkeletonMiniProduct />
            </Stack>
          ) : (
            <Stack
              direction="column"
              spacing={2}
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              {articleList?.map((a) => {
                let date = new Date(a.updatedAt);
                return (
                  <SmallNewsCard
                    key={a.id}
                    title={a.title}
                    mainTag={a.mainTag}
                    date={date.toLocaleDateString()}
                    imgUrl={a.imgUrl}
                    id={a.id}
                  />
                );
              })}
            </Stack>
          )}
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.round(articleCount / 6)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            pr: 2,
          }}
        >
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default News;
