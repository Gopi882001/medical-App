import { all } from 'redux-saga/effects';
import postsSaga from './postsSaga';
import startupSaga from './StartupSaga';
import contactsSaga from './contactsSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([postsSaga(), startupSaga(), contactsSaga(), authSaga()]);
}
