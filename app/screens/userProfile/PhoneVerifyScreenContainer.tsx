import React from "react";
import { connect } from 'react-redux';
import PhoneVarifyScreen from "./PhoneVarifyScreenComponent";
import * as authActions from '../../redux/actions/authActions';

const PhoneVerify = (props: any) => {
    return <PhoneVarifyScreen {...props} />;
}

const mapStateToProps = (state: any) => ({
    verifyPhoneData: state.authReducer.verifyPhoneData,
    verifyPhoneError: state.authReducer.verifyPhoneError,
});

const mapDispatchToProps = (dispatch: any) => ({
    verifyPhoneNumber: (params: any) => {
        return dispatch(authActions.verifyNewPhoneNumber(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerify);
