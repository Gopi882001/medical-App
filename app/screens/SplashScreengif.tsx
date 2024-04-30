import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, View, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import splashGif from './Splashgif.gif';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';


const SplashScreenComponent = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      SplashScreen.hide();
      navigation.replace('OverviewScreen'); // Navigate to the Landing screen
      //navigation.replace('Home'); // Navigate to the Landing screen
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
       hidden={Platform.OS === 'ios'}
       barStyle='default'
       backgroundColor='white'
       showHideTransition='slide'
      />
      <FastImage
        source={splashGif}
        style={styles.gif}
      />

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gif: {
    width: wp('54%'),
    height: wp('54%'),
    resizeMode: 'contain',
  },
});

export default SplashScreenComponent;
