// Components
import { Header } from "../common/components/Header";
import { TaskList } from "../features/tasks/TaskList";
import { Footer } from "../common/components/Footer";

// Styling
import { Container } from "react-bootstrap";
import "./App.css";

function App() {

  return (
    <Container fluid>
      <Header />
      <TaskList />
      <Footer />
    </Container>
  );
}

export default App;
