import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks";
import { deleteComment } from "../../store/news-store/news-store";
import { IComments, INews } from "../../types/INews";
import IndexedDb from "../../util/IndexedDb";

import classes from "./Comments.module.css";

interface IComment {
  comment: IComments;
  id: string;
}

const Comment = (props: IComment) => {
  const { id, comment } = props;
  const dispatch = useAppDispatch();

  const deleteCommentHandler = async () => {
    const indexedDb = new IndexedDb("show-news");
    await indexedDb.createObjectStore(["news"], "id");
    const dbObject: INews = await indexedDb.getValue("news", id);

    dbObject.comments = dbObject.comments?.filter((c) => c.id !== comment.id);

    await indexedDb.putValue("news", dbObject);

    dispatch(deleteComment({ id, comment }));
  };

  return (
    <Col className="mt-5" lg="6">
      <div className="p-4 shadow bg-white rounded d-flex justify-content-between align-items-center">
        <h5>{comment.comment}</h5>
        <FontAwesomeIcon
          onClick={() => deleteCommentHandler()}
          className={classes.icon}
          icon={faTrash}
        />
      </div>
    </Col>
  );
};

export default Comment;
