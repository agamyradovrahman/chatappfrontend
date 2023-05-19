
import * as types from "./types";


export const RegisterUser = ({data}) => async (dispatch) => {
  try {

    dispatch({ type: types.REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log(error);
  }
};


export const LoginUser = (data) => async (dispatch) => {

  try {

    dispatch({ type: types.LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const Renameuser = (data) => async (dispatch) => {

  try {
    

    dispatch({ type: types.RENAME_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
 
export const LogoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGOUT_USER, payload: null });
  } catch (error) {
    console.log(error)
  }
} 

export const LogoutSecondUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGOUT_SECONDUSER, payload: null });
  } catch (error) {
    console.log(error)
  }
} 