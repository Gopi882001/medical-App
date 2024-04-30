import React from 'react';
import { connect } from 'react-redux';
import StartupScreenComponent from './StartupScreenComponent';
import * as startupActions from '../../redux/actions/startupActions';
//import * as userActions from '../../actions/userActions';
//import * as authActions from '../../actions/authActions';
import * as commonActions from '../../redux/actions/CommonActions';

const StartupScreen = (props: any) => {
  return <StartupScreenComponent {...props} />;
};

const mapStateToProps = (state: any) => ({
  startupResponse: state.startupReducer.startupData,
  errorResponse: state.startupReducer.error,
  //userInfoResponse: state.userReducer.userInfo,
  //userInfoError: state.userReducer.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getStartupData: (params: any) => {
    return dispatch(startupActions.getStartupData(params));
  },
  // getUserInfo: (params) => {
  //   return dispatch(userActions.getUserInfo(params));
  // },
  // logoutAction: (shouldReload,params) => {
  //   return dispatch(userActions.logoutAction(shouldReload,params));
  // },
  // resetAuthScreenData: () => {
  //   return dispatch(authActions.resetAuthScreenData());
  // },
  stopLoader: () => {
    return dispatch(commonActions.stopLoader());
  },
  // resetProfileData:() =>{
  //   return dispatch(userActions.resetProfileData());
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(StartupScreen);
