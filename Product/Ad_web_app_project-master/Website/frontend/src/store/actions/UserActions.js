
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL + "/api/users/";

//Delete user by herself/himself

export const deleteUser = () => async (dispatch, getState) => {

    let token = getState().auth.user.token;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    await axios.delete(API_URL + "deleteUser", config);

    dispatch({
        type: "DELETE_USER"
    });


    localStorage.removeItem("auth");
};