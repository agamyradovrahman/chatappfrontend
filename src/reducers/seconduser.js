import * as types from "../../../front/src/actions/types";

const secondUserReducer = (state = { friend: {} }, action) => {
  switch (action.type) {
    case types.FETCHH_SECONDUSER:
      return {
        ...state,
        friend: action.payload,
      };

    case types.LOGOUT_SECONDUSER:
      return {
        ...state,
        friend: {},
      };

    default:
      return {
        ...state,
      };
  }
};

export default secondUserReducer;
