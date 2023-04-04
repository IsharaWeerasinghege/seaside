import {userReducer} from "./userSlice";
import thunkMiddleware from "redux-thunk";
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {crewReducer} from "./crewSlice";
import {yachtReducer} from "./fleetSlice";
import {supplierReducer} from "./supplierSlice";
import {reservationReducer} from "./reservationSlice";

const RootReducer = combineReducers({
    user: userReducer,
    crew: crewReducer,
    yacht: yachtReducer,
    supplier: supplierReducer,
    reservation: reservationReducer
})


const store = configureStore({
    reducer: RootReducer,
    middleware: [thunkMiddleware],
    devTools: true
});


export default store;



