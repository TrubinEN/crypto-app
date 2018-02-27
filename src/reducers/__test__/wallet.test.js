import { wallet } from "../wallet";
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from "../../actions/wallet";

import {
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencySuccess,
  buyCurrencyFailure
} from "../../actions/currency";

describe("Тест редьюсера wallet", () => {
  // демо данные
  const error = new Error("Текст ошибки!");
  const coins = {
    usd: 1,
    btc: 2,
    eth: 3
  };
  const state = {
    coins: coins,
    isLoading: false,
    error: null
  };

  const request = wallet(undefined, {
    type: fetchWalletRequest.toString()
  });

  const success = wallet(undefined, {
    type: fetchWalletSuccess.toString(),
    payload: coins
  });

  const failure = wallet(undefined, {
    type: fetchWalletFailure.toString(),
    payload: error
  });

  const sellSuccess = wallet(undefined, {
    type: sellCurrencySuccess.toString(),
    payload: coins
  });
  const sellFailure = wallet(undefined, {
    type: sellCurrencyFailure.toString(),
    payload: error
  });

  const buySuccess = wallet(undefined, {
    type: buyCurrencySuccess.toString(),
    payload: coins
  });
  const buyFailure = wallet(undefined, {
    type: buyCurrencyFailure.toString(),
    payload: error
  });

  // тестирование
  it("изменяют флаг isLoading", () => {
    expect(request.isLoading).toBeTruthy();
    expect(success.isLoading).toBeFalsy();
    expect(failure.isLoading).toBeFalsy();
  });

  it("очищают поле coins, если приходит экшен fetchWalletRequest", () => {
    expect(request.coins).toBeNull();
  });

  it("наполняют данными coins, если приходит экшен fetchWalletSuccess", () => {
    expect(success.coins).toEqual(coins);
  });

  it("очищают поле error, если приходит экшен fetchWalletFailure", () => {
    expect(request.error).toBeNull();
  });

  it("очищают поле error, если приходит экшен fetchWalletSuccess", () => {
    expect(success.error).toBeNull();
  });

  it("наполняют данными error, если приходит экшен fetchWalletFailure", () => {
    expect(failure.error).toEqual(error);
  });

  it("наполняют данными error, если приходит экшен sellCurrencyFailure или buyCurrencyFailure", () => {
    expect(sellFailure.error).toEqual(error);
    expect(buyFailure.error).toEqual(error);
  });

  it("наполняют данными coins, если приходит экшен buyCurrencySuccess или sellCurrencySuccess", () => {
    expect(buySuccess.coins).toEqual(coins);
    expect(buySuccess.coins).toEqual(coins);
  });
});
