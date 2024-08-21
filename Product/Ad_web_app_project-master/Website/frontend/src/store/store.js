
import {createStore, applyMiddleware, combineReducers} from "redux";

import thunk from "redux-thunk";
import { layoutReducer } from "./reducers/LayoutForDesignPageReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { layoutDisplayReducer } from "./reducers/LayoutDisplayReducer";
import { layoutAddReducer } from "./reducers/LayoutAddReducer";
import { authReducer } from "./reducers/AuthReducers";


let middleware = [thunk];

let rootReducer = combineReducers({
    auth: authReducer,
    layout: layoutReducer,
    layoutAdd: layoutAddReducer,
    layoutContent: layoutDisplayReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;