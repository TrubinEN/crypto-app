import { handleActions } from "redux-actions";
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
} from "../actions/currency";
import { loginOut } from "../actions/auth";

const defaultState = {
  selected: "btc",
  offset: "4h",
  currBtc: 0,
  currEth: 0,
  btc: [],
  eth: [],
  isBtcLoading: false,
  isEthLoading: false
};

export const currency = handleActions(
  {
    [selectOffset]: (state, action) => ({
      ...state,
      offset: action.payload
    }),
    [selectBtc]: (state, action) => ({
      ...state,
      selected: "btc"
    }),
    [selectEth]: (state, action) => ({
      ...state,
      selected: "eth"
    }),
    [fetchBtcRequest]: (state, action) => ({
      ...state,
      isBtcLoading: true
    }),
    [fetchEthRequest]: (state, action) => ({
      ...state,
      isEthLoading: true
    }),
    [fetchBtcSuccess]: (state, action) => {
      let curr = action.payload[0];
      const currBtc = curr ? curr.sell : 0;
      const currPurchaseBtc = curr ? curr.purchase : 0;
      return {
        ...state,
        btc: [...action.payload],
        currBtc: currBtc,
        currPurchaseBtc: currPurchaseBtc,
        isBtcLoading: false
      };
    },
    [fetchEthSuccess]: (state, action) => {
      let curr = action.payload[0];
      const currEth = curr ? curr.sell : 0;
      const currPurchaseEth = curr ? curr.purchase : 0;
      return {
        ...state,
        eth: [...action.payload],
        currEth: currEth,
        currPurchaseEth: currPurchaseEth,
        isEthLoading: false
      };
    },
    [fetchBtcFailure]: (state, action) => ({
      ...state
    }),
    [fetchEthFailure]: (state, action) => ({
      ...state
    }),
    [loginOut]: (state, action) => ({
      ...defaultState
    })
  },
  defaultState
);

export const getOffset = state => state.currency.offset;
export const getSelected = state => state.currency.selected;
export const getBtc = state => state.currency.btc;
export const getEth = state => state.currency.eth;
export const getIsBtcLoading = state => state.currency.isBtcLoading;
export const getIsEthLoading = state => state.currency.isEthLoading;
export const getCurrBtc = state => state.currency.currBtc;
export const getCurrEth = state => state.currency.currEth;
export const getCurrentCurrencyPurchase = state => {
  let select = getSelected(state);
  const currencyName = select[0].toUpperCase() + select.slice(1);
  return state.currency[`currPurchase${currencyName}`];
};
export const getCurrentCurrencySell = state => {
  let select = getSelected(state);
  const currencyName = select[0].toUpperCase() + select.slice(1);
  return state.currency[`curr${currencyName}`];
};
export const getSelectedCurrency = state => getSelected(state);
