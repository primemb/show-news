import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>اخبار</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            صفحه اصلی
          </Nav.Link>
          <Nav.Link as={NavLink} to="/fav">
            مورد علاقه ها
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
