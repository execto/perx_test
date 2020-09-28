import { carsActions } from "../constants/actionTypes";
import { ApiService } from "../services/ApiService";
import { createAction } from "./helpers";

export const getCars = (page) => {
  const loadStart = createAction(carsActions.CARS_REQUEST);

  const loadSuccess = (data) => {
    const { resData, headersData } = data;
    return createAction(carsActions.CARS_LOADED, {
      cars: resData,
      totalCars: Number(headersData["X-Total-Count"]),
    });
  };

  const loadError = createAction(carsActions.CARS_LOAD_ERROR);

  const asyncAction = {
    actions: [loadStart, loadSuccess, loadError],
    apiCall: () =>
      fetch(ApiService.carsApiUrl + `&page=${page}`, {
        headers: { "X-CS-Dealer-Id-Only": 1 },
      }),
    requestedHeaders: ["X-Total-Count"],
  };

  return ApiService.request(asyncAction);
};
