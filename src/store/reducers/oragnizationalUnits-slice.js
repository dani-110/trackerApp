import { createSlice } from "@reduxjs/toolkit";
import { organizationUnits } from "../actions/oragnizationalUnits";


const initialState = {
  organizationUnits: [],
  totalcount: 0,
}

const organizationUnitsSlice = createSlice({
  name: "organizationUnits",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(organizationUnits.pending, (state, action) => {
      state.organizationUnits = []
    });
    builder.addCase(organizationUnits.fulfilled, (state, action) => {
      state.organizationUnits = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default organizationUnitsSlice.reducer;
