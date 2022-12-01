import {
  loginEndpoint,
  forgotPassEndpoint,
  userInfoEndpoint,
  changePassEndpoint,
  logoutEndpoint,
} from '../constants/endpoint-constants';
import apiService from './axios-service';

export const userLoginApi = data => {
  return apiService.post(`${loginEndpoint}`, data);
};
export const forgotPassApi = loginId => {
  let queryParams = '';
  if (loginId) {
    queryParams = `?loginId=${loginId}`;
  }
  return apiService.get(`${forgotPassEndpoint}${queryParams}`);
};

export const userInfoApi = () => {
  return apiService.get(`${userInfoEndpoint}`);
};

export const changePassApi = (data, userId) => {
  return apiService.put(`/users/${userId}${changePassEndpoint}`, data);
};

export const logoutApi = () => {
  return apiService.put(`${logoutEndpoint}`);
};
