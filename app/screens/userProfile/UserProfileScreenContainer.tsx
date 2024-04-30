import React from "react";
import { connect } from 'react-redux';
import UserProfileScreen from "./UserProfileScreenComponent";
import * as authActions from '../../redux/actions/authActions';

const UserProfile = (props: any) => {
    return <UserProfileScreen {...props} />;
}

const mapStateToProps = (state: any) => ({
    logOutData: state.authReducer.logOutData,
    logOutError: state.authReducer.logOutError,
    toggleNotificationData: state.authReducer.toggleNotificationData,
    toggleNotificationError: state.authReducer.toggleNotificationError,
    userProfileData: state.authReducer.userProfileData,
    userProfileError: state.authReducer.userProfileError,
});

const mapDispatchToProps = (dispatch: any) => ({
    userLogout: () => {
        return dispatch(authActions.userLogout());
    },
    toggleNotification: () => {
        return dispatch(authActions.toggleNotification());
    },
    userProfile: () => {
        return dispatch(authActions.userProfile());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
