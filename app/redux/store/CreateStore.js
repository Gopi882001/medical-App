import {applyMiddleware, compose} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [],
};

export default (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];
  const devMode = process.env.NODE_ENV === 'development';
  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  //enhancers.push(applyMiddleware(...middleware));

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: devMode,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middleware),
    preloadedState: {},
    //enhancers: compose(...enhancers),
  });
  const persistor = persistStore(store);

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return {store, persistor};
};