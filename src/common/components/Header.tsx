// Styling
import "./styles.css";
import { Layers } from "react-feather";

export const Header = () => {
  return (
    <header id="header">
      <section id="logo-wrapper">
        <Layers />
        <h6>Taskify</h6>
      </section>
    </header>
  );
};
