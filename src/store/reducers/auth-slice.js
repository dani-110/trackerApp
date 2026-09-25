import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
} from "../actions/auth";
import cookie from "react-cookies";

const initialState = {
  isLoggedIn: false,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action.payload)
      state.isLoggedIn = true;
      const obj = {
       ...action.payload.user,
        token:action.payload.accessToken
      }
      state.user = obj;
      // localStorage.setItem('eCheque', JSON.stringify(obj));
      localStorage.setItem('personalizeLastActive', JSON.stringify(new Date().toISOString()))
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      // localStorage.removeItem('eCheque')
      localStorage.removeItem('personalizeLastActive')
    });
  },
  reducers: {
    saveUserData: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('personalizeLastActive')
    },
    setIsLogin: (state, action) => {
      state.isLoggedIn = true;
    },
    saveSessionId: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          // sessionId: action.payload.sessionid, 
          // permissions: action.payload.permissions
        };
      }
    }
  },
});
export default authSlice.reducer;

export const { saveUserData, logoutUser, setIsLogin, saveSessionId } = authSlice.actions;
