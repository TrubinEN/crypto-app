import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure 
} from "../actions/wallet";
import { getWallet } from "../lib/api";
import { loginSuccess } from "../actions/auth";

export function* fetchUserWalletSaga(action) {  
  try {
   yield put(fetchWalletRequest());
    const response = yield call(getWallet);
    yield put(fetchWalletSuccess(response.data.result));
  } catch (error) {
    yield put(fetchWalletFailure(error));
  }
}

export function* fetchWalletSaga() {
  yield takeLatest([loginSuccess], fetchUserWalletSaga);
}
