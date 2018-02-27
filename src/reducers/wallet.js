import { handleActions } from "redux-actions";
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from "../actions/wallet";

import {
  sellCurrencySuccess,
  sellCurrencyFailure,
  buyCurrencySuccess,
  buyCurrencyFailure
} from "../actions/currency";
 
const defaultState = {
  coins: null,
  isLoading: false,
  error: null
};

export const wallet = handleActions(
  {
    [fetchWalletRequest]: (state, action) => ({
      ...state,
      coins: null,
      isLoading: true,
      error: null
    }),
    [fetchWalletSuccess]: (state, action) => ({
      ...state,
      coins: { ...action.payload },
      isLoading: false,
      error: null
    }),
    [fetchWalletFailure]: (state, action) => ({
      ...state,
      coins: null,
      isLoading: false,
      error: action.payload
    }),
    [sellCurrencySuccess]: (state, action) => ({
      ...state,
      coins: { ...action.payload }
    }),
    [sellCurrencyFailure]: (state, action) => ({
      ...state,
      error: action.payload
    }),
    [buyCurrencySuccess]: (state, action) => ({
      ...state,
      coins: { ...action.payload }
    }),
    [buyCurrencyFailure]: (state, action) => ({
      ...state,
      error: action.payload
    })
  },
  defaultState
);

export const getWalletCoins = state => state.wallet.coins;
export const getWalletIsLoading = state => state.wallet.isLoading;
export const getWalletError = state => state.wallet.error;
