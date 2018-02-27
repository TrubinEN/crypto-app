import { createAction } from "redux-actions";

export const transactionsRequest = createAction("FETCH_TRANSACTIONS_REQUEST");
export const transactionsSuccess = createAction("FETCH_TRANSACTIONS_SUCCESS");
export const transactionsFailure = createAction("FETCH_TRANSACTIONS_FAILURE");
