import React from "react";
import { useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import RootScreen from "./navigation/RootScreen";
import { Platform, Text } from "react-native";
import { Provider } from 'react-redux';
import createStore from './redux/reducers/Index';
const { store, persistor } = createStore();

const App = () => {

  //How To Disable Font Scaling In React Native Application
  if (Platform.OS === 'ios') {
    if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
    (Text as any).defaultProps.allowFontScaling = false;
  }

  useEffect(() => {
    // Lock the orientation to portrait mode
    Orientation.lockToPortrait();
    // Remember to unlock the orientation when the component unmounts
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <Provider store={store}>
      <RootScreen />
    </Provider>
  );
};

export default App;
