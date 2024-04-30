/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, Text, TextInput } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Override Text scaling
if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
  } else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }
  
  // Override Text scaling in input fields
  if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
  } else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
