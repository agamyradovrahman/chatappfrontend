import axios from "axios";
import * as types from "./types";

export const  cons =  (userId) => async (dispatch) => {
    try {
        const data = await axios.get(`http://localhost:5000/api/cons/${userId}`)
        

        dispatch({
            type: types.FETCH_CONS,
            payload: data.data
        });
    } catch (error) {
        console.log(error)
    }
}

export const AddCon = ({user1, user2}) => async (dispatch) => {
    try {
        dispatch({
            type: types.ADD_CON,
            payload: { users: [user1,user2]}
        })
        console.log({user1 ,user2})
    } catch (error) {
        console.log(error)
    }
}

export const DeleteCon = ({user1, user2}) => async (dispatch) => {
    console.log([user1, user2])
    try {
        dispatch({
            type: types.DELETE_CON,
            payload: [user1, user2]
        })
        console.log({user1 ,user2})
    } catch (error) {
        console.log(error) 
    }
} 