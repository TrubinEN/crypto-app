import { take, call, put, select } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginOut
} from "../actions/auth";
import { login, setTokenApi, clearTokenApi } from "../lib/api";
import {
  setTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage
} from "../localStorage";
import { getIsAuthorized } from "../reducers/auth";

export function* fetchLoginWatch(action) {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token = localStorageToken ? localStorageToken : "";

    if (!isAuthorized) {
      if (token) {
        yield put(loginSuccess());
      } else {
        const responce = yield take(loginRequest);
        try {
          const { email, password } = responce.payload;
          const result = yield call(login, {
            email,
            password
          });
          token = result.data.jwt;
          yield put(loginSuccess());
        } catch (error) {
          yield put(loginFailure(error.data.message));
        }
      }
    }

    if (token) {
      yield call(setTokenApi, token);
      yield call(setTokenToLocalStorage, token);
      yield take(loginOut);
      yield call(clearTokenApi);
      yield call(removeTokenFromLocalStorage);
    }
  }
}
