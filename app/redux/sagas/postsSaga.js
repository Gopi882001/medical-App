import { all, call, put, takeEvery, delay, take } from 'redux-saga/effects';
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../utils/AppConfig';
import * as ApiConfig from '../services/Config';
import { CommonFetch } from '../services/ApiService';
import * as ActionTypes from '../actions/ActionTypes';
import {
  getPostFailure,
  getPostSuccess,
  getPostOfTheWeekSuccess,
  getPostOfTheWeekFailure,
  getTopScrollableSuccess,
  getTopScrollableFailure,
  myPostsSuccess,
  myPostsFailure,
  removePostSuccess,
  removePostFailure,
  myRequestedArticlesSuccess,
  myRequestedArticlesFailure,
  submitPostSuccess,
  submitpostFailure,
  addNewPostSuccess,
  addNewPostFailure,
  allRequestedArticlesFailure,
  allRequestedArticlesSuccess,
  updatePostSuccess,
  updatePostFailure,
  postCategoriesSuccess,
  postCategoriesFailure,
  myPickedArticlesSuccess,
  myPickedArticlesFailure,
  requestArticleSuccess,
  requestArticleFailure,
  updateRequestArticleSuccess,
  updateRequestArticleFailure,
  getPostsCountSuccess,
  getPostsCountFailure,
  getAllPostsByArticleSuccess,
  getAllPostsByArticleFailure,
} from '../actions/PostActions';
import { startLoader, stopLoader } from '../actions/CommonActions';

const opts = {
  method: '',
  url: null,
  body: null,
  useAccessToken: true,
  shouldAddGetParams: true,
};

export const getUserData = (state) => state.postsReducer;

function* getAllPosts(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_ALL_POSTS;
    opts.useAccessToken = true;
    const postResponse = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getPostSuccess(postResponse));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getPostFailure(error?.message));
    yield put(stopLoader());
  }
}

function* getPostOfTheWeek(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_POST_OF_THE_WEEK;
    opts.useAccessToken = true;
    const callResponse = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getPostOfTheWeekSuccess(callResponse));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getPostOfTheWeekFailure(error?.message));
    yield put(stopLoader());
  }
}

function* getTopScrollablePosts(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_POST_SCROLLABLE;
    opts.useAccessToken = true;
    const callResponse = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getTopScrollableSuccess(callResponse));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getTopScrollableFailure(error?.message));
    yield put(stopLoader());
  }
}

function* myPosts(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_MY_POSTS;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    console.log("Response -> ", response);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(myPostsSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(myPostsFailure(error?.message));
    yield put(stopLoader());
  }
}

function* removePost(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_REMOVE_POST;
    opts.useAccessToken = true;
    const Response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(removePostSuccess(Response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(removePostFailure(error?.message));
    yield put(stopLoader());
  }
}

function* myRequestedArticles(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_MY_REQUESTED_ARTICLES;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(myRequestedArticlesSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(myRequestedArticlesFailure(error?.message));
    yield put(stopLoader());
  }
}

function* submitPost(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_SUBMIT_POST;
    opts.useAccessToken = true;
    const Response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(submitPostSuccess(Response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(submitpostFailure(error?.message));
    yield put(stopLoader());
  }
}

function* addNewPost(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_ADD_NEW_POST;
    opts.useAccessToken = true;
    const Response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(addNewPostSuccess(Response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(addNewPostFailure(error?.message));
    yield put(stopLoader());
  }
}

function* updatePost(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_UPDATE_POST;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(500);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(updatePostSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(updatePostFailure(error?.message));
    yield put(stopLoader());
  }
}

function* allRequestedArticles(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_ALL_REQUESTED_ARTICLES;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(50);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(allRequestedArticlesSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(allRequestedArticlesFailure(error?.message));
    yield put(stopLoader());
  }
}

function* postCategories(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_POST_CATEGORIES;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(50);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(postCategoriesSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(postCategoriesFailure(error?.message));
    yield put(stopLoader());
  }
}

function* getMyPickedArticles(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_MY_PICKED_ARTICLES;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(50);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(myPickedArticlesSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(myPickedArticlesFailure(error?.message));
    yield put(stopLoader());
  }
}

function* requestArticle(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_REQUEST_ARTICLE;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(50);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(requestArticleSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(requestArticleFailure(error?.message));
    yield put(stopLoader());
  }
}

function* updateRequestArticle(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_UPDATE_REQUEST_ARTICLE;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(50);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(updateRequestArticleSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(updateRequestArticleFailure(error?.message));
    yield put(stopLoader());
  }
}

function* getPostsCount(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_POSTS_COUNT;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(50);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getPostsCountSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getPostsCountFailure(error?.message));
    yield put(stopLoader());
  }
}

function* getPostsByArticleId(action) {
  try {
    yield put(startLoader());
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.STARTED);
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_POSTS_BY_REQUESTED_ID;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.params, opts);
    yield delay(50);
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getAllPostsByArticleSuccess(response));
    yield put(stopLoader());
  } catch (error) {
    AppConfig.updateLoadingStatus(AppConfig.LOADING_STATE.COMPLETED);
    yield put(getAllPostsByArticleFailure(error?.message));
    yield put(stopLoader());
  }
}

function* watchGetRequest() {
  yield takeEvery(ActionTypes.GET_POST_REQUEST, getAllPosts);
  yield takeEvery(ActionTypes.GET_POST_OF_THE_WEEK_REQUEST, getPostOfTheWeek);
  yield takeEvery(ActionTypes.GET_TOP_SCROLLABLE_REQUEST, getTopScrollablePosts);
  yield takeEvery(ActionTypes.MY_POSTS_REQUEST, myPosts);
  yield takeEvery(ActionTypes.REMOVE_POST_REQUEST, removePost);
  yield takeEvery(ActionTypes.MY_REQUESTED_ARTICLES_REQUEST, myRequestedArticles);
  yield takeEvery(ActionTypes.SUBMIT_POST_REQUEST, submitPost);
  yield takeEvery(ActionTypes.ADD_NEW_POST_REQUEST, addNewPost);
  yield takeEvery(ActionTypes.UPDATE_POST_REQUEST, updatePost);
  yield takeEvery(ActionTypes.ALL_REQUESTED_ARTICLES_REQUEST, allRequestedArticles);
  yield takeEvery(ActionTypes.POST_CATEGORIES_REQUEST, postCategories);
  yield takeEvery(ActionTypes.MY_PICKED_ARTICLES_REQUEST, getMyPickedArticles);
  yield takeEvery(ActionTypes.REQUEST_ARTICLE_REQUEST, requestArticle);
  yield takeEvery(ActionTypes.UPDATE_REQUEST_ARTICLE_REQUEST, updateRequestArticle);
  yield takeEvery(ActionTypes.POST_COUNT_REQUEST, getPostsCount);
  yield takeEvery(ActionTypes.POST_BY_REQUESTED_ARTICLE_REQUEST, getPostsByArticleId);
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}
