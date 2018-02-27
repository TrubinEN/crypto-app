import { createActions } from "redux-actions";

export const {
    getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure
} = createActions(
  "GET_USER_INFO_REQUEST",
  "GET_USER_INFO_SUCCESS",
  "GET_USER_INFO_FAILURE"
);

