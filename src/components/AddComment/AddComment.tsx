import { Form } from "react-bootstrap";

interface IAddComment {
  value: string;
  setValue: (value: string) => void;
}

const AddComment = (props: IAddComment) => {
  const { value, setValue } = props;

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>کامنت</Form.Label>
        <Form.Control
          onChange={(event) => setValue(event.target.value)}
          value={value}
          as="textarea"
          rows={3}
        />
      </Form.Group>
    </Form>
  );
};

export default AddComment;
