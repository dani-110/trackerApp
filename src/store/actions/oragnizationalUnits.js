import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../interfaces/api.interface";
import HttpService from "../../service/http.service";
import { uiActions } from "../reducers/ui-slice";

export const organizationUnits = createAsyncThunk(
  "organizationUnits",
  async (data, thunkAPI) => {
    try {
      const response = await HttpService.call(api.organizationUnits(), undefined, thunkAPI);
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
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
