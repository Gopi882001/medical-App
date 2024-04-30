import { all, call, put, takeEvery, delay, take } from 'redux-saga/effects';
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import * as ApiConfig from '../services/Config';
import { CommonFetch, uploadFile } from '../services/ApiService';
import * as ActionTypes from '../actions/ActionTypes';
import { loginWithMobileNumberSuccess, loginWithMobileNumberFailure, verifyOTPSuccess, verifyOTPFailure, resendOTPSuccess, resendOTPFailure, userProfileSuccess, userPorifleFailure, verifyNewEmailFailure, verifyNewEmailSuccess, verifyNewPhoneNumberSuccess, verifyNewPhoneNumberFailure, userLogoutFailure, userLogoutSuccess, toggleNotificationFailure, toggleNotificationSuccess, deleteUserAccountSuccess, deleteUserAccountFailure, setGoalsFailure, setGoalsSuccess, updateUserImageSuccess, updateUserImageFailure } from '../actions/authActions';
import { startLoader, stopLoader } from '../actions/CommonActions';

const opts = {
  method: '',
  url: null,
  body: null,
  useAccessToken: true,
  shouldAddGetParams: true,
};

function* loginWithMobileNumber(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_LOGIN_WITH_MOBILE_NBUMBER;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(loginWithMobileNumberSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(loginWithMobileNumberFailure(error?.message));
  }
}

function* verifyOTP(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_VERIFY_OTP;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(verifyOTPSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(verifyOTPFailure(error?.message));
  }
}

function* resendOTP(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_RESEND_OTP;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(resendOTPSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(resendOTPFailure(error?.message));
  }
}

function* userProfile(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_USER_PROFILE;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(userProfileSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(userPorifleFailure(error?.message));
  }
}

function* verifyEmail(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_VERIFY_NEW_EMAIL;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(verifyNewEmailSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(verifyNewEmailFailure(error?.message));
  }
}

function* verifyPhoneNumber(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_VERIFY_NEW_PHONE_NUMBER;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(verifyNewPhoneNumberSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(verifyNewPhoneNumberFailure(error?.message));
  }
}

function* userLogout(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_USER_LOGOUT;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(userLogoutSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(userLogoutFailure(error?.message));
  }
}

function* toggleNotification(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_TOGGLE_NOTIFICATION;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(toggleNotificationSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(toggleNotificationFailure(error?.message));
  }
}

function* deleteUserAccount(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.DELETE_API;
    opts.url = ApiConfig.API_DELETE_ACCOUNT;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(deleteUserAccountSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(deleteUserAccountFailure(error?.message));
  }
}

function* setGoals(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.PUT_API;
    opts.url = ApiConfig.API_SET_GOALS;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(setGoalsSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(setGoalsFailure(error?.message));
  }
}

function* updateUserImage(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_UPDATE_USER_IMAGE;
    opts.useAccessToken = true;
    const response = yield call(uploadFile, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(updateUserImageSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(updateUserImageFailure(error?.message));
  }
}

function* watchGetRequest() {
  yield takeEvery(ActionTypes.LOGIN_WITH_MOBILE_NUMBER_REQUEST, loginWithMobileNumber);
  yield takeEvery(ActionTypes.VERIFY_OTP_REQUEST, verifyOTP);
  yield takeEvery(ActionTypes.RESEND_OTP_REQUEST, resendOTP);
  yield takeEvery(ActionTypes.USER_PROFILE_REQUEST, userProfile);
  yield takeEvery(ActionTypes.VERIFY_NEW_EMAIL_OTP_REQUEST, verifyEmail);
  yield takeEvery(ActionTypes.VERIFY_NEW_PHONE_OTP_REQUEST, verifyPhoneNumber);
  yield takeEvery(ActionTypes.USER_LOGOUT_REQUEST, userLogout);
  yield takeEvery(ActionTypes.TOGGLE_NOTIFICATION_REQUEST, toggleNotification);
  yield takeEvery(ActionTypes.DELETE_USER_ACCOUNT_REQUEST, deleteUserAccount);
  yield takeEvery(ActionTypes.SET_GOALS_REQUEST, setGoals);
  yield takeEvery(ActionTypes.USER_IMAGE_UPDATE_REQUEST, updateUserImage)
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}

