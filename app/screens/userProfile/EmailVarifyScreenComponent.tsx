import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';
import { Platform } from 'react-native';
import * as CONST from '../../utils/Constants';
import headerStyle from '../common/HeaderStyles';
import * as AppConfig from '../../utils/AppConfig';

const EmailVerifyScreen = (props: any) => {

  const {
    verifyEmailData,
    verifyEmailError,
  } = props

  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    if (verifyEmailData && verifyEmailData.data) {
      if (verifyEmailData.status === 'success') {
        navigation.navigate('UserProfile');
      }
    }
  }, [verifyEmailData, verifyEmailError])

  useEffect(() => {
    setUserProfile(AppConfig.userProfile());
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  //const { firstName, lastName, email } = route.params;
  const navigation = useNavigation();
  const enteredOTP = otp.join('');
  //const generatedOTP = "123456";
  const otpInputs = useRef([]);

  const handleVerifyOTP = () => {
    props.verifyEmail({
      email: userProfile.email,
      otp: otp
    });
    // if (enteredOTP === generatedOTP) {
    //   navigation.navigate('UserProfile');
    // } else {
    //   // Verification failed, display an error message or take appropriate action
    //   Alert.alert('OTP Error', 'The OTP you entered is incorrect. Please try again.');
    // }
  };
  const [darkMode, setDarkMode] = useState(false);

  const handleChangeOTP = (index, value) => {
    if (value.length > 1) {
      // If the user pastes the OTP, split it into individual digits
      const otpArray = value.split('');
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        otpArray.forEach((digit, i) => {
          if (newOtp[index + i] !== undefined) {
            newOtp[index + i] = digit;
          }
        });
        return newOtp;
      });
    } else {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
    }

    if (value && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    } else if (!value && otpInputs.current[index - 1]) {
      otpInputs.current[index - 1].focus(); // Move to the previous input box
    }
  };

  const handleBackPress = () => {
    // Add any functionality you want for the back button here
    navigation.goBack();
  };

  const handleProfileImage = () => {
    // Add any functionality you want for editing the profile image here
    // For example, you can open a modal or navigate to the profile image editing screen
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={headerStyle.container}>
          <TouchableOpacity onPress={handleBackPress}>
            {/* Back Icon */}
            <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
          </TouchableOpacity>
          <View>
            {/* App Logo */}
            <Image source={CONST.APP_LOGO} style={headerStyle.appLogoWithMargin} />
          </View>
        </View>

        {/* User Profile */}
        <View style={styles.profileContainer}>
          <View style={styles.profileAdd}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImageWrapper}>
                <Image source={CONST.GRID_ICON} style={styles.profileImage} />
              </View>
            </View>
          </View>
          <Text style={styles.userName}>{userProfile.name}</Text>
        </View>

        {/* OTP Verification */}
        <View style={styles.cardContainer}>
          <Text style={styles.titleHeader}>VERIFY YOR EMAIL</Text>
          <Text style={styles.title}>{userProfile.email}</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (otpInputs.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleChangeOTP(index, text)}
                keyboardType="number-pad"
                returnKeyType='done'
                maxLength={1}
                style={[styles.otpInput, { color: darkMode ? '#FFF' : '#000' }]}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={handleVerifyOTP} style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
  },
  profileContainer: {
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: wp('32%'),
    height: wp('32%'),
    borderRadius: wp('30%'),
    borderWidth: 1,
    borderColor: COLORS.profileBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAdd: {
    width: wp('32%'),
    height: wp('32%'),
  },
  profileImageWrapper: {
    borderRadius: wp('25%'),
    shadowColor: COLORS.profileShadowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('25%'),
  },
  add: {
    width: wp('8%'),
    height: wp('8%'),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  userName: {
    marginTop: 18,
    fontSize: 17,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.userNameFontColor,
  },
  title: {
    fontSize: 17,
    marginTop: 12,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.numberFontColor,
  },
  titleHeader: {
    fontSize: 17,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.contentPrimaryColor,
    paddingTop: 16,
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E8F2FE',
    marginHorizontal: 25,
    borderRadius: wp('3%'),
    marginTop: 60,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 16,
    paddingHorizontal: 6
  },
  otpInput: {
    backgroundColor: COLORS.white,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
    textAlignVertical: 'center',
    borderRadius: 5,
    paddingStart: 5,
    marginStart: 8,
    marginEnd: 8,
    paddingEnd: 5
  },
  verifyButton: {
    height: 44,
    width: 240,
    backgroundColor: COLORS.barColor,
    borderRadius: 6,
    marginBottom: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 74
  },
  verifyButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default EmailVerifyScreen;
