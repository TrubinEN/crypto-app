import { user } from "../user";
import {
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure
} from "../../actions/user";

describe("Тест редьюсера user", () => {
  // демо данные
  const info = {
    id: 123,
    email: "mail@mail.ru"
  };
  const error = new Error("Текст ошибки!");

  const request = user(undefined, {
    type: getUserInfoRequest.toString()
  });

  const success = user(undefined, {
    type: getUserInfoSuccess.toString(),
    payload: info
  });

  const failure = user(undefined, {
    type: getUserInfoFailure.toString(),
    payload: error
  });

  // тестирование
  it("изменяют флаг isLoading", () => {
    expect(request.isLoading).toBeTruthy();
    expect(success.isLoading).toBeFalsy();
    expect(failure.isLoading).toBeFalsy();
  });

  it("очищают поле info, если приходит экшен getUserInfoRequest", () => {
    expect(request.info).toBeNull();
  });

  it("наполняют данными info, если приходит экшен getUserInfoSuccess", () => {
    expect(success.info).toEqual(info);
  });

  it("очищают поле error, если приходит экшен getUserInfoRequest ", () => {
    expect(request.error).toBeNull();
  });

  it("очищают поле error, если приходит экшен getUserInfoSuccess", () => {
    expect(success.error).toBeNull();
  });

  it("наполняют данными error, если приходит экшен getUserInfoFailure", () => {
    expect(failure.error).toEqual(error);
  });
});
