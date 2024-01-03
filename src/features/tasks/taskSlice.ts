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
  },
});

export const getTasksStatus = (state: RootState) => state.tasks.status;
export const getTasksError = (state: RootState) => state.tasks.error;
export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
