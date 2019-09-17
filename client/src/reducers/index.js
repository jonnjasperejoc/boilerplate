import { combineReducers } from "redux";
import itemsReducer from "../reducers/items";

export default combineReducers({
    items: itemsReducer
});
