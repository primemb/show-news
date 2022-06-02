import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AddComment from "../../components/AddComment/AddComment";
import Comments from "../../components/Comments/Comments";
import { useAppSelector } from "../../store/hooks";
import { addComment, update } from "../../store/news-store/news-store";
import { IComments, INews } from "../../types/INews";
import { v4 as uuidv4 } from "uuid";

import classes from "./SingleNews.module.css";
import IndexedDb from "../../util/IndexedDb";

const SingleNews = () => {
  const newsState = useAppSelector((state) => state.news);
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState<string>("");
  const [news, setNews] = useState<INews | undefined>();

  const { newsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkDataBase = async () => {
      const indexedDb = new IndexedDb("show-news");
      await indexedDb.createObjectStore(["news"], "id");
      const values: INews[] = await indexedDb.getAllValue("news");

      if (newsState.length > 0) {
        const newsObject = newsState.find((n) => n.id === newsId);
        if (!newsObject) {
          navigate("/");
        }
        setNews(newsObject);
      } else if (values.length > 0 && newsState.length === 0) {
        dispatch(update(values));
      } else if (values.length === 0 && newsState.length === 0) {
        navigate("/");
      }
    };
    checkDataBase();
  }, [newsState, newsId, navigate, dispatch]);

  const commentSubmitHandler = async () => {
    if (newComment.trim().length === 0) return;
    const tempComment: IComments = { id: uuidv4(), comment: newComment };

    const indexedDb = new IndexedDb("show-news");
    await indexedDb.createObjectStore(["news"], "id");
    const dbObject: INews = await indexedDb.getValue("news", newsId as string);
    if (dbObject.comments) {
      dbObject.comments.push(tempComment);
    } else {
      dbObject.comments = [tempComment];
    }

    await indexedDb.putValue("news", dbObject);

    dispatch(addComment({ id: newsId as string, comment: tempComment }));
  };

  return (
    <>
      <Container
        fluid
        className={`shadow-sm p-3 mt-5 mb-5 bg-white rounded ${classes.container}`}
      >
        {news && (
          <Row>
            <Col lg="3">
              <div className={`mb-3 ${classes.image}`}>
                <img
                  className="rounded"
                  src={news.enclosure}
                  alt={news.title}
                />
              </div>
            </Col>
            <Col lg="9">
              <h4 className={`${classes.title}`}>{news.title}</h4>
              <p className="pt-5">{news.description}</p>
              <h5 className="mt-5 mb-4 text-primary">افزودن نظر</h5>
              <Col lg="6">
                <AddComment value={newComment} setValue={setNewComment} />
                <Button onClick={commentSubmitHandler}>تایید</Button>
              </Col>
            </Col>
          </Row>
        )}
      </Container>
      <Comments
        id={news?.id as string}
        comments={(news?.comments as IComments[]) || []}
      />
    </>
  );
};

export default SingleNews;
