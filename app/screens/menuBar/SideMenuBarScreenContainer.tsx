import React from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../../redux/actions/CommonActions';
import * as authActions from '../../redux/actions/authActions';
import SideMenuBarScreenComponent from './SideMenuBarScreenComponent';

const SideMenu = (props: any) => {
    return <SideMenuBarScreenComponent {...props} />;
}

const mapStateToProps = (state: any) => ({
    userProfileData: state.authReducer.userProfileData,
    userProfileError: state.authReducer.userProfileError,
});

const mapDispatchToProps = (dispatch: any) => ({
    getUserProfile: () => {
        return dispatch(authActions.userProfile());
    },
    stopLoader: () => {
        return dispatch(commonActions.stopLoader());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
