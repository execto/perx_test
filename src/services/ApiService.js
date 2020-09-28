import { makeActionCreator } from "../actions/helpers";

export class ApiService {
  static carsApiUrl =
    "https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&per_page=20";
  static dealersApiUrl =
    "https://jlrc.dev.perx.ru/carstock/api/v1/dealers/?id__in=";

  static proccessHeaders(responseHeaders, requestedHeaders) {
    if (!requestedHeaders) {
      return null;
    }

    return requestedHeaders.reduce((headersAcc, headerName) => {
      const headerValue = responseHeaders.get(headerName);

      return headerValue
        ? { ...headersAcc, [headerName]: headerValue }
        : headersAcc;
    }, {});
  }

  static request(asyncAction) {
    const { actions, shouldFetch, apiCall, requestedHeaders } = asyncAction;
    const [
      fetching,
      fetchSuccess,
      fetchError,
      fetchFromCache,
    ] = actions.map((action) => makeActionCreator(action));

    return async (dispatch, getState) => {
      if (shouldFetch && shouldFetch(getState())) {
        return fetchFromCache ? dispatch(fetchFromCache()) : null;
      }

      dispatch(fetching());

      try {
        const res = await apiCall(getState());
        const headersData = ApiService.proccessHeaders(
          res.headers,
          requestedHeaders
        );
        const resData = await res.json();
        return dispatch(
          fetchSuccess({
            headersData,
            resData,
          })
        );
      } catch (err) {
        console.log(err);
        return dispatch(fetchError());
      }
    };
  }
}
