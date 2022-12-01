import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const allMiddlewares = [sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...allMiddlewares));

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['App', 'Auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

sagas.forEach((saga) => sagaMiddleware.run(saga));

export default store;
