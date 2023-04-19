import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { LogBox } from 'react-native';

import { ThemeProvider, WrapperContainer } from './src/components';
import { unregister, checkTheme } from './src/utils';
import store from './src/redux/store';
import Routes from './src/routes/routes';


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