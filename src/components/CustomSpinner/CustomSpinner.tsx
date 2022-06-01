import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <Spinner animation="grow" variant="success" />
    </div>
  );
};

export default CustomSpinner;
