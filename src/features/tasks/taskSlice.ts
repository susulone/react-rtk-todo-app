import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../app/store";

type TaskState = {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
};

export type Task = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: string;
  editedAt?: string;
};

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

const TASKS_URL = `http://localhost:3001/tasks`;

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(TASKS_URL);
  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (initialTask: Task) => {
    try {
      const response = await axios.post(TASKS_URL, initialTask);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }
);

export const toggleTaskComplete = createAsyncThunk(
  "tasks/toggleTaskComplete",
  async (initialTask: Partial<Task>) => {
    const { id, completed } = initialTask;
    try {
      const response = await axios.patch(`${TASKS_URL}/${id}`, {
        completed: completed,
      });
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }
);

export const editTaskDescription = createAsyncThunk(
  "tasks/editTaskDescription",
  async (initialTask: Partial<Task>) => {
    const { id } = initialTask;
    try {
      const response = await axios.put(`${TASKS_URL}/${id}`, initialTask);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchTasks.fulfilled,
        (state, action: PayloadAction<Array<Task>>) => {
          console.log("fetchTasks fulfilled", action.payload);
          state.status = "succeeded";
          const loadedTasks = action.payload.map((task) => {
            return task;
          });
          state.tasks = state.tasks.concat(loadedTasks);
        }
      );
    builder.addCase(fetchTasks.rejected, (state, { error }) => {
      console.log("fetchTasks rejected", error);
      state.status = "failed";
      state.error = `Failed to fetch tasks – ${error.message!}`;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      console.log(action.payload);
      state.tasks.push(action.payload);
    });
    builder.addCase(toggleTaskComplete.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log("Update could not complete");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const tasks = state.tasks.filter((task) => task.id !== id);
      state.tasks = [...tasks, action.payload];
    });
    builder.addCase(editTaskDescription.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log("Update could not complete");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const tasks = state.tasks.filter((task) => task.id !== id);
      state.tasks = [...tasks, action.payload];
    });
  },
});

export const getTasksStatus = (state: RootState) => state.tasks.status;
export const getTasksError = (state: RootState) => state.tasks.error;
export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
