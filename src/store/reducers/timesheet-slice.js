import { createSlice } from "@reduxjs/toolkit";
import { complianceStatus } from "../actions/timesheet";


const initialState = {
  timesheetCompliance: [],
  totalcount: 0,
}

const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(complianceStatus.pending, (state, action) => {
      state.timesheetCompliance = []
    });
    builder.addCase(complianceStatus.fulfilled, (state, action) => {
      state.timesheetCompliance = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default timesheetSlice.reducer;
