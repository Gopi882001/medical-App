import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard, Image, SafeAreaView, Alert, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import * as IXNUtils from '../../utils/IXNUtils';
import { Platform } from 'react-native';
import { navigateToScreen } from '../../redux/services/navigationService';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/CommonActions';
import * as authActions from '../../redux/actions/authActions';

const OTPScreen = (props: any) => {

  const navigation = useNavigation();


  const {
    verifyOTPData,
    verifyOTPError,
    resendOTPData,
    resendOTPError,
  } = props

  const [otp, setOTP] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isValidOTP, setIsValidOTP] = useState(false);
  const [imageSource, setImageSource] = useState<any>(null);
  const otpInputs = useRef<Array<TextInput | null>>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (verifyOTPData) {
      if (verifyOTPData.status === 'success' && verifyOTPData.data) {
        const token = verifyOTPData.data.token
        IXNUtils.setStringIntoKeychain(CONST.ACCESS_TOKEN, token);
        AppConfig.updateToken(token);
        setTimer(0)
        setIsValidOTP(true)
        setImageSource(CONST.APPROVED_ACCEPT)
        setTimeout(() => {
          props.onClose();
        }, 1000);
      } else {
        setIsValidOTP(false)
        setImageSource(CONST.CLOSE_ROUND_ICON)
        setTimer(0)
      }
    }
  }, [verifyOTPData, verifyOTPError]);

  useEffect(() => {

    let intervalId: NodeJS.Timeout;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const verifyOTP = () => {

    if (otp && otp?.length === 6) {
      const number = AppConfig.phoneNumber()
      props.verifyOTP({
        phone_number: number,
        country_code: "91",
        otp: otp
      })
    }
  };

  const resendOTP = () => {
    if (timer === 0) {
      props.resendOTP({
        phone_number: AppConfig.phoneNumber(),
        country_code: "91",
      })
    }
  };

  useEffect(() => {
    if (resendOTPData) {
      if (resendOTPData.status === 'success') {
        setTimer(60);
        setIsTimerRunning(true);
        Alert.alert('New OTP sent')
      }
    }
  }, [resendOTPData, resendOTPError]);

  const handleOTPInputChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(0);
    }

    setOTP((prevOTP) => {
      const otpChars = prevOTP.split('');
      otpChars[index] = text;
      return otpChars.join('');
    });

    if (text !== '') {
      if (otpInputs.current[index + 1]) {
        otpInputs.current[index + 1]?.focus();
      }
    } else {
      if (otpInputs.current[index - 1]) {
        otpInputs.current[index - 1]?.focus();
      }
    }
  };

  const handleChangePhoneNumber = () => {
    props.onClose();
  };

  return (
    <SafeAreaView style={[styles.otpContainer]}>
      <StatusBar
        hidden={Platform.OS === 'ios'}
        translucent={true}
        barStyle='default'
        backgroundColor='white'
      />

<ScrollView
        style={{ flexGrow: 1, width: '100%'}}
        showsVerticalScrollIndicator
        nestedScrollEnabled={true} >

        <View style={[styles.container]}>

          <Image source={CONST.LOGIN_LOGO} style={styles.logo} />

          <Text style={styles.title}>Verify OTP</Text>

          <View style={styles.bar} />

          <View style={{ marginTop: 46 }} />

          <Text style={{
            fontSize: 20,
            color: COLORS.redColor,
            marginTop: 16,
            fontFamily: FONTS.poppinsRegular,
            opacity: (!isValidOTP && otp !== '') ? 1 : 0,
          }}>Invalid OTP*</Text>

          <Text style={{
            fontSize: 15,
            marginTop: 16,
            fontFamily: FONTS.poppinsLight,
            color: COLORS.contentColor
          }}>An OTP has been sent to XXX XXX {AppConfig.phoneNumber().slice(-4)}</Text>

          <View style={styles.otpContainer}>
            {Array.from({ length: 6 }).map((_, index) => (
              <TextInput
                key={index}
                style={[styles.otpInput, { color: darkMode ? '#FFF' : '#000' }]}
                maxLength={1}
                onChangeText={(text) => handleOTPInputChange(text, index)}
                ref={(ref) => (otpInputs.current[index] = ref)}
                keyboardType="numeric"
                returnKeyType='done'
                blurOnSubmit={index === 5}
                onSubmitEditing={() => {
                  if (index === 5) {
                    Keyboard.dismiss();
                    verifyOTP();
                  } else {
                    if (otpInputs.current[index + 1]) {
                      otpInputs.current[index + 1]?.focus();
                    }
                  }
                }}
              />
            ))}
          </View>

          <Text style={styles.timer}>
            {timer === 0 && !isValidOTP ?
              (
                <TouchableOpacity onPress={resendOTP}>
                  <View style={{
                    backgroundColor: COLORS.barColor,
                    borderRadius: 5,
                    marginTop: 8,
                    opacity: (timer === 0 || !isValidOTP) ? 1 : 0
                  }}>
                    <Text style={styles.resendOTP}>Resend OTP</Text>
                  </View>
                </TouchableOpacity>
              ) :
              (
                !isValidOTP ? `${timer} sec` : ''
              )}
          </Text>

          <View style={{
            marginBottom: 16,
            alignContent: 'center',
            alignItems: 'center',
            opacity: (isValidOTP || timer === 0) ? 1 : 0
          }}>
            <TouchableOpacity onPress={handleChangePhoneNumber}>
              <Text style={{
                fontSize: 16,
                color: '#FF9100',
                marginTop: 12,
                fontFamily: FONTS.poppinsRegular,
                opacity: timer === 0 && !isValidOTP ? 1 : 0
              }}>Change phone no</Text>
            </TouchableOpacity>
            {imageSource && <Image source={imageSource} style={styles.otpImageContainer} />}
          </View>

          <View style={{
            marginTop: 58
          }}>
            <Button
              title="VERIFY"
              onPress={()=>verifyOTP()}
              buttonStyle={{
                backgroundColor: COLORS.barColor,
                paddingHorizontal: 40,
                borderRadius: 6,
                width: 240,
                height: 44,
                marginTop: 16,
              }} />
          </View>
        </View>
      </ScrollView> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius:20
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 52,
  },
  title: {
    marginTop: 46,
    fontFamily: FONTS.poppinsMedium,
    fontSize: 26,
    color: COLORS.fontColor,
  },
  bar: {
    height: 5,
    width: 116,
    backgroundColor: COLORS.barColor,
    marginTop: 8,
    borderRadius: 2,
  },
  otpInput: {
    marginTop: 12,
    flex: 1,
    marginHorizontal: Platform.OS === 'ios' ? 8 : 6,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    paddingHorizontal: 4,
    textAlign: 'center',
    fontSize: 16,
    borderColor: COLORS.barColor,
  },
  timer: {
    fontSize: 30,
    marginTop: 16,
    color: '#25BAC0',
  },
  resendOTP: {
    fontSize: 16,
    color: COLORS.white,
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 6,
  },
  changePhoneNumberText: {
    fontSize: 16,
    color: '#FF9100',
    marginTop: 12,
    fontFamily: FONTS.poppinsRegular,
    marginBottom: 12
  },
  otpImage: {
    width: 50,
    height: 50,
  },
  otpImageContainer: {
    width: 50,
    height: 50,
    paddingBottom: 4,
    position: 'absolute',
    marginTop: 56,
  }

});

const mapStateToProps = (state: any) => ({
  verifyOTPData: state.authReducer.verifyOTPData,
  verifyOTPError: state.authReducer.verifyOTPError,
  resendOTPData: state.authReducer.resendOTPData,
  resendOTPError: state.authReducer.resendOTPError,
});

// export default OTPScreen;
const mapDispatchToProps = (dispatch: any) => ({
  resendOTP: (params: any) => {
      return dispatch(authActions.resendOTP(params));
  },
  verifyOTP: (params: any) => {
      return dispatch(authActions.verifyOTP(params));
  },
  stopLoader: () => {
      return dispatch(commonActions.stopLoader());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
