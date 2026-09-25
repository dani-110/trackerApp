import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const userFiller = createAsyncThunk(
  "userFiller",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.userFiller(), undefined, thunkAPI);
      console.log(response)
      if (response.status == '200') {
        return response.data
      } else {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: response.data.respdescription,
          })
        );
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const roleFiller = createAsyncThunk(
  "roleFiller",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.roleFiller(), undefined, thunkAPI);
      if (response.status == '200') {
        return response.data
      } else {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: response.data.respdescription,
          })
        );
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);