/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/store/store';
import {Provider} from 'react-redux';
import AuthContextProvider from './src/context/AuthContext';

const Root = () => (
  
    <Provider store={store}>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
     
    </Provider>
 
);

AppRegistry.registerComponent(appName, () => Root);
