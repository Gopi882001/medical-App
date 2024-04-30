import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, SafeAreaView, Button, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './EditProfileScreenLightStyle';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/Colors';
import * as CONST from '../../utils/Constants';
import headerStyle from '../common/HeaderStyles';
import * as AppConfig from '../../utils/AppConfig';
import * as IXNUtils from '../../utils/IXNUtils';
import * as STR_CNST from '../../utils/StringContants';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';

const EditProfileScreenComponent = (props: any) => {

  const {
    deleteAccountData,
    deleteAccountError,
  } = props

  const actionSheetRef = useRef();
  const actionSheetOptions = [
    STR_CNST.TAKE_PICTURE,
    STR_CNST.SELECT_PICTURE,
    STR_CNST.CANCEL,
  ];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  const [pofileImage, setPofileImage] = useState('');
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
    // Handle navigation to the previous screen
  };

  const handleFirstNameChange = (text: string) => {
    const alphabetsOnly = text.replace(/[^a-z A-Z]/g, '');
    setFirstName(alphabetsOnly);
    setTimeout(() => {
      setFirstName(alphabetsOnly);
    }, 10);
  };

  const handleLastNameChange = (text: string) => {
    const alphabetsOnly = text.replace(/[^a-z A-Z]/g, '');
    setLastName(alphabetsOnly);
    setTimeout(() => {
      setLastName(alphabetsOnly);
    }, 10);
  };

  useEffect(() => {
    if (!dataUpdate) {
      const profile = AppConfig.userProfile();
      const name: String = (profile.name && profile.name.length > 0) ? profile.name : "";
      const lName: String = (profile.last_name && profile.last_name.length > 0) ? profile.last_name : "";
      const mobileNumber: String = (profile.mobile_number && profile.mobile_number.length > 0) ? profile.mobile_number : "";
      const email: String = (profile.email && profile.email.length > 0) ? profile.email : "";
      setFirstName(name);
      setLastName(lName);
      setPhone(mobileNumber);
      setEmail(email);

      setDataUpdate(true);
    }
  }, [dataUpdate]);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
    setEmail(text);
  };

  useEffect(() => {
    if (deleteAccountData && deleteAccountData.status === 'success') {
      console.log(deleteAccountData.data.status);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setIsValidEmail(true);
    }
  }, [deleteAccountData, deleteAccountError]);

  const handleDelete = () => {

    props.deleteUserAccount();
  };

  const handlePhoneChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const truncatedText = numericText.slice(0, 10);
    setPhone(truncatedText);
    if (numericText.length == 10) {
      setValidationMessage('');
    } else {
      setValidationMessage('Please enter a valid 10-digit phone number');
    }
  };

  const renderAction = () => {
    return (
      <ActionSheet
        ref={actionSheetRef}
        options={actionSheetOptions}
        cancelButtonIndex={2}
        onPress={(clickIndex: any) => handlePhotoUpload(clickIndex)}
      />
    );
  };

  const handlePhotoUpload = async (index1: any) => {

    if (index1 < 2) {

      await IXNUtils.photoUpload(index1, (url: any) => {

        IXNUtils.consoleLog(
          'MyProfileEditScreenComponent',
          'handlephotoUpload 3 ',
          'launchImageLibrary->response 3 ',
          url,
        );
        if (url?.name) {
          setPofileImage(url.uri);
          props.updateUserImage({
            user_image: url
          })
        }
      });
    }
  };

  const showActionSheet = () => {
    actionSheetRef?.current?.show();
  };

  useEffect(() => {
    setUserProfile(AppConfig.userProfile());
    setFirstName(userProfile.name);
    setLastName(userProfile.last_name);
    setEmail(userProfile.email);
    setPhone(userProfile.mobile_number);
  }, []);

  const handleProfileImage = () => {
    //IXNUtils.photoUpload(0,)
    showActionSheet()
    // Perform update logic here
    // Display success message or handle errors
    //Alert.alert('Profile Image Updated', 'Your profile Image has been updated successfully!');
  };

  const navigateToScreen = (screenName: string): void => {
    navigation.navigate(screenName, { fName: firstName, lName: lastName, phone: phone, mail: email });
  };

  const handleNavigate = () => {
    if (phone && phone.length != 0 && !email) {
      navigateToScreen('PhoneVarifyScreen');
    } else if (email && email.length != 0 && !phone) {
      navigateToScreen('EmailVarifyScreen');
    } else if (phone && email) {
      navigateToScreen('BothVarifyScreen');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}>
      <View >
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

        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator
          nestedScrollEnabled={true}
          alwaysBounceVertical={false}
          automaticallyAdjustKeyboardInsets={true}>
          <View >
            {/* User Profile */}
            <View style={styles.profileContainer}>
              <View style={styles.profileAdd}>
                <View style={styles.profileImageContainer}>
                  <View style={styles.profileImageWrapper}>
                    <FastImage
                      source={{
                        uri: pofileImage ?? CONST.GRID_ICON
                      }}
                      style={styles.profileImage} />
                  </View>
                </View>
                <TouchableOpacity onPress={handleProfileImage}>
                  <Image source={CONST.ADD_ICON} style={styles.add} />
                </TouchableOpacity>
              </View>
              <Text style={styles.userName}>{firstName}</Text>
            </View>

            <View style={styles.elementsCard}>
              {/* First Name */}
              <Text style={styles.cardTitle}>FIRST NAME</Text>
              <TextInput
                value={firstName}
                keyboardType='default'
                returnKeyType='done'
                onChangeText={handleFirstNameChange}
                maxLength={30}
                style={[styles.sectionInput, { color: darkMode ? '#FFF' : '#000' }]}
              />
            </View>

            <View style={styles.elementsCard}>
              {/* Last Name */}
              <Text style={styles.cardTitle}>LAST NAME</Text>
              <TextInput
                keyboardType="default"
                returnKeyType='next'
                value={lastName}
                onChangeText={handleLastNameChange}
                maxLength={30}
                style={[styles.sectionInput, { color: darkMode ? '#FFF' : '#000' }]}
              />
            </View>

            <View style={styles.elementsCard}>
              {/* Email Address */}
              <Text style={styles.cardTitle}>EMAIL</Text>
              <TextInput
                keyboardType="email-address"
                returnKeyType='done'
                value={email}
                onChangeText={validateEmail}
                style={[styles.sectionInput, !isValidEmail && styles.invalidInput, { color: darkMode ? '#FFF' : '#000' }]}
              />
              {!isValidEmail && (
                <Text style={styles.errorText}>Please enter a valid email address</Text>
              )}
            </View>

            <View style={styles.elementsCard}>
              {/* Phone Number */}
              <Text style={styles.cardTitle}>PHONE</Text>
              <TextInput
                keyboardType='number-pad'
                returnKeyType='done'
                value={phone}
                onChangeText={handlePhoneChange}
                style={[styles.sectionInput, { color: darkMode ? '#FFF' : '#000' }]}
                maxLength={10}
              />
              {validationMessage ? (
                <Text style={styles.validationMessage}>{validationMessage}</Text>
              ) : null}

            </View>

            {/* Update Button */}
            <TouchableOpacity onPress={handleNavigate} style={[styles.updateButton, (email && email.length > 0 && !isValidEmail) || (phone && phone.length > 0 && validationMessage)
              ? { opacity: 0.5 }
              : null,
            ]}
              disabled={(email && email.length > 0 && !isValidEmail) || (phone && phone.length > 0 && validationMessage) ? true : false}>
              <Text style={styles.updateText}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Image source={CONST.DELETE_ICON} style={styles.deleteicon} />
            </TouchableOpacity>
          </View>
          {renderAction()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreenComponent;
