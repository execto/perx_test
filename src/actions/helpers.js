export const createAction = (type, payload) => {
  const action = {
    type,
    payload: payload || null,
  };

  return action;
};

export const makeActionCreator = (action) => {
  if (!action) {
    return null;
  }

  if (typeof action === "function") {
    return action;
  }

  return () => createAction(action.type, action.payload || null);
};
