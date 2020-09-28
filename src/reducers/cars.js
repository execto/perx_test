import { carsActions, dealersActions } from "../constants/actionTypes";

const initState = {
  totalCars: 0,
  cars: null,
  loading: false,
  error: false,
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case carsActions.CARS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case carsActions.CARS_LOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case carsActions.CARS_LOADED:
      return {
        cars: payload.cars,
        totalCars: payload.totalCars,
        error: false,
        loading: true,
      };
    case dealersActions.DEALERS_LOADED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
