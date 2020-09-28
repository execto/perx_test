import { carsActions, dealersActions } from "./constants/actionTypes";

export const carsMiddleware = () => (next) => (action) => {
  const actionType = action.type;

  if (actionType === carsActions.CARS_LOADED) {
    const carsList = action.payload.cars.reduce(
      (carsAcc, car) => {
        const cars = carsAcc.cars;
        const dealersIDs = carsAcc.dealersIDs;

        const key = car.id;
        const carObj = {
          id: key,
          vin: car.vin,
          brand: car.brand,
          model: car.model,
          grade: car.grade,
          dealer: car.dealerName,
          dealerId: car.dealer,
          office_ids: car.office_ids,
        };

        return {
          cars: {
            ...cars,
            [key]: carObj,
          },
          dealersIDs: car.dealer
            ? new Set(dealersIDs.add(car.dealer))
            : dealersIDs,
        };
      },
      { cars: null, dealersIDs: new Set() }
    );

    return next({
      ...action,
      payload: {
        cars: carsList.cars,
        totalCars: action.payload.totalCars,
        newDealers: carsList.dealersIDs,
      },
    });
  }

  return next(action);
};

export const dealersMiddleWare = () => (next) => (action) => {
  const actionType = action.type;

  if (actionType === dealersActions.DEALERS_LOADED) {
    const dealers = action.payload.dealers.reduce((dealersAcc, dealer) => {
      const key = dealer.id;
      const dealerObj = {
        dealer: key,
        offices: dealer.offices.map((office) => ({
          id: office.id,
          address: office.address,
        })),
      };

      return { ...dealersAcc, [key]: dealerObj };
    }, {});

    return next({
      ...action,
      payload: {
        dealers,
      },
    });
  }

  return next(action);
};
