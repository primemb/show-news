import { Card } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks";
import { like } from "../../store/news-store/news-store";
import { INews } from "../../types/INews";
import IndexedDb from "../../util/IndexedDb";
import NewsCardFooter from "../NewsCardFooter/NewsCardFooter";
import classes from "./NewsCard.module.css";
interface INewsCard {
  news: INews;
}

const NewsCard = (props: INewsCard) => {
  const { news } = props;
  const dispatch = useAppDispatch();

  const likeNews = async (event: React.MouseEvent<SVGSVGElement>) => {
    const indexedDb = new IndexedDb("show-news");
    await indexedDb.createObjectStore(["news"], "id");
    await indexedDb.putValue("news", { ...news, isLike: true });
    dispatch(like(news.title));
  };

  return (
    <Card className={classes.card}>
      {news.enclosure && (
        <Card.Img
          className={classes.image}
          variant="top"
          src={news.enclosure}
        />
      )}
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
        <Card.Text className={classes.description}>
          {news.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <NewsCardFooter
          id={news.id}
          onLikeClick={likeNews}
          isLiked={news.isLike}
        />
      </Card.Footer>
    </Card>
  );
};

export default NewsCard;
