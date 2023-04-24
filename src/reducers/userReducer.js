import * as types from "../actions/types";
import { seconduser } from './../actions/seconduser';

const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case types.RENAME_USER:
      return {
        ...state,
        user: action.payload,
      };

    case types.LOGOUT_USER:
      return {
        ...state,
        user: {},
        token: "",
      };

    case types.LOGOUT_SECONDUSER:
      return {
        ...state,
        seconduser: {}
      };

    default:
      return state;
  }
};

export default userReducer;
