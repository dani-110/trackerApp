import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const teamType = createAsyncThunk(
  "teamType",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.teamType(data), undefined, thunkAPI);
      console.log(response)
      if (response.status == '200') {
         thunkAPI.dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: 'Fetched! No data found',
            })
          );
        return response;
      } else {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: response.data.respdescription,
          })
        );
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateTeamType = createAsyncThunk(
  "updateTeamType",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.updateTeamType(), data, thunkAPI);
      console.log(response)
      if (response.status == '200') {
         thunkAPI.dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: 'Fetched! No data found',
            })
          );
        return response;
      } else {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: response.data.respdescription,
          })
        );
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);