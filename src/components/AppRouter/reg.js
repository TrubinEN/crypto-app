import { call, put, takeLatest } from "redux-saga/effects";
import {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} from "../actions/reg";
import { registration } from "../lib/api";

export function* fetchRegistrationSaga(action) {
  try {
    const result = yield call(
      registration,
      action.payload.email,
      action.payload.password
    );
    yield put(registrationSuccess());
  } catch (error) {
    yield put(registrationFailure(error));
  }
}

export function* fetchLoginWatch() {
  yield takeLatest(registrationRequest, fetchRegistrationSaga);
}
