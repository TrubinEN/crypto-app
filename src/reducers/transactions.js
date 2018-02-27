import { handleActions } from "redux-actions";
import {
  transactionsFailure,
  transactionsRequest,
  transactionsSuccess
} from "../actions/transaction";

const defaultState = {
  records: null,
  isLoading: false,
  error: null
};

export const transactions = handleActions(
  {
    [transactionsRequest]: (state, action) => {
      return {
        ...state,
        records: null,
        isLoading: true,
        error: null
      };
    },
    [transactionsSuccess]: (state, action) => {
      return {
        ...state,
        records: action.payload,
        isLoading: false,
        error: null
      };
    },
    [transactionsFailure]: (state, action) => {
      return {
        ...state,
        records: null,
        isLoading: false,
        error: action.payload
      };
    }
  },
  defaultState
);

export const getTransactionsRecords = state => state.transactions.records;
export const getTransactionsIsLoading = state => state.transactions.isLoading;
export const getTransactionsError = state => state.transactions.error;
