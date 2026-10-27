import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";

import { uiActions } from "../reducers/ui-slice";
import HttpService from "../../service/http.service";
import { logoutUser } from "../reducers/auth-slice";

export const login = createAsyncThunk(
  "login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await HttpService.call(api.login(), { username, password }, thunkAPI);
      if (response.status == '200'&& response.data) {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Authorized!",
            message: "Welcome to Qubits",
          })
        );
        return response.data;
      } else {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: response?.data?.detail || "Unable to sign in",
          })
        );
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      thunkAPI.dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Authorization Failed!",
          message: "Invalid Username/Password",
        })
      );
      return thunkAPI.rejectWithValue();
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.logout(), undefined, thunkAPI);
      if (response.status == '204') {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Authorized!",
            message: response.data.respdescription,
          })
        );
        return response.data
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      thunkAPI.dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Authorization Failed!",
          message: "Invalid Username/Password",
        })
      );
      return thunkAPI.rejectWithValue();
    }
  }
);
export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.changePassword(), data, thunkAPI);

      if (response?.status === 200 && response.data?.reloginRequired) {
        thunkAPI.dispatch(logoutUser());
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Password changed",
            message: response.data.message || "Please sign in again",
          })
        );
        return response.data;
      }

      thunkAPI.dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Password change failed",
          message: response?.data?.detail || "Unable to change password",
        })
      );
      return thunkAPI.rejectWithValue();
    } catch {
      thunkAPI.dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Password change failed",
          message: "Unable to change password. Please try again",
        })
      );
      return thunkAPI.rejectWithValue();
    }
  }
);
export const me = createAsyncThunk(
  "me",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.me(), undefined, thunkAPI);
      console.log(response)
      if (response.data.responseCode == '00') {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Authorized!",
            message: response.data.respdescription,
          })
        );
        return response.data
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      thunkAPI.dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Authorization Failed!",
          message: "Invalid Username/Password",
        })
      );
      return thunkAPI.rejectWithValue();
    }
  }
);


export const getdashboarddata = createAsyncThunk(
  "getdashboarddata",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(
        api.getdashboarddata(),
        undefined,
        thunkAPI
      );

      if (
        response?.status >= 200 &&
        response?.status < 300 &&
        response.data
      ) {
        if (!data?.silent) {
          thunkAPI.dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: response.data.respdescription,
            })
          );
        }

        return response.data;
      }

      const errorMessage =
        response?.data?.respdescription ||
        "Failed to load dashboard data.";

      if (!data?.silent) {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: errorMessage,
          })
        );
      }

      return thunkAPI.rejectWithValue(
        response?.data ?? errorMessage
      );
    } catch (error) {
      const errorData = error?.response?.data;

      const errorMessage =
        errorData?.respdescription ||
        "Unable to load dashboard data. Please try again.";

      if (!data?.silent) {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Request Failed!",
            message: errorMessage,
          })
        );
      }

      return thunkAPI.rejectWithValue(
        errorData ?? error?.message ?? errorMessage
      );
    }
  }
);
