import { dealersActions } from "../constants/actionTypes";

const getAddressArray = (officeIds, dealerOffices) => {
  const addresses = [];

  officeIds.forEach((id) => {
    const matchedOffices = dealerOffices
      .filter((office) => office.id === id)
      .map((office) => office.address);

    addresses.push(...matchedOffices);
  });

  return addresses;
};

const insertDealerAddress = (dealers, cars) => {
  const carIds = Object.keys(cars);
  const newCarsState = carIds.reduce((carsAcc, carId) => {
    const proccessedCar = cars[carId];
    const dealerId = proccessedCar.dealerId;
    const dealer = dealers[dealerId];
    if (!dealerId) return { ...carsAcc, [carId]: proccessedCar };

    const addresses = getAddressArray(proccessedCar.office_ids, dealer.offices);

    return {
      ...carsAcc,
      [carId]: { ...proccessedCar, dealerAddresses: addresses },
    };
  }, {});

  return newCarsState;
};

export default (state, action) => {
  const actoinType = action.type;

  switch (actoinType) {
    case dealersActions.RETURN_FROM_CACHE:
      return {
        ...state,
        cars: {
          ...state.cars,
          cars: insertDealerAddress(state.dealers.dealers, state.cars.cars),
          loading: false,
        },
      };
    case dealersActions.DEALERS_LOADED:
      const mergedDealers = {
        ...state.dealers.dealers,
        ...action.payload.dealers,
      };
      const carsWithAddress = insertDealerAddress(
        mergedDealers,
        state.cars.cars
      );

      return {
        cars: {
          ...state.cars,
          cars: carsWithAddress,
        },
        dealers: {
          ...state.dealers,
          dealers: mergedDealers,
        },
      };
    default:
      return state;
  }
};
