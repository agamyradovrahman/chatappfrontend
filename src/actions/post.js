import * as types from "./types";
import  axios  from 'axios';


export const fetchPosts = (useridd,friendid) => async (dispatch) =>{
 
    try {
        
        const data = await axios.get(`https://chatapp-backend-rvtt.onrender.com/api/msg/getsinglemsg/${useridd}/${friendid}/`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
        

        dispatch({
            type: types.FETCH_POSTS,
            payload: data.data
        });

    } catch (error) {
        console.log(error)
    }  
}; 

export const AddPost = ({from, too, message}) => async (dispatch) => {
    try {
        dispatch({
            type: types.ADD_POSTS,
            payload: {message: message, sender: from, to: too, users: [from,too]}
        })
    } catch (error) {
        console.log(error)
    }
}

export const ClearPost = () => async (dispatch) => {
    try {
        dispatch({
            type: types.CLEAR_POSTS,
            payload: []
        })
    } catch (error) {
        console.log(error)
    }
}


/*export const fetchPosts = () => {
    return {
        type: types.FETCH_POSTS,
        payload: []
    }
}*/