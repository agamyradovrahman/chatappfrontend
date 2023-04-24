import { combineReducers } from "redux";
import consReducer from "./conn";
import postReducer from "./post"
import userReducer from './userReducer';
import secondUserReducer from './seconduser';

const rootReducer = combineReducers({
    posts: postReducer,
    user: userReducer,
    con: consReducer,
    seconduser: secondUserReducer
});

export default rootReducer; 
 