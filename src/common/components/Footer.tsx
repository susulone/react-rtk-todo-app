// Styling
import "./styles.css";

export const Footer = () => {
  const projectLifeTime = () => {
    const projectCreated = new Date("2024-01-03");
    const creationYear = projectCreated.getFullYear();

    const currentYear = new Date().getFullYear();

    if (creationYear !== currentYear) {
      return `${creationYear}–${currentYear}`;
    } else {
        return `${creationYear}`;
    }
  };

  return (
    <footer id="footer">
      <p id="footer-content">
        <span>&copy; </span>
        {projectLifeTime()} Suvi Sulonen
      </p>
    </footer>
  );
};
