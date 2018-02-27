import { getUserInfoSuccess, getUserInfoFailure } from "../../actions/user";
import { put, call } from "redux-saga/effects";
import { fetchUserSaga } from "../user";
import { getUserInfo } from "../../lib/api";

describe("Сага wallet:", () => {
  it("срабатывает экшен getUserInfoSuccess", () => {
    const responce = { data: { result: { login: "testName" } } };
    const saga = fetchUserSaga();
    expect(saga.next().value).toEqual(call(getUserInfo));
    expect(saga.next(responce).value).toEqual(
      put(getUserInfoSuccess(responce.data.result))
    );
  });

  it("срабатывает экшен getUserInfoFailure", () => {
    const error = new Error("Бах, произошла ошибка!");
    const saga = fetchUserSaga();
    saga.next();
    expect(saga.throw(error).value).toEqual(put(getUserInfoFailure(error)));
  });
});
