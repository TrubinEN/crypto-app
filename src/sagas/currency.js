import {
  takeLatest,
  fork,
  take,
  select,
  put,
  cancel,
  call
} from "redux-saga/effects";
import { delay } from "redux-saga";
import { loginSuccess, loginOut } from "../actions/auth";
import { getOffset } from "../reducers/currency";
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure
} from "../actions/currency";
import { candles, getWallet, buyCurrency, sellCurrency } from "../lib/api";
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from "../actions/wallet";
import { changeLocation } from "../actions/location";
//import {transactionsRequest} from "../actions/transaction";

function* fetchBtcFlow(action) {
  try {
    const response = yield call(candles, "btc", action.payload);
    yield put(fetchBtcSuccess(response.data.result));
  } catch (error) {
    yield put(fetchBtcFailure(error));
  }
}

function* fetchEthFlow(action) {
  try {
    const response = yield call(candles, "eth", action.payload);
    yield put(fetchEthSuccess(response.data.result));
  } catch (error) {
    yield put(fetchEthFailure(error));
  }
}

function* loginCurrencyFlow() {
  while (true) {
    const offset = yield select(getOffset);
    yield put(fetchBtcRequest(offset));
    yield put(fetchEthRequest(offset));

    yield delay(15000);
  }
}

export function* currencyWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([
      loginSuccess,
      loginOut,
      selectBtc,
      selectEth,
      selectOffset,
      changeLocation
    ]);

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== loginOut.toString())
      currencyTask = yield fork(loginCurrencyFlow);
  }
}

function* fetchWalletFlow() {
  try {
    const response = yield call(getWallet);
    yield put(fetchWalletSuccess(response.data.result));
  } catch (error) {
    yield put(fetchWalletFailure(error));
  }
}

function* fetchBuySaga(action) {
  try {
    const response = yield call(
      buyCurrency,
      action.payload.selectedCurrency,
      action.payload.value
    );

    yield put(buyCurrencySuccess(response.data));
  } catch (error) {
    console.log("buy Error: ", error);
    yield put(buyCurrencyFailure(error));
  }
}

function* fetchSellSaga(action) {
  try {
    const response = yield call(
      sellCurrency,
      action.payload.selectedCurrency,
      action.payload.value
    );

    yield put(sellCurrencySuccess(response.data));
  } catch (error) {
    yield put(sellCurrencyFailure(error));
  }
}

export function* fetchWalletWatch() {
  yield takeLatest(fetchWalletRequest, fetchWalletFlow);
}

export function* fetchBtcWatch() {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch() {
  yield takeLatest(fetchEthRequest, fetchEthFlow);
}

export function* fetchBuyWatch() {
  yield takeLatest(buyCurrencyRequest, fetchBuySaga);
}

export function* fetchSellWatch() {
  yield takeLatest(sellCurrencyRequest, fetchSellSaga);
}
