
let chartStorage = JSON.parse(localStorage.getItem("layout"));
export const layoutReducer = (state = {layoutArray: chartStorage ? chartStorage : []}, action) => {

    switch (action.type) {
        case "ADD_CHART":
            return {
                ...state,
                layoutArray: [...state.layoutArray, action.payload]
            }
        case "REMOVE_CHART":
            return {
                ...state,
                layoutArray: state.layoutArray.filter((layoutId) => layoutId !== action.payload)
            }
        case "REMOVE_ALL": 
            return {
                ...state,
                layoutArray: []
            }
        default:
            return state
    }    
}