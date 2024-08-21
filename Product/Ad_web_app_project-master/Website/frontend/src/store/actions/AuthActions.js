import axios from "axios";
import {url} from "../../context/LineChartContext"
const API_URL = "/api/auth/";

//Register

export const registerFunction = (userInputs) => async (dispatch, getState) => {

    try {

        await axios.post( url + API_URL + "register", userInputs);

        dispatch(
        {
            type: "REGISTER_SUCCESSFULLY",
        });


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "REGISTER_FAIL",
            payload: message 
        })
        

    }


};

//Reset after register

export const resetAfterRegister = () => async (dispatch, getState) => {

    dispatch({
        type: "RESET_AFTER_REGISTER"
    })
};

//Log in function

export const loginFunction = (userInputValues) => async (dispatch, getState) => {

    try {

        let response = await axios.post(url + API_URL + "login", userInputValues);

        let data = response.data;

        dispatch({
            type: "LOG_IN_SUCCESSFULLY",
            payload: data
        });

        localStorage.setItem("auth", JSON.stringify(getState().auth.user));


    } catch (error) {

        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        dispatch({
            type: "LOG_IN_FAIL",
            payload: message
        })
        
    }

};

//Reset after login

export const resetAfterLogin = () => async (dispatch, getState) => {

    dispatch({
        type: "RESET_AFTER_LOGIN"
    });
}; 

//Log out function

export const logoutFunction = () => async (dispatch, getState) => {

    dispatch({
        type: "LOG_OUT"
    });

    localStorage.removeItem("auth");
};
