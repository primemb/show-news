import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { INews } from "../../types/INews";
import { parse } from "rss-to-json";
import NewsCard from "../../components/NewsCard/NewsCard";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { update } from "../../store/news-store/news-store";
import axios, { CancelTokenSource } from "rss-to-json/node_modules/axios";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const newsState = useAppSelector((state) => state.news);
  const cancelTokens = useRef<CancelTokenSource[]>([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    cancelTokens.current.push(source);
    const getNews = async () => {
      setLoading(true);

      try {
        const data = await parse(
          "https://cors.chabk.ir/https://www.khabaronline.ir/rss",
          { cancelToken: source.token }
        );
        const tempNews: INews[] = [];
        const { items } = data;

        for (const item of items.slice(0, 6)) {
          const temp: INews = {
            id: uuidv4(),
            title: item.title,
            description: item.description,
            url: item.link,
            enclosure: item?.enclosures?.[0]?.url ?? "",
            isLike: false,
          };
          tempNews.push(temp);
        }

        cancelTokens.current = cancelTokens.current.filter((t) => t !== source);

        setLoading(false);
        setError(false);
        dispatch(update(tempNews));
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    getNews();
    const interval = setInterval(() => {
      getNews();
    }, 30000);

    return () => {
      cancelTokens.current.forEach((t) => t.cancel());
      clearInterval(interval);
    };
  }, [dispatch]);

  const cards = newsState.map((n) => {
    return (
      <Col key={n.id}>
        <NewsCard news={n} />
      </Col>
    );
  });

  return (
    <Container className="mt-5 pb-5">
      {error && !loading && (
        <ErrorAlert
          title="مشکلی پیش آمد!"
          message="امکان برقراری ارتباط با سرور وجود ندارد لطفا مجددا امتحان نمایید"
        />
      )}
      {loading && <CustomSpinner />}
      {newsState && !loading && (
        <Row xs={1} md={2} className="g-4">
          {cards}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
