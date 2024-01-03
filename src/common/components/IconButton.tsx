// Styling
import { Edit, Trash2, Download } from "react-feather";
import { Button } from "react-bootstrap";

// Types
type IconType = "Edit" | "Delete" | "Save";

type IconButtonProps = {
  iconName: IconType;
  handleOnClick: () => void;
};

export const IconButton = ({ iconName, handleOnClick }: IconButtonProps) => {

  const getIconFromName = (iconName: IconType) => {
    switch (iconName) {
      case "Delete":
        return <Trash2 />;
      case "Edit":
        return <Edit />;
      case "Save":
        return <Download />;
    }
  };

  const icon = getIconFromName(iconName);

  const getAriaLabelText = (iconName: IconType) => {
    switch (iconName) {
      case "Delete":
        return "Delete Note";
      case "Edit":
        return "Edit Note";
      case "Save":
        return "Save Note";
    }
  };

  const ariaLabelText = getAriaLabelText(iconName);

  return (
    <Button onClick={handleOnClick} aria-label={ariaLabelText}>
      {icon}
    </Button>
  );
};
