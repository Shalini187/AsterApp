import { setItem, removeItem } from "../../cache";
import { checkTheme } from "../../utils";
import store from "../store";
import types from "../types";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const { dispatch } = store;

export const onLoginSuccess = (data: any) => {
  setItem("UserData", data).then((suc) => {
    dispatch({
      type: types.LOGIN,
      payload: data,
    });

    getToken();
  });
};

export const onChangeTheme = (data: any) => {
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
  setItem("Token", data).then((suc) => {
    dispatch({
      type: types.TOKEN,
      payload: data,
    });
  });
};

export const logoutHandler = async () => {
  dispatch({
    type: types.CLEAR_REDUX_STATE,
  });
  removeItem("UserData");
  removeItem("Token");
  auth()?.signOut()?.then(() => {
    console.log('--------------------------------')
    console.log('sign out');
    console.log('--------------------------------')
  }).catch((error) => {
  });
  checkTheme();
};

