import { combineReducers } from "redux";
import balance from "./balance";
import businesses from "./businesses";

export default combineReducers({ balance, businesses });
