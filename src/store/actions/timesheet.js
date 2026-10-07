import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const getTimeSheetByDay = createAsyncThunk(
  "getTimeSheetByDay",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.getTimeSheetByDay(data), undefined, thunkAPI);
      console.log(response)
      if (response.status == '200') {
        return response
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

export const workSuggestions = createAsyncThunk(
  "workSuggestions",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.workSuggestions(data), undefined, thunkAPI);
      console.log(response)
      if (response.status == '200') {
        if (response.data.items.length == 0) {
          thunkAPI.dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: 'Fetched! No data found',
            })
          );
        }
        return response.data.items;
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
export const entries = createAsyncThunk(
  "entries",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.entries(), data, thunkAPI);
      console.log(response)
      if (response.status == '201') {
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
export const updateEntries = createAsyncThunk(
  "updateEntries",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.updateEntries(data.id), data.obj, thunkAPI);
      console.log(response)
      if (response.status == '200') {
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
export const commit = createAsyncThunk(
  "commit",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.commit(), data, thunkAPI);
      console.log(response)
      if (response.status == '200') {
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
export const complianceStatus = createAsyncThunk(
  "complianceStatus",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.complianceStatus(data), undefined, thunkAPI);
      console.log(response)
      if (response.status == '200') {
        return {
          list: response.data.items,
          total: response.data.totalCount
        };
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
