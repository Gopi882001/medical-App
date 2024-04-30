import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import headerStyle from '../common/HeaderStyles';
import Toggle from '../common/ToggleButton';
import * as CONST from '../../utils/Constants';
import { ScrollView } from 'react-native-gesture-handler';
import { Shadow } from 'react-native-shadow-2';
import { COLORS } from '../../utils/Colors';
import styles from './UserProfileScreenLightStyle';
import * as AppConfig from '../../utils/AppConfig';
import FastImage from 'react-native-fast-image';
import * as IXNUtils from '../../utils/IXNUtils';

const UserProfileScreenComponent = (props: any) => {

  const {
    logOutData,
    logOutError,
    toggleNotificationData,
    toggleNotificationError,
    userProfileData,
    userProfileError,
  } = props

  const navigation = useNavigation();
  // StatusBar.setBackgroundColor('#9FD4F1');
  // <StatusBar backgroundColor="#9FD4F1" barStyle="dark-content" />

  const [toggleIsOn, setToggle] = useState(false);
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    if (toggleNotificationData && toggleNotificationData.success === 'success') {
      console.log(toggleNotificationData.data.notification_enabled)
    }
  }, [toggleNotificationData, toggleNotificationError]);

  useEffect(() => {
    if (logOutData && logOutData.status === 'success') {
      console.log(logOutData.data.status)
      IXNUtils.setStringIntoKeychain(CONST.ACCESS_TOKEN, "");
      IXNUtils.setStringIntoKeychain(CONST.SA_TOKEN, "");
      navigation.navigate(CONST.OverviewScreen);
    }
  }, [logOutData, logOutError]);

  useEffect(() => {
    const profile = AppConfig.userProfile()
    if (profile) {
      IXNUtils.consoleLog("UserProfileScreenComponent", "useEffect", "profile", JSON.stringify(profile));
      setUserProfile(profile);
    } else {
      props.userProfile();
    }
  }, []);

  useEffect(() => {
    if (userProfileData && userProfileData.status === 'success') {
      IXNUtils.consoleLog("UserProfileScreenComponent", "useEffect", "userProfileData", JSON.stringify(userProfileData));
      setUserProfile(userProfileData.data);
    }
  }, [userProfileData, userProfileError]);

  const handleBackPress = () => {
    navigation.goBack();
    // Handle navigation to previous screen
  };

  const handleEditProfile = () => {
    navigation.navigate(CONST.EditProfile);
    // Handle navigation to edit profile screen
  };

  const handleLogout = () => {
    props.userLogout();
  };

  const updateToggle = () => {
    props.toggleNotification();
  };

  const handleChangeGoal = () => {
    navigation.navigate(CONST.ChangeGoal);
  };

  const handleChangePassword = () => {
    // Show dialog box or screen for changing password
  };

  const ProfileView = () => {

    if (Platform.OS === 'ios') {
      return (
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
              <FastImage
                source={
                  userProfile.user_image && userProfile.user_image.length > 0
                    ? { uri: userProfile.user_image }
                    : CONST.GRID_ICON
                }
                resizeMode={FastImage.resizeMode.contain}
                style={styles.profileImage} />
            </View>
          </View>
          <Text style={styles.userName}>{userProfile?.name ?? ''}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
              <Shadow
                startColor='#85C0C3'
                endColor={COLORS.transparent}
                distance={4}>
                <Image source={CONST.GRID_ICON} style={styles.profileImage} />
              </Shadow>
            </View>
          </View>
          <Text style={styles.userName}>{userProfile?.name ?? ''}</Text>
        </View>
      )
    }
  };

  const EditProfile = () => {

    return (
      <View>
        <TouchableOpacity onPress={handleEditProfile} style={styles.itemContainer}>
          <Image source={CONST.EDIT_PROFILE_ICON} style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Edit Profile</Text>
          <Image source={CONST.ARROW_ICON} style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  }

  const ChangeGoal = () => {

    return (
      <View>
        <TouchableOpacity onPress={handleChangeGoal} style={styles.itemContainer}>
          <Image source={CONST.CHANGE_GOAL_ICON} style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Change Goal</Text>
          <Image source={CONST.ARROW_ICON} style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  }

  const PushNotification = () => {

    return (
      <View>
        <View style={styles.itemContainer}>
          <Image source={CONST.NOTIFICATION_ICON} style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Push Notification</Text>
          <Toggle
            style={styles.switch}
            isOn={toggleIsOn}
            onToggle={() => {
              updateToggle();
              setToggle(!toggleIsOn);
            }}
          />
        </View>
        <View style={styles.divider} />
      </View>
    );
  }

  const ChangePassword = () => {

    return (
      <View>
        <TouchableOpacity onPress={handleChangePassword} style={styles.itemContainer}>
          <Image source={CONST.CHANGE_PASSWORD_ICON} style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Change Password</Text>
          <Image source={CONST.ARROW_ICON} style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  }

  const Logout = () => {

    return (
      <View>
        <TouchableOpacity onPress={handleLogout} style={styles.itemLogoutContainer}>
          {/* Forward Icon */}
          <Image source={CONST.LOGOUT_ICON} style={styles.sectionIconlogout} />
          <Text style={styles.sectionText}>Logout</Text>
          <Image source={CONST.ARROW_ICON} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  const CardView = () => {

    if (Platform.OS === 'ios') {
      return (
        <View style={styles.elementsCard}>
          <EditProfile />
          <ChangeGoal />
          <PushNotification />
          <ChangePassword />
          <Logout />
        </View>
      )
    } else {
      return (
        <Shadow style={{
          width: '100%',
          borderRadius: 12
        }}
          startColor='#C2DAF5'
          endColor={COLORS.transparent}
          distance={6}>
          <View style={styles.elementsCard}>
            <EditProfile />
            <ChangeGoal />
            <PushNotification />
            <ChangePassword />
            <Logout />
          </View>
        </Shadow>
      )
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View>
            {/* Header */}
            <View style={headerStyle.container}>
              <TouchableOpacity
                onPress={handleBackPress}>
                {/* Back Icon */}
                <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
              </TouchableOpacity>
              <View >
                {/* App Logo */}
                <Image source={CONST.APP_LOGO} style={headerStyle.appLogoWithMargin} />
              </View>
            </View>
          </View>

          <ScrollView style={styles.container}>
            <View style={styles.scrollView}>
              {/* User Profile */}
              <ProfileView />
              <View style={{
                width: '90%',
                marginHorizontal: 18
              }} >
                <CardView />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider >
  );
};

export default UserProfileScreenComponent;
