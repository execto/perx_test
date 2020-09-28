import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { carsMiddleware, dealersMiddleWare } from "./middleware";
import reducer from "./reducer";

export const store = createStore(
  reducer,
  applyMiddleware(thunk, carsMiddleware, dealersMiddleWare)
);
