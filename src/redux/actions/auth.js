import { setItem, removeItem } from "../../cache";
import { checkTheme } from "../../utils";
import store from "../store";
import types from "../types";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const { dispatch } = store;

export const onLoginSuccess = (data) => {
  setItem("UserData", data).then((suc) => {
    dispatch({
      type: types.LOGIN,
      payload: data,
    });

    getToken();
  });
};

export const onChangeTheme = (data) => {
  setItem("Theme", data).then((suc) => {
    dispatch({
      type: types.CHANGE_THEME,
      payload: data,
    });
  });
};

export const getToken = async () => {
  const querySanp = await firestore().collection('production').get();
  const data = querySanp.docs.map((docSnap) => docSnap.data());
  dispatch({
    type: types.TOKEN,
    payload: data,
  });
};

export const logoutHandler = async () => {
  dispatch({
    type: types.CLEAR_REDUX_STATE,
  });
  removeItem("UserData").then(() => {
    auth()?.signOut()?.then(() => {
      console.log('--------------------------------')
      console.log('sign out');
      console.log('--------------------------------')
    }).catch((error) => {
    });
  });
  checkTheme();
};

