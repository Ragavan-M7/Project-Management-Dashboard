import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/projectApi";

// Fetch Projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const res = await api.getProjects();
    return res.data;
  }
);

// Create Project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data) => {
    const res = await api.addProject(data);
    return res.data;
  }
);

// Update Project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }) => {
    const res = await api.updateProject(id, data);
    return res.data;
  }
);

// Delete Project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id) => {
    await api.deleteProject(id);
    return id;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
      })

      // CREATE
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // UPDATE
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default projectSlice.reducer;