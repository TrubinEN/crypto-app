import { currency } from "../currency";
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from "../../actions/currency";
import { loginOut } from "../../actions/auth";

describe("Тест редьюсера currency", () => {
  // демо данные
  const selectE = "eth";
  const selectB = "btc";
  const offset = "8h";
  const state = {
    selected: "btc",
    offset: "4h",
    currBtc: 0,
    currEth: 0,
    btc: [],
    eth: [],
    isBtcLoading: false,
    isEthLoading: false
  };
  const error = new Error("Текст ошибки!");

  const selectOffsetTest = currency(undefined, {
    type: selectOffset.toString(),
    payload: offset
  });

  const btcRequest = currency(undefined, {
    type: fetchBtcRequest.toString()
  });

  const ethRequest = currency(undefined, {
    type: fetchEthRequest.toString()
  });

  const btcFaulure = currency(undefined, {
    type: fetchBtcFailure.toString()
  });

  const ethFailure = currency(undefined, {
    type: fetchEthFailure.toString()
  });

  const selectBtcTest = currency(undefined, {
    type: selectBtc.toString()
  });

  const selectEthTest = currency(undefined, {
    type: selectEth.toString()
  });

  // тестирование
  it("изменяют флаг isLoading", () => {
    expect(btcRequest.isBtcLoading).toBeTruthy();
    expect(ethRequest.isEthLoading).toBeTruthy();
    expect(btcFaulure.isBtcLoading).toBeFalsy();
    expect(ethFailure.isEthLoading).toBeFalsy();
  });

  it("изменяется значение offset, если приходит экшен selectOffset", () => {
    expect(selectOffsetTest.offset).toEqual(offset);
  });

  it("изменяется значение selected, если приходит экшен selectBtc или selectEth", () => {
    expect(selectBtcTest.selected).toEqual(selectB);
    expect(selectEthTest.selected).toEqual(selectE);
  });
});
