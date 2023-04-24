import * as types from "./types";
import  axios  from 'axios';


export const fetchPosts = (userid, friendid) => async (dispatch) =>{
 
    try {
        
        const data = await axios.get(`http://localhost:5000/api/cons/${friendid}/`)
        
 
        dispatch({
            type: types.FETCH_MESSAGE, 
            payload: data.data
        });

    } catch (error) { 
        console.log(error) 
    }  
}; 