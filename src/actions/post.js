import * as types from "./types";
import  axios  from 'axios';


export const fetchPosts = (useridd,friendid) => async (dispatch) =>{
 
    try {
        
        const data = await axios.get(`http://localhost:5000/api/msg/getsinglemsg/${useridd}/${friendid}/`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
        console.log(data)
        

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
        console.log({from, too, message})
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