import * as types from "./types";
import  axios  from 'axios';


export const fetchPosts = (userid, friendid) => async (dispatch) =>{
 
    try {
        
        const data = await axios.get(`https://chatapp-backend-rvtt.onrender.com/api/cons/${friendid}/`)
        
 
        dispatch({
            type: types.FETCH_MESSAGE, 
            payload: data.data
        });

    } catch (error) { 
        console.log(error) 
    }  
}; 