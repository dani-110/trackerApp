import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const getPasswordPolicy = createAsyncThunk(
  "passwordPolicy",
  async (_, thunkAPI) => {
    try {
      const response = await HttpService.call(
        api.getPasswordPolicy(),
        undefined,
        thunkAPI
      );

      if (response?.status === 200 && response.data?.policy) {
        return response;
      }

      const message =
        response?.data?.detail ||
        response?.data?.message ||
        "Unable to load the active password policy.";

      thunkAPI.dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failed",
          message,
        })
      );

      return thunkAPI.rejectWithValue(message);
    } catch {
      return thunkAPI.rejectWithValue(
        "Unable to load the active password policy."
      );
    }
  }
);

export const updatePasswordPolicy = createAsyncThunk(
  "updatepasswordPolicy",
  async (request, thunkAPI) => {
    try {
      const response = await HttpService.call(
        api.updatePasswordPolicy(),
        request,
        thunkAPI
      );

      if (response?.status === 200 && response.data) {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Policy updated",
            message: response.data.message || "Password policy updated.",
          })
        );

        return response;
      }

      const message =
        response?.data?.detail ||
        response?.data?.message ||
        "Unable to update the password policy.";

      thunkAPI.dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Update failed",
          message,
        })
      );

      return thunkAPI.rejectWithValue(message);
    } catch {
      return thunkAPI.rejectWithValue(
        "Unable to update the password policy."
      );
    }
  }
);