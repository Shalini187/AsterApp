import store from "../store";
import types from "../types";

const { dispatch } = store;

export const requestAPI = async (data) => {
  dispatch({
    type: types.API_REQUEST,
    payload: data
  });
};

