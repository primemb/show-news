import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewsCard from "../../components/NewsCard/NewsCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { update } from "../../store/news-store/news-store";
import { INews } from "../../types/INews";
import IndexedDb from "../../util/IndexedDb";

const Favorite = () => {
  const newsState = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();
  const favNews = newsState.filter((n) => n.isLike);

  useEffect(() => {
    const checkData = async () => {
      const indexedDb = new IndexedDb("show-news");
      await indexedDb.createObjectStore(["news"], "id");
      const values: INews[] = await indexedDb.getAllValue("news");
      if (newsState.length === 0 && values.length > 0) {
        dispatch(update(values));
      }
    };
    checkData();
  }, [newsState.length, dispatch]);

  const cards = favNews.map((n) => {
    return (
      <Col key={n.id}>
        <NewsCard news={n} />
      </Col>
    );
  });

  return (
    <Container className="mt-5 pb-5">
      {newsState && (
        <Row xs={1} md={2} className="g-4">
          {cards}
        </Row>
      )}
    </Container>
  );
};

export default Favorite;
