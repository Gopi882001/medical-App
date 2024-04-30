import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './ScreensStack';
import { COLORS } from '../utils/Colors';

const CustomStatusBar = (
  {
    backgroundColor,
    barStyle = "dark-content",
  }
) => {

  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle} />
    </View>
  );
}

const RootScreen = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider >
          <CustomStatusBar backgroundColor={COLORS.appbarColor} />
          <NavigationContainer>
            <MainScreen />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
}

export default RootScreen