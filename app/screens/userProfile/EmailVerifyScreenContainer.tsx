import React from "react";
import { connect } from 'react-redux';
import EmailVerifyScreen from "./EmailVarifyScreenComponent";
import * as authActions from '../../redux/actions/authActions';

const EmailVerify = (props: any) => {
    return <EmailVerifyScreen {...props} />;
}

const mapStateToProps = (state: any) => ({
    verifyEmailData: state.authReducer.verifyEmailData,
    verifyEmailError: state.authReducer.verifyEmailError,
});

const mapDispatchToProps = (dispatch: any) => ({
    verifyEmail: (params: any) => {
        return dispatch(authActions.verifyNewEmail(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);
