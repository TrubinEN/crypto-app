import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from "../../actions/wallet";
import { put, call } from "redux-saga/effects";
import { fetchUserWalletSaga } from "../wallet";
import { getWallet } from "../../lib/api";

describe("Сага wallet:", () => {
  it("срабатывает экшен fetchUserWalletSaga", () => {
    const saga = fetchUserWalletSaga();
    expect(saga.next().value).toEqual(put(fetchWalletRequest()));
  });

  it("срабатывает экшен fetchWalletSuccess", () => {
    const responce = { data: { result: { login: "testName" } } };
    const saga = fetchUserWalletSaga();
    saga.next();
    expect(saga.next().value).toEqual(call(getWallet));
    expect(saga.next(responce).value).toEqual(
      put(fetchWalletSuccess(responce.data.result))
    );
  });

  it("срабатывает экшен fetchWalletFailure", () => {
    const error = new Error("Бах, произошла ошибка!");
    const saga = fetchUserWalletSaga();
    saga.next();
    expect(saga.throw(error).value).toEqual(put(fetchWalletFailure(error)));
  });
});
