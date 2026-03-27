import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/employeeApi";




// GET ALL
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getEmployees();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// CREATE
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.addEmployee(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.updateEmployee(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// DELETE
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteEmployee(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// .................SLICE


const employeeSlice = createSlice({
  name: "employees",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // UPDATE
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (emp) => emp.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (emp) => emp.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;