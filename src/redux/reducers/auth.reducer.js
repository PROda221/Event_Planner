import authActions from '../constants/action-types/auth.actionTypes'
import persistWraper from './persistWraper'
import _ from 'lodash'

const initialState = {
  userLoginLoading: false,
  userLoginSuccess: null,
  userLoginFail: false,
  userLoginFailMessage: '',

  forgotPassLoading: false,
  forgotPassSuccess: null,
  forgotPassFail: false,

  userinfoLoading: false,
  userInfoSuccess: null,
  userInfoFail: false,

  changePassLoading: false,
  changePassSuccess: null,
  changePassFail: false,
  changePassFailError: null,

  isLoggedIn: null,
  userRole: null,
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.USER_LOGIN.START:
      return {
        ...state,
        userLoginLoading: true,
        userLoginSuccess: null,
        userLoginFail: false,
      }
    case authActions.USER_LOGIN.SUCCESS:
      return {
        ...state,
        userLoginLoading: false,
        userLoginSuccess: action.payload,
      }
    case authActions.USER_LOGIN.FAIL:
      console.log('fail,', action)
      return {
        ...state,
        userLoginFail: !state.userLoginFail,
        userLoginLoading: false,
        userLoginFailMessage:
          action &&
          action.errors &&
          action.errors.response &&
          action.errors.response.data &&
          action.errors.response.data.apierror &&
          action.errors.response.data.apierror.message
            ? action.errors.response.data.apierror.message
            : '',
      }

    case authActions.FORGOT_PASSWORD.START:
      return {
        ...state,
        forgotPassLoading: true,
        forgotPassSuccess: null,
        forgotPassFail: false,
      }
    case authActions.FORGOT_PASSWORD.SUCCESS:
      return {
        ...state,
        forgotPassLoading: false,
        forgotPassSuccess: action.payload,
      }
    case authActions.FORGOT_PASSWORD.FAIL:
      return {
        ...state,
        forgotPassFail: !state.forgotPassFail,
        forgotPassLoading: false,
      }

    case authActions.GET_USERINFO.START:
      return {
        ...state,
        userinfoLoading: true,
        userInfoSuccess: null,
        userInfoFail: false,
      }
    case authActions.GET_USERINFO.SUCCESS:
      let vendorId = 1
      return {
        ...state,
        userinfoLoading: false,
        userInfoSuccess: {
          ...action.payload,
          vendorId: vendorId,
          verifyOtpMode: 'self',
        },
      }
    case authActions.GET_USERINFO.FAIL:
      return {
        ...state,
        userInfoFail: !state.userInfoFail,
        userinfoLoading: false,
        userInfoSuccess: null,
        userLoginSuccess: null,
      }

    case authActions.CHANGE_PASSWORD.START:
      return {
        ...state,
        changePassLoading: true,
        changePassSuccess: null,
        changePassFail: false,
      }
    case authActions.CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        changePassLoading: false,
        changePassSuccess: action.payload,
      }
    case authActions.CHANGE_PASSWORD.FAIL:
      return {
        ...state,
        changePassFail: !state.changePassFail,
        changePassLoading: false,
        changePassFailError:
          action &&
          action.errors &&
          action.errors.response &&
          action.errors.response.data,
      }

    case authActions.IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload }

    case authActions.USER_ROLE:
      return { ...state, userRole: action.payload }

    case authActions.RESET_AUTH_REDUCER:
      return { ...initialState }

    default:
      return state
  }
}

const blackList = _.without(
  Object.keys(initialState),
  // Persist all the keys listed below
  'userInfoSuccess',
  'isLoggedIn',
  'userRole',
)

export default persistWraper(AuthReducer, blackList, 'Auth')
