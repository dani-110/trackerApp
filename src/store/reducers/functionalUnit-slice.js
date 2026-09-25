import { createSlice } from "@reduxjs/toolkit";
import { functionalUnit } from "../actions/functionalUnit";


const initialState = {
  functionalUnit: [],
  totalcount: 0,
}

const functionalUnitSlice = createSlice({
  name: "functionalUnit",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(functionalUnit.pending, (state, action) => {
      state.functionalUnit = []
    });
    builder.addCase(functionalUnit.fulfilled, (state, action) => {
      state.functionalUnit = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default functionalUnitSlice.reducer;
