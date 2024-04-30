import React from "react";
import { connect } from 'react-redux';
import EditProfileScreen from "./EditProfileScreenComponent";
import * as authActions from '../../redux/actions/authActions';

const EditUserProfile = (props: any) => {
    return <EditProfileScreen {...props} />;
}

const mapStateToProps = (state: any) => ({
    deleteAccountData: state.authReducer.deleteAccountData,
    deleteAccountError: state.authReducer.deleteAccountError,
});

const mapDispatchToProps = (dispatch: any) => ({
    deleteUserAccount: () => {
        return dispatch(authActions.deleteUserAccount());
    },
    updateUserImage: (params: any) => {
        return dispatch(authActions.updateUserImage(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile);
