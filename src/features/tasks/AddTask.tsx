import React, { useState } from "react";

// RTK
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "./taskSlice";

// Styling
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Stack
} from "react-bootstrap";
import { Plus } from "react-feather";
import "./styles.css";

export const AddTask = () => {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value);

  const canSave = Boolean(newTask) && addRequestStatus === "idle";

  const onAddTaskClicked = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addTask({
            id: nanoid(),
            task: newTask,
            completed: false,
            createdAt: new Date().toLocaleDateString("en-US"),
          })
        ).unwrap();
        setNewTask("");
      } catch (err) {
          console.error("Failed to save the task", err);
      } finally {
          setAddRequestStatus("idle");
      }
    }
  };

  return (
    <>
      <Stack
        as={Form}
        onSubmit={onAddTaskClicked}
        direction="horizontal"
        gap={2}
        id="add-form"
      >
        <FormGroup>
          <FormLabel column htmlFor="newTodo">
            New Todo
          </FormLabel>
          <FormControl
            autoFocus
            required
            id="newTodo"
            type="text"
            value={newTask}
            onChange={onContentChanged}
            placeholder="Add new task..."
          />
        </FormGroup>
          <Button type="submit" aria-label="Add Todo" disabled={!canSave}>
            <Plus />
          </Button>
      </Stack>
    </>
  );
};
