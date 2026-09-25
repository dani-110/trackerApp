import axios from 'axios';
import { logoutUser } from '../store/reducers/auth-slice';

const call = (api, data, thunk, file) => {
  const { default: store } = require('../store');
  const state = store.getState();
  const user = state?.auth?.user
  let headers = {
    'ngrok-skip-browser-warning': 'true',
    "Content-Type": "application/json",
  };
  if (!api.url.includes('login')) {
    if (user?.token) headers['Authorization'] = `Bearer ${user.token}`;
  }
  const method = api?.method?.toLowerCase() || 'get';

  // GET aur DELETE ke liye data direct payload ki jagah config me jaye ya skip ho
  let axiosRequest;
  if (method === 'get' || method === 'delete') {
    axiosRequest = axios[method](api?.url, { headers, params: data });
  } else {
    axiosRequest = axios[method](api?.url, data, { headers });
  }

  // return axios[api?.method]?.(api?.url, data, { headers })
  return axiosRequest
    .then(response => {
      if (response.status == 403) {
        console.log(response.data.responsecode, thunk.dispatch(logoutUser()))
      }
      return response;
    })
    .catch(error => {
      console.log(error)
      return error.response
    });
};

export default {
  call,
};
