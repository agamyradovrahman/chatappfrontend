import * as types from "../actions/types";

const initialState = {
  posts: [],
};

const consReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CONS:
      return {
        ...state,
        posts: action.payload,
      };

    case types.ADD_CON:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
 
    case types.DELETE_CON:
      return {
        ...state,
        posts: state.posts.filter(post =>  !action.payload.every(r => post.users.includes(r))),
        
      };
    default:
      return {
        ...state,
      };
  }
};

export default consReducer;
