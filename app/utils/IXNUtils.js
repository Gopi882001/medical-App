import React from 'react';
import {Alert, Linking, NativeModules, PermissionsAndroid, Platform} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import * as AppConfig from './AppConfig';
import * as STR_CNST from './StringContants';
import * as CONST from './Constants';
import scale from './Scale';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
const bracketLayout = [];
let deepLinkData = null;
let autoEnv = -1;
let index = null;
let displayPushMessageAlert = true;

export const consoleLog = (
  screen = 'DefaultScreen',
  method = 'DefaultMethod',
  title = 'DefaultTitle',
  message = '',
) => {
  // if (AppConfig.APP_ENV() !== AppConfig.Environments.prod) {
    const dateTime = new Date();
    console.log(dateTime.toString()+'  '+      
      '[' + screen + ']->[' + method + ']:  ' + title + ': ',
      message,
    );
    NativeModules.NativeBridge.nativeLog(
      '[' +
        screen +
        ']->[' +
        method +
        ']:  ' +
        title +
        ': ' +
        JSON.stringify(message),
    );
  // }
};

export const showMessage = (
  title = 'Alert',
  message = '',
  button1Title = 'OK',
  button1Callback = null,
  button2Title = '',
  button2Callback,
) => {
  let alertButtonsInfo = [
    {
      text: button1Title,
      onPress: button1Callback ? button1Callback : () => {},
      style: 'cancel',
    },
  ];
  if (button2Title.length > 0) {
    alertButtonsInfo.push({
      text: button2Title,
      onPress: button2Callback ? button2Callback : () => {},
    });
  }
  Alert.alert(title, message, alertButtonsInfo, {cancelable: false});
};

export const validateEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === true) {
    return true;
  }
  return false;
};

export const setStringIntoKeychain = async (key, value, addEnv=true) => {
  let keyVal = key ;
  keyVal+= addEnv?AppConfig.envName(AppConfig.APP_ENV()):'';
  const success = await NativeModules.NativeBridge.setStringIntoKeychain(
    keyVal,
    value,
  );
  consoleLog(
    'IXNUtils',
    'setStringIntoKeychain',
    'key:' + keyVal,
    'value:' + value,
  );
  return success;
};

export const logEvent = async (eventName, parameters) => {
  //Json string parameters
  const success = await NativeModules.NativeBridge.logEvent(
    eventName,
    parameters,
  );
  return success;
};

export const logScreen = async (screenName, screenClass) => {
  const params = {
    screen_name: screenName,
    screen_class: screenClass,
  };
  const success = await NativeModules.NativeBridge.logEvent(
    'screen_view',
    JSON.stringify(params),
  );
  return success;
};

export const getStringFromKeychain = async (key) => {
  const value = await NativeModules.NativeBridge.getStringFromKeychain(
    key + AppConfig.envName(AppConfig.APP_ENV()),
  );
  consoleLog(
    'IXNUtils',
    'getStringFromKeychain',
    'key:' + key + AppConfig.envName(AppConfig.APP_ENV()),
    'value:' + value,
  );
  return value;
};

export const getAutoEventId = async () => {
  const value = await NativeModules.NativeBridge.getAutoEventId();
  consoleLog('IXNUtils', 'getAutoEventId', 'eventId:', 'value:' + value);
  return value;
};

export const getAutoEventMessage = async () => {
  const value = await NativeModules.NativeBridge.getAutoEventMessage();
  consoleLog('IXNUtils', 'getAutoEventId', 'eventMessage:', 'value:' + value);
  return value;
};

export const resetAutoEventId = async () => {
  const temp = await NativeModules.NativeBridge.resetAutoEventId();
  return temp;
};

export const isFTU = async () => {
  const ftu = await NativeModules.NativeBridge.isFTU();
  consoleLog('IXNUtils', 'isFTU', 'ftu', ftu);
  return ftu;
};

export const getDeviceType = async () => {
  const deviceType = await NativeModules.NativeBridge.getDeviceType();
  consoleLog('IXNUtils', 'getDeviceType', 'deviceType', deviceType);
  return deviceType;
};

export const getIDFA = async () => {
  const idfa = await NativeModules.NativeBridge.getIDFA();
  consoleLog('IXNUtils', 'getIDFA', 'IDFA', idfa);
  return idfa;
};

export const getOpenUDID = async () => {
  const odid = await NativeModules.NativeBridge.getOpenUDID();
  consoleLog('IXNUtils', 'getOpenUDID', 'odid', odid);
  return odid;
};

export const getCountryCode = async () => {
  const countryCode = await NativeModules.NativeBridge.getCountryCode();
  consoleLog('IXNUtils', 'getCountryCode', 'countryCode', countryCode);
  return countryCode;
};

export const getCountryName = async () => {
  const countryName = await NativeModules.NativeBridge.getCountryName();
  consoleLog('IXNUtils', 'getCountryName', 'countryName', countryName);
  return countryName;
};

export const getSystemLocale = async () => {
  const systemLocale = await NativeModules.NativeBridge.getSystemLocale();
  consoleLog('IXNUtils', 'getSystemLocale', 'systemLocale', systemLocale);
  return systemLocale;
};

export const getCurrentLocale = async () => {
  const currentLocale = await NativeModules.NativeBridge.getCurrentLocale();
  consoleLog('IXNUtils', 'getCurrentLocale', 'currentLocale', currentLocale);
  return currentLocale;
};

export const getAppleVenderUDID = async () => {
  const appleVenderUDID = await NativeModules.NativeBridge.getAppleVenderUDID();
  consoleLog(
    'IXNUtils',
    'getAppleVenderUDID',
    'appleVenderUDID',
    appleVenderUDID,
  );
  return appleVenderUDID;
};

export const getMachineName = async () => {
  const machineName = await NativeModules.NativeBridge.getMachineName();
  consoleLog('IXNUtils', 'getMachineName', 'machineName', machineName);
  return machineName;
};

export const getDeviceName = async () => {
  const deviceName = await NativeModules.NativeBridge.deviceName();
  consoleLog('IXNUtils', 'getDeviceName', 'machineName', deviceName);
  return deviceName;
};

export const getSystemName = async () => {
  const systemName = await NativeModules.NativeBridge.systemName();
  consoleLog('IXNUtils', 'getSystemName', 'systemName', systemName);
  return systemName;
};

export const getDeviceModel = async () => {
  const deviceModel = await NativeModules.NativeBridge.deviceModel();
  consoleLog('IXNUtils', 'getDeviceModel', 'deviceModel', deviceModel);
  return deviceModel;
};

export const getLocalizedModel = async () => {
  const localizedModel = await NativeModules.NativeBridge.localizedModel();
  consoleLog(
    'IXNUtils',
    'getLocalizedModel',
    'localizedModel',
    localizedModel,
  );
  return localizedModel;
};

export const getAppVersion = async () => {
  const appVersion = await NativeModules.NativeBridge.getAppVersion();
  consoleLog('IXNUtils', 'getAppVersion', 'appVersion', appVersion);
  return appVersion;
};

export const getSystemVersion = async () => {
  const systemVersion = await NativeModules.NativeBridge.getSystemVersion();
  consoleLog('IXNUtils', 'getSystemVersion', 'systemVersion', systemVersion);
  return systemVersion;
};

export const getBundleId = async () => {
  const bundleId = await NativeModules.NativeBridge.getBundleId();
  consoleLog('IXNUtils', 'getBundleId', 'bundleId', bundleId);
  return bundleId;
};

export const getAvailableExternalMemorySize = async () => {
  const availableExternalMemorySize =
    await NativeModules.NativeBridge.getAvailableExternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getAvailableExternalMemorySize',
    'availableExternalMemorySize',
    availableExternalMemorySize,
  );
  return availableExternalMemorySize;
};

export const getAvailableInternalMemorySize = async () => {
  const availableInternalMemorySize =
    await NativeModules.NativeBridge.getAvailableInternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getAvailableInternalMemorySize',
    'availableInternalMemorySize',
    availableInternalMemorySize,
  );
  return availableInternalMemorySize;
};

export const getAvailableRAMSize = async () => {
  const availableRAMSize =
    await NativeModules.NativeBridge.getAvailableRAMSize();
  consoleLog(
    'IXNUtils',
    'getAvailableRAMSize',
    'availableRAMSize',
    availableRAMSize,
  );
  return availableRAMSize;
};

export const getTotalExternalMemorySize = async () => {
  const totalExternalMemorySize =
    await NativeModules.NativeBridge.getTotalExternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getTotalExternalMemorySize',
    'totalExternalMemorySize',
    totalExternalMemorySize,
  );
  return totalExternalMemorySize;
};

export const getTotalInternalMemorySize = async () => {
  const totalInternalMemorySize =
    await NativeModules.NativeBridge.getTotalInternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getTotalInternalMemorySize',
    'totalInternalMemorySize',
    totalInternalMemorySize,
  );
  return totalInternalMemorySize;
};

export const getTotalRAMSize = async () => {
  const totalRAMSize = await NativeModules.NativeBridge.getTotalRAMSize();
  consoleLog('IXNUtils', 'getTotalRAMSize', 'totalRAMSize', totalRAMSize);
  return totalRAMSize;
};

export const clearCookies = async () => {
  await NativeModules.NativeBridge.clearCookies();
};

export const googleSignIn = async () => {
  await NativeModules.NativeBridge.googleSignIn();
};

export const appleSignIn = async () => {
  await NativeModules.NativeBridge.appleSignIn();
};

export const getCacheDirectoryPath = async () => {
  const cacheDirectoryPath =
    await NativeModules.NativeBridge.getCacheDirectoryPath();
  consoleLog(
    'IXNUtils',
    'getCacheDirectoryPath',
    'cacheDirectoryPath',
    cacheDirectoryPath,
  );
  return cacheDirectoryPath;
};

export const getGoogleAccountID = async () => {
  const googleAccountID = await NativeModules.NativeBridge.getGoogleAccountID();
  consoleLog(
    'IXNUtils',
    'getGoogleAccountID',
    'googleAccountID',
    googleAccountID,
  );
  return googleAccountID;
};

export const getManufacturer = async () => {
  const manufacturer = await NativeModules.NativeBridge.getManufacturer();
  consoleLog('IXNUtils', 'getManufacturer', 'manufacturer', manufacturer);
  return manufacturer;
};

export const getLoginDay = async () => {
  const loginDay = await NativeModules.NativeBridge.loginDay();
  consoleLog('IXNUtils', 'getLoginDay', 'loginDay', loginDay);
  return loginDay;
};

export const canOpenURL = async (url) => {
  const flag = await NativeModules.NativeBridge.canOpenURL(url);
  consoleLog('IXNUtils', 'canOpenURL', 'flag', flag);
  return flag;
};

export const getSystemFonts = async () => {
  const systemFonts = await NativeModules.NativeBridge.getSystemFonts();
  // consoleLog('IXNUtils', 'getSystemFonts', 'systemFonts', systemFonts);
  return systemFonts;
};

export const openURL = (url, callback) => {
  NativeModules.NativeBridge.openURL(url, (success) => {
    consoleLog('IXNUtils', 'openURL', 'openURL', success);
    if (callback && typeof callback === 'function') {
      callback(success);
    }
  });
};

export const cancelAllLocalNotifications = async () => {
  await NativeModules.NativeBridge.cancelAllLocalNotifications();
};

export const updateBadgeVal = async () => {
  await NativeModules.NativeBridge.updateBadgeVal();
};

export const takeNotificationPermission = (callback) => {
  NativeModules.NativeBridge.takeNotificationPermission(
    (granted, error = null) => {
      consoleLog('IXNUtils', 'takeNotificationPermission', 'granted', granted);
      if (error != null) {
        consoleLog('IXNUtils', 'takeNotificationPermission', 'error', error);
      }
      if (callback && typeof callback === 'function') {
        callback(granted, error);
      }
    },
  );
};

export const getPushToken = async () => {
  await NativeModules.NativeBridge.getPushToken();
};

export const toMonth = (number) => {
  const month = [];
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  return month[number];
};

// Set JSON Web Token in Client to be included in all calls
export const getTwitchChanelFromUrl = (url) => {
  consoleLog('IXNUtils', 'getTwitchChanelFromUrl', 'url', url);
  if (!url) return 'undefined';
  var parts = url.split('/');
  var channel = parts[3];
  if (typeof channel === 'undefined') {
    return 'undefined';
  } else {
    return channel;
  }
};

/**
 * To Get the current device timezone, based on device not location
 */
export const getCurrentTimeZone = () => {
  return RNLocalize.getTimeZone();
};

export const getDrawerItems = () => {
  const items = [
    {
      id: 0,
      title: STR_CNST.MENU_MY_HOME,
      icon: CONST.MENU_MY_HOME_ICON,
      backColor: '#322F52',
      iconStyle: {
        height: scale(18),
        width: scale(18),
      },
    },
    {
      id: 2,
      title: STR_CNST.MENU_EVENTS,
      icon: CONST.MENU_EVENTS_ICON,
      backColor: '#413E65',
      iconStyle: {
        height: scale(26),
        width: scale(30),
      },
      subItems: [
        {
          id: 0,
          title: STR_CNST.EVENTS1,
          backColor: '#252344',
        },
        {
          id: 1,
          title: STR_CNST.EVENTS2,
          backColor: '#252344',
        },
        {
          id: 2,
          title: STR_CNST.EVENTS3,
          backColor: '#252344',
        },
      ],
    },
    
  ];
  return items;
};

export const getProfileDrawerItems = () => {
  const items = [
    {
      id: 0,
      title: STR_CNST.MENU_PROFILE,
      icon: CONST.MENU_PROFILE_ICON,
      backColor: '#322F52',
      iconStyle: {
        height: scale(26),
        width: scale(26),
      },
      subItems: [
        {
          id: 0,
          title: STR_CNST.PROFILE1,
          backColor: '#252344',
        },
      ],
    },
    {
      id: 1,
      title: STR_CNST.MENU_SETTINGS,
      icon: CONST.MENU_SETTINGS_ICON,
      backColor: '#575382',
      iconStyle: {
        height: scale(30),
        width: scale(30),
      },
    },
    {
      id: 2,
      title: STR_CNST.MENU_SIGN_OUT,
      icon: CONST.MENU_LOGOUT_ICON,
      backColor: '#413E65',
      iconStyle: {
        height: scale(26),
        width: scale(30),
      },
    },
  ];
  return items;
};

export const calculateTimimg = (d) => {
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (d) {
    if (d >= 365) {
      years++;
      d -= 365;
    } else if (d >= 30) {
      months++;
      d -= 30;
    } else if (d >= 7) {
      weeks++;
      d -= 7;
    } else {
      days++;
      d--;
    }
  }
  return {
    years,
    months,
    weeks,
    days,
  };
};

export const getDiffTimeString = (diffDays) => {
  if (diffDays > 0 && diffDays < 28) {
    if (diffDays === 1) {
      return `Signed up ${diffDays} day ago`;
    } else {
      return `Signed up ${diffDays} days ago`;
    }
  } else if (diffDays === 0) {
    return 'Signed up today';
  } else {
    const data = calculateTimimg(diffDays);
    if (data.years === 0) {
      if (data.months === 1) {
        return `Signed up ${data.months} month ago`;
      } else {
        return `Signed up ${data.months} months ago`;
      }
    } else {
      if (data.years === 1) {
        return `Signed up ${data.years} year ago`;
      } else {
        return `Signed up ${data.years} years ago`;
      }
    }
  }
};

export const getDifferenceBetweenTwoDates = (date1, date2) => {
  const msDiff = new Date(date1).getTime() - new Date(date2).getTime();

  if (msDiff > 0) {
    const seconds = Math.floor(msDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return days;
  }
  return 0;
};

export const getFormattedDate = (date) => {
  const datearray1 = date.split(' ');
  const datearray = datearray1[0].split('-');
  const newdate = `${datearray[1]}/${datearray[2]}/${datearray[0]}`;
  return newdate;
};

export const checkTodaysDate = (mydate) => {
  const date = new Date();
  mydate = getFormattedDate(mydate);
  mydate = new Date(mydate);
  const diff = getDifferenceBetweenTwoDates(date, mydate);
  const str = getDiffTimeString(diff);
  return str;
};

var drawerDirection = 'left';

export function getDrawerDirection() {
  return drawerDirection;
}

export function setDrawerDirection(newDrawerDirection) {
  drawerDirection = newDrawerDirection;
}

export function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return typeof json === 'object';
  } catch (e) {
    return false;
  }
}

export function getPostfix(number) {
  if (number === 1) {
    return 'st';
  } else if (number === 2) {
    return 'nd';
  } else if (number === 3) {
    return 'rd';
  } else {
    return 'th';
  }
}

// More info on all the options is below in the API Reference... just some common use cases shown here
export async function photoUpload(index, callback) {
  const options = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: false,
    allowsEditing: true,
    quality: 0.7,
    mediaType: 'photo',
    maxWidth: 1024,
    maxHeight: 1024,
    cameraType: 'front',
  };
  if (index === 0) {
    let cameraPermissionStatus = false;
    let isCameraAuthorized = false;
    if(Platform.OS === 'android') {
      isCameraAuthorized = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (!isCameraAuthorized) {
        cameraPermissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
      }
    }
    
    if (isCameraAuthorized || cameraPermissionStatus || Platform.OS === 'ios') {
      await launchCamera(options, (response) => {
        consoleLog(
          'IXNUtils',
          'photoUpload',
          'launchImageLibrary->response',
          JSON.stringify(response),
        );
        /*
        launchImageLibrary->response:  {"assets":[{"height":768,"width":1024,"type":"image/jpeg",
        "fileName":"rn_image_picker_lib_temp_418e6f93-4e04-4f12-8e5d-33e6e2385608.jpg",
        "fileSize":17321,"uri":"file:///data/user/0/com.ideaxecution.mobileapp/cache/rn_image_picker_lib_temp_418e6f93-4e04-4f12-8e5d-33e6e2385608.jpg"}]}
        */
        if (response.didCancel) {
          //reject('User cancelled image picker');
        } else if (response.errorCode) {
          if (response.errorCode === 'camera_unavailable') {
            Alert.alert('Error', 'Something went wrong!');
            return;
          }
          showMessage
          (
            'Camera permission is required',
            'Allow Camera Permission \n Settings > Peepal > Camera',
             'Settings' , () => {Linking.openSettings()},
              'OK'
          )
        } else {
          if (response.assets && response.assets.length > 0) {
            const responseImageData = response.assets[0];
            const imageData = {
              height: responseImageData.height,
              width: responseImageData.width,
              type: responseImageData.type,
              name: responseImageData.fileName.replace(
                'rn_image_picker_lib_temp_',
                '',
              ),
              filesize: responseImageData.fileSize,
              uri:
                Platform.OS === 'android'
                  ? responseImageData.uri
                  : responseImageData.uri.replace('file://', ''),
            };
            callback(imageData);
          } else callback(null);
        }
      });
    }
  }
  if (index === 1) {
    let storagePermissionStatus = false;
    //then we have do the same for WRITE_EXTERNAL_STORAGE as
    let isStorageAuthorized = false;
    if(Platform.OS === 'android') {
      isStorageAuthorized = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (!isStorageAuthorized) {
        storagePermissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }
    }
    
    if (
      isStorageAuthorized ||
      storagePermissionStatus ||
      Platform.OS === 'ios'
    ) {
      await launchImageLibrary(options, (response) => {
        consoleLog(
          'IXNUtils',
          'photoUpload',
          'launchImageLibrary->response',
          JSON.stringify(response),
        );
        /*
        launchImageLibrary->response:  {"assets":[{"height":1024,"width":512,"type":"image/png",
        "fileName":"rn_image_picker_lib_temp_1309853d-1eed-4b8e-8712-9ef50e800a1c.png",
        "fileSize":55580,"uri":"file:///data/user/0/com.ideaxecution.mobileapp/cache/rn_image_picker_lib_temp_1309853d-1eed-4b8e-8712-9ef50e800a1c.png"}]}

        */
        if (response.didCancel) {
        } else if (response.errorCode) {
          showMessage
          (
            'Read Storage permission is required',
            'Allow Read Storage Permission \n Settings > Peepal > Storage',
             'Settings' , () => {Linking.openSettings()},
              'OK'
          )
        } else {
          if (response.assets && response.assets.length > 0) {
            const responseImageData = response.assets[0];
            const imageData = {
              height: responseImageData.height,
              width: responseImageData.width,
              type: responseImageData.type,
              name: responseImageData.fileName.replace(
                'rn_image_picker_lib_temp_',
                '',
              ),
              filesize: responseImageData.fileSize,
              uri:
                Platform.OS === 'android'
                  ? responseImageData.uri
                  : responseImageData.uri.replace('file://', ''),
            };
            callback(imageData);
          } else callback(null);
        }
      });
    }
  }
}

export const getParsedDate = (date) => {
  date = String(date).split(' ');
  var days = String(date[0]).split('-');
  var hours = String(date[1]).split(':');
  return [
    parseInt(days[0]),
    parseInt(days[1]) - 1,
    parseInt(days[2]),
    parseInt(hours[0]),
    parseInt(hours[1]),
    parseInt(hours[2]),
  ];
};

export const getDeepLinkData = () => {
  return deepLinkData;
};

export const setDeeplinkData = (data) => {
  deepLinkData = data;
};

export const getAutoEnv = () => {
  return autoEnv;
};

export const setAutoEnv = (env) => {
  autoEnv = env;
};

export const getShowPushAlertFlag = () => {
  return displayPushMessageAlert;
};

export const setShowPushAlertFlag = (flag) => {
  displayPushMessageAlert = flag;
};

export const sampleImages = [
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1002.jpg',
    id: '1002',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1003.jpg',
    id: '1003',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1004.jpg',
    id: '1004',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1005.jpg',
    id: '1005',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1006.jpg',
    id: '1006',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1007.jpg',
    id: '1007',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1008.jpg',
    id: '1008',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1009.jpg',
    id: '1009',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1010.jpg',
    id: '1010',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1011.jpg',
    id: '1011',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1012.jpg',
    id: '1012',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1013.jpg',
    id: '1013',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1014.jpg',
    id: '1014',
    isSelected: false,
  },
  {
    url: 'https://ixn-mobile-app.s3.ap-south-1.amazonaws.com/ixn_aks_1015.jpg',
    id: '1015',
    isSelected: false,
  },
];

