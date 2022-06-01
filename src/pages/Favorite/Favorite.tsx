import { Col, Container, Row } from "react-bootstrap";
import NewsCard from "../../components/NewsCard/NewsCard";
import { useAppSelector } from "../../store/hooks";

const Favorite = () => {
  const newsState = useAppSelector((state) => state.news);

  const favNews = newsState.filter((n) => n.isLike);

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
