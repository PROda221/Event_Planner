import { takeEvery, call, put } from 'redux-saga/effects'
import _ from 'lodash'
// import { clearAsyncStorage } from "../../utils/asyncStorage";
import authActions from '../constants/action-types/auth.actionTypes'

import CommonActions from '../constants/action-types/common'

function* handleApiCall(action) {
  const { promise, onSuccessCallback, placeholderData } = action
  const { START, SUCCESS, FAIL } = action.subtypes

  yield put({ type: START, data: action.data })

  try {
    const response = yield call(promise)
    const result = yield response.data
    yield put({
      type: SUCCESS,
      payload: placeholderData || result,
      data: action.data,
    })

    if (onSuccessCallback && _.isFunction(onSuccessCallback)) {
      yield call(onSuccessCallback)
    }
  } catch (errors) {
    if (
      (errors.response &&
        errors.response.data &&
        errors.response.data.apierror &&
        errors.response.data.apierror.status &&
        errors.response.data.apierror.status === 'UNAUTHORIZED' &&
        errors.response.data.apierror.debugMessage &&
        errors.response.data.apierror.debugMessage.includes(
          'Invalid access token',
        )) ||
      (errors.response &&
        errors.response.data &&
        errors.response.data.apierror &&
        errors.response.data.apierror.message &&
        errors.response.data.apierror.message.includes('Invalid Token'))
    ) {
      yield put({
        type: authActions.RESET_AUTH_REDUCER,
      })
      // clearAsyncStorage();
    }
    yield put({ type: FAIL, errors, data: action.data })
  }
}

export default function* () {
  yield takeEvery(CommonActions.COMMON_API_CALL, handleApiCall)
}
