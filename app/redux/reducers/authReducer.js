import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
  loginData: null,
  loginError: null,
  verifyOTPData: null,
  verifyOTPError: null,
  resendOTPData: null,
  resendOTPError: null,
  userProfileData: null,
  userProfileError: null,
  verifyEmailData: null,
  verifyEmailError: null,
  verifyPhoneData: null,
  verifyPhoneError: null,
  logOutData: null,
  logOutError: null,
  toggleNotificationData: null,
  toggleNotificationError: null,
  deleteAccountData: null,
  deleteAccountError: null,
  setGoalsData: null,
  setGoalsError: null,
  updateUserImageData: null,
  updateUserImageError: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_WITH_MOBILE_NUMBER_REQUEST:
      return {
        ...state,
        loginData: null,
        loginError: null,
      };
    case ActionTypes.LOGIN_WITH_MOBILE_NUMBER_SUCCESS:
      return {
        ...state,
        loginData: action.params,
        loginError: null,
      };
    case ActionTypes.LOGIN_WITH_MOBILE_NUMBER_FAILURE:
      return {
        ...state,
        loginData: null,
        loginError: JSON.parse(action.params),
      };

    case ActionTypes.VERIFY_OTP_REQUEST:
      return {
        ...state,
        verifyOTPData: null,
        verifyOTPError: null,
      };
    case ActionTypes.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOTPData: action.params,
        verifyOTPError: null,
      };
    case ActionTypes.VERIFY_OTP_FAILURE:
      return {
        ...state,
        verifyOTPData: null,
        verifyOTPError: JSON.parse(action.params),
      };

    case ActionTypes.RESEND_OTP_REQUEST:
      return {
        ...state,
        resendOTPData: null,
        resendOTPError: null,
      };
    case ActionTypes.RESEND_OTP_SUCCESS:
      return {
        ...state,
        resendOTPData: action.params,
        resendOTPError: null,
      };
    case ActionTypes.RESEND_OTP_FAILURE:
      return {
        ...state,
        resendOTPData: null,
        resendOTPError: JSON.parse(action.params),
      };

    case ActionTypes.USER_PROFILE_REQUEST:
      return {
        ...state,
        userProfileData: null,
        userProfileError: null,
      };
    case ActionTypes.USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileData: action.params,
        userProfileError: null,
      };
    case ActionTypes.USER_PROFILE_FAILURE:
      return {
        ...state,
        userProfileData: null,
        userProfileError: JSON.parse(action.params),
      };

    case ActionTypes.VERIFY_NEW_EMAIL_OTP_REQUEST:
      return {
        ...state,
        verifyEmailData: null,
        verifyEmailError: null,
      };
    case ActionTypes.VERIFY_NEW_EMAIL_OTP_SUCCESS:
      return {
        ...state,
        verifyEmailData: action.params,
        verifyEmailError: null,
      };
    case ActionTypes.VERIFY_NEW_EMAIL_OTP_FAILURE:
      return {
        ...state,
        verifyEmailData: null,
        verifyEmailError: JSON.parse(action.params),
      };

    case ActionTypes.VERIFY_NEW_PHONE_OTP_REQUEST:
      return {
        ...state,
        verifyPhoneData: null,
        verifyPhoneError: null,
      };
    case ActionTypes.VERIFY_NEW_PHONE_OTP_SUCCESS:
      return {
        ...state,
        verifyPhoneData: action.params,
        verifyPhoneError: null,
      };
    case ActionTypes.VERIFY_NEW_PHONE_OTP_FAILURE:
      return {
        ...state,
        verifyPhoneData: null,
        verifyPhoneError: JSON.parse(action.params),
      };

    case ActionTypes.USER_LOGOUT_REQUEST:
      return {
        ...state,
        logOutData: null,
        logOutError: null,
      };
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        logOutData: action.params,
        logOutError: null,
      };
    case ActionTypes.USER_LOGOUT_FAILURE:
      return {
        ...state,
        logOutData: null,
        logOutError: JSON.parse(action.params),
      }

    case ActionTypes.TOGGLE_NOTIFICATION_REQUEST:
      return {
        ...state,
        toggleNotificationData: null,
        toggleNotificationError: null,
      };
    case ActionTypes.TOGGLE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        toggleNotificationData: action.params,
        toggleNotificationError: null,
      };
    case ActionTypes.TOGGLE_NOTIFICATION_FAILURE:
      return {
        ...state,
        toggleNotificationData: null,
        toggleNotificationError: JSON.parse(action.params),
      };

    case ActionTypes.DELETE_USER_ACCOUNT_REQUEST:
      return {
        ...state,
        deleteAccountData: null,
        deleteAccountError: null,
      };
    case ActionTypes.DELETE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteAccountData: action.params,
        deleteAccountError: null,
      };
    case ActionTypes.DELETE_USER_ACCOUNT_FAILURE:
      return {
        ...state,
        deleteAccountData: null,
        deleteAccountError: JSON.parse(action.params),
      };

    case ActionTypes.SET_GOALS_REQUEST:
      return {
        ...state,
        setGoalsData: null,
        setGoalsError: null,
      };
    case ActionTypes.SET_GOALS_SUCCESS:
      return {
        ...state,
        setGoalsData: action.params,
        setGoalsError: null,
      };
    case ActionTypes.SET_GOALS_FAILURE:
      return {
        ...state,
        setGoalsData: null,
        setGoalsError: JSON.parse(action.params),
      };

    case ActionTypes.USER_IMAGE_UPDATE_REQUEST:
      return {
        ...state,
        updateUserImageData: null,
        updateUserImageError: null,
      };
    case ActionTypes.USER_IMAGE_UPDATE_SUCCESS:
      return {
        ...state,
        updateUserImageData: action.params,
        updateUserImageError: null,
      };
    case ActionTypes.USER_IMAGE_UPDATE_FAILURE:
      return {
        ...state,
        updateUserImageData: null,
        updateUserImageError: JSON.parse(action.params),
      };

    default:
      return {
        ...state,
      };
  }
}

export default authReducer;
