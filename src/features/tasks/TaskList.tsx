import { useEffect } from "react";

// RTK
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchTasks,
    getTasksStatus,
    selectAllTasks,
    getTasksError,
} from "./taskSlice";

// Components
import { TaskCard } from "./TaskCard";
import { LoaderWheel } from "../../common/components/LoaderWheel";

// Styling and types
import "./styles.css";
import type { Task } from "./taskSlice";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);
  const tasksStatus = useAppSelector(getTasksStatus);
  const error = useAppSelector(getTasksError);

  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(fetchTasks())
        .unwrap()
        .catch((err) => {
          return err;
        });
    }
  }, [tasksStatus, dispatch]);

  let content;

  if (tasksStatus === "loading") {
    content = <LoaderWheel />;
  } else if (tasksStatus === "succeeded") {
    // Display newest tasks first and move completed tasks to the end
    const orderedTasks = tasks
      .slice()
      .sort((a: Task, b: Task) => b.createdAt.localeCompare(a.createdAt))
      .sort((a: Task, b: Task) => {
        return Number(a.completed) - Number(b.completed);
    });

    content = orderedTasks.map((task: Task) => (
      <TaskCard key={task.id} {...task} />
    ));
  } else if (tasksStatus === "failed") {
      content = <p id="errorIndicator">{error}</p>;
    }

  return (
    <main id="task-list">
      { content }
    </main>
  );
};
