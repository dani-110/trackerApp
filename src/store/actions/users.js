import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const users = createAsyncThunk(
  "users",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.users(data.pageNo, data.pageSize), undefined, thunkAPI);
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


export const createUsers = createAsyncThunk(
  "createUsers",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.createUsers(), data, thunkAPI);
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
export const editUsers = createAsyncThunk(
  "editUsers",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.editUsers(data.id), data.obj, thunkAPI);
      console.log(response)
      if (response.status == '200') {
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
export const changeStatusUsers = createAsyncThunk(
  "changeStatusUsers",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.changeStatusUsers(data.id), data.obj, thunkAPI);
      console.log(response)
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
export const roleUsers = createAsyncThunk(
  "roleUsers",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.roleUsers(data.id), data.obj, thunkAPI);
      console.log(response)
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
export const revokeRoleUsers = createAsyncThunk(
  "revokeRoleUsers",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.revokeRoleUsers(data.userId,data.roleId), undefined, thunkAPI);
      console.log(response)
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
export const getRoleUsers = createAsyncThunk(
  "getRoleUsers",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.getRoleUsers(data), undefined, thunkAPI);
      console.log(response)
      if (response.status == '200') {
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
