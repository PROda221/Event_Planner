import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

function persistWraper(Reducer, blacklist, key) {
  const config = {
    key,
    storage: AsyncStorage,
    blacklist,
  };
  return persistReducer(config, Reducer);
}

export default persistWraper;
