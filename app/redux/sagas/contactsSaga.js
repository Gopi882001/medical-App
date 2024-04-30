import { all, call, put, takeEvery, delay } from 'redux-saga/effects';
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import * as ApiConfig from '../services/Config';
import { CommonFetch } from '../services/ApiService';
import * as ActionTypes from '../actions/ActionTypes';
import { startLoader, stopLoader } from '../actions/CommonActions';
import { getCategoriesFailure, getCategoriesSuccess, getContactsOfCategoriesFailure, getContactsOfCategoriesSuccesss, getEntitiesFailure, getEntitiesSuccess } from '../actions/contactsActions';

const opts = {
  method: '',
  url: null,
  body: null,
  useAccessToken: true,
  shouldAddGetParams: true,
};

function* getEntities(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader());
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_ENTITIES;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getEntitiesSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getEntitiesFailure(error?.message));
  }
}

function* getCategories(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_CATEGORIES;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getCategoriesSuccess(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getCategoriesFailure(error?.message));
  }
}

function* getContactsOfCategories(action) {
  try {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    yield put(startLoader);
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_CONTACTS_OF_CATEGORIES;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getContactsOfCategoriesSuccesss(response));
  } catch (error) {
    yield put(stopLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getContactsOfCategoriesFailure(error?.message));
  }
}

function* watchGetRequest() {
  yield takeEvery(ActionTypes.GET_ENTITIES_REQUEST, getEntities);
  yield takeEvery(ActionTypes.GET_CATEGORIES_REQUEST, getCategories);
  yield takeEvery(ActionTypes.GET_CONTACTS_OF_CATEGORIES_REQUEST, getContactsOfCategories);
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}
