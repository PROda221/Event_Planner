export default {
  USER_LOGIN: {
    START: "auth.user_login:start",
    SUCCESS: "auth.user_login:success",
    FAIL: "auth.user_login:fail",
  },

  FORGOT_PASSWORD: {
    START: "auth.forgot_password:start",
    SUCCESS: "auth.forgot_password:success",
    FAIL: "auth.forgot_password:fail",
  },

  GET_USERINFO: {
    START: "auth.get_userinfo:start",
    SUCCESS: "auth.get_userinfo:success",
    FAIL: "auth.get_userinfo:fail",
  },

  CHANGE_PASSWORD: {
    START: "auth.change_password:start",
    SUCCESS: "auth.change_password:success",
    FAIL: "auth.change_password:fail",
  },

  IS_LOGGED_IN: 'auth.is_logged_in.reducer',

  USER_ROLE: 'auth.user_role.reducer',

  RESET_AUTH_REDUCER: 'auth.reset.auth.reducer',
};
