
let user = JSON.parse(localStorage.getItem("auth"));
export const authReducer = (state = {user: localStorage.getItem("auth") ? user : {}, isSuccess: false, isError: false, message: ""}, action) => {

    switch (action.type) {
        case "DELETE_USER":
            return {
                ...state,
                user: {}
            }
        case "REGISTER_SUCCESSFULLY":
            return {
                ...state,
                isSuccess: true,
            }
        case "REGISTER_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "RESET_AFTER_REGISTER":
            return {
                ...state,
                isSuccess: false,
                isError: false,
                message: ""
            } 
        case "LOG_IN_SUCCESSFULLY": 
            return {
                ...state,
                isSuccess: true,
                user: action.payload
            }
        case "LOG_IN_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "RESET_AFTER_LOGIN":
            return {
                ...state,
                isSuccess: false,
                isError: false,
                message: ""
            }
        case "LOG_OUT": {
            return {
                ...state,
                user: {},
                isSuccess: false,
                isError: false,
                message: ""
            }
        }
        default:
            return state
    }


};