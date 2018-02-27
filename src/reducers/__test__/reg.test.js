import { registration } from "../reg";
import {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} from "../../actions/reg";

describe("Тест редьюсера reg", () => {
  // демо данные
  const state = {
    registationError: null
  };
  const error = { email: ["Текст ошибки!"], password: ["Текст ошибки!"] };

  const request = registration(undefined, {
    type: registrationRequest.toString()
  });

  const success = registration(undefined, {
    type: registrationSuccess.toString(),
    payload: state
  });

  const failure = registration(undefined, {
    type: registrationFailure.toString(),
    payload: error
  });

  // тестирование
  it("очищают поле error, если приходит экшен registrationRequest ", () => {
    expect(request.registationError).toBeNull();
  });

  it("очищают поле error, если приходит экшен registrationSuccess", () => {
    expect(success.registationError).toBeNull();
  });

  it("наполняют данными error, если приходит экшен registrationFailure", () => {
    let { email, password } = error;
    email = Array.isArray(email) ? "email: " + email.join("") : "";
    password = Array.isArray(password) ? "password: " + password.join("") : "";
    expect(failure.registationError).toEqual(email + " " + password);
  });
});
