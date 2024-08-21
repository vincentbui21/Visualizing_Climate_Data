
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL + "/layout";

//Get single layout

export const fetchSingleLayout = (id) => async (dispatch, getState) => {

    try {
    
    let response = await axios.get(API_URL + `/single/${id}`);

    let data = response.data;

    dispatch({
        type: "FETCH_SINGLE_LAYOUT_SUCCESSFULLY",
        payload: data
    });


    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(error);
        dispatch({
            type: "FETCH_SINGLE_LAYOUT_FAIL",
            payload: message
        })

        
    }

};

//Fetch all layouts

export const fetchAllLayouts = () => async (dispatch, getState) => {

    try {
    
    let response = await axios.get(API_URL + "/all");

    let data = response.data;

    dispatch({
        type: "FETCH_ALL_LAYOUTS_SUCCESSFULLY",
        payload: data
    });


    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(error);
        dispatch({
            type: "FETCH_ALL_LAYOUTS_FAIL",
            payload: message
        })

        
    }

};
