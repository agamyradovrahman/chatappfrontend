import * as types from "./types";
import axios  from 'axios';

export const seconduser = (friendid) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://chatapp-backend-rvtt.onrender.com/api/auth/getsingleuser/${friendid}`
    );

    dispatch({
      type: types.FETCHH_SECONDUSER,
      payload: res.data.user,
    });
    console.log(res.data.user);
  } catch (error) {
    console.log(error);
  }
};
