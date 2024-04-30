import React from 'react';
import { connect } from 'react-redux';
import OTPScreenComponent from './OTPScreenComponent';
import * as commonActions from '../../redux/actions/CommonActions';
import * as authActions from '../../redux/actions/authActions';

const OTPScreen = (props: any) => {
    return <OTPScreenComponent {...props} />;
}

const mapStateToProps = (state: any) => ({
    verifyOTPData: state.authReducer.verifyOTPData,
    verifyOTPError: state.authReducer.verifyOTPError,
    resendOTPData: state.authReducer.resendOTPData,
    resendOTPError: state.authReducer.resendOTPError,
});

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
