import { useState } from "react";
import { Alert } from "react-bootstrap";

interface IErrorAlert {
  title: string;
  message: string;
}

const ErrorAlert = (props: IErrorAlert) => {
  const [show, setShow] = useState(true);

  const { title, message } = props;

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{title}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
