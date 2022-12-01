import authActions from "../constants/action-types/auth.actionTypes";
import commonActions from "../constants/action-types/common";
import * as authApi from "../api/auth.api";

export const loginUser = (data) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: authActions.USER_LOGIN,
  promise: () => authApi.userLoginApi(data),
});

export const forgotPass = (loginId) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: authActions.FORGOT_PASSWORD,
  promise: () => authApi.forgotPassApi(loginId),
});

export const getUserInfo = () => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: authActions.GET_USERINFO,
  promise: () => authApi.userInfoApi(),
});

export const changePass = (data, userId) => ({
  type: commonActions.COMMON_API_CALL,
  subtypes: authActions.CHANGE_PASSWORD,
  promise: () => authApi.changePassApi(data, userId),
});

export const validateUser = (data) => ({
  type: authActions.IS_LOGGED_IN,
  payload: data,
});

export const setUserRole = (data) => ({
  type: authActions.USER_ROLE,
  payload: data,
});

export const resetAuthReducer = () => ({
  type: authActions.RESET_AUTH_REDUCER,
  promise: () => authApi.logoutApi(),
  });
  