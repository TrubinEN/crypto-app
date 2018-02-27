import { auth } from "../auth";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginOut
} from "../../actions/auth";

describe("Тест редьюсера auth", () => {
  // демо данные
  const testState = {
    isAuthorized: null,
    loginError: null
  };
  const error = { payload: new Error("Текст ошибки!") };

  const request = auth(undefined, {
    type: loginRequest.toString()
  });

  const success = auth(undefined, {
    type: loginSuccess.toString()
  });

  const failure = auth(undefined, {
    type: loginFailure.toString(),
    payload: error
  });

  const logout = auth(undefined, {
    type: loginOut.toString()
  });

  // тестирование
  it("изменяют флаг isAuthorized", () => {
    expect(request.isAuthorized).toBeNull();
    expect(success.isAuthorized).toBeTruthy();
    expect(failure.isAuthorized).toBeNull();
    expect(logout.isAuthorized).toBeNull();
  });

  it("наполняют данными error, если приходит экшен getUserInfoFailure", () => {
    expect(failure.loginError).toEqual(error);
  });
});
