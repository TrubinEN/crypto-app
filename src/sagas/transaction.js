import { call, put, takeLatest } from "redux-saga/effects";
import {
  transactionsFailure,
  transactionsRequest,
  transactionsSuccess
} from "../actions/transaction";
import { sellCurrencySuccess, buyCurrencySuccess } from "../actions/currency";
import { fetchWalletRequest } from "../actions/wallet";
import { getUserTransactions } from "../lib/api";

export function* fetchTransactionsSaga() {
  try {
    yield put(transactionsRequest());
    const response = yield call(getUserTransactions);
    yield put(transactionsSuccess(response.data.result));
  } catch (error) {
    yield put(transactionsFailure(error));
  }
}

export function* fetchTransactionsWatch() {
  yield takeLatest(
    [fetchWalletRequest, sellCurrencySuccess, buyCurrencySuccess],
    fetchTransactionsSaga
  );
}
