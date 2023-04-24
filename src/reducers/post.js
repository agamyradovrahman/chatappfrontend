import * as types from "../../../front/src/actions/types";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case types.ADD_POSTS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case types.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;
