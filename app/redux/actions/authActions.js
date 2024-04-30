import * as ActionTypes from './ActionTypes';

export function loginWithMobileNumberSuccess(params) {
    return {
        type: ActionTypes.LOGIN_WITH_MOBILE_NUMBER_SUCCESS,
        params: params,
    };
}

export function loginWithMobileNumberFailure(error) {
    return {
        type: ActionTypes.LOGIN_WITH_MOBILE_NUMBER_FAILURE,
        params: error,
    };
}

export function loginWithMobileNumber(params) {
    return {
        type: ActionTypes.LOGIN_WITH_MOBILE_NUMBER_REQUEST,
        params: params,
    };
}

export function verifyOTPSuccess(params) {
    return {
        type: ActionTypes.VERIFY_OTP_SUCCESS,
        params: params,
    };
}

export function verifyOTPFailure(error) {
    return {
        type: ActionTypes.VERIFY_OTP_FAILURE,
        params: error,
    };
}

export function verifyOTP(params) {
    return {
        type: ActionTypes.VERIFY_OTP_REQUEST,
        params: params,
    };
}

export function resendOTPSuccess(params) {
    return {
        type: ActionTypes.RESEND_OTP_SUCCESS,
        params: params,
    };
}

export function resendOTPFailure(error) {
    return {
        type: ActionTypes.RESEND_OTP_FAILURE,
        params: error,
    };
}

export function resendOTP(params) {
    return {
        type: ActionTypes.RESEND_OTP_REQUEST,
        params: params,
    }
}

export function userProfile() {
    return {
        type: ActionTypes.USER_PROFILE_REQUEST,
    };
} 

export function userProfileSuccess(params) {
    return {
        type: ActionTypes.USER_PROFILE_SUCCESS,
        params: params,
    };
}

export function userPorifleFailure(params) {
    return {
        type: ActionTypes.USER_PROFILE_FAILURE,
        params: params,
    }
}

export function verifyNewEmail(params) {
    return {
        type: ActionTypes.VERIFY_NEW_EMAIL_OTP_REQUEST,
        params: params,
    };
}

export function verifyNewEmailSuccess(params) {
    return {
        type: ActionTypes.VERIFY_NEW_EMAIL_OTP_SUCCESS,
        params: params,
    }
}

export function verifyNewEmailFailure(params) {
    return {
        type: ActionTypes.VERIFY_NEW_EMAIL_OTP_FAILURE,
        params: params,
    }
}

export function verifyNewPhoneNumber(params) {
    return {
        type: ActionTypes.VERIFY_NEW_PHONE_OTP_REQUEST,
        params: params,
    };
}

export function verifyNewPhoneNumberSuccess(params) {
    return {
        type: ActionTypes.VERIFY_NEW_PHONE_OTP_SUCCESS,
        params: params,
    }
}

export function verifyNewPhoneNumberFailure(params) {
    return {
        type: ActionTypes.VERIFY_NEW_PHONE_OTP_FAILURE,
        params: params,
    }
}

export function userLogout() {
    return {
        type: ActionTypes.USER_LOGOUT_REQUEST,
    };
}
export function userLogoutSuccess(params) {
    return {
        type: ActionTypes.USER_LOGOUT_SUCCESS,
        params: params,
    };
}
export function userLogoutFailure(error) {
    return {
        type: ActionTypes.USER_LOGOUT_FAILURE,
        params: error,
    };
}

export function toggleNotification() {
    return {
        type: ActionTypes.TOGGLE_NOTIFICATION_REQUEST,
    };
}
export function toggleNotificationSuccess(params) {
    return {
        type: ActionTypes.TOGGLE_NOTIFICATION_SUCCESS,
        params: params,
    };
}
export function toggleNotificationFailure(error) {
    return {
        type: ActionTypes.TOGGLE_NOTIFICATION_FAILURE,
        params: error,
    };
}

export function deleteUserAccount() {
    return {
        type: ActionTypes.DELETE_USER_ACCOUNT_REQUEST,
    };
}
export function deleteUserAccountSuccess(params) {
    return {
        type: ActionTypes.DELETE_USER_ACCOUNT_SUCCESS,
        params: params,
    };
}
export function deleteUserAccountFailure(error) {
    return {
        type: ActionTypes.DELETE_USER_ACCOUNT_FAILURE,
        params: error,
    };
}

export function setGoals(params) {
    return {
        type: ActionTypes.SET_GOALS_REQUEST,
        params: params,
    };
}
export function setGoalsSuccess(params) {
    return {
        type: ActionTypes.SET_GOALS_SUCCESS,
        params: params,
    };
}
export function setGoalsFailure(error) {
    return {
        type: ActionTypes.SET_GOALS_FAILURE,
        params: error,
    };
}

export function updateUserImage(params) {
    return {
        type: ActionTypes.USER_IMAGE_UPDATE_REQUEST,
        params: params,
    };
}
export function updateUserImageSuccess(params) {
    return {
        type: ActionTypes.USER_IMAGE_UPDATE_SUCCESS,
        params: params,
    };
}
export function updateUserImageFailure(error) {
    return {
        type: ActionTypes.USER_IMAGE_UPDATE_FAILURE,
        params: error,
    };
}
