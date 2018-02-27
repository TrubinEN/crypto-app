import { transactions } from "../transactions";
import {
  transactionsFailure,
  transactionsRequest,
  transactionsSuccess
} from "../../actions/transaction";

describe("Тест редьюсера transactions", () => {
  // демо данные
  const records = [
    { id: 1, usd_delta: 870 },
    { id: 2, usd_delta: 871 },
    { id: 3, usd_delta: 872 }
  ];
  const state = {
    records: records,
    isLoading: false,
    error: null
  };
  const error = new Error("Текст ошибки!");

  const request = transactions(undefined, {
    type: transactionsRequest.toString()
  });

  const success = transactions(undefined, {
    type: transactionsSuccess.toString(),
    payload: records
  });

  const failure = transactions(undefined, {
    type: transactionsFailure.toString(),
    payload: error
  });

  // тестирование
  it("изменяют флаг isLoading", () => {
    expect(request.isLoading).toBeTruthy();
    expect(success.isLoading).toBeFalsy();
    expect(failure.isLoading).toBeFalsy();
  });

  it("очищают поле records, если приходит экшен transactionsRequest", () => {
    expect(request.records).toBeNull();
  });

  it("наполняют данными records, если приходит экшен transactionsSuccess", () => {
    expect(success.records).toEqual(records);
  });

  it("очищают поле error, если приходит экшен transactionsRequest ", () => {
    expect(request.error).toBeNull();
  });

  it("очищают поле error, если приходит экшен transactionsSuccess", () => {
    expect(success.error).toBeNull();
  });

  it("наполняют данными error, если приходит экшен transactionsFailure", () => {
    expect(failure.error).toEqual(error);
  });
});
