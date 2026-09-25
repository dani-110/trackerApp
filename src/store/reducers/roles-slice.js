import { createSlice } from "@reduxjs/toolkit";
import { roles } from "../actions/roles";


const initialState = {
  roles: [],
  totalcount: 0,
}

const rolesSlice = createSlice({
  name: "roles",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(roles.pending, (state, action) => {
      state.roles = []
    });
    builder.addCase(roles.fulfilled, (state, action) => {
      state.roles = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default rolesSlice.reducer;
