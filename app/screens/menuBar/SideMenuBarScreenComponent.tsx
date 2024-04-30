import React, { useEffect, useState } from 'react';
import { View, Text, Image, Modal, TouchableWithoutFeedback, Animated, BackHandler, SafeAreaView } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './SideMenuBarScreenLightStyle';
import * as CONST from '../../utils/Constants';
import { useNavigation } from '@react-navigation/native';
import * as AppConfig from '../../utils/AppConfig';
import FastImage from 'react-native-fast-image';

const SideMenuBarScreenComponent = (props: any) => {

  const {
    userProfileData,
    userProfileError,
  } = props

  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(true);
  const animatedValue = new Animated.Value(isMenuOpen ? 1 : 0);

  useEffect(() => {
    props.getUserProfile();
  }, []);

  useEffect(() => {
    if (userProfileData) {
      if (userProfileData.status === 'success' && userProfileData.data) {
        const data = userProfileData.data;
        AppConfig.updateUserProfile(data);
        setUserName(data.name);
        setProfileImage(data.user_image);
      }
    }
  }, [userProfileData, userProfileError])

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    Animated.timing(animatedValue, {
      toValue: isMenuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animatedTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const animatedOpacity = animatedValue.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0.7, 0.3, 1],
  });

  const handleBackButton = () => {
    if (isMenuOpen) {
      toggleMenu();
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [isMenuOpen]);

  const handleGoBack = () => {
    toggleMenu(); // Close the menu
    navigation.goBack(); // Go back to the previous screen
  };

  const handleAboutUs = () => {
    // Handle 'About Us' section press
    console.log("About Us section pressed");
  };

  const handlePrivacyPolicy = () => {
    // Handle 'Privacy Policy' section press
  };

  const handleRequestArticle = () => {
    navigation.navigate('RequestArticle');
  };

  const navigateToWiteArticle = () => {
    navigation.navigate('WriteArticleScreen');
  };

  const handleProfile = () => {
    navigation.navigate('UserProfile');
  };

  const navigateToArticles = () => {
    navigation.navigate('ArticlesDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: animatedTranslateX }] }]}>
          <TouchableWithoutFeedback onPress={handleGoBack}>
            <Image source={require('../../assets/menuBar/cross.png')} style={styles.crossIcon} />
          </TouchableWithoutFeedback>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageWrapper}>
              <FastImage
                source=
                {
                  profileImage && profileImage.length > 0 ?
                    { uri: profileImage } : CONST.GRID_ICON
                }
                style={styles.profileIcon} />
            </View>
          </View>
          <View style={styles.titleContainer}><Text style={styles.title}>{userName}</Text></View>
          <TouchableWithoutFeedback onPress={handleAboutUs}>
            <View style={styles.section}>
              <Image source={require('../../assets/menuBar/information-mark-circle-outline-icon.png')} style={styles.icon} />
              <Text style={styles.text}>ABOUT US</Text>
              <Image source={require('../../assets/menuBar/arrow.png')} style={styles.arrowicon} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handlePrivacyPolicy}>
            <View style={styles.section}>
              <Image source={require('../../assets/menuBar/user-privacy-security-icon.png')} style={styles.icon} />
              <Text style={styles.text}>PRIVACY POLICY</Text>
              <Image source={require('../../assets/menuBar/arrow.png')} style={styles.arrowicon} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={navigateToArticles}>
            <View style={styles.section}>
              <Image source={require('../../assets/menuBar/poem-poetry-icon.png')} style={styles.icon} />
              <Text style={styles.text}>ARTICLES</Text>
              <Image source={require('../../assets/menuBar/arrow.png')} style={styles.arrowicon} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={navigateToWiteArticle}>
            <View style={styles.section}>
              <Image source={require('../../assets/menuBar/poem-poetry-icon.png')} style={styles.icon} />
              <Text style={styles.text}>WRITE ARTICLE</Text>
              <Image source={require('../../assets/menuBar/arrow.png')} style={styles.arrowicon} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleRequestArticle}>
            <View style={styles.section}>
              <Image source={require('../../assets/menuBar/feedback-icon.png')} style={styles.icon} />
              <Text style={styles.text}>REQUEST ARTICLE</Text>
              <Image source={require('../../assets/menuBar/arrow.png')} style={styles.arrowicon} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleProfile}>
            <View style={styles.section}>
              <Image source={require('../../assets/menuBar/person-profile-image-icon.png')} style={styles.icon} />
              <Text style={styles.text}>PROFILE</Text>
              <Image source={require('../../assets/menuBar/arrow.png')} style={styles.arrowicon} />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
      <Animated.View style={[styles.previousScreen, { opacity: animatedOpacity }]}>
        <View style={[styles.blurContainer,]}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="#D0E3FA"
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
export default SideMenuBarScreenComponent;
