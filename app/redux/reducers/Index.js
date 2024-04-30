import { combineReducers } from "redux";
import postsReducer from './postsReducer';
import startupReducer from './startupReducer';
import createStore from '../store/CreateStore';
import rootSaga from '../sagas/RootSaga';
import contactsReducer from './contactsReducer';
import authReducer from './authReducer';

export default () => {
    const rootReducer = combineReducers({
      postsReducer,
      startupReducer,
      contactsReducer,
      authReducer,
    });
  
    return createStore(rootReducer, rootSaga);
  };