import { Container, Row } from "react-bootstrap";
import { IComments } from "../../types/INews";
import Comment from "../Comment/Comment";

interface ICommentsProps {
  comments: IComments[];
  id: string;
}

const Comments = (props: ICommentsProps) => {
  const { comments, id } = props;

  const CommentsList = comments.map((c) => {
    return <Comment id={id} comment={c} key={c.id} />;
  });

  return (
    <Container fluid>
      <h4 className="text-primary">نظرات</h4>
      <Row className="g-2">{CommentsList}</Row>
    </Container>
  );
};

export default Comments;
