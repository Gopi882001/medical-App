import React from 'react';
import { connect } from 'react-redux';
import LoginScreenComponent from './LoginScreenComponent';
import * as commonActions from '../../redux/actions/CommonActions';
import * as authActions from '../../redux/actions/authActions';

const LoginScreen = (props: any) => {
    return <LoginScreenComponent {...props} />;
}

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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
