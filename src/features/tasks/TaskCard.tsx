import { useState } from "react";

// RTK
import { useAppDispatch } from "../../app/hooks";

// Components
import { IconButton } from "../../common/components/IconButton";

// Styling and types
import "./styles.css";
import { Col, FormCheck, FormControl, Stack } from "react-bootstrap";
import type { Task } from "./taskSlice";

export const TaskCard = ({ id, task, completed, createdAt, editedAt }: Task) => {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [requestStatus, setRequestStatus] = useState("idle");
  const [editedTaskText, setEditedTaskText] = useState(task);
  console.log("Task card rendered");

  return (
    <Stack direction="horizontal" className="task">
      <FormCheck
        inline
        type="checkbox"
        defaultChecked={completed}
        id={id}
      />
      {editMode ? (
        <>
          <Stack>
            <FormControl
              value={editedTaskText}
              required
              onChange={(e) => setEditedTaskText(e.target.value)}
            />
          </Stack>
          <IconButton
            iconName={"Save"}
            handleOnClick={() => ""}
          />
        </>
      ) : (
        <>
          <Col>{task}</Col>
          <IconButton
            iconName={"Edit"}
            handleOnClick={() => ""}
          />
        </>
      )}
      <IconButton
        iconName={"Delete"}
        handleOnClick={() => ""}
      />
    </Stack>
  );
};
