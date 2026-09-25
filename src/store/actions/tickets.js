import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const tickets = createAsyncThunk(
  "tickets",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.tickets(data.pageNo, data.pageSize), undefined, thunkAPI);
      console.log(response)
      if (response.status == '200') {
        if (response.data.tickets.length == 0) {
          thunkAPI.dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: 'Fetched! No data found',
            })
          );
        }
        return {
          list: response.data.tickets,
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

export const ticketById = createAsyncThunk(
  "ticketById",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.ticketById(data), undefined, thunkAPI);
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


export const createTickets = createAsyncThunk(
  "createTickets",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.createTickets(), data, thunkAPI);
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
export const acknowledgementApprove = createAsyncThunk(
  "acknowledgementApprove",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.acknowledgementApprove(data.id), data.obj, thunkAPI);
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
export const ticketClassification = createAsyncThunk(
  "ticketClassification",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.ticketClassification(data.id), data.obj, thunkAPI);
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
export const ticketAssignment = createAsyncThunk(
  "ticketAssignment",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.ticketAssignment(data.id), data.obj, thunkAPI);
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