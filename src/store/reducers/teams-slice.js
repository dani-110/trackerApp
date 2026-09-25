import { createSlice } from "@reduxjs/toolkit";
import { teams } from "../actions/teams";


const initialState = {
  teams: [],
  totalcount: 0,
}

const teamsSlice = createSlice({
  name: "teams",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(teams.pending, (state, action) => {
      state.teams = []
    });
    builder.addCase(teams.fulfilled, (state, action) => {
      state.teams = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default teamsSlice.reducer;
