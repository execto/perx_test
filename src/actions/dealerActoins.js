import { dealersActions } from "../constants/actionTypes";
import { ApiService } from "../services/ApiService";
import { createAction } from "./helpers";

const getNotRequstedDealers = (dealersState) => {
  const { existingDealers, newDealers } = dealersState;

  const notRequestedDealers = new Set(newDealers);
  for (let dealerId of existingDealers) {
    dealerId && notRequestedDealers.delete(dealerId);
  }
  return notRequestedDealers;
};

const getDealersUrl = (dealersState) => {
  const notRequestedDealers = getNotRequstedDealers(dealersState);
  let dealersApiUrlBase = ApiService.dealersApiUrl;
  for (let dealerId of notRequestedDealers) {
    dealersApiUrlBase += `${dealerId},`;
  }
  return dealersApiUrlBase.slice(0, dealersApiUrlBase.length - 1);
};

export const getDealers = () => {
  const loadStart = createAction(dealersActions.DEALERS_REQUEST);

  const loadSuccess = (dealers) => {
    return createAction(dealersActions.DEALERS_LOADED, {
      dealers: dealers.resData,
    });
  };

  const loadError = createAction(dealersActions.DEALERS_LOAD_ERROR);

  const returnCachedValue = createAction(dealersActions.RETURN_FROM_CACHE);

  const asyncAction = {
    actions: [loadStart, loadSuccess, loadError, returnCachedValue],
    apiCall: (state) => fetch(getDealersUrl(state.dealers)),
    shouldFetch: (state) => getNotRequstedDealers(state.dealers).size === 0,
  };

  return ApiService.request(asyncAction);
};
