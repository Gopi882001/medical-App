import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import headerStyle from '../common/HeaderStyles';
import * as CONST from '../../utils/Constants';

const BothVerifyScreen = ({ route }) => {

  const [phoneOtp, setPhoneOtp] = useState(['', '', '', '', '', '']);
  const [emailOtp, setEmailOtp] = useState(['', '', '', '', '', '']);
  const { fName, lName, phone, mail } = route.params;
  const navigation = useNavigation();
  const enteredPhoneOtp = phoneOtp.join('');
  const enteredEmailOtp = emailOtp.join('');
  const generatedPhoneOtp = "123456"; // Replace with the actual generated OTP for phone
  const generatedEmailOtp = "654321"; // Replace with the actual generated OTP for email
  const phoneOtpInputs = useRef([]);
  const emailOtpInputs = useRef([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleVerifyOTP = () => {
    if (enteredPhoneOtp === generatedPhoneOtp && enteredEmailOtp === generatedEmailOtp) {
      //navigation.navigate('UserProfile');
    } else {
      Alert.alert('OTP Error', 'The OTP you entered is incorrect. Please try again.');
    }
  };

  const handleVerifyPhoneOTP = () => {
    if (enteredPhoneOtp === generatedPhoneOtp) {
      // Phone OTP verified, you can take appropriate action here if needed
    } else {
      Alert.alert('Phone OTP Error', 'The phone OTP you entered is incorrect. Please try again.');
    }
  };

  const handleVerifyEmailOTP = () => {
    if (enteredEmailOtp === generatedEmailOtp) {
      // Email OTP verified, you can take appropriate action here if needed
    } else {
      Alert.alert('Email OTP Error', 'The email OTP you entered is incorrect. Please try again.');
    }
  };

  useEffect(() => {
    if (phoneOtp.every((digit) => digit !== '')) {
      handleVerifyPhoneOTP();
    }
  }, [phoneOtp]);

  useEffect(() => {
    if (emailOtp.every((digit) => digit !== '')) {
      handleVerifyEmailOTP();
    }
  }, [emailOtp]);

  const handleChangePhoneOTP = (index, value) => {
    if (value.length > 1) {
      const otpArray = value.split('');
      setPhoneOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        otpArray.forEach((digit, i) => {
          if (newOtp[index + i] !== undefined) {
            newOtp[index + i] = digit;
          }
        });
        return newOtp;
      });
    } else {
      setPhoneOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
    }

    if (value && phoneOtpInputs.current[index + 1]) {
      phoneOtpInputs.current[index + 1].focus();
    } else if (!value && phoneOtpInputs.current[index - 1]) {
      phoneOtpInputs.current[index - 1].focus();
    }
  };

  const handleChangeEmailOTP = (index, value) => {
    if (value.length > 1) {
      const otpArray = value.split('');
      setEmailOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        otpArray.forEach((digit, i) => {
          if (newOtp[index + i] !== undefined) {
            newOtp[index + i] = digit;
          }
        });
        return newOtp;
      });
    } else {
      setEmailOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
    }

    if (value && emailOtpInputs.current[index + 1]) {
      emailOtpInputs.current[index + 1].focus();
    } else if (!value && emailOtpInputs.current[index - 1]) {
      emailOtpInputs.current[index - 1].focus();
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const verifyButtonPressed = () => {
    handleVerifyOTP();
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={headerStyle.container}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image source={CONST.BACK_ICON} style={headerStyle.backButton} />
            </TouchableOpacity>
            <View>
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
            <Text style={styles.userName}>{fName}</Text>
          </View>

          {/* OTP Verification for Phone */}
          <View style={styles.cardContainer}>
            <Text style={styles.titleHeader}>VERIFY YOUR NUMBER</Text>
            <Text style={styles.phoneNumber}>+91 {phone}</Text>
            <View style={styles.otpContainer}>
              {phoneOtp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (phoneOtpInputs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChangePhoneOTP(index, text)}
                  returnKeyType={'done'}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={[styles.otpInput, { color: darkMode ? '#FFF' : '#000' }]}
                />
              ))}
            </View>
          </View>

          {/* OTP Verification for Email */}
          <View style={styles.cardContainer}>
            <Text style={styles.titleHeader}>VERIFY YOUR EMAIL</Text>
            <Text style={styles.phoneNumber}>{mail}</Text>
            <View style={styles.otpContainer}>
              {emailOtp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (emailOtpInputs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleChangeEmailOTP(index, text)}
                  keyboardType="number-pad"
                  returnKeyType='done'
                  maxLength={1}
                  style={[styles.otpInput, { color: darkMode ? '#FFF' : '#000' }]}
                />
              ))}
            </View>
          </View>

          {/* "Verify" Button */}
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={verifyButtonPressed}
          >
            <Text style={styles.verifyButtonText}>VERIFY</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1, backgroundColor: COLORS.white
  },
  profileContainer: {
    marginTop: 16,
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
  phoneNumber: {
    fontSize: 17,
    marginBottom: 18,
    marginTop: 6,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.numberFontColor
  },
  titleHeader: {
    marginTop: 16,
    fontSize: 17,
    fontFamily: FONTS.poppinsSemiBold,
    color: COLORS.black
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBgColor,
    marginHorizontal: 26,
    borderRadius: 8,
    marginTop: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  otpInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
    textAlignVertical: 'center',
    borderRadius: 6
  },
  verifyButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: 240,
    backgroundColor: COLORS.barColor,
    borderRadius: 6,
    marginBottom: 16,
    marginTop: 54,
  },
  verifyButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 20,
  },
});

export default BothVerifyScreen;
