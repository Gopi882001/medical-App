import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Platform, StatusBar, Modal } from 'react-native';
import { Button, Image, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/Colors';
import { FONTS } from '../../utils/Fonts';
import { ScrollView } from 'react-native-gesture-handler';
import * as CONST from '../../utils/Constants';
import * as IXNUtils from '../../utils/IXNUtils';
import * as AppConfig from '../../utils/AppConfig';
import { navigateToScreen } from '../../redux/services/navigationService';
import { faL } from '@fortawesome/free-solid-svg-icons';
import OTPScreen from './OTPScreenComponent';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/CommonActions';
import * as authActions from '../../redux/actions/authActions';
import headerStyle from '../common/HeaderStyles';





const LoginScreen = (props: any) => {
  const {
    loginData,
    loginError,
  } = props

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const [response, setResponse] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);

  useEffect(() => {
    if (loginData) {
      if (loginData.status === 'success') {
        setResponse(true);
        AppConfig.updatePhoneNumber(phoneNumber);
      }
    }
  }, [loginData, loginError]);

  const handleLogin = () => {

    if (phoneNumber.length !== 10 || !isSelected) {
      return;
    }

    props.loginWithMobNumber({
      phone_number: phoneNumber,
      country_code: "91",
      tnc_accepted: 1
    })
    setOtpModalVisible(true);
    setResponse(false);
  };

  const skipLogin = () => {
    props.onClose();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  }
  const toggleOtpModal = () => {
    setOtpModalVisible(!isOtpModalVisible);
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        hidden={Platform.OS === 'ios'}
        barStyle='light-content'
        backgroundColor='white'
        showHideTransition='slide'
      />

      <ScrollView
        style={{ flexGrow: 1, width: '100%' }}
        showsVerticalScrollIndicator
        nestedScrollEnabled={true} >
        <View style={[styles.container]}>
          <View >
            <Modal
              animationType="slide"
              transparent={true}
              visible={isOtpModalVisible}
              onRequestClose={toggleOtpModal}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={headerStyle.modalContent}>
                  <OTPScreen onClose={toggleOtpModal} navigation={navigation} />
                </View>
              </View>
            </Modal>
          </View>
          <Image
            source={CONST.LOGIN_LOGO_ICON}
            style={styles.logo} />
          <Text style={styles.title}>Login Using</Text>
          <View style={styles.bar} />
          <Text style={styles.phoneNumberHeading}>PHONE NUMBER</Text>
          <View style={styles.phoneNumberContainer}>
            <View style={styles.phoneIconContainer}>
              <Image source={CONST.PHONE_ICON} style={styles.phoneIcon} />
              <Text style={styles.countryCode}> {Platform.OS === 'ios' ? '+91 ' : '+91'}</Text>
            </View>
            <TextInput
              style={styles.phoneNumberInput}
              placeholder={'1234567890'}
              value={phoneNumber}
              placeholderTextColor={darkMode ? '#666' : '#999'}
              onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
              keyboardType="phone-pad"
              returnKeyType='done'
              maxLength={10}
            />
          </View>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setSelection(!isSelected)}
          >
            <View style={styles.checkbox}>
              {isSelected && (
                <Image source={CONST.CHECK_ICON} style={styles.checkboxImage} />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Accept Terms & Conditions</Text>
          </TouchableOpacity>
          <Button
            title="LOGIN USING OTP"
            onPress={handleLogin}
            buttonStyle={[styles.loginButton, !isSelected && styles.disabledButton]}
            disabled={!isSelected || phoneNumber.length !== 10}

          />
          <Text style={styles.orText}>OR</Text>
          <Text style={styles.luText}>LOGIN USING</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialLoginButton}>
              <Image source={CONST.APPLE_ICON} style={styles.socialLoginIconapple} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialLoginButton}>
              <Image source={CONST.GMAIL_ICON} style={styles.socialLoginIcongmail} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => skipLogin()}>
            <Text style={styles.skipText}>SKIP FOR NOW</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 60,
  },
  title: {
    marginTop: 50,
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
  phoneNumberHeading: {
    fontFamily: FONTS.montserratBold,
    fontSize: 17,
    alignSelf: 'flex-start',
    marginTop: 50,
    marginStart: 32,
    color: COLORS.phoneNumberTitle,
  },
  phoneIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    width: 30,
    height: 30,
    marginHorizontal: wp('4.4%'),
  },
  countryCode: {
    fontSize: 20,
    color: COLORS.black,
    justifyContent: 'center',
  },
  phoneNumberContainer: {
    flex: 1,
    width: 340,
    height: 54,
    marginStart: 40,
    marginEnd: 40,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: COLORS.barColor,
    borderRadius: 4,
    marginTop: 10,
    right: 8
  },
  modalContainer: {

  },
  phoneNumberInput: {
    flexGrow: 1,
    fontSize: 20,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.black,
    paddingVertical: 0,
    paddingTop: Platform.OS === 'ios' ? 0 : 6
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 46,
    padding: 8
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: COLORS.barColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 8,
    borderRadius: 4
  },
  checkboxImage: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    paddingTop: 4,
    fontSize: 18,
    fontFamily: FONTS.poppinsLight,
    color: '#000850'
  },
  loginButton: {
    backgroundColor: COLORS.barColor,
    paddingHorizontal: wp('13%'),
    borderRadius: 4,
    marginTop: 30,
    fontFamily: FONTS.poppinsMedium,
    width: 340,
    height: 44,
  },
  disabledButton: {
    backgroundColor: '#AAB8C2',
  },
  orText: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: FONTS.poppinsMedium,
    color: COLORS.barColor,
  },
  luText: {
    fontSize: 20,
    marginTop: 18,
    fontFamily: FONTS.poppinsMedium,
    color: COLORS.barColor,
  },
  socialLoginContainer: {
    flexDirection: 'row',
  },
  socialLoginButton: {
    padding: wp('3%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
  socialLoginIconapple: {
    marginTop: 14,
    padding: 4,
    width: 32,
    height: 40,
  },
  socialLoginIcongmail: {
    marginTop: 20,
    width: 42,
    height: 31,
  },
  skipText: {
    fontSize: 11,
    marginTop: 16,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.contentSecondaryColor,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
});

const mapStateToProps = (state: any) => ({
  loginData: state.authReducer.loginData,
  loginError: state.authReducer.loginError,
});

const mapDispatchToProps = (dispatch: any) => ({
  loginWithMobNumber: (params: any) => {
    return dispatch(authActions.loginWithMobileNumber(params));
  },
  stopLoader: () => {
    return dispatch(commonActions.stopLoader());
  },
  OtpContent: {
    width: '95%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


