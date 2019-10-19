import { combineReducers } from "redux";
import authReducer from "./authReducer";
import ProductReducer from "./ProductReducer";
const rootReducer = combineReducers({
  authReducer,
  ProductReducer
});

export default rootReducer;
