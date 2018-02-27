import { createActions } from "redux-actions";

export const {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchEthSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  selectOffset,
  sellCurrencyRequest,
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  buyCurrencyFailure
} = createActions(
  "SELECT_BTC",
  "SELECT_ETH",
  "FETCH_BTC_REQUEST",
  "FETCH_ETH_REQUEST",
  "FETCH_BTC_SUCCESS",
  "FETCH_ETH_SUCCESS",
  "FETCH_BTC_FAILURE",
  "FETCH_ETH_FAILURE",
  "SELECT_OFFSET",
  "SELL_CURRENCY_REQUEST",
  "SELL_CURRENCY_SUCCESS",
  "SELL_CURRENCY_FAILURE",
  "BUY_CURRENCY_REQUEST",
  "BUY_CURRENCY_SUCCESS",
  "BUY_CURRENCY_FAILURE",
);