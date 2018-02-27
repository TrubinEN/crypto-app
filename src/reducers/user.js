import { handleActions } from "redux-actions";
import {
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure
} from "../actions/user";

const defaultState = {
  info: null,
  isLoading: false,
  error: null
};

export const user = handleActions(
  {
    [getUserInfoRequest]: (state, action) => ({
      ...state,
      info: null,
      isLoading: true,
      error: null
    }),
    [getUserInfoSuccess]: (state, action) => ({
      ...state,
      info: action.payload,
      isLoading: false,
      error: null
    }),
    [getUserInfoFailure]: (state, action) => ({
      ...state,
      info: null,
      isLoading: false,
      error: action.payload
    })
  },
  defaultState
);

export const getUserInfo = state => state.user.info;
export const getUserIsLoading = state => state.user.isLoading;
export const getUserError = state => state.user.error;
