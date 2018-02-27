import { createActions } from "redux-actions";

export const { loginRequest, loginFailure, loginSuccess, loginOut } = createActions(
  "LOGIN_REQUEST",
  "LOGIN_FAILURE",
  "LOGIN_SUCCESS",
  "LOGIN_OUT"
);
