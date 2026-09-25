import { createSlice } from "@reduxjs/toolkit";
import { userlist, users } from "../actions/users";


const initialState = {
  users: [],
  totalcount: 0,
  getobauserlist: [],
  totalOBAcount: 0
}

const usersSlice = createSlice({
  name: "users",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(users.pending, (state, action) => {
      state.users = []
    });
    builder.addCase(users.fulfilled, (state, action) => {
      state.users = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default usersSlice.reducer;
