
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/taskApi";

// Fetch tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const res = await api.getTasks();
    return res.data;
  }
);

// Create task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data) => {
    const res = await api.createTasks(data); // ✅ Correct function
    return res.data;
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }) => {
    const res = await api.updateTasks(id, data);
    return res.data;
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id) => {
    await api.deleteTasks(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })

      // CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        if (action.payload) state.list.push(action.payload);
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        if (!action.payload) return;
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;