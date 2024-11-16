import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
import userReducer from "./reducers/userReducers";
import cartReducer from "./reducers/cartReducer";
import { notificationsReducer } from "./reducers/notificationsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  notifications: notificationsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
