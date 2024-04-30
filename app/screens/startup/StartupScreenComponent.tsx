import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  NativeModules,
  AppState,
  SafeAreaView
} from 'react-native';
import { styles } from './StartupScreenStyles';
import * as AppConfig from '../../utils/AppConfig';
import * as APIConfig from '../../redux/services/Config';
import * as IXNUtils from '../../utils/IXNUtils';
import * as CONST from '../../utils/Constants';
import { setTopLevelNavigator } from '../../redux/services/navigationService';
import FastImage from 'react-native-fast-image';

const StartupScreen = (props: any) => {
  const {
    startupResponse,
    errorResponse,
  } = props;

  const [showEnvSelection, setShowEnvSelection] = useState(false);
  const [isStartupSuccess, setIsStartupSuccess] = useState(false);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const _handleAppStateChange = (nextAppState: any) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    const listener = AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      listener.remove();
    };
  }, []);

  const [startupParams, setStartupParams] = useState({
    odid: '',
    device: '',
    build: '',
    idfv: '',
    idfa: '',
    device_model: '',
    device_name: '',
    os_name: '',
    os_version: '',
    os_other_info: '',
    device_localized_model: '',
    device_manufacturer: '',
    bundle_id: '',
    country_code: '',
    country_name: '',
    system_locale: '',
    current_locale: '',
    available_external_memory: '',
    total_external_memory: '',
    available_internal_memory: '',
    total_internal_memory: '',
    available_ram: '',
    total_ram: '',
    loaded: false,
    // url: '',
  });
  const fetchStartupParams = async () => {
    setStartupParams({
      build: await IXNUtils.getAppVersion(),
      odid: await IXNUtils.getOpenUDID(),
      device: await IXNUtils.getDeviceType(),
      idfv: await IXNUtils.getAppleVenderUDID(),
      idfa: await IXNUtils.getIDFA(),
      device_model: await IXNUtils.getDeviceModel(),
      device_name: await IXNUtils.getDeviceName(),
      os_name: await IXNUtils.getSystemName(),
      os_version: await IXNUtils.getSystemVersion(),
      os_other_info: await IXNUtils.getMachineName(),
      device_localized_model: await IXNUtils.getLocalizedModel(),
      device_manufacturer: await IXNUtils.getManufacturer(),
      bundle_id: await IXNUtils.getBundleId(),
      country_code: await IXNUtils.getCountryCode(),
      country_name: await IXNUtils.getCountryName(),
      system_locale: await IXNUtils.getSystemLocale(),
      current_locale: await IXNUtils.getCurrentLocale(),
      available_external_memory:
        await IXNUtils.getAvailableExternalMemorySize(),
      total_external_memory: await IXNUtils.getTotalExternalMemorySize(),
      available_internal_memory:
        await IXNUtils.getAvailableInternalMemorySize(),
      total_internal_memory: await IXNUtils.getTotalInternalMemorySize(),
      available_ram: await IXNUtils.getAvailableRAMSize(),
      total_ram: await IXNUtils.getTotalRAMSize(),
      loaded: true,
    });

    fetchUserAccessToken();
  };

  const fetchUserAccessToken = async () => {
    const userTokenCurr = await IXNUtils.getStringFromKeychain('user_token');
    AppConfig.updateUserToken(userTokenCurr);
    AppConfig.updateAppVersion(await IXNUtils.getAppVersion());
    AppConfig.updateSystemFonts(await IXNUtils.getSystemFonts());
  };

  useEffect(() => {

    fetchUserAccessToken();

    setShowEnvSelection(IXNUtils.getAutoEnv() === -1 ? true : false);
    if (startupParams.loaded === false) {
      IXNUtils.consoleLog(
        props.route.name,
        'renderBody',
        'ScreenSize',
        CONST.CURRENT_SCREEN_WIDTH + 'x' + CONST.CURRENT_SCREEN_HEIGHT,
      );

      fetchStartupParams();
      AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.NOT_STARTED);
    }

    if (
      AppConfig.deviceInfo().push_token ||
      AppConfig.deviceInfo().push_token
    ) {
      IXNUtils.consoleLog(
        props.route.name,
        'useEffect',
        "AppConfig.deviceInfo()['push_token']",
        AppConfig.deviceInfo().push_token,
      );
    }
    setTopLevelNavigator(props.navigation); // Saving navigation state to redirect on respective screen if notification comes or any top level event
    props.stopLoader();
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.NOT_STARTED);
  }, []);

  useEffect(() => {
    if (!isStartupSuccess) {
      if (startupParams.loaded === true) {
        //props.getStartupData(startupParams);
      }
    }
  }, [isStartupSuccess, startupParams])

  useEffect(() => {
    if (startupParams.loaded == true) {
      AppConfig.updateDeviceInfo(startupParams);

      if (AppConfig.APP_ENV() === AppConfig.Environments.prod) {
        envSelectionAction(AppConfig.Environments.prod);
      } else {
        if (IXNUtils.getAutoEnv() !== -1) {
          envSelectionAction(IXNUtils.getAutoEnv());
          IXNUtils.setAutoEnv(-1);
          setShowEnvSelection(false);
        }
      }
    }
  }, [startupParams.loaded]);

  // useEffect(() => {
  //   IXNUtils.consoleLog(
  //     props.route.name,
  //     'useEffect',
  //     'startupParams',
  //     startupParams,
  //   );
  // }, [startupParams]);

  useEffect(() => {
    if (appStateVisible === 'active') {
      handleStartupResponse();
    }
  }, [startupResponse, errorResponse]);

  const handleStartupResponse = () => {

    IXNUtils.consoleLog(
      props.route.name,
      'useEffect',
      'startupResponse',
      JSON.stringify(startupResponse)
    );

    if (startupResponse) {

      IXNUtils.consoleLog(
        props.route.name,
        'useEffect',
        'startupResponse',
        JSON.stringify(startupResponse)
      );
      if (startupResponse.status === 'success') {
        if (startupResponse.data) {
          let mobileAppStartup = {};
          if (startupResponse.data.token) {
            const token = startupResponse.data.token
            IXNUtils.setStringIntoKeychain(CONST.SA_TOKEN, token);
            AppConfig.updateSAtoken(token);
            IXNUtils.consoleLog(
              props.route.name,
              'useEffect',
              'token',
              token
            );
          }
          if (startupResponse.data.app) {
            mobileAppStartup = startupResponse.data.app;
            IXNUtils.consoleLog('StartupScreen', 'useEffect', 'mobileAppStartup', JSON.stringify(mobileAppStartup))
          }
          if (mobileAppStartup.build_base_url) {
            APIConfig.updateApiEndpoint(
              mobileAppStartup.build_base_url,
            );
          } else {
            IXNUtils.showMessage(
              'Error',
              'There was some problem validating your device, please reach out to ideaxecution.com',
              'OK',
              () => {
                props.getStartupData(startupParams);
              },
            );
            return;
          }

          if (mobileAppStartup.privacy_policy_url) {
            AppConfig.updatePrivacyPolicyURL(
              mobileAppStartup.privacy_policy_url,
            );
          }
          if (mobileAppStartup.rate_app_url) {
            AppConfig.updateRateAppURL(
              mobileAppStartup.rate_app_url,
            );
          }
          if (mobileAppStartup.support_url) {
            AppConfig.updateSupportURL(
              mobileAppStartup.support_url,
            );
          }
          if (mobileAppStartup.tnc_url) {
            AppConfig.updateTncUrl(
              mobileAppStartup.tnc_url,
            );
          }
          if (mobileAppStartup.asset_base_url) {
            AppConfig.updateAssetBaseURL(
              mobileAppStartup.asset_base_url,
            );
          }
          if (mobileAppStartup.app_json) {
            IXNUtils.consoleLog(
              props.route.name,
              'useEffect',
              'mobileAppStartup.app_json',
              JSON.parse(mobileAppStartup.app_json)
            );

            AppConfig.updateStartupParamsFile(
              JSON.parse(mobileAppStartup.app_json),
            );
          }

          if (mobileAppStartup.build_min_support) {
            if (mobileAppStartup.build_min_support > AppConfig.appVersion()) {
              IXNUtils.showMessage(
                'Upgrade Required',
                mobileAppStartup.build_update_msg,
                'Lets Go',
                () => {
                  IXNUtils.openURL(
                    mobileAppStartup.build_update_url,
                  );
                },
              );
              return;
            }
            IXNUtils.consoleLog('StartupScreen', 'useEffect', 'build_min_support', mobileAppStartup.build_min_support)
          }
          if (mobileAppStartup.build_maintenance_flag) {
            IXNUtils.consoleLog('StartupScreen', 'useEffect', 'build_maintenance_flag', JSON.stringify(mobileAppStartup.build_maintenance_flag))
            if (mobileAppStartup.build_maintenance_flag === 1) {
              IXNUtils.showMessage(
                'Alert',
                mobileAppStartup.build_maintenance_msg,
                'Lets Go',
                () => {
                  IXNUtils.openURL(
                    mobileAppStartup.build_update_url,
                  );
                },
              );
              return;
            }
          }

          if (mobileAppStartup.build_force_update_flag) {
            IXNUtils.consoleLog('StartupScreen', 'useEffect', 'build_maintenance_flag', JSON.stringify(mobileAppStartup.build_force_update_flag))

            if (
              mobileAppStartup.build_force_update_flag === 1
            ) {
              if (mobileAppStartup.build_update_msg) {
                IXNUtils.showMessage(
                  'Upgrade Required',
                  mobileAppStartup.build_update_msg,
                  'Lets Go',
                  () => {
                    IXNUtils.openURL(
                      mobileAppStartup.build_update_url,
                    );
                  },
                );

                return;
              }
            }
          }

          if (mobileAppStartup.build_suggest_update_flag) {
            if (
              mobileAppStartup.build_suggest_update_flag === 1
            ) {
              if (mobileAppStartup.build_update_msg) {
                IXNUtils.showMessage(
                  'Upgrade Required',
                  mobileAppStartup.build_update_msg,
                  'Lets Go',
                  () => {
                    IXNUtils.openURL(
                      mobileAppStartup.build_update_url,
                    );
                  },
                  'Later',
                );
              }
            }
          }
          setIsStartupSuccess(true);

          // if (mobileAppStartup.asset_base_url && mobileAppStartup.app_json) {
          //   AppConfig.updateStartupParamsFile(
          //     mobileAppStartup.app_json,
          //   );
          //   props.getStartupFileParams(mobileAppStartup.asset_base_url + '/' + mobileAppStartup.app_json)
          //   return;
          // }

        }
      }

      // if (accessToken) {
      //   props.getUserInfo(
      //     {
      //       build: AppConfig.deviceInfo().build,
      //       device: AppConfig.deviceInfo().device,
      //       odid: AppConfig.deviceInfo().odid,
      //     }
      //   );
      // } else {
      props.navigation.reset({
        index: 1,
        routes: [{ name: 'SplashScreen' }],
      });
      // }
    }

    if (errorResponse) {

      setIsStartupSuccess(false);
      IXNUtils.consoleLog(
        props.route.name,
        'useEffect',
        'errorResponse',
        JSON.stringify(errorResponse)
      );

      // {"status":"error","error_code":1002,"message":"Unauthorized build access, please contact admin@appbrainz.com incase this was mistake","data":null}
      if (errorResponse.status === "error") {
        if (errorResponse.message) {
          IXNUtils.showMessage(
            'Error',
            errorResponse.message,
            'OK',
            () => {
              props.getStartupData(startupParams);
            },
          );
        } else {
          IXNUtils.showMessage(
            'Error',
            'There was some problem validating your device, please reach out to contact@ideaxecution.com',
            'OK',
            () => {
              props.getStartupData(startupParams);
            },
          );
        }
      }
    }
  }

  const envSelectionAction = (thisEnv: any) => {

    IXNUtils.setAutoEnv(-1);
    setShowEnvSelection(false);
    IXNUtils.consoleLog(
      props.route.name,
      'envSelectionAction',
      'thisEnv',
      thisEnv,
    );
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    AppConfig.updateAppEnv(thisEnv);
    IXNUtils.setStringIntoKeychain('env', '' + AppConfig.APP_ENV());
    APIConfig.updateApiEndpoint(AppConfig.APP_ENV());
    const accessToken = AppConfig.userToken()?.access_token
      ? AppConfig.userToken().access_token
      : '';
    IXNUtils.consoleLog(
      props.route.name,
      'accessToken',
      'accessToken',
      accessToken,
    );
    //setIsStartupSuccess(true)
    if (!isStartupSuccess) {
      if (startupParams.loaded === true) {
        props.getStartupData(startupParams);
      }
    }
    //handleStartupResponse()
    // if (accessToken) {
    //   props.getUserInfo(
    //     {
    //       build: AppConfig.deviceInfo().build,
    //       device: AppConfig.deviceInfo().device,
    //       odid: AppConfig.deviceInfo().odid,
    //     }
    //   );
    // } else {
    //   props.navigation.reset({
    //     index: 1,
    //     routes: [{ name: 'SplashScreen' }],
    //   });
    // }
  };

  const renderButton = (thisEnv) => {
    return (
      <TouchableOpacity
        key={thisEnv}
        style={{ paddingLeft: 5 }}
        onPress={() => {
          envSelectionAction(thisEnv);
        }}>
        <ImageBackground
          source={require('../../assets/common/darkButton.png')}
          style={styles.envButton}>
          <Text style={{ color: CONST.WHITE_COLOR }} >{AppConfig.envName(thisEnv)}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderEnvSelection = () => {
    return AppConfig.APP_ENV() !== AppConfig.Environments.prod ? (
      <View style={styles.envContainer}>
        <Text style={styles.envText}>Select Environment</Text>
        <View style={styles.envButtonContainer}>
          {Object.keys(AppConfig.Environments).map((key) => {
            return renderButton(AppConfig.Environments[key]);
          })}
        </View>
      </View>
    ) : (
      <View />
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.envText}>{'v' + startupParams.build}</Text>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <View
          //resizeMode={'cover'}
          //source={require('../../assets/common/logo.png')}
          style={styles.bodyContainer}>
          {!showEnvSelection ? (
            <FastImage
              style={styles.imageStyle}
              source={require('../Splashgif.gif')}
            />
          ) : null}
          {renderEnvSelection()}
          {renderFooter()}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>{renderBody()}</SafeAreaView>
  );
};

export default StartupScreen;
