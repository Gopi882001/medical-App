import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screens from './ScreensStack';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Screens" component={Screens} />
      {/* Add modals here */}
    </RootStack.Navigator>
  );
};
export default RootStackScreen;
