import { createActions } from "redux-actions";

export const {
  registrationRequest,
  registrationFailure,
  registrationSuccess
} = createActions(
  "REGISTRATION_REQUEST",
  "REGISTRATION_FAILURE",
  "REGISTRATION_SUCCESS"
);
