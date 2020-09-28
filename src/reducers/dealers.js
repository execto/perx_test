import { carsActions, dealersActions } from "../constants/actionTypes";

const initState = {
  existingDealers: new Set(),
  newDealers: new Set(),
  dealers: null,
  loaidng: false,
  error: false,
};

const mergeDealers = (existingDealers, lastRequestedDealers) => {
  const newExistingDealers = new Set(existingDealers);
  for (let dealerId of Object.keys(lastRequestedDealers)) {
    newExistingDealers.add(dealerId);
  }

  return newExistingDealers;
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case dealersActions.DEALERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case dealersActions.DEALERS_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case dealersActions.DEALERS_LOADED:
      const existingDealers = mergeDealers(
        state.existingDealers,
        state.dealers
      );
      return {
        ...state,
        existingDealers,
        loading: false,
        error: false,
      };
    case carsActions.CARS_LOADED:
      return {
        ...state,
        newDealers: action.payload.newDealers,
      };
    default:
      return state;
  }
};
