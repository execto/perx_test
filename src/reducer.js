import { combineReducers } from "redux";
import cars from "./reducers/cars";
import dealers from "./reducers/dealers";
import merge from "./reducers/merge";

const combinedReducer = combineReducers({
  cars,
  dealers,
});

export default (state, action) => {
  const intermediateState = merge(state, action);
  const finalState = combinedReducer(intermediateState, action);
  return finalState;
};
