import { combineReducers } from "redux";
import balance from "./balance";
import businesses from "./businesses";
import managers from "./managers";

export default combineReducers({ balance, businesses, managers });
