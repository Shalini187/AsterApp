import store from "../store";
import types from "../types";

const { dispatch } = store;

export const requestAPI = async (data: any) => {
  dispatch({
    type: types.API_REQUEST,
    payload: data
  });
};

export const searchAPI = async (data: any) => {
  dispatch({
    type: types.API_REQUEST,
    payload: data
  });
};

