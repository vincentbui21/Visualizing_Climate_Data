
export const layoutAddReducer = (state = {layoutArrays: [], isSuccess: false, isError: false, message: ""}, action) => {

    switch (action.type) {

        case "FETCH_LAYOUTS":
            return {
                ...state,
                layoutArrays: action.payload
            }
        case "FETCH_LAYOUTS_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "DELETE_LAYOUTS_SUCCESSFULLY":
            return {
                ...state,
                layoutArrays: state.layoutArrays.filter((layout) => layout._id !== action.payload._id)
            }
            case "DELETE_LAYOUTS_FAIL":
                return {
                    ...state,
                    isError: true,
                    message: action.payload
                }
        case "ADD_LAYOUT_SUCCESSFULLY":
            return {
                ...state,
                layoutArrays: [...state.layoutArrays, action.payload],
                isSuccess: true
            }
        case "ADD_LAYOUT_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "ADD_LAYOUT_RESET":
            return {
                ...state,
                isSuccess: false,
                isError: false,
                message: ""
            }
        default:
            return state
    }


}