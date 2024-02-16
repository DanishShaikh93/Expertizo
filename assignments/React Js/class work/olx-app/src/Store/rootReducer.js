import { combineReducers } from "redux";
import themeSlice from "./themeSlice";
import  cartSlice  from "./cartSlice";


const rootReducer = combineReducers({
    themeReducer: themeSlice.reducer,
    cartReducer: cartSlice.reducer
})

export default rootReducer
