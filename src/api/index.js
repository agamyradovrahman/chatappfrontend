 import axios from "axios";


export const fetchPosts = async () => await axios.get("https://chatapp-backend-rvtt.onrender.com/api/msg/getmsgs/");

export const register = async (username, email, password) => {
    return axios.post("https://chatapp-backend-rvtt.onrender.com/api/messages/register/", {
        username,
        email,
        password
    });
};    