import { combineReducers } from "redux";
import { auth } from "./auth.js";
import { registration } from "./reg.js";
import { user } from "./user";
import { currency } from "./currency";
import { wallet } from "./wallet";
import { transactions } from "./transactions";
export default combineReducers({
  auth,
  registration,
  user,
  currency,
  wallet,
  transactions
});
