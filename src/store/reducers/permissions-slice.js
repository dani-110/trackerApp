import { createSlice } from "@reduxjs/toolkit";
import { permissions } from "../actions/permissions";


const initialState = {
  permissions: [],
  totalcount: 0,
}

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(permissions.pending, (state, action) => {
      state.permissions = []
    });
    builder.addCase(permissions.fulfilled, (state, action) => {
      state.permissions = action.payload.list
      state.totalcount = action.payload.total
    });
  },
  reducers: {
  },
});
export default permissionsSlice.reducer;
