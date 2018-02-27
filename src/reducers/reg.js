import { handleActions } from "redux-actions";
import {
  registrationRequest,
  registrationSuccess,
  registrationFailure
} from "../actions/reg";

const defaultState = {
  registationError: null
};

export const registration = handleActions(
  {
    [registrationRequest]: (state, action) => ({
      ...state,
      registationError: null
    }),
    [registrationSuccess]: (state, action) => ({
      ...state,
      registationError: null
    }),
    [registrationFailure]: (state, action) => {
      let { email, password } = action.payload;
      email = Array.isArray(email) ? "email: " + email.join("") : "";
      password = Array.isArray(password)
        ? "password: " + password.join("")
        : "";
      return {
        ...state,
        registationError: email + " " + password
      };
    }
  },
  defaultState
);

export const getRegistationError = state => state.registration.registationError;
