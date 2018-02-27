import {
  transactionsFailure,
  transactionsRequest,
  transactionsSuccess
} from "../../actions/transaction";
import { put, call } from "redux-saga/effects";
import { fetchTransactionsSaga } from "../transaction";
import { getUserTransactions } from "../../lib/api";

describe("Сага transactions:", () => {
  it("срабатывает экшен fetchWalletRequest", () => {
    const saga = fetchTransactionsSaga();
    expect(saga.next().value).toEqual(put(transactionsRequest()));
  });

  it("срабатывает экшен transactionsSuccess", () => {
    const responce = { data: { result: { login: "testName" } } };
    const saga = fetchTransactionsSaga();
    saga.next();
    expect(saga.next().value).toEqual(call(getUserTransactions));
    expect(saga.next(responce).value).toEqual(
      put(transactionsSuccess(responce.data.result))
    );
  });

  it("срабатывает экшен transactionsFailure", () => {
    const error = new Error("Бах, произошла ошибка!");
    const saga = fetchTransactionsSaga();
    saga.next();
    expect(saga.throw(error).value).toEqual(put(transactionsFailure(error)));
  });
});
