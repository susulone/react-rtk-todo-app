import { useState } from "react";

// RTK
import { useAppDispatch } from "../../app/hooks";
import { toggleTaskComplete, editTaskDescription, deleteTask } from "./taskSlice";

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

    const canSave = Boolean(editedTaskText) && requestStatus === "idle";

    const handleTaskEdit = () => {
      if (canSave) {
        try {
          setRequestStatus("pending");
          dispatch(
            editTaskDescription({
              id: id,
              task: editedTaskText,
              completed: completed,
              createdAt: createdAt,
              editedAt: new Date().toLocaleDateString("en-US"),
            })
          ).unwrap();
        } catch (err) {
            console.error("Failed to save the task", err);
        } finally {
            setRequestStatus("idle");
            console.log(requestStatus);
        }
      }
    };

  const handleTaskCompleted = () => {
    try {
      setRequestStatus("pending");
      dispatch(
        toggleTaskComplete({
          id: id,
          completed: !completed,
        })
      ).unwrap();
    } catch (err) {
        console.error("Failed to update the task", err);
    } finally {
        setRequestStatus("idle");
        console.log(requestStatus);
    }
  };

  const handleTaskDelete = () => {
    try {
      setRequestStatus("pending");
      dispatch(
        deleteTask({ id: id })
      ).unwrap();
    } catch (err) {
        console.error("Failed to delete the task", err);
    } finally {
        setRequestStatus("idle");
        console.log(requestStatus);
    }
  };

  return (
    <Stack direction="horizontal" className="task">
      <FormCheck
        inline
        type="checkbox"
        defaultChecked={completed}
        id={id}
        onChange={handleTaskCompleted}
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
            handleOnClick={() => {
              handleTaskEdit();
              setEditMode(false);
            }}
          />
        </>
      ) : (
        <>
          <Col>{task}</Col>
          <IconButton
            iconName={"Edit"}
            handleOnClick={() => setEditMode(true)}
          />
        </>
      )}
      <IconButton
        iconName={"Delete"}
        handleOnClick={handleTaskDelete}
      />
    </Stack>
  );
};
