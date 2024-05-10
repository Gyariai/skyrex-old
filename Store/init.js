import { compose, createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

import { global } from "./storage/global";
import { userdata } from "./storage/user";
import { table } from "./storage/table";

const rootReducer = combineReducers({
  global, userdata, table
});

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const init  = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
export default init