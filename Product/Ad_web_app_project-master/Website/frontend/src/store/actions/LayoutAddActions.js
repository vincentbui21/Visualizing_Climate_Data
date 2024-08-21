import axios from "axios";
const API_URL = process.env.REACT_APP_SERVER_URL + "/layout/";

//Add layout

export const addLayout = (layoutInputs) => async (dispatch, getState) => {

    try {

        let token = getState().auth.user.token;

        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        let response = await axios.post(API_URL, layoutInputs, config);

        let data = response.data;
        
        dispatch({
            type: "ADD_LAYOUT_SUCCESSFULLY",
            payload: data
        });


    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(error);
        dispatch({
            type: "ADD_LAYOUT_FAIL",
            payload: message
        })

    }
 
};

//Reset after clicking add

export const resetAfterAdding = () => async (dispatch, getState) => {

    dispatch({
        type: "ADD_LAYOUT_RESET"
    })
};

//Remove local storage for a list of charts

export const removeLocalStorageOfLayout = () => async (dispatch, getState) => {
    dispatch({
        type: "REMOVE_ALL"
    });
    localStorage.removeItem("layout");
};

//Fetch a list of charts

export const fetchLayouts = () => async (dispatch, getState) => {

    try {

    let token = getState().auth.user.token;

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.get(API_URL + "allByOne", config);

    dispatch({
        type: "FETCH_LAYOUTS",
        payload: response.data
    });

    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
   
        dispatch({
            type: "FETCH_LAYOUT_FAIL",
            payload: message
        })

    }

};

//Delete layout by user

export const deleteLayouts = (id) => async (dispatch, getState) => {

    try {
    
    let token = getState().auth.user.token;
    
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.delete(API_URL + `delete/${id}`, config);
    let deleteLayout = response.data;
    dispatch({
        type: "DELETE_LAYOUTS_SUCCESSFULLY",
        payload: deleteLayout
    });


    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
   
        dispatch({
            type: "DELETE_LAYOUTS_FAIL",
            payload: message
        })
    }

};