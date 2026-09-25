import { createSlice } from "@reduxjs/toolkit";
import { queues } from "../actions/queues";


const initialState = {
  queues: [],
  totalcount: 0,
}

const queuesSlice = createSlice({
  name: "queues",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(queues.pending, (state, action) => {
      state.queues = []
    });
    builder.addCase(queues.fulfilled, (state, action) => {
      state.queues = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default queuesSlice.reducer;
