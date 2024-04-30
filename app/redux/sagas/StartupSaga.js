import { all, call, put, takeEvery, delay } from 'redux-saga/effects';
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import * as ApiConfig from '../services/Config';
import { CommonFetch } from '../services/ApiService';
import * as ActionTypes from '../actions/ActionTypes';
import { getStartupDataFailure, getStartupDataSuccess } from '../actions/startupActions';
import { startLoader, stopLoader } from '../actions/CommonActions';

const opts = {
  method: '',
  url: null,
  body: null,
  useAccessToken: true,
  shouldAddGetParams: true,
};

function* getStartupData(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_STARTUP;
    const startupResponse = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getStartupDataSuccess(startupResponse));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getStartupDataFailure(error?.message));
  }
}

function* watchGetRequest() {
  yield takeEvery(ActionTypes.GET_STARTUP_REQUEST, getStartupData);
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}

