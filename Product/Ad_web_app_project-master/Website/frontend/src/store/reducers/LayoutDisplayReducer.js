
export const layoutDisplayReducer = (state = {layout: {}, layouts: [], listOfCharts: [], isError: false, message: ""}, action) => {

    switch (action.type) {
        case "FETCH_ALL_LAYOUTS_SUCCESSFULLY":
            return {
                ...state,
                layouts: action.payload,
            }
        case "FETCH_ALL_LAYOUTS_FAIL":
                return {
                    ...state,
                    isError: true,
                    message: action.payload
                }
        
        case "FETCH_SINGLE_LAYOUT_SUCCESSFULLY":
            return {
                ...state,
                layout: action.payload,
                listOfCharts: action.payload.listOfCharts
            }
        case "FETCH_SINGLE_LAYOUT_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        default:
            return state
    }

};