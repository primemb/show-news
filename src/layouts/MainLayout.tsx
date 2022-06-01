import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation/Navigation";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: IMainLayoutProps) => {
  const { children } = props;
  return (
    <Container fluid>
      <Navigation />
      {children}
    </Container>
  );
};

export default MainLayout;
