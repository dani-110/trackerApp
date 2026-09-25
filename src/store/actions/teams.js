import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const teams = createAsyncThunk(
  "teams",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.teams(data.pageNo, data.pageSize), data, thunkAPI);
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
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
export const teamsMember = createAsyncThunk(
  "teamsMember",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.teamsMember(data), undefined, thunkAPI);
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


export const addTeamsMember = createAsyncThunk(
  "addTeamsMember",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.addTeamsMember(data.id), data.obj, thunkAPI);
      if (response.status == '201') {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: response.data.message,
          })
        );
        return response;
      } else {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: response.data.detail,
          })
        );
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const removeTeamsMember = createAsyncThunk(
  "removeTeamsMember",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.removeTeamsMember(data.teamId, data.userId), undefined, thunkAPI);
      if (response.status == '204') {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: response.data.message,
          })
        );
        return response;
      } else {
        thunkAPI.dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failed!",
            message: response.data.detail,
          })
        );
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);