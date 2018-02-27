import { handleActions } from "redux-actions";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginOut
} from "../actions/auth";
import { registrationSuccess } from "../actions/reg";

const defaultState = {
  isAuthorized: null,
  loginError: null
};

export const auth = handleActions(
  {
    [loginRequest]: (state, action) => ({
      ...state,
      isAuthorized: null,
      loginError: null
    }),
    [loginSuccess]: (state, action) => ({
      ...state,
      isAuthorized: true,
      loginError: null
    }),
    [loginFailure]: (state, action) => ({
      ...state,
      isAuthorized: null,
      loginError: action.payload
    }),
    [registrationSuccess]: (state, action) => ({
      ...state,
      isAuthorized: true,
      loginError: null
    }),
    [loginOut]: (state, action) => ({
      ...state,
      ...defaultState
    })
  },
  defaultState
);

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getloginError = state => state.auth.loginError;
