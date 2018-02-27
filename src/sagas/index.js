import { fork } from "redux-saga/effects";
import { fetchLoginWatch } from "./auth";
import { fetchRegistrationWatch } from "./reg";
import {
  fetchBtcWatch,
  fetchEthWatch,
  fetchWalletWatch,
  currencyWatch,
  fetchBuyWatch,
  fetchSellWatch
} from "./currency";
import { fetchUserWatch } from "./user";
import { fetchWalletSaga } from "./wallet";
import { fetchTransactionsWatch } from "./transaction";

export default function*() {
  yield fork(fetchLoginWatch);
  yield fork(fetchRegistrationWatch);
  yield fork(fetchUserWatch);
  yield fork(fetchWalletSaga);
  yield fork(fetchTransactionsWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(fetchWalletWatch);
  yield fork(currencyWatch);
  yield fork(fetchBuyWatch);
  yield fork(fetchSellWatch);
}
