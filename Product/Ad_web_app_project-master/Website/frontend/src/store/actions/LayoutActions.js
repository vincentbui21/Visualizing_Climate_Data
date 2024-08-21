
//Add id of chart

export const addToLayout = (id) => (dispatch, getState) => {

    dispatch({
        type: "ADD_CHART",
        payload: id
    });

    localStorage.setItem("layout", JSON.stringify(getState().layout.layoutArray));

};

//Remove id of chart

export const removeFromLayout = (id) => (dispatch, getState) => {

    dispatch({
        type: "REMOVE_CHART",
        payload: id
    })

    localStorage.setItem("layout", JSON.stringify(getState().layout.layoutArray));
};

//Remove all when logging out

export const removeAll = () => (dispatch, getState) => {

    dispatch({
        type: "REMOVE_ALL"
    });

    localStorage.removeItem("layout");
}