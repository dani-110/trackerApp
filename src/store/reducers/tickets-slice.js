import { createSlice } from "@reduxjs/toolkit";
import { tickets } from "../actions/tickets";


const initialState = {
  tickets: [],
  totalcount: 0,
  getobauserlist: [],
  totalOBAcount: 0
}

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(tickets.pending, (state, action) => {
      state.tickets = []
    });
    builder.addCase(tickets.fulfilled, (state, action) => {
      state.tickets = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default ticketsSlice.reducer;
