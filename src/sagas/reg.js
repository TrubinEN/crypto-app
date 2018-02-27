import { call, put, takeLatest } from "redux-saga/effects";
import {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} from "../actions/reg";
import { registration, setTokenApi } from "../lib/api";
import { setTokenToLocalStorage } from "../localStorage";

export function* fetchRegistrationSaga(action) {
  try {
    let { email = "", password = "" } = action.payload;

    if (email && password) {
      const result = yield call(registration, {
        email,
        password
      });

      const token = result.data.jwt;
      yield put(registrationSuccess());
      yield call(setTokenApi, token);
      yield call(setTokenToLocalStorage, token);
    } else {
      let errorMessage = {
        data: {
          message: {}
        }
      };
      if (!email) {
        errorMessage.data.message.email = ["can't be blank"];
      }
      if (!password) {
        errorMessage.data.message.password = ["can't be blank"];
      }
      throw errorMessage;
    }
  } catch (error) {
    const { email, password } = error.data.message;
    yield put(registrationFailure({ email, password }));
  }
}

export function* fetchRegistrationWatch() {
  yield takeLatest(registrationRequest, fetchRegistrationSaga);
}
