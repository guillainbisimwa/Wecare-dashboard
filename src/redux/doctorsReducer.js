import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const response = await axios.get(
      "https://wecare-api.herokuapp.com/api/v1/admin/dashboard/doctors"
    );
    return response.data;
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    list: [],
    isLoadinDoctor: false,
    errorDoctor: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoadinDoctor = true;
        state.errorDoctor = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoadinDoctor = false;
        state.list = action.payload;
        state.errorDoctor = null;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoadinDoctor = false;
        state.errorDoctor = action.errorDoctor.message;
      });
  },
});

export default doctorsSlice.reducer;
