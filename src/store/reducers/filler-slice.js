import { createSlice } from "@reduxjs/toolkit";
import { roleFiller, userFiller } from "../actions/fillers";


const initialState = {
  userfiller: [],
  rolefiller: [],
}

const fillerSlice = createSlice({
  name: "filler",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(userFiller.pending, (state, action) => {
      state.userfiller = []
    });
    builder.addCase(userFiller.fulfilled, (state, action) => {
      state.userfiller = action.payload
    });
    builder.addCase(roleFiller.pending, (state, action) => {
      state.rolefiller = []
    });
    builder.addCase(roleFiller.fulfilled, (state, action) => {
      state.rolefiller = action.payload
    });
  },
  reducers: {
  },
});
export default fillerSlice.reducer;
