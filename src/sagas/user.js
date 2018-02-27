import { call, put, takeLatest } from "redux-saga/effects";
import {
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure
} from "../actions/user";
import { getUserInfo } from "../lib/api";

export function* fetchUserSaga(action) {
  try {
    const response = yield call(getUserInfo);
    yield put(getUserInfoSuccess(response.data.result));
  } catch (error) {
    yield put(getUserInfoFailure(error));
  }
}

export function* fetchUserWatch() {
  yield takeLatest(getUserInfoRequest, fetchUserSaga);
}
