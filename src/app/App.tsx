// Components
import { Header } from "../common/components/Header";
import { Footer } from "../common/components/Footer";

// Styling
import { Container } from "react-bootstrap";
import "./App.css";

function App() {

  return (
    <Container fluid>
      <Header />
      <Footer />
    </Container>
  );
}

export default App;
