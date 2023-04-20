import React, { useEffect } from 'react';
import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";
import { LogBox } from 'react-native';

import { ThemeProvider, WrapperContainer } from './src/components';
import { unregister, checkTheme } from './src/utils';
import store from './src/redux/store';
import Routes from './src/routes/routes';

import { getRequest } from './src/services/api';
import { GET_POPULAR_LIST } from './src/services/urls';
import { getToken } from './src/redux/actions/auth';


const App = () => {

  useEffect(() => {
    LogBox.ignoreAllLogs();
    unregister();
    checkTheme();
  }, []);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        children={
          <WrapperContainer>
            <Routes />
          </WrapperContainer>
        }
      />
    </ReduxProvider>
  )
}

export default () => {
  return (
    <App />
  )
};